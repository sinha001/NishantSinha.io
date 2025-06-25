"use client"

import { Link } from "react-router-dom"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, Users, Eye, Download, Mail, Globe, Clock, Calendar } from "lucide-react"

export default function AdminAnalytics() {
  const { analytics } = useAnalytics()

  const stats = [
    {
      title: "Total Page Views",
      value: analytics.pageViews.toLocaleString(),
      icon: Eye,
      color: "blue",
      change: "+12%",
      description: "Total number of page views",
    },
    {
      title: "Unique Visitors",
      value: analytics.uniqueVisitors.toLocaleString(),
      icon: Users,
      color: "green",
      change: "+8%",
      description: "Unique visitors to your portfolio",
    },
    {
      title: "Resume Downloads",
      value: analytics.resumeDownloads.toLocaleString(),
      icon: Download,
      color: "purple",
      change: "+15%",
      description: "Number of resume downloads",
    },
    {
      title: "Contact Submissions",
      value: analytics.contactSubmissions.toLocaleString(),
      icon: Mail,
      color: "orange",
      change: "+5%",
      description: "Contact form submissions",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-slate-600 hover:text-blue-600">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Analytics Dashboard</h1>
              <p className="text-slate-600">Detailed insights about your portfolio performance</p>
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
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-xs text-slate-500">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Top Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topPages.slice(0, 10).map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{page.page}</p>
                        <p className="text-sm text-slate-500">Page views</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-800">{page.views}</p>
                      <p className="text-sm text-slate-500">views</p>
                    </div>
                  </div>
                ))}
                {analytics.topPages.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-8">No page data available</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Visitors */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.recentVisitors.slice(0, 10).map((visitor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-sm font-medium text-slate-800">{visitor.page}</p>
                      </div>
                      <p className="text-xs text-slate-500">
                        {visitor.ip} • {visitor.timestamp.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400 truncate max-w-xs">{visitor.userAgent.split(" ")[0]}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  </div>
                ))}
                {analytics.recentVisitors.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-8">No recent visitors</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Traffic Sources */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Direct</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Search Engines</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Social Media</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Referrals</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Device Types */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Device Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Desktop</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Mobile</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tablet</span>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Avg. Session Duration</span>
                  <span className="text-sm font-medium">2m 45s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Bounce Rate</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Pages per Session</span>
                  <span className="text-sm font-medium">3.2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
