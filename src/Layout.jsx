import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils/index.js";
import { 
  LayoutDashboard, 
  Map, 
  TrendingUp, 
  Settings, 
  FileText,
  Zap,
  TestTube
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar.jsx";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Digital Twin",
    url: createPageUrl("DigitalTwin"),
    icon: Map,
  },
  {
    title: "Analytics",
    url: createPageUrl("Analytics"),
    icon: TrendingUp,
  },
  {
    title: "Simulator",
    url: createPageUrl("Simulator"),
    icon: TestTube,
  },
  {
    title: "Reports",
    url: createPageUrl("Reports"),
    icon: FileText,
  },
  {
    title: "Settings",
    url: createPageUrl("Settings"),
    icon: Settings,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-slate-200 bg-white">
          <SidebarHeader className="border-b border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">VPP Nexus</h2>
                <p className="text-xs text-slate-600">Energy Management</p>
              </div>
              <div className="ml-auto" />
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-slate-600 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`mb-1 rounded-lg transition-colors duration-200 ${
                          location.pathname === item.url 
                            ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="bg-white border-b border-slate-200 px-4 py-3 md:hidden flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg" />
              <h1 className="text-lg font-semibold text-slate-900">VPP Nexus</h1>
            </div>
            <div />
          </header>

          <div className="flex-1 overflow-auto bg-white text-slate-900">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
