export interface ContactOption {
    id: string
    label: string
    value: string
    icon: string
    color: string
  }
  
  export interface TechInterest {
    id: string
    name: string
  }
  
  export const contactOptions: ContactOption[] = [
    {
      id: "phone",
      label: "Phone",
      value: "+91-9155943999",
      icon: "phone",
      color: "blue"
    },
    {
      id: "email",
      label: "Email",
      value: "sinhasonu004@gmail.com",
      icon: "mail",
      color: "green"
    },
    {
      id: "location",
      label: "Location",
      value: "Muzaffarpur, Bihar",
      icon: "map-pin",
      color: "purple"
    }
  ]
  
  export const roleOptions = [
    { value: "recruiter", label: "Recruiter" },
    { value: "hiring-manager", label: "Hiring Manager" },
    { value: "cto", label: "CTO/Tech Lead" },
    { value: "founder", label: "Founder/CEO" },
    { value: "developer", label: "Fellow Developer" },
    { value: "other", label: "Other" }
  ]
  
  export const subjectOptions = [
    { value: "job-opportunity", label: "Job Opportunity" },
    { value: "freelance-project", label: "Freelance Project" },
    { value: "collaboration", label: "Collaboration" },
    { value: "consultation", label: "Consultation" },
    { value: "speaking", label: "Speaking Engagement" },
    { value: "other", label: "Other" }
  ]
  
  export const techInterests: TechInterest[] = [
    { id: "vuejs", name: "Vue.js" },
    { id: "reactjs", name: "React.js" },
    { id: "nodejs", name: "Node.js" },
    { id: "java", name: "Java" },
    { id: "python", name: "Python" },
    { id: "mongodb", name: "MongoDB" },
    { id: "mysql", name: "MySQL" },
    { id: "makecom", name: "Make.com" },
    { id: "api-integration", name: "API Integration" },
    { id: "automation", name: "Automation" },
    { id: "full-stack", name: "Full-Stack" },
    { id: "wordpress", name: "WordPress" }
  ]
  