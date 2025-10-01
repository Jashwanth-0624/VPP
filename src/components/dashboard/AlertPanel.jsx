import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Badge } from "../../components/ui/badge.jsx";
import { Button } from "../../components/ui/button.jsx";
import { AlertCircle, AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import { Alert as AlertEntity } from "../../entities/all.js";

export default function AlertPanel() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAlerts = async () => {
    try {
      const alertData = await AlertEntity.list("-created_date", 5);
      setAlerts(alertData);
    } catch (error) {
      console.error("Error loading alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const dismissAlert = async (alertId) => {
    try {
      await AlertEntity.update(alertId, { status: 'dismissed' });
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    } catch (error) {
      console.error("Error dismissing alert:", error);
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertCircle;
      case 'info': return Info;
      case 'recommendation': return CheckCircle;
      default: return Info;
    }
  };

  const getAlertColor = (type, priority) => {
    if (type === 'critical' || priority === 'high') {
      return 'bg-red-50 border-red-200 text-red-800';
    } else if (type === 'warning' || priority === 'medium') {
      return 'bg-amber-50 border-amber-200 text-amber-800';
    } else if (type === 'recommendation') {
      return 'bg-blue-50 border-blue-200 text-blue-800';
    } else {
      return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-amber-100 text-amber-700 border-amber-200',
      low: 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[priority] || colors.low;
  };

  useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
        <CardHeader className="pb-2 border-b border-slate-200">
          <CardTitle className="text-lg font-semibold text-slate-900">System Alerts</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-100 h-16 rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">System Alerts</CardTitle>
          <Badge variant="outline" className="text-xs bg-slate-50 text-slate-700">
            {alerts.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-sm">No active alerts</p>
              <p className="text-xs text-slate-400 mt-1">System running normally</p>
            </div>
          ) : (
            alerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${getAlertColor(alert.type, alert.priority)} transition-all duration-200 hover:shadow-sm`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium truncate">
                          {alert.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-xs ${getPriorityBadge(alert.priority)}`}>
                            {alert.priority}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dismissAlert(alert.id)}
                            className="h-6 w-6 p-0 hover:bg-white/50"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs opacity-90 mb-2">
                        {alert.message}
                      </p>
                      {alert.action_required && (
                        <div className="flex items-center gap-1 text-xs font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Action Required</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
