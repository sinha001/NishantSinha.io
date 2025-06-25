"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Mail, Phone, Building, Calendar, Trash2, Reply, Star } from "lucide-react"

interface ContactSubmission {
  id: string
  name: string
  email: string
  company?: string
  role?: string
  subject: string
  message: string
  timestamp: Date
  status: "new" | "read" | "replied"
  priority: "low" | "medium" | "high"
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "read" | "replied">("all")
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    // Load contacts from localStorage (in production, fetch from API)
    const savedContacts = localStorage.getItem("portfolio_contacts")
    if (savedContacts) {
      const parsed = JSON.parse(savedContacts)
      setContacts(
        parsed.map((c: any) => ({
          ...c,
          timestamp: new Date(c.timestamp),
        })),
      )
    } else {
      // Sample data for demo
      const sampleContacts: ContactSubmission[] = [
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@techcorp.com",
          company: "TechCorp Inc.",
          role: "hiring-manager",
          subject: "job-opportunity",
          message:
            "Hi Nishant, we have an exciting full-stack developer position that would be perfect for your skills. Would you be interested in discussing this opportunity?",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          status: "new",
          priority: "high",
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah@startup.io",
          company: "StartupIO",
          role: "founder",
          subject: "freelance-project",
          message:
            "We need help with automation workflows for our business processes. Your Make.com expertise would be invaluable.",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          status: "read",
          priority: "medium",
        },
        {
          id: "3",
          name: "Mike Chen",
          email: "mike.chen@devconf.com",
          company: "DevConf",
          role: "other",
          subject: "speaking",
          message:
            "Would you be interested in speaking at our upcoming developer conference about automation and full-stack development?",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          status: "replied",
          priority: "low",
        },
      ]
      setContacts(sampleContacts)
    }
  }, [])

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const markAsRead = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) => (contact.id === contactId ? { ...contact, status: "read" as const } : contact)),
    )
  }

  const deleteContact = (contactId: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId))
    if (selectedContact?.id === contactId) {
      setSelectedContact(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-green-50 text-green-700 border-green-200"
      case "read":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "replied":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-slate-600 hover:text-blue-600">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Contact Messages</h1>
                <p className="text-slate-600">{filteredContacts.length} messages</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {contacts.filter((c) => c.status === "new").length} New
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact List */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search contacts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    <option value="all">All</option>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => {
                        setSelectedContact(contact)
                        if (contact.status === "new") {
                          markAsRead(contact.id)
                        }
                      }}
                      className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${
                        selectedContact?.id === contact.id ? "bg-blue-50 border-blue-200" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-slate-800">{contact.name}</h3>
                            {contact.status === "new" && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-slate-600">{contact.email}</p>
                          {contact.company && <p className="text-xs text-slate-500">{contact.company}</p>}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant="outline" className={getStatusColor(contact.status)}>
                            {contact.status}
                          </Badge>
                          <Star className={`h-3 w-3 ${getPriorityColor(contact.priority)}`} />
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{contact.message}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        {contact.timestamp.toLocaleDateString()} at {contact.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                  {filteredContacts.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                      <Mail className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                      <p>No messages found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            {selectedContact ? (
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">{selectedContact.name}</h2>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {selectedContact.email}
                        </div>
                        {selectedContact.company && (
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {selectedContact.company}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {selectedContact.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(selectedContact.status)}>
                        {selectedContact.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteContact(selectedContact.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Subject</h3>
                    <Badge variant="secondary">{selectedContact.subject.replace("-", " ")}</Badge>
                  </div>

                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Message</h3>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-slate-700 leading-relaxed">{selectedContact.message}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Reply className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                    <Button variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white shadow-sm">
                <CardContent className="p-12 text-center">
                  <Mail className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-800 mb-2">Select a message</h3>
                  <p className="text-slate-600">Choose a contact from the list to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
