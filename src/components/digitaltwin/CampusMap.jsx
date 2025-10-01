import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Badge } from "../../components/ui/badge.jsx";
import { Sun, Wind, Battery, Zap, Activity } from "lucide-react";
import { Asset } from "../../entities/all.js";

export default function CampusMap() {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAssets = async () => {
    try {
      const assetData = await Asset.list();
      setAssets(assetData);
    } catch (error) {
      console.error("Error loading assets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
    const interval = setInterval(loadAssets, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const getAssetIcon = (type) => {
    switch (type) {
      case 'solar': return Sun;
      case 'wind': return Wind;
      case 'battery': return Battery;
      case 'grid': return Zap;
      default: return Activity;
    }
  };

  const getAssetColor = (type, status) => {
    if (status !== 'online') return 'bg-slate-400';
    
    switch (type) {
      case 'solar': return 'bg-yellow-500';
      case 'wind': return 'bg-green-500';
      case 'battery': return 'bg-blue-500';
      case 'grid': return 'bg-purple-500';
      case 'load': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'offline': return 'bg-red-50 text-red-700 border-red-200';
      case 'maintenance': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
        <CardHeader className="pb-2 border-b border-slate-200">
          <CardTitle className="text-lg font-semibold text-slate-900">Campus Energy Map</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="animate-pulse bg-slate-100 h-96 rounded-lg"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
      <CardHeader className="pb-2 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Campus Energy Map</CardTitle>
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
            Live View
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative">
          {/* Campus Map Background */}
          <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-slate-200 h-96 overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Buildings */}
            <div className="absolute inset-0 p-4">
              {/* Engineering Building */}
              <div className="absolute top-8 left-8 w-16 h-12 bg-slate-300 rounded border-2 border-slate-400">
                <div className="text-xs text-center mt-1 font-medium text-slate-600">Engineering</div>
              </div>
              
              {/* Campus Green */}
              <div className="absolute top-4 right-16 w-20 h-16 bg-green-200 rounded border-2 border-green-300">
                <div className="text-xs text-center mt-1 font-medium text-green-700">Green</div>
              </div>
              
              {/* Energy Center */}
              <div className="absolute bottom-16 left-12 w-14 h-10 bg-blue-200 rounded border-2 border-blue-300">
                <div className="text-xs text-center mt-1 font-medium text-blue-700">Energy</div>
              </div>
              
              {/* Main Substation */}
              <div className="absolute bottom-8 right-8 w-12 h-8 bg-purple-200 rounded border-2 border-purple-300">
                <div className="text-xs text-center mt-1 font-medium text-purple-700">Grid</div>
              </div>
            </div>

            {/* Assets */}
            {assets.map((asset) => {
              const Icon = getAssetIcon(asset.type);
              const color = getAssetColor(asset.type, asset.status);
              
              // Position assets based on their location or generate positions
              const x = asset.location?.x || Math.random() * 300 + 20;
              const y = asset.location?.y || Math.random() * 300 + 20;
              
              return (
                <div
                  key={asset.id}
                  className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-110 ${color}`}
                  style={{ left: `${x}px`, top: `${y}px` }}
                  onClick={() => setSelectedAsset(asset)}
                  title={`${asset.name} - ${asset.type} - ${asset.status}`}
                >
                  <Icon className="w-4 h-4 text-white m-1" />
                  
                  {/* Status indicator */}
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white ${
                    asset.status === 'online' ? 'bg-green-500' : 
                    asset.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                </div>
              );
            })}

            {/* Energy Flow Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {assets.map((asset, index) => {
                if (asset.type === 'grid' || index === 0) return null;
                
                const x1 = asset.location?.x || Math.random() * 300 + 20;
                const y1 = asset.location?.y || Math.random() * 300 + 20;
                const x2 = assets[0]?.location?.x || Math.random() * 300 + 20;
                const y2 = assets[0]?.location?.y || Math.random() * 300 + 20;
                
                return (
                  <line
                    key={`flow-${asset.id}`}
                    x1={x1 + 16}
                    y1={y1 + 16}
                    x2={x2 + 16}
                    y2={y2 + 16}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;10"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </line>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Solar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Wind</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Battery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Grid</span>
            </div>
          </div>
        </div>

        {/* Asset Details Modal */}
        {selectedAsset && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white max-w-md w-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    {selectedAsset.name}
                  </CardTitle>
                  <button
                    onClick={() => setSelectedAsset(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getAssetColor(selectedAsset.type, selectedAsset.status)}`}>
                    {React.createElement(getAssetIcon(selectedAsset.type), { className: "w-5 h-5 text-white" })}
                  </div>
                  <div>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(selectedAsset.status)}`}>
                      {selectedAsset.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Type:</span>
                    <span className="ml-2 font-medium capitalize">{selectedAsset.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Capacity:</span>
                    <span className="ml-2 font-medium">{selectedAsset.capacity || 0} kW</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Current Output:</span>
                    <span className="ml-2 font-medium">{selectedAsset.current_output || 0} kW</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Efficiency:</span>
                    <span className="ml-2 font-medium">{selectedAsset.efficiency || 0}%</span>
                  </div>
                </div>
                
                {selectedAsset.location?.building && (
                  <div>
                    <span className="text-slate-600">Location:</span>
                    <span className="ml-2 font-medium">{selectedAsset.location.building}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
