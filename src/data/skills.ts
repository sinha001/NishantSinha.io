export interface SkillCategory {
    id: string
    name: string
    skills: string[]
  }
  
  export const skillCategories: SkillCategory[] = [
    {
      id: "languages",
      name: "Languages",
      skills: ["Java", "JavaScript", "HTML5", "CSS3", "SQL", "Python"]
    },
    {
      id: "frameworks",
      name: "Frameworks",
      skills: ["Vue.js", "React.js", "Node.js", "Express.js", "Bootstrap 5"]
    },
    {
      id: "technologies",
      name: "Technologies",
      skills: ["Git", "MySQL", "MongoDB", "REST API", "Make.com", "WordPress"]
    },
    {
      id: "tools",
      name: "Tools",
      skills: ["Figma", "Canva", "Monday.com", "Alteryx", "Webhooks"]
    }
  ]
  