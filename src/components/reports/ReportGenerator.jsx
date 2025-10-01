import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
// Removed custom Select for reliability; using native <select>
import { FileText, Download } from "lucide-react";

export default function ReportGenerator({ onGenerateReport, loading }) {
  const [reportConfig, setReportConfig] = useState({
    report_type: 'weekly',
    start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    format: 'pdf'
  });

  const handleGenerateReport = () => {
    onGenerateReport(reportConfig);
  };

  const setQuickRange = (days) => {
    const end = new Date();
    const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    setReportConfig(prev => ({
      ...prev,
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0],
      report_type: days === 1 ? 'daily' : days === 7 ? 'weekly' : days === 30 ? 'monthly' : 'custom'
    }));
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg font-semibold text-slate-900">Generate Report</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Report Type</Label>
          <select
            className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={reportConfig.report_type}
            onChange={(e) => setReportConfig(prev => ({ ...prev, report_type: e.target.value }))}
          >
            <option value="daily">Daily Report</option>
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setQuickRange(1)}
            className="text-xs flex-1 min-w-[80px]"
          >
            Last 24h
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setQuickRange(7)}
            className="text-xs flex-1 min-w-[80px]"
          >
            Last 7 days
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setQuickRange(30)}
            className="text-xs flex-1 min-w-[80px]"
          >
            Last 30 days
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Start Date</Label>
            <Input
              type="date"
              value={reportConfig.start_date}
              onChange={(e) => setReportConfig(prev => ({ ...prev, start_date: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">End Date</Label>
            <Input
              type="date"
              value={reportConfig.end_date}
              onChange={(e) => setReportConfig(prev => ({ ...prev, end_date: e.target.value }))}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Export Format</Label>
          <select
            className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={reportConfig.format}
            onChange={(e) => setReportConfig(prev => ({ ...prev, format: e.target.value }))}
          >
            <option value="pdf">PDF Report</option>
            <option value="xlsx">Excel Spreadsheet</option>
            <option value="csv">CSV Data</option>
          </select>
        </div>

        <Button
          onClick={handleGenerateReport}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Generate Report
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
