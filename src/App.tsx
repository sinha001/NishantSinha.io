import { PortfolioProvider } from "@/contexts/PortfolioContext"
import { AnalyticsProvider } from "@/contexts/AnalyticsContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Suspense, lazy } from "react"
import Home from "@/pages/Home"

// Lazy load admin components for better performance
const Blog = lazy(() => import("@/pages/Blog"))
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"))
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"))
const AdminPortfolio = lazy(() => import("@/pages/admin/AdminPortfolio"))
const AdminContacts = lazy(() => import("@/pages/admin/AdminContacts"))
const AdminAnalytics = lazy(() => import("@/pages/admin/AdminAnalytics"))
const ProtectedRoute = lazy(() => import("@/components/ProtectedRoute"))

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-slate-600">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <PortfolioProvider>
      <AnalyticsProvider>
        <AuthProvider>
          <Router>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/portfolio"
                  element={
                    <ProtectedRoute>
                      <AdminPortfolio />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/contacts"
                  element={
                    <ProtectedRoute>
                      <AdminContacts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/analytics"
                  element={
                    <ProtectedRoute>
                      <AdminAnalytics />
                    </ProtectedRoute>
                  }
                />
                {/* Catch all route - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Router>
        </AuthProvider>
      </AnalyticsProvider>
    </PortfolioProvider>
  )
}

export default App
