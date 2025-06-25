"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { personalInfo as defaultPersonalInfo } from "@/data/personal"
import { experiences as defaultExperiences } from "@/data/experience"
import { projects as defaultProjects } from "@/data/projects"
import { skillCategories as defaultSkillCategories } from "@/data/skills"
import { education as defaultEducation, certifications as defaultCertifications } from "@/data/education"
import { repositories as defaultRepositories } from "@/data/github"
import { sampleBlogPosts as defaultBlogPosts } from "@/data/blogs"

interface PortfolioContextType {
  personalInfo: typeof defaultPersonalInfo
  experiences: typeof defaultExperiences
  projects: typeof defaultProjects
  skillCategories: typeof defaultSkillCategories
  education: typeof defaultEducation
  certifications: typeof defaultCertifications
  repositories: typeof defaultRepositories
  blogPosts: typeof defaultBlogPosts
  resumeFile: string | null
  updatePersonalInfo: (data: typeof defaultPersonalInfo) => void
  updateExperiences: (data: typeof defaultExperiences) => void
  updateProjects: (data: typeof defaultProjects) => void
  updateSkillCategories: (data: typeof defaultSkillCategories) => void
  updateEducation: (data: typeof defaultEducation) => void
  updateCertifications: (data: typeof defaultCertifications) => void
  updateRepositories: (data: typeof defaultRepositories) => void
  updateBlogPosts: (data: typeof defaultBlogPosts) => void
  updateResumeFile: (file: string) => void
  saveAllData: () => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo)
  const [experiences, setExperiences] = useState(defaultExperiences)
  const [projects, setProjects] = useState(defaultProjects)
  const [skillCategories, setSkillCategories] = useState(defaultSkillCategories)
  const [education, setEducation] = useState(defaultEducation)
  const [certifications, setCertifications] = useState(defaultCertifications)
  const [repositories, setRepositories] = useState(defaultRepositories)
  const [blogPosts, setBlogPosts] = useState(defaultBlogPosts)
  const [resumeFile, setResumeFile] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    try {
      const savedPersonalInfo = localStorage.getItem("portfolio_personal_info")
      const savedExperiences = localStorage.getItem("portfolio_experiences")
      const savedProjects = localStorage.getItem("portfolio_projects")
      const savedSkillCategories = localStorage.getItem("portfolio_skill_categories")
      const savedEducation = localStorage.getItem("portfolio_education")
      const savedCertifications = localStorage.getItem("portfolio_certifications")
      const savedRepositories = localStorage.getItem("portfolio_github_repos")
      const savedBlogPosts = localStorage.getItem("portfolio_blog_posts")
      const savedResumeFile = localStorage.getItem("portfolio_resume_file")

      if (savedPersonalInfo) setPersonalInfo(JSON.parse(savedPersonalInfo))
      if (savedExperiences) setExperiences(JSON.parse(savedExperiences))
      if (savedProjects) setProjects(JSON.parse(savedProjects))
      if (savedSkillCategories) setSkillCategories(JSON.parse(savedSkillCategories))
      if (savedEducation) setEducation(JSON.parse(savedEducation))
      if (savedCertifications) setCertifications(JSON.parse(savedCertifications))
      if (savedRepositories) setRepositories(JSON.parse(savedRepositories))
      if (savedBlogPosts) setBlogPosts(JSON.parse(savedBlogPosts))
      if (savedResumeFile) setResumeFile(savedResumeFile)
    } catch (error) {
      console.error("Error loading portfolio data:", error)
    }
  }

  const updatePersonalInfo = (data: typeof defaultPersonalInfo) => {
    setPersonalInfo(data)
    localStorage.setItem("portfolio_personal_info", JSON.stringify(data))
  }

  const updateExperiences = (data: typeof defaultExperiences) => {
    setExperiences(data)
    localStorage.setItem("portfolio_experiences", JSON.stringify(data))
  }

  const updateProjects = (data: typeof defaultProjects) => {
    setProjects(data)
    localStorage.setItem("portfolio_projects", JSON.stringify(data))
  }

  const updateSkillCategories = (data: typeof defaultSkillCategories) => {
    setSkillCategories(data)
    localStorage.setItem("portfolio_skill_categories", JSON.stringify(data))
  }

  const updateEducation = (data: typeof defaultEducation) => {
    setEducation(data)
    localStorage.setItem("portfolio_education", JSON.stringify(data))
  }

  const updateCertifications = (data: typeof defaultCertifications) => {
    setCertifications(data)
    localStorage.setItem("portfolio_certifications", JSON.stringify(data))
  }

  const updateRepositories = (data: typeof defaultRepositories) => {
    setRepositories(data)
    localStorage.setItem("portfolio_github_repos", JSON.stringify(data))
  }

  const updateBlogPosts = (data: typeof defaultBlogPosts) => {
    setBlogPosts(data)
    localStorage.setItem("portfolio_blog_posts", JSON.stringify(data))
  }

  const updateResumeFile = (file: string) => {
    setResumeFile(file)
    localStorage.setItem("portfolio_resume_file", file)
  }

  const saveAllData = async () => {
    try {
      localStorage.setItem("portfolio_personal_info", JSON.stringify(personalInfo))
      localStorage.setItem("portfolio_experiences", JSON.stringify(experiences))
      localStorage.setItem("portfolio_projects", JSON.stringify(projects))
      localStorage.setItem("portfolio_skill_categories", JSON.stringify(skillCategories))
      localStorage.setItem("portfolio_education", JSON.stringify(education))
      localStorage.setItem("portfolio_certifications", JSON.stringify(certifications))
      localStorage.setItem("portfolio_github_repos", JSON.stringify(repositories))
      localStorage.setItem("portfolio_blog_posts", JSON.stringify(blogPosts))
      if (resumeFile) {
        localStorage.setItem("portfolio_resume_file", resumeFile)
      }
    } catch (error) {
      console.error("Error saving portfolio data:", error)
      throw error
    }
  }

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        experiences,
        projects,
        skillCategories,
        education,
        certifications,
        repositories,
        blogPosts,
        resumeFile,
        updatePersonalInfo,
        updateExperiences,
        updateProjects,
        updateSkillCategories,
        updateEducation,
        updateCertifications,
        updateRepositories,
        updateBlogPosts,
        updateResumeFile,
        saveAllData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}
