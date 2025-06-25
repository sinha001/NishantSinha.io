"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  resumeDownloads: number
  contactSubmissions: number
  topPages: { page: string; views: number }[]
  recentVisitors: { ip: string; page: string; timestamp: Date; userAgent: string }[]
}

interface AnalyticsContextType {
  analytics: AnalyticsData
  trackPageView: (page: string) => void
  trackResumeDownload: () => void
  trackContactSubmission: () => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    resumeDownloads: 0,
    contactSubmissions: 0,
    topPages: [],
    recentVisitors: [],
  })

  useEffect(() => {
    // Load analytics from localStorage
    const savedAnalytics = localStorage.getItem("portfolio_analytics")
    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics))
    }
  }, [])

  const saveAnalytics = (newAnalytics: AnalyticsData) => {
    setAnalytics(newAnalytics)
    localStorage.setItem("portfolio_analytics", JSON.stringify(newAnalytics))
  }

  const trackPageView = (page: string) => {
    const userAgent = navigator.userAgent
    const timestamp = new Date()
    const ip = "xxx.xxx.xxx.xxx" // In production, get real IP from backend

    setAnalytics((prev) => {
      const newAnalytics = {
        ...prev,
        pageViews: prev.pageViews + 1,
        uniqueVisitors: prev.uniqueVisitors + 1, // Simplified - in production, track unique IPs
        recentVisitors: [
          { ip, page, timestamp, userAgent },
          ...prev.recentVisitors.slice(0, 49), // Keep last 50 visitors
        ],
        topPages: updateTopPages(prev.topPages, page),
      }
      saveAnalytics(newAnalytics)
      return newAnalytics
    })
  }

  const trackResumeDownload = () => {
    setAnalytics((prev) => {
      const newAnalytics = {
        ...prev,
        resumeDownloads: prev.resumeDownloads + 1,
      }
      saveAnalytics(newAnalytics)
      return newAnalytics
    })
  }

  const trackContactSubmission = () => {
    setAnalytics((prev) => {
      const newAnalytics = {
        ...prev,
        contactSubmissions: prev.contactSubmissions + 1,
      }
      saveAnalytics(newAnalytics)
      return newAnalytics
    })
  }

  const updateTopPages = (topPages: { page: string; views: number }[], page: string) => {
    const existingPage = topPages.find((p) => p.page === page)
    if (existingPage) {
      return topPages.map((p) => (p.page === page ? { ...p, views: p.views + 1 } : p)).sort((a, b) => b.views - a.views)
    } else {
      return [...topPages, { page, views: 1 }].sort((a, b) => b.views - a.views).slice(0, 10)
    }
  }

  return (
    <AnalyticsContext.Provider
      value={{
        analytics,
        trackPageView,
        trackResumeDownload,
        trackContactSubmission,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
