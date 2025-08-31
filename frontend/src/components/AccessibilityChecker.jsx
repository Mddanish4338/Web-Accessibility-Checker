import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertCircle, CheckCircle, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';
import { useAccessibilityCheck } from '../hooks/useAccessibilityCheck';
import { formatDate, downloadTextAsFile } from '../lib/utils';
import ReportSummary from './ReportSummary';
import ReportViewer from './ReportViewer';

const AccessibilityChecker = () => {
  const [url, setUrl] = useState('');
  const { loading, error, report, cached, checkUrl } = useAccessibilityCheck();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      checkUrl(url.trim());
    }
  };

  const handleDownload = () => {
    if (report) {
      downloadTextAsFile(
        report.generatedReport,
        `accessibility-report-${new Date(report.timestamp).toISOString().split('T')[0]}.md`
      );
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Web Accessibility Checker
          </h1>
          <p className="text-lg text-muted-foreground">
            Check your website for accessibility issues based on W3C guidelines
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter website URL (e.g., https://example.com)"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Check Accessibility
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {report && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Accessibility Report
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Generated on {formatDate(new Date(report.timestamp))}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {cached && (
                    <Badge variant="secondary">From Cache</Badge>
                  )}
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <ReportSummary summary={report.summary} />
            <ReportViewer generatedReport={report.generatedReport} />
          </motion.div>
        )}

        {!report && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Check Website Accessibility
            </h3>
            <p className="text-muted-foreground">
              Enter a website URL above to check for accessibility issues and generate a detailed report.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AccessibilityChecker;