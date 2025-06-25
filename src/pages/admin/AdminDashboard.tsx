"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  Download,
  Mail,
  Eye,
  Settings,
  LogOut,
  FileText,
  MessageSquare,
  TrendingUp,
} from "lucide-react"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { analytics, trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView("/admin")
  }, [])

  const stats = [
    {
      title: "Total Page Views",
      value: analytics.pageViews.toLocaleString(),
      icon: Eye,
      color: "blue",
      change: "+12%",
    },
    {
      title: "Unique Visitors",
      value: analytics.uniqueVisitors.toLocaleString(),
      icon: Users,
      color: "green",
      change: "+8%",
    },
    {
      title: "Resume Downloads",
      value: analytics.resumeDownloads.toLocaleString(),
      icon: Download,
      color: "purple",
      change: "+15%",
    },
    {
      title: "Contact Submissions",
      value: analytics.contactSubmissions.toLocaleString(),
      icon: Mail,
      color: "orange",
      change: "+5%",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
              <p className="text-slate-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Online
              </Badge>
              <Button variant="outline" onClick={logout} className="text-slate-600 border-slate-300 hover:bg-slate-50">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Card key={stat.title} className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">{stat.change}</span>
                        <span className="text-sm text-slate-500 ml-1">vs last month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/admin/portfolio">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Manage Portfolio Content
                </Button>
              </Link>
              <Link to="/admin/contacts">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Contact Messages
                </Button>
              </Link>
              <Link to="/admin/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Detailed Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.recentVisitors.slice(0, 5).map((visitor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">Page Visit: {visitor.page}</p>
                      <p className="text-xs text-slate-500">
                        {visitor.timestamp.toLocaleString()} • {visitor.ip}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  </div>
                ))}
                {analytics.recentVisitors.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topPages.slice(0, 5).map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{page.page}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{page.views} views</Badge>
                </div>
              ))}
              {analytics.topPages.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">No page data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
