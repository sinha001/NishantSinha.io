"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { useAnalytics } from "@/contexts/AnalyticsContext"

export function ContactForm() {
  const { trackContactSubmission } = useAnalytics()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    subject: "",
    message: "",
    selectedTech: [] as string[],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTech: prev.selectedTech.includes(tech)
        ? prev.selectedTech.filter((t) => t !== tech)
        : [...prev.selectedTech, tech],
    }))
  }

  const sendToMakeWebhook = async (data: any) => {
    // Replace with your actual Make.com webhook URL
    const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/4cr1vqqm3fmasdtqoevvyygned2gjhvz"

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || "Not provided",
          role: data.role || "Not specified",
          subject: data.subject,
          message: data.message,
          selectedTech: data.selectedTech.join(", ") || "None selected",
          timestamp: new Date().toISOString(),
          source: "Portfolio Website",
          priority: data.subject.includes("urgent") ? "high" : "medium",
          phone: "+91-9155943999", // Your contact number for reference
          portfolioUrl: window.location.origin,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Make.com webhook success:", result)
      return { success: true }
    } catch (error) {
      console.error("Make.com webhook error:", error)
      throw new Error("Failed to send email notification")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error("Please fill in all required fields.")
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address.")
      }

      // Send to Make.com webhook for email automation
      console.log("Sending to Make.com webhook...")
      await sendToMakeWebhook(formData)
      console.log("Email sent successfully via Make.com")

      // Save contact to localStorage for admin panel
      const existingContacts = JSON.parse(localStorage.getItem("portfolio_contacts") || "[]")
      const newContact = {
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date(),
        status: "new",
        priority: formData.subject.includes("urgent") || formData.subject.includes("Urgent") ? "high" : "medium",
        read: false,
      }
      localStorage.setItem("portfolio_contacts", JSON.stringify([newContact, ...existingContacts]))

      // Track analytics
      trackContactSubmission()

      setSubmitStatus("success")
      setMessage("Thank you for your message! I'll get back to you within 24-48 hours.")

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        subject: "",
        message: "",
        selectedTech: [],
      })
    } catch (error) {
      console.error("Contact form error:", error)
      setSubmitStatus("error")
      setMessage(error instanceof Error ? error.message : "Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const techOptions = [
    "Vue.js",
    "React.js",
    "Node.js",
    "Java",
    "Python",
    "MongoDB",
    "MySQL",
    "Make.com",
    "API Integration",
    "Automation",
    "Full-Stack",
    "WordPress",
  ]

  return (
    <Card className="bg-white shadow-lg border-slate-200 h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-slate-800">Send Me a Message</CardTitle>
        <p className="text-slate-600">
          Interested in working together? Fill out the form below and I'll respond as soon as possible.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your full name"
                required
                className="border-slate-300 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@company.com"
                required
                className="border-slate-300 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Your company name"
                className="border-slate-300 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger className="border-slate-300 focus:border-blue-500">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="hiring-manager">Hiring Manager</SelectItem>
                  <SelectItem value="cto">CTO/Tech Lead</SelectItem>
                  <SelectItem value="founder">Founder/CEO</SelectItem>
                  <SelectItem value="developer">Fellow Developer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)} required>
              <SelectTrigger className="border-slate-300 focus:border-blue-500">
                <SelectValue placeholder="What's this about?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="job-opportunity">Job Opportunity</SelectItem>
                <SelectItem value="freelance-project">Freelance Project</SelectItem>
                <SelectItem value="collaboration">Collaboration</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="speaking">Speaking Engagement</SelectItem>
                <SelectItem value="urgent-inquiry">Urgent Inquiry</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell me about the opportunity, project requirements, timeline, or any other details..."
              rows={5}
              required
              className="border-slate-300 focus:border-blue-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Interested Technologies (Optional)</Label>
            <div className="flex flex-wrap gap-2">
              {techOptions.map((tech) => (
                <Badge
                  key={tech}
                  variant={formData.selectedTech.includes(tech) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    formData.selectedTech.includes(tech)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "hover:bg-blue-50 hover:border-blue-300"
                  } text-xs`}
                  onClick={() => toggleTech(tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-slate-500">Click on technologies you're interested in discussing (optional)</p>
          </div>

          {submitStatus !== "idle" && (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${
                submitStatus === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {submitStatus === "success" ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <p className="text-sm">{message}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          <p className="text-xs text-slate-500 text-center">
            I typically respond within 24-48 hours. For urgent matters, feel free to call me directly at +91-9155943999.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
