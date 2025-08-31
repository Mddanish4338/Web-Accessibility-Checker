import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const ReportSummary = ({ summary }) => {
  const severityLevels = [
    { key: 'critical', label: 'Critical', color: 'bg-red-500' },
    { key: 'high', label: 'High', color: 'bg-orange-500' },
    { key: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { key: 'low', label: 'Low', color: 'bg-blue-500' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {severityLevels.map((level) => (
            <div key={level.key} className="text-center p-4 rounded-lg bg-muted">
              <div className="text-2xl font-bold">
                {summary[level.key] || 0}
              </div>
              <div className="text-sm text-muted-foreground">{level.label}</div>
            </div>
          ))}
          <div className="text-center p-4 rounded-lg bg-muted">
            <div className="text-2xl font-bold">
              {summary.totalIssues || 0}
            </div>
            <div className="text-sm text-muted-foreground">Total Issues</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSummary;