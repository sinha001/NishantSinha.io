"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
  Github,
  Star,
  GitFork,
  Award,
} from "lucide-react"
import { usePortfolio } from "@/contexts/PortfolioContext"

// Import types
import type { Experience } from "@/data/experience"
import type { Project } from "@/data/projects"
import type { SkillCategory } from "@/data/skills"
import type { Education, Certification } from "@/data/education"
import type { Repository } from "@/data/github"
import type { BlogPost } from "@/data/blogs"

export default function AdminPortfolio() {
  const {
    personalInfo,
    experiences,
    projects,
    skillCategories,
    education,
    certifications,
    resumeFile,
    updatePersonalInfo,
    updateExperiences,
    updateProjects,
    updateSkillCategories,
    updateEducation,
    updateCertifications,
    updateResumeFile,
    saveAllData,
  } = usePortfolio()

  const [activeTab, setActiveTab] = useState("personal")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  // Local state for editing
  const [localPersonalInfo, setLocalPersonalInfo] = useState(personalInfo)
  const [localExperiences, setLocalExperiences] = useState(experiences)
  const [localProjects, setLocalProjects] = useState(projects)
  const [localSkillCategories, setLocalSkillCategories] = useState(skillCategories)
  const [localEducation, setLocalEducation] = useState(education)
  const [localCertifications, setLocalCertifications] = useState(certifications)


  const handleSave = async () => {
    setSaveStatus("saving")
    try {
      updatePersonalInfo(localPersonalInfo)
      updateExperiences(localExperiences)
      updateProjects(localProjects)
      updateSkillCategories(localSkillCategories)
      updateEducation(localEducation)
      updateCertifications(localCertifications)

      
      await saveAllData()
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    } catch (error) {
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }
  }

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        updateResumeFile(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Tech Stack functions
  const addTechStack = (tech: string) => {
    if (tech && !localPersonalInfo.techStack.includes(tech)) {
      setLocalPersonalInfo({
        ...localPersonalInfo,
        techStack: [...localPersonalInfo.techStack, tech],
      })
    }
  }

  const removeTechStack = (index: number) => {
    const newTechStack = localPersonalInfo.techStack.filter((_, i) => i !== index)
    setLocalPersonalInfo({ ...localPersonalInfo, techStack: newTechStack })
  }

  // Experience functions
  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      title: "New Position",
      company: "Company Name",
      location: "Location",
      period: "Start - End",
      current: false,
      color: "blue",
      description: ["Add your job description here"],
    }
    setLocalExperiences([...localExperiences, newExperience])
  }

  const removeExperience = (id: string) => {
    setLocalExperiences(localExperiences.filter((exp) => exp.id !== id))
  }

  const updateExperience = (id: string, field: string, value: any) => {
    setLocalExperiences(localExperiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  // Education functions
  const addEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      degree: "New Degree",
      institution: "Institution Name",
      field: "Field of Study",
      period: "Start - End",
      description: "Add description here",
      subjects: ["Subject 1", "Subject 2"],
    }
    setLocalEducation([...localEducation, newEducation])
  }

  const removeEducation = (id: string) => {
    setLocalEducation(localEducation.filter((edu) => edu.id !== id))
  }

  const updateLocalEducation = (id: string, field: string, value: any) => {
    setLocalEducation(localEducation.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  // Certification functions
  const addCertification = () => {
    const newCertification: Certification = {
      id: `cert-${Date.now()}`,
      name: "New Certification",
      issuer: "Issuer Name",
      link: "",
    }
    setLocalCertifications([...localCertifications, newCertification])
  }

  const removeCertification = (id: string) => {
    setLocalCertifications(localCertifications.filter((cert) => cert.id !== id))
  }

  const updateCertification = (id: string, field: string, value: any) => {
    setLocalCertifications(localCertifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)))
  }

  // Project functions
  const addProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: "New Project",
      description: "Project description",
      tags: ["Tag1", "Tag2"],
      color: "blue",
      type: "public",
      link: "",
    }
    setLocalProjects([...localProjects, newProject])
  }

  const removeProject = (id: string) => {
    setLocalProjects(localProjects.filter((proj) => proj.id !== id))
  }

  const updateProject = (id: string, field: string, value: any) => {
    setLocalProjects(localProjects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)))
  }

  // Skill Category functions
  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: `skill-${Date.now()}`,
      name: "New Category",
      skills: ["Skill 1", "Skill 2"],
    }
    setLocalSkillCategories([...localSkillCategories, newCategory])
  }

  const removeSkillCategory = (id: string) => {
    setLocalSkillCategories(localSkillCategories.filter((cat) => cat.id !== id))
  }

  const updateSkillCategory = (id: string, field: string, value: any) => {
    setLocalSkillCategories(localSkillCategories.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat)))
  }

  const addSkillToCategory = (categoryId: string, skill: string) => {
    if (skill.trim()) {
      setLocalSkillCategories(
        localSkillCategories.map((cat) =>
          cat.id === categoryId ? { ...cat, skills: [...cat.skills, skill.trim()] } : cat,
        ),
      )
    }
  }

  const removeSkillFromCategory = (categoryId: string, skillIndex: number) => {
    setLocalSkillCategories(
      localSkillCategories.map((cat) =>
        cat.id === categoryId ? { ...cat, skills: cat.skills.filter((_, i) => i !== skillIndex) } : cat,
      ),
    )
  }

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "resume", label: "Resume" },
  ]

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
                <h1 className="text-2xl font-bold text-slate-800">Portfolio Management</h1>
                <p className="text-slate-600">Update your portfolio content</p>
              </div>
            </div>
            <Button onClick={handleSave} disabled={saveStatus === "saving"} className="bg-blue-600 hover:bg-blue-700">
              {saveStatus === "saving" ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : saveStatus === "saved" ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Saved
                </>
              ) : saveStatus === "error" ? (
                <>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Error
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Personal Info Tab */}
        {activeTab === "personal" && (
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={localPersonalInfo.name}
                    onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={localPersonalInfo.title}
                    onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={localPersonalInfo.description}
                  onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={localPersonalInfo.email}
                    onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={localPersonalInfo.phone}
                    onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={localPersonalInfo.location}
                    onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tech Stack</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {localPersonalInfo.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button onClick={() => removeTechStack(index)} className="ml-1 text-red-500 hover:text-red-700">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new technology"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const value = (e.target as HTMLInputElement).value.trim()
                        if (value) {
                          addTechStack(value)
                          ;(e.target as HTMLInputElement).value = ""
                        }
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.querySelector(
                        'input[placeholder="Add new technology"]',
                      ) as HTMLInputElement
                      if (input && input.value.trim()) {
                        addTechStack(input.value.trim())
                        input.value = ""
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <Label>Social Links</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      value={localPersonalInfo.social.github}
                      onChange={(e) =>
                        setLocalPersonalInfo({
                          ...localPersonalInfo,
                          social: { ...localPersonalInfo.social, github: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      value={localPersonalInfo.social.linkedin}
                      onChange={(e) =>
                        setLocalPersonalInfo({
                          ...localPersonalInfo,
                          social: { ...localPersonalInfo.social, linkedin: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Work Experience</CardTitle>
                <Button onClick={addExperience} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {localExperiences.map((experience, index) => (
                <Card key={experience.id} className="border border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeExperience(experience.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input
                          value={experience.title}
                          onChange={(e) => updateExperience(experience.id, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input
                          value={experience.company}
                          onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={experience.location}
                          onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Period</Label>
                        <Input
                          value={experience.period}
                          onChange={(e) => updateExperience(experience.id, "period", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description (one per line)</Label>
                      <Textarea
                        rows={4}
                        value={experience.description.join("\n")}
                        onChange={(e) =>
                          updateExperience(
                            experience.id,
                            "description",
                            e.target.value.split("\n").filter((line) => line.trim()),
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="space-y-6">
            {/* Education Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Education</CardTitle>
                  <Button onClick={addEducation} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {localEducation.map((edu, index) => (
                  <Card key={edu.id} className="border border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Education {index + 1}</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateLocalEducation(edu.id, "degree", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateLocalEducation(edu.id, "institution", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Field of Study</Label>
                          <Input
                            value={edu.field}
                            onChange={(e) => updateLocalEducation(edu.id, "field", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Period</Label>
                          <Input
                            value={edu.period}
                            onChange={(e) => updateLocalEducation(edu.id, "period", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <Label>Description</Label>
                        <Textarea
                          rows={3}
                          value={edu.description}
                          onChange={(e) => updateLocalEducation(edu.id, "description", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subjects (comma separated)</Label>
                        <Input
                          value={edu.subjects.join(", ")}
                          onChange={(e) =>
                            updateLocalEducation(
                              edu.id,
                              "subjects",
                              e.target.value
                                .split(",")
                                .map((subject) => subject.trim())
                                .filter(Boolean),
                            )
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Certifications Section */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Certifications</CardTitle>
                  <Button onClick={addCertification} className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {localCertifications.map((cert, index) => (
                  <Card key={cert.id} className="border border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Award className="h-5 w-5 text-green-600" />
                          Certification {index + 1}
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeCertification(cert.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label>Certification Name</Label>
                          <Input
                            value={cert.name}
                            onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Issuer</Label>
                          <Input
                            value={cert.issuer}
                            onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Certificate Link (optional)</Label>
                        <Input
                          value={cert.link || ""}
                          onChange={(e) => updateCertification(cert.id, "link", e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Projects</CardTitle>
                <Button onClick={addProject} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {localProjects.map((project, index) => (
                <Card key={project.id} className="border border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Project {index + 1}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeProject(project.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Project Title</Label>
                        <Input
                          value={project.title}
                          onChange={(e) => updateProject(project.id, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Project Link</Label>
                        <Input
                          value={project.link || ""}
                          onChange={(e) => updateProject(project.id, "link", e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <Label>Description</Label>
                      <Textarea
                        rows={3}
                        value={project.description}
                        onChange={(e) => updateProject(project.id, "description", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tags (comma separated)</Label>
                        <Input
                          value={project.tags.join(", ")}
                          onChange={(e) =>
                            updateProject(
                              project.id,
                              "tags",
                              e.target.value
                                .split(",")
                                .map((tag) => tag.trim())
                                .filter(Boolean),
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Project Type</Label>
                        <select
                          value={project.type}
                          onChange={(e) => updateProject(project.id, "type", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md"
                        >
                          <option value="public">Public</option>
                          <option value="enterprise">Enterprise</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Skills & Technologies</CardTitle>
                <Button onClick={addSkillCategory} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {localSkillCategories.map((category, index) => (
                <Card key={category.id} className="border border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 flex-1">
                        <Label>Category Name:</Label>
                        <Input
                          value={category.name}
                          onChange={(e) => updateSkillCategory(category.id, "name", e.target.value)}
                          className="max-w-xs"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSkillCategory(category.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {category.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <button
                              onClick={() => removeSkillFromCategory(category.id, skillIndex)}
                              className="ml-1 text-red-500 hover:text-red-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add new skill"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              const value = (e.target as HTMLInputElement).value.trim()
                              if (value && !category.skills.includes(value)) {
                                addSkillToCategory(category.id, value)
                                ;(e.target as HTMLInputElement).value = ""
                              }
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const input = document.activeElement as HTMLInputElement
                            if (input && input.value.trim()) {
                              addSkillToCategory(category.id, input.value.trim())
                              input.value = ""
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Resume Tab */}
        {activeTab === "resume" && (
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Resume Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">Upload Resume</h3>
                <p className="text-slate-600 mb-4">Upload your latest resume in PDF format (max 5MB)</p>
                <input type="file" accept=".pdf" onChange={handleResumeUpload} className="hidden" id="resume-upload" />
                <Button variant="outline" onClick={() => document.getElementById("resume-upload")?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
              </div>

              {resumeFile && (
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium text-slate-800 mb-2">Current Resume</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">resume-nishant-sinha.pdf</p>
                      <p className="text-xs text-slate-500">Uploaded successfully</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href = resumeFile
                          link.download = "resume-nishant-sinha.pdf"
                          link.click()
                        }}
                      >
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateResumeFile("")}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
