export interface Project {
    id: string
    title: string
    description: string
    tags: string[]
    link?: string
    color: string
    type: "public" | "enterprise"
  }
  
  export const projects: Project[] = [
    {
      id: "appifys",
      title: "Appifys",
      description: "Multi-page application website built with Vue.js, Bootstrap 5, integrating Contentful CMS and Email.js with SEO optimization.",
      tags: ["Vue.js", "Bootstrap", "CMS"],
      link: "https://www.appifys.com",
      color: "blue",
      type: "public"
    },
    {
      id: "automation-workflows",
      title: "Automation Workflows",
      description: "Designed and optimized automation workflows in Make.com, integrating with Monday.com and multiple APIs.",
      tags: ["Make.com", "APIs", "Automation"],
      color: "green",
      type: "enterprise"
    },
    {
      id: "crm-redesign",
      title: "CRM Redesign",
      description: "Led the redesign of CRM software resulting in 30% improvement in user satisfaction and performance.",
      tags: ["UI/UX", "CRM", "Performance"],
      color: "purple",
      type: "enterprise"
    }
  ]
  