import { PortfolioProvider } from "@/contexts/PortfolioContext"
import { AnalyticsProvider } from "@/contexts/AnalyticsContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Blog from "@/pages/Blog"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminPortfolio from "./pages/admin/AdminPortfolio"
import AdminContacts from "./pages/admin/AdminContacts"
import AdminAnalytics from "./pages/admin/AdminAnalytics"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <PortfolioProvider>
      <AnalyticsProvider>
        <AuthProvider>
          <Router>
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
            </Routes>
          </Router>
        </AuthProvider>
      </AnalyticsProvider>
    </PortfolioProvider>
  )
}

export default App
