const express = require('express');
const router = express.Router();
const { checkAccessibility, getReport, getReportsByUrl } = require('../controllers/accessibilityController');

// Accessibility check routes
router.post('/check', checkAccessibility);
router.get('/report/:reportId', getReport);
router.get('/reports', getReportsByUrl);

module.exports = router;