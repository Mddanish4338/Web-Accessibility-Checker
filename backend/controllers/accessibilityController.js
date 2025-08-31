const AccessibilityChecker = require('../utils/accessibilityChecker');
const OpenAIService = require('../utils/openaiService');
const Website = require('../models/Website');
const AccessibilityReport = require('../models/AccessibilityReport');
const { v4: uuidv4 } = require('uuid');

const accessibilityChecker = new AccessibilityChecker();
const openAIService = new OpenAIService();

exports.checkAccessibility = async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Check if we already have a recent report for this URL (within 24 hours)
    const existingWebsite = await Website.findOne({ url });
    let website;
    
    if (existingWebsite) {
      website = existingWebsite;
      const recentReport = await AccessibilityReport.findOne({
        websiteId: website._id,
        timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }).sort({ timestamp: -1 });
      
      if (recentReport) {
        return res.json({
          message: 'Report fetched from cache',
          report: recentReport,
          cached: true
        });
      }
    } else {
      // Create new website entry
      website = new Website({ url });
      await website.save();
    }

    // Perform accessibility check
    const { issues, summary } = await accessibilityChecker.checkAccessibility(url);
    
    // Generate AI report
    const generatedReport = await openAIService.generateAccessibilityReport(issues, summary, url);
    
    // Save report to database
    const report = new AccessibilityReport({
      websiteId: website._id,
      url,
      issues,
      summary,
      generatedReport,
      reportId: uuidv4()
    });
    
    await report.save();

    res.json({
      message: 'Accessibility check completed',
      report,
      cached: false
    });
  } catch (error) {
    console.error('Error in checkAccessibility:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    
    const report = await AccessibilityReport.findOne({ reportId })
      .populate('websiteId');
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    res.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getReportsByUrl = async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }
    
    const website = await Website.findOne({ url });
    
    if (!website) {
      return res.status(404).json({ error: 'No reports found for this URL' });
    }
    
    const reports = await AccessibilityReport.find({ websiteId: website._id })
      .sort({ timestamp: -1 });
    
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: error.message });
  }
};