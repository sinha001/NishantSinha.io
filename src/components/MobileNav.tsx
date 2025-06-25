"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
    personalInfo: {
        name: string
    }
}

export function MobileNav({ personalInfo }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false)

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
        setIsOpen(false)
    }

    return (
        <>
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-blue-600">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>
            {/* Mobile menu overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="fixed inset-0 bg-black/20" onClick={() => setIsOpen(false)} />
                    <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl">
                        <div className="flex items-center justify-between p-6 border-b">
                            <span className="text-xl font-bold text-slate-800">{personalInfo.name}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-slate-600 hover:text-blue-600"
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        <nav className="p-6">
                            <div className="space-y-4">
                                <button
                                    onClick={() => scrollToSection("home")}
                                    className="block w-full text-left py-2 text-slate-600 hover:text-blue-600 transition-colors"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => scrollToSection("about")}
                                    className="block w-full text-left py-2 text-slate-600 hover:text-blue-600 transition-colors"
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => scrollToSection("experience")}
                                    className="block w-full text-left py-2 text-slate-600 hover:text-blue-600 transition-colors"
                                >
                                    Experience
                                </button>
                                <button onClick={() => scrollToSection("education")} className="block w-full text-left py-2 text-slate-600 hover:text-blue-600 transition-colors">
                                    Education
                                </button>

                                <button onClick={() => scrollToSection("education")} className="block w-full text-left py-2 text-slate-600 hover:text-blue-600 transition-colors">
                                    Projects
                                </button>

                                <button onClick={() => scrollToSection("education")} className="block w-full text-left py-2 text-slate-600 hover:text-blue-600 transition-colors">
                                    GitHub
                                </button>

                                <button onClick={() => scrollToSection("education")} className="block w-full text-left py-2 text-slate-600 hover:text-blue-600 transition-colors">
                                    Contact
                                </button>

                                <Link to="/blog" onClick={() => setIsOpen(false)} className="block w-full text-left py-2 text-slate-600 hover:text-blue-600 transition-colors">
                                    Blog
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>

    )
}