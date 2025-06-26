"use client"

import { useEffect, useState } from "react"
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
  Clock,
} from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  company?: string
  role?: string
  subject: string
  message: string
  selectedTech: string[]
  timestamp: Date
  status: string
  priority: string
  read: boolean
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { analytics, trackPageView } = useAnalytics()
  const [recentContacts, setRecentContacts] = useState<Contact[]>([])

  useEffect(() => {
    trackPageView("/admin")

    // Load recent contacts from localStorage
    const contacts = JSON.parse(localStorage.getItem("portfolio_contacts") || "[]")
    setRecentContacts(contacts.slice(0, 5)) // Show only 5 most recent
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSubjectLabel = (subject: string) => {
    const labels: { [key: string]: string } = {
      "job-opportunity": "Job Opportunity",
      "freelance-project": "Freelance Project",
      collaboration: "Collaboration",
      consultation: "Consultation",
      speaking: "Speaking Engagement",
      "urgent-inquiry": "Urgent Inquiry",
      other: "Other",
    }
    return labels[subject] || subject
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo2.png" alt="Nishant Sinha" className="w-15 h-20 rounded-lg object-contain" />
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-slate-600">Welcome back, {user?.name}</p>
              </div>
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

        {/* Quick Actions & Recent Messages */}
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
                  View Contact Messages ({recentContacts.filter((c) => !c.read).length} unread)
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
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 rounded-lg border transition-all ${
                      !contact.read ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-slate-800">{contact.name}</h4>
                          {!contact.read && (
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{contact.email}</p>
                        {contact.company && <p className="text-xs text-slate-500">{contact.company}</p>}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge className={`text-xs ${getPriorityColor(contact.priority)}`}>{contact.priority}</Badge>
                        <div className="flex items-center text-xs text-slate-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(contact.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {getSubjectLabel(contact.subject)}
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-700 line-clamp-2">{contact.message}</p>

                    {contact.selectedTech && contact.selectedTech.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {contact.selectedTech.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {contact.selectedTech.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{contact.selectedTech.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {recentContacts.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-sm text-slate-500">No messages yet</p>
                  </div>
                )}
              </div>
              {recentContacts.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <Link to="/admin/contacts">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Messages
                    </Button>
                  </Link>
                </div>
              )}
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
