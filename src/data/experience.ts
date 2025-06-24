export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  current: boolean
  description: string[]
  color: string
}

export const experiences: Experience[] = [
  {
    id: "contour-education",
    title: "Automation Engineer",
    company: "Contour Education",
    location: "Muzaffarpur, India (Remote)",
    period: "Current",
    current: true,
    color: "blue",
    description: [
      "Designed and optimized automation workflows in Make.com, minimizing operations and maximizing efficiency",
      "Integrated Make.com with Monday.com, Excel, and multiple APIs to streamline business processes",
      "Developed logical automation sequences to reduce manual effort and enhance workflow efficiency",
      "Reduced operational costs by optimizing API calls and webhook usage",
    ],
  },
  {
    id: "global-emarketing",
    title: "Full Stack Developer",
    company: "Global EMarketing Web Services",
    location: "Noida, India (Remote)",
    period: "2022 - 2023",
    current: false,
    color: "purple",
    description: [
      "Led a new project team to design and develop responsive web application using Vue.js and Bootstrap 5",
      "Achieved 25% improvement in user engagement through Wizart API integration",
      "Coordinated third-party APIs and RESTful services, enhancing functionality by 30%",
      "Supervised and mentored junior developers, increasing team productivity by 20%",
      "Enhanced deployment process, achieving 15% reduction in deployment time",
    ],
  },
  {
    id: "flying-bird-travel",
    title: "Software Engineer",
    company: "Flying Bird Travel Private Limited",
    location: "Noida, India",
    period: "2021 - 2022",
    current: false,
    color: "green",
    description: [
      "Achieved 40% growth in customer engagement for WordPress website using SEO strategies",
      "Led the redesign of CRM software, resulting in 30% improvement in user satisfaction",
      "Developed WordPress site with enhanced product structuring using Elementor Pro and WooCommerce",
      "Implemented Google ratings integration and effective product design optimization",
    ],
  },
]
