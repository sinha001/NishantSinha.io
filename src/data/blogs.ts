export interface BlogPost {
    title: string
    link: string
    pubDate: string
    description: string
    content: string
    categories: string[]
    author: string
    thumbnail?: string
  }
  
  export const sampleBlogPosts: BlogPost[] = [
    {
      title: "Building Scalable Web Applications with Vue.js and Node.js",
      link: "https://medium.com/@your-username/building-scalable-web-applications",
      pubDate: "2024-01-15T10:00:00Z",
      description: "Learn how to create robust and scalable web applications using Vue.js for the frontend and Node.js for the backend. This comprehensive guide covers best practices, architecture patterns, and performance optimization techniques.",
      content: "Full content here...",
      categories: ["Vue.js", "Node.js", "Web Development", "Full-Stack"],
      author: "Nishant Sinha",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    },
    {
      title: "Automation Workflows: Streamlining Business Processes with Make.com",
      link: "https://medium.com/@your-username/automation-workflows-make",
      pubDate: "2024-01-10T14:30:00Z",
      description: "Discover how to leverage Make.com to create powerful automation workflows that can transform your business operations. From API integrations to complex multi-step processes, learn the strategies that can save hours of manual work.",
      content: "Full content here...",
      categories: ["Automation", "Make.com", "Business Process", "API Integration"],
      author: "Nishant Sinha",
      thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=200&fit=crop",
    },
    {
      title: "Full-Stack Development: From Concept to Deployment",
      link: "https://medium.com/@your-username/fullstack-development-guide",
      pubDate: "2024-01-05T09:15:00Z",
      description: "A complete guide to full-stack development covering everything from initial planning and design to deployment and maintenance. Learn about modern development practices, tools, and technologies that every developer should know.",
      content: "Full content here...",
      categories: ["Full-Stack", "Development", "Deployment", "Best Practices"],
      author: "Nishant Sinha",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    },
    {
      title: "JavaScript ES6+ Features Every Developer Should Know",
      link: "https://medium.com/@your-username/javascript-es6-features",
      pubDate: "2023-12-28T16:45:00Z",
      description: "Explore the most important ES6+ features that have revolutionized JavaScript development. From arrow functions to async/await, destructuring to modules, master these concepts to write cleaner, more efficient code.",
      content: "Full content here...",
      categories: ["JavaScript", "ES6", "Programming", "Web Development"],
      author: "Nishant Sinha",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop",
    },
    {
      title: "Database Design Patterns for Modern Applications",
      link: "https://medium.com/@your-username/database-design-patterns",
      pubDate: "2023-12-20T11:20:00Z",
      description: "Learn essential database design patterns and best practices for building scalable applications. Covers SQL and NoSQL approaches, normalization, indexing strategies, and performance optimization techniques.",
      content: "Full content here...",
      categories: ["Database", "SQL", "MongoDB", "Performance"],
      author: "Nishant Sinha",
      thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop",
    },
    {
      title: "API Integration Best Practices and Common Pitfalls",
      link: "https://medium.com/@your-username/api-integration-best-practices",
      pubDate: "2023-12-15T13:10:00Z",
      description: "Master the art of API integration with this comprehensive guide. Learn about authentication, error handling, rate limiting, caching strategies, and how to build robust integrations that scale.",
      content: "Full content here...",
      categories: ["API", "Integration", "REST", "Best Practices"],
      author: "Nishant Sinha",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
    }
  ]
  