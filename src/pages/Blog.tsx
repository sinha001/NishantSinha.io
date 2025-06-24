"use client"

import { useState, useEffect, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Clock, ExternalLink, User, Search, Filter, X } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

// Import data
import { personalInfo } from "@/data/personal"
import { sampleBlogPosts, type BlogPost } from "@/data/blogs"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")

  useEffect(() => {
    fetchMediumPosts()
  }, [])

  const fetchMediumPosts = async () => {
    try {
      setLoading(true)
      // Using RSS2JSON service to fetch Medium RSS feed
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${personalInfo.social.medium}/feed`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch posts")
      }

      const data = await response.json()

      if (data.status !== "ok") {
        throw new Error("RSS feed error")
      }

      const formattedPosts: BlogPost[] = data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description.replace(/<[^>]*>/g, "").substring(0, 200) + "...",
        content: item.content,
        categories: item.categories || [],
        author: item.author || personalInfo.name,
        thumbnail: item.thumbnail || extractImageFromContent(item.content),
      }))

      setPosts(formattedPosts)
    } catch (err) {
      setError("Failed to load blog posts. Please try again later.")
      console.error("Error fetching Medium posts:", err)

      // Fallback to sample posts for demo
      setPosts(sampleBlogPosts)
    } finally {
      setLoading(false)
    }
  }

  const extractImageFromContent = (content: string): string | undefined => {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/)
    return imgMatch ? imgMatch[1] : undefined
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, "").split(" ").length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>()
    posts.forEach((post) => {
      post.categories.forEach((category) => categories.add(category))
    })
    return Array.from(categories).sort()
  }, [posts])

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.categories.some((cat) => cat.toLowerCase().includes(query)),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.categories.includes(selectedCategory))
    }

    // Sort posts
    filtered.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime()
      const dateB = new Date(b.pubDate).getTime()
      return sortBy === "newest" ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [posts, searchQuery, selectedCategory, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSortBy("newest")
  }

  const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "all" || sortBy !== "newest"

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between p-6 max-w-7xl mx-auto"
      >
        <Link to="/" className="flex items-center gap-2 text-slate-800 hover:text-blue-600 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-2xl font-bold">{personalInfo.name}</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <a href="/#about" className="text-slate-600 hover:text-blue-600 transition-colors">
            About
          </a>
          <a href="/#projects" className="text-slate-600 hover:text-blue-600 transition-colors">
            Projects
          </a>
          <span className="text-blue-600 font-medium">Blog</span>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
            <span className="mr-2">📝</span>
            Technical Blog
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Sharing insights on full-stack development, automation, and modern web technologies
          </p>
        </motion.div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-300 focus:border-blue-500"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 border-slate-300 focus:border-blue-500">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Options */}
              <Select value={sortBy} onValueChange={(value: "newest" | "oldest") => setSortBy(value)}>
                <SelectTrigger className="w-full sm:w-32 border-slate-300 focus:border-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="text-slate-600 border-slate-300 hover:bg-slate-50"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery.trim() && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="bg-green-50 text-green-700">
                  Category: {selectedCategory}
                </Badge>
              )}
              {sortBy !== "newest" && (
                <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                  Sort: {sortBy === "oldest" ? "Oldest First" : "Newest First"}
                </Badge>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-slate-600">
            Showing {filteredAndSortedPosts.length} of {posts.length} articles
          </div>
        </motion.div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-center"
          >
            <p className="text-yellow-800">{error}</p>
            <p className="text-yellow-600 text-sm mt-2">Showing sample posts for demonstration</p>
          </motion.div>
        )}

        {filteredAndSortedPosts.length === 0 && !loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">No articles found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAndSortedPosts.map((post, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-white shadow-sm border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardContent className="p-0">
                    {post.thumbnail && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.thumbnail || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.pubDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {getReadingTime(post.content)}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-slate-800 mb-3 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">{post.description}</p>

                      {post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.categories.slice(0, 3).map((category, catIndex) => (
                            <Badge
                              key={catIndex}
                              variant="secondary"
                              className="bg-blue-50 text-blue-700 text-xs cursor-pointer hover:bg-blue-100"
                              onClick={() => setSelectedCategory(category)}
                            >
                              {category}
                            </Badge>
                          ))}
                          {post.categories.length > 3 && (
                            <Badge variant="secondary" className="bg-slate-50 text-slate-600 text-xs">
                              +{post.categories.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Read on Medium
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card className="bg-white shadow-lg border-slate-200 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Want to read more?</h3>
              <p className="text-slate-600 mb-6">
                Follow me on Medium for the latest articles on web development, automation, and technology insights.
              </p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <a href={personalInfo.social.medium} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Follow on Medium
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )};
