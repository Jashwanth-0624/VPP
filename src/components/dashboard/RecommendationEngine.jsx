import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Badge } from "../../components/ui/badge.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Lightbulb, TrendingUp, Zap, Battery, Sun, Wind } from "lucide-react";
import { formatCurrency } from "../../utils/index.js";
import { Forecast } from "../../entities/all.js";

export default function RecommendationEngine() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRecommendations = async () => {
    try {
      const forecasts = await Forecast.list("-forecast_time", 1);
      if (forecasts.length > 0 && forecasts[0].recommendations) {
        setRecommendations(forecasts[0].recommendations);
      } else {
        // Generate sample recommendations if none exist
        setRecommendations([
          {
            action: "Optimize HVAC Schedule",
            asset: "Building A",
            priority: "High",
            savings_estimate: 25.5,
            description: "Delay HVAC startup by 30 minutes during peak solar hours",
            impact: "Reduce grid dependency by 15%"
          },
          {
            action: "Battery Charging",
            asset: "Battery Bank 1",
            priority: "Medium",
            savings_estimate: 12.3,
            description: "Charge battery during low-demand hours",
            impact: "Store excess solar energy for evening peak"
          },
          {
            action: "Load Shifting",
            asset: "Campus Load",
            priority: "Low",
            savings_estimate: 8.7,
            description: "Shift non-critical loads to off-peak hours",
            impact: "Optimize energy consumption patterns"
          }
        ]);
      }
    } catch (error) {
      console.error("Error loading recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action) => {
    if (action.toLowerCase().includes('hvac') || action.toLowerCase().includes('schedule')) {
      return TrendingUp;
    } else if (action.toLowerCase().includes('battery')) {
      return Battery;
    } else if (action.toLowerCase().includes('solar')) {
      return Sun;
    } else if (action.toLowerCase().includes('wind')) {
      return Wind;
    } else if (action.toLowerCase().includes('load')) {
      return Zap;
    }
    return Lightbulb;
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getSavingsColor = (savings) => {
    if (savings >= 20) return 'text-green-600';
    if (savings >= 10) return 'text-blue-600';
    return 'text-slate-600';
  };

  useEffect(() => {
    loadRecommendations();
    const interval = setInterval(loadRecommendations, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
        <CardHeader className="pb-2 border-b border-slate-200">
          <CardTitle className="text-lg font-semibold text-slate-900">AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-100 h-20 rounded-lg"></div>
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
          <CardTitle className="text-lg font-semibold text-slate-900">AI Recommendations</CardTitle>
          <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
            <Lightbulb className="w-3 h-3 mr-1" />
            Smart
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recommendations.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Lightbulb className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-sm">No recommendations available</p>
              <p className="text-xs text-slate-400 mt-1">System is optimally configured</p>
            </div>
          ) : (
            recommendations.map((rec, index) => {
              const Icon = getActionIcon(rec.action);
              return (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-slate-200 bg-white/50 hover:bg-white/80 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="p-1.5 bg-purple-100 rounded-lg">
                        <Icon className="w-3 h-3 text-purple-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-slate-900 truncate">
                          {rec.action}
                        </h4>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(rec.priority)}`}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">
                        {rec.description || `Optimize ${rec.asset} for better efficiency`}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Asset:</span>
                          <span className="text-xs font-medium text-slate-700">{rec.asset}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`text-sm font-bold ${getSavingsColor(rec.savings_estimate)} whitespace-nowrap`}>
                            {formatCurrency(Number(rec.savings_estimate || 0), 'INR')}
                          </span>
                          <span className="text-xs text-slate-500">/day</span>
                        </div>
                      </div>
                      {rec.impact && (
                        <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                          <p className="text-xs text-blue-700">
                            <strong>Impact:</strong> {rec.impact}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {recommendations.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-200">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => console.log('Implementing all recommendations...')}
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              Implement All Recommendations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
