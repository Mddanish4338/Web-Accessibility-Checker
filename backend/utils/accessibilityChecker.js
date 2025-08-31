const { JSDOM } = require('jsdom');
const cheerio = require('cheerio');
const axios = require('axios');

class AccessibilityChecker {
  constructor() {
    this.rules = [
      {
        id: 'img-alt',
        description: 'Images must have alt text',
        check: ($) => {
          const issues = [];
          $('img:not([alt]), img[alt=""]').each((i, el) => {
            issues.push({
              type: 'image',
              element: $.html(el),
              message: 'Image missing alt text',
              codeSnippet: $.html(el),
              severity: 'high'
            });
          });
          return issues;
        }
      },
      {
        id: 'heading-structure',
        description: 'Headings should be properly structured',
        check: ($) => {
          const issues = [];
          const headings = $('h1, h2, h3, h4, h5, h6');
          let prevLevel = 0;
          
          headings.each((i, el) => {
            const level = parseInt($(el).prop('tagName').substring(1));
            
            if (i === 0 && level !== 1) {
              issues.push({
                type: 'heading',
                element: $.html(el),
                message: 'First heading should be an H1',
                codeSnippet: $.html(el),
                severity: 'medium'
              });
            }
            
            if (level > prevLevel + 1 && i > 0) {
              issues.push({
                type: 'heading',
                element: $.html(el),
                message: `Heading level jumps from H${prevLevel} to H${level}`,
                codeSnippet: $.html(el),
                severity: 'medium'
              });
            }
            
            prevLevel = level;
          });
          
          return issues;
        }
      },
      {
        id: 'link-text',
        description: 'Links should have descriptive text',
        check: ($) => {
          const issues = [];
          $('a').each((i, el) => {
            const $el = $(el);
            const text = $el.text().trim();
            const href = $el.attr('href');
            
            if (!text && !$el.find('img').length) {
              issues.push({
                type: 'link',
                element: $.html(el),
                message: 'Link missing descriptive text',
                codeSnippet: $.html(el),
                severity: 'medium'
              });
            } else if (text.length < 3 && !$el.find('img').length) {
              issues.push({
                type: 'link',
                element: $.html(el),
                message: 'Link text is too short to be descriptive',
                codeSnippet: $.html(el),
                severity: 'low'
              });
            } else if (text === 'click here' || text === 'read more') {
              issues.push({
                type: 'link',
                element: $.html(el),
                message: 'Link text is not descriptive enough',
                codeSnippet: $.html(el),
                severity: 'low'
              });
            }
          });
          
          return issues;
        }
      },
      {
        id: 'lang-attribute',
        description: 'HTML should have a lang attribute',
        check: ($) => {
          const issues = [];
          const html = $('html');
          
          if (!html.attr('lang')) {
            issues.push({
              type: 'document',
              element: '<html>',
              message: 'Missing lang attribute in <html> tag',
              codeSnippet: $.html(html),
              severity: 'high'
            });
          }
          
          return issues;
        }
      },
      {
        id: 'contrast-ratio',
        description: 'Text should have sufficient contrast ratio',
        check: ($) => {
          // This would normally require a more complex implementation
          // For now, we'll just check for inline styles that might cause issues
          const issues = [];
          
          $('*').each((i, el) => {
            const $el = $(el);
            const style = $el.attr('style');
            
            if (style && (
              style.includes('color:') || 
              style.includes('background-color:') || 
              style.includes('background:')
            )) {
              issues.push({
                type: 'styling',
                element: $.html(el),
                message: 'Element uses inline styles that may affect accessibility',
                codeSnippet: $.html(el),
                severity: 'medium'
              });
            }
          });
          
          return issues;
        }
      }
    ];
  }

  async checkAccessibility(url) {
    try {
      // Fetch the HTML content
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      const html = response.data;
      const $ = cheerio.load(html);
      
      // Run all accessibility checks
      let allIssues = [];
      
      for (const rule of this.rules) {
        const issues = rule.check($);
        allIssues = allIssues.concat(issues);
      }
      
      // Count issues by severity
      const critical = allIssues.filter(issue => issue.severity === 'critical').length;
      const high = allIssues.filter(issue => issue.severity === 'high').length;
      const medium = allIssues.filter(issue => issue.severity === 'medium').length;
      const low = allIssues.filter(issue => issue.severity === 'low').length;
      
      const summary = {
        totalIssues: allIssues.length,
        critical,
        high,
        medium,
        low
      };
      
      return {
        issues: allIssues,
        summary
      };
    } catch (error) {
      console.error('Error checking accessibility:', error);
      throw new Error(`Failed to check accessibility: ${error.message}`);
    }
  }
}

module.exports = AccessibilityChecker;