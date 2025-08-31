import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ReportViewer = ({ generatedReport }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>Detailed Report</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="markdown-content">
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {generatedReport}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportViewer;