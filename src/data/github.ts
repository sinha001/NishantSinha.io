export interface Repository {
    id: string
    name: string
    description: string
    stars: number
    forks: number
    language: string
    color: string
    url?: string
  }
  
  export const repositories: Repository[] = [
    {
      id: "portfolio-website",
      name: "portfolio-website",
      description: "Personal portfolio website built with modern web technologies",
      stars: 12,
      forks: 3,
      language: "Vue.js",
      color: "blue",
      url: "https://github.com/sinha001/portfolio-website"
    },
    {
      id: "automation-scripts",
      name: "automation-scripts",
      description: "Collection of automation scripts for various business processes",
      stars: 8,
      forks: 2,
      language: "JavaScript",
      color: "green",
      url: "https://github.com/sinha001/automation-scripts"
    },
    {
      id: "api-integrations",
      name: "api-integrations",
      description: "RESTful API integration examples and best practices",
      stars: 15,
      forks: 5,
      language: "Node.js",
      color: "orange",
      url: "https://github.com/sinha001/api-integrations"
    }
  ]
  