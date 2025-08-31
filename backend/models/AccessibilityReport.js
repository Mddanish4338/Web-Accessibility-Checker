const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  element: String,
  message: String,
  codeSnippet: String,
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  }
});

const accessibilityReportSchema = new mongoose.Schema({
  websiteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Website',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  issues: [issueSchema],
  summary: {
    totalIssues: Number,
    critical: Number,
    high: Number,
    medium: Number,
    low: Number
  },
  generatedReport: String,
  reportId: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('AccessibilityReport', accessibilityReportSchema);