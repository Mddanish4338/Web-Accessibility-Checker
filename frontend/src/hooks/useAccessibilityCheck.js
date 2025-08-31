import { useState } from 'react';
import { checkAccessibility, getReportsByUrl } from '../lib/axios';

export const useAccessibilityCheck = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [cached, setCached] = useState(false);

  const checkUrl = async (url) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await checkAccessibility(url);
      setReport(response.data.report);
      setCached(response.data.cached);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to check accessibility');
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async (url) => {
    try {
      const response = await getReportsByUrl(url);
      setReports(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch reports');
    }
  };

  return {
    loading,
    error,
    report,
    reports,
    cached,
    checkUrl,
    fetchReports
  };
};