export interface Education {
    id: string
    degree: string
    institution: string
    field: string
    period: string
    description: string
    subjects: string[]
  }
  
  export interface Certification {
    id: string
    name: string
    issuer: string
    link?: string
  }
  
  export const education: Education[] = [
    {
      id: "galgotias-university",
      degree: "Bachelor's of Technology",
      institution: "Galgotias University",
      field: "Computer Science and Engineering",
      period: "July 2018 - May 2022",
      description: "Completed Bachelor's degree in Computer Science and Engineering with focus on software development, data structures, algorithms, and modern web technologies.",
      subjects: ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "Software Engineering"]
    }
  ]
  
  export const certifications: Certification[] = [
    {
      id: "aws-cloud-architecting",
      name: "AWS Academy Cloud Architecting",
      issuer: "AWS Academy",
      link: "#"
    }
  ]
  