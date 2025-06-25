"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  Building,
  GraduationCap,
  Download,
} from "lucide-react"
import { Link } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { ContactForm } from "@/components/ContactForm"
import { MobileNav } from "@/components/MobileNav"
import { useAnalytics } from "@/contexts/AnalyticsContext"
import { usePortfolio } from "@/contexts/PortfolioContext"
import { BackgroundBeams } from "@/components/ui/background-beams"

// Import static data that doesn't change via admin
import { contactOptions } from "@/data/contact"

// Animation variants
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

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
}

// Animated section wrapper
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const { trackPageView, trackResumeDownload } = useAnalytics()
  const { personalInfo, experiences, projects, skillCategories, education, certifications, repositories, resumeFile } =
    usePortfolio()

  useEffect(() => {
    trackPageView("/")
  }, [])

  const handleResumeDownload = () => {
    trackResumeDownload()
    if (resumeFile) {
      const link = document.createElement("a")
      link.href = resumeFile
      link.download = "Nishant-Sinha-Resume.pdf"
      link.click()
    } else {
      // Fallback for demo
      const link = document.createElement("a")
      link.href = "/resume-nishant-sinha.pdf"
      link.download = "Nishant-Sinha-Resume.pdf"
      link.click()
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
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
        <div className="text-2xl font-bold text-slate-800">{personalInfo.name}</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("education")}
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            Education
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("github")}
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            GitHub
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            Contact
          </button>
          <Link to="/blog" className="text-slate-600 hover:text-blue-600 transition-colors">
            Blog
          </Link>
        </div>

        {/* Mobile Navigation */}
        <MobileNav personalInfo={personalInfo} />
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden"
      >
        {/* Background Beams */}
        <BackgroundBeams />

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              variant="outline"
              onClick={handleResumeDownload}
              className="mb-8 bg-blue-50/80 backdrop-blur-sm text-blue-700 border-blue-200 hover:bg-blue-100/80"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-slate-800"
          >
            {personalInfo.title.split(" ")[0]} {personalInfo.title.split(" ")[1]}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {personalInfo.title.split(" ")[2]}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed"
          >
            {personalInfo.description}
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-3 mb-8 justify-center"
          >
            {personalInfo.techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-slate-100/80 backdrop-blur-sm text-slate-700 hover:bg-slate-200/80"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 mb-12 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white backdrop-blur-sm w-full sm:w-auto"
              onClick={() => scrollToSection("projects")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/80 backdrop-blur-sm text-slate-700 border-slate-300 hover:bg-slate-50/80 w-full sm:w-auto"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex gap-3 justify-center items-center"
          >
            {[
              { href: personalInfo.social.github, icon: Github },
              { href: personalInfo.social.linkedin, icon: Linkedin },
              { href: `mailto:${personalInfo.email}`, icon: Mail },
            ].map(({ href, icon: Icon }, index) => (
              <motion.div key={href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 text-slate-600 hover:text-slate-800"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection>
        <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">About Me</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Passionate about creating efficient solutions through automation and full-stack development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Background</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                I'm a Software Engineer with expertise in full-stack development and automation. I specialize in
                creating scalable web applications and optimizing business processes through intelligent automation
                workflows.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-slate-600">{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-slate-600">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-slate-600">{personalInfo.email}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white shadow-sm border-slate-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{personalInfo.stats.experience}</div>
                    <div className="text-sm text-slate-600">Years Experience</div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-sm border-slate-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{personalInfo.stats.projects}</div>
                    <div className="text-sm text-slate-600">Projects Completed</div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-sm border-slate-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{personalInfo.stats.growth}</div>
                    <div className="text-sm text-slate-600">Growth Achieved</div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-sm border-slate-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{personalInfo.stats.engagement}</div>
                    <div className="text-sm text-slate-600">User Engagement</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Work Experience Timeline */}
      <AnimatedSection>
        <section id="experience" className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Work Experience</h2>
              <p className="text-slate-600">My professional journey and achievements</p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>

              <motion.div variants={staggerContainer} className="space-y-12">
                {experiences.map((experience, index) => (
                  <motion.div key={experience.id} variants={fadeInUp} className="relative flex items-start gap-8">
                    <div
                      className={`flex-shrink-0 w-16 h-16 bg-${experience.color}-600 rounded-full flex items-center justify-center relative z-10`}
                    >
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <Card className="flex-1 bg-white shadow-lg border-slate-200">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-800">{experience.title}</h3>
                            <p className={`text-${experience.color}-600 font-medium`}>{experience.company}</p>
                            <p className="text-slate-500 text-sm">{experience.location}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`${experience.current ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-50 text-slate-700 border-slate-200"} w-fit`}
                          >
                            <Calendar className="mr-1 h-3 w-3" />
                            {experience.period}
                          </Badge>
                        </div>
                        <ul className="text-slate-600 space-y-2">
                          {experience.description.map((item, itemIndex) => (
                            <li key={itemIndex}>• {item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Education Timeline */}
      <AnimatedSection>
        <section id="education" className="py-20 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Education</h2>
              <p className="text-slate-600">My academic background and achievements</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {education.map((edu) => (
                <motion.div key={edu.id} variants={fadeInUp}>
                  <Card className="bg-white shadow-lg border-slate-200 mb-8">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-semibold text-slate-800 mb-2">{edu.degree}</h3>
                              <p className="text-blue-600 font-medium text-lg">{edu.institution}</p>
                              <p className="text-slate-600">{edu.field}</p>
                            </div>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 w-fit">
                              <Calendar className="mr-1 h-3 w-3" />
                              {edu.period}
                            </Badge>
                          </div>
                          <div className="space-y-3">
                            <p className="text-slate-600">{edu.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {edu.subjects.map((subject) => (
                                <Badge key={subject} variant="secondary" className="bg-slate-100 text-slate-700">
                                  {subject}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Achievements */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-white shadow-lg border-slate-200">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Achievements & Certifications</h4>
                    <div className="space-y-3">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-slate-600">
                            {cert.name} - {cert.issuer}
                          </span>
                          {cert.link && (
                            <a href={cert.link} className="text-blue-600 hover:text-blue-700 text-sm">
                              View Certificate →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection>
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Skills & Technologies</h2>
              <p className="text-slate-600">Technologies I work with to bring ideas to life</p>
            </div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            >
              {skillCategories.map((category) => (
                <motion.div key={category.id} variants={fadeInUp} className="text-center">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">{category.name}</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection>
        <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Featured Projects</h2>
            <p className="text-slate-600">Some of my recent work and contributions</p>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div key={project.id} variants={scaleIn}>
                <Card className="bg-white shadow-sm border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">{project.title}</h3>
                    <p className="text-slate-600 mb-4">{project.description}</p>
                    <div className="flex gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className={`bg-${project.color}-50 text-${project.color}-700`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View Project →
                      </a>
                    ) : (
                      <span className="text-slate-500">Enterprise Project</span>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </AnimatedSection>

      {/* GitHub Section */}
      <AnimatedSection>
        <section id="github" className="py-20 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">GitHub Contributions</h2>
              <p className="text-slate-600">My open source contributions and repositories</p>
            </div>

            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repositories.map((repo) => (
                <motion.div key={repo.id} variants={scaleIn}>
                  <Card className="bg-white shadow-sm border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-slate-800">{repo.name}</h3>
                        <Github className="h-5 w-5 text-slate-500" />
                      </div>
                      <p className="text-slate-600 text-sm mb-4">{repo.description}</p>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="h-4 w-4" />
                            {repo.forks}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`bg-${repo.color}-50 text-${repo.color}-700 border-${repo.color}-200`}
                        >
                          {repo.language}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-12">
              <motion.div variants={fadeInUp}>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  onClick={() => window.open(personalInfo.social.github, "_blank")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  View All Repositories
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection>
        <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Get In Touch</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              I'm always interested in new opportunities and collaborations. Let's discuss how we can work together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div variants={scaleIn}>
              <Card className="bg-white shadow-lg border-slate-200 h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    {contactOptions.map((option) => {
                      const IconComponent = option.icon === "phone" ? Phone : option.icon === "mail" ? Mail : MapPin
                      return (
                        <div key={option.id} className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 bg-${option.color}-100 rounded-lg flex items-center justify-center`}
                          >
                            <IconComponent className={`h-6 w-6 text-${option.color}-600`} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{option.label}</p>
                            <p className="text-slate-600">{option.value}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Let's Connect</h4>
                    <div className="flex gap-3">
                      {[
                        { href: personalInfo.social.github, icon: Github, label: "GitHub" },
                        { href: personalInfo.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                        { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" },
                      ].map(({ href, icon: Icon, label }) => (
                        <motion.div key={href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600 hover:text-slate-800"
                            title={label}
                          >
                            <Icon className="h-5 w-5" />
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={scaleIn}>
              <ContactForm />
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-300">© 2025 {personalInfo.name}. Built with Vite + React and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
