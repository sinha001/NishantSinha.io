"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Calendar, User, ExternalLink, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { usePortfolio } from "@/contexts/PortfolioContext"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function Blog() {
  const { blogPosts } = usePortfolio()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Get all unique categories
  const allCategories = ["All", ...new Set(blogPosts.flatMap((post) => post.categories))]

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.categories.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Blog</h1>
                <p className="text-slate-600">Thoughts, tutorials, and insights</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : "bg-white/80 backdrop-blur-sm"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="bg-white/80 backdrop-blur-sm shadow-sm border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  {post.thumbnail && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.thumbnail || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.pubDate).toLocaleDateString()}
                      <User className="h-4 w-4 ml-2" />
                      {post.author}
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-800 line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-slate-600 mb-4 line-clamp-3 flex-1">{post.description}</p>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {post.categories.slice(0, 3).map((category) => (
                          <Badge key={category} variant="secondary" className="bg-blue-50 text-blue-700 text-xs">
                            {category}
                          </Badge>
                        ))}
                        {post.categories.length > 3 && (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-xs">
                            +{post.categories.length - 3}
                          </Badge>
                        )}
                      </div>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Read More
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div variants={fadeInUp} className="col-span-full text-center py-12">
              <div className="text-slate-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No posts found</h3>
              <p className="text-slate-500">Try adjusting your search terms or category filter.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="bg-white/80 backdrop-blur-sm shadow-sm border-slate-200 p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Stay Updated</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Follow me on Medium for the latest articles on web development, automation, and technology insights.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open("https://medium.com/@your-medium-username", "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Follow on Medium
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
