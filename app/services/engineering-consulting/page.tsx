"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedCounter } from "@/components/animated-counter"
import { X } from "lucide-react"

const services = [
  {
    id: "engineering",
    number: "01",
    title: "Engineering Solutions",
    description: "Technical expertise for comprehensive engineering solutions to your construction challenges.",
    fullDescription: "Our engineering team brings decades of combined experience to every project. We specialize in structural analysis, load-bearing assessments, and innovative design solutions that push the boundaries of what's possible while maintaining the highest safety standards.",
    features: [
      "Structural engineering and analysis",
      "Foundation design and assessment", 
      "Load-bearing wall modifications",
      "Seismic retrofitting solutions",
      "Custom architectural engineering"
    ]
  },
  {
    id: "complex-issues",
    number: "02",
    title: "Solving Complex Issues",
    description: "Strategic problem-solving for construction disputes and technical complications.",
    fullDescription: "When projects face unexpected challenges, our expert team steps in to find solutions. From construction defect analysis to dispute resolution, we bring clarity and actionable strategies to the most complex situations.",
    features: [
      "Construction defect investigation",
      "Expert witness testimony",
      "Dispute resolution consulting",
      "Risk mitigation strategies",
      "Technical problem diagnosis"
    ]
  },
  {
    id: "permitting",
    number: "03",
    title: "Permitting",
    description: "Streamlined permitting with 100% success rate to keep your project compliant.",
    fullDescription: "Navigate the complex world of building permits with confidence. Our team handles everything from initial applications to final inspections, ensuring your project meets all local codes and regulations without delays.",
    features: [
      "Building permit applications",
      "Code compliance reviews",
      "Zoning variance assistance",
      "Inspection coordination",
      "Regulatory liaison services"
    ]
  },
]

interface Service {
  id: string
  number: string
  title: string
  description: string
  fullDescription: string
  features: string[]
}

function ServiceModal({ 
  service, 
  isOpen, 
  onClose 
}: { 
  service: Service | null
  isOpen: boolean
  onClose: () => void 
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!service) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-20 w-12 h-12 flex items-center justify-center bg-[#c6912c] rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Close modal"
      >
        <X size={20} className="text-black" />
      </button>

      <div
        className={`relative z-10 w-full max-w-3xl mx-4 md:mx-auto transition-all duration-500 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12 border border-white/10">
          <span className="block text-[6rem] md:text-[8rem] font-bold text-[#c6912c] leading-none mb-4">
            {service.number}
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tight">
            {service.title}
          </h2>
          
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            {service.fullDescription}
          </p>

          <div className="space-y-3">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#c6912c] rounded-full flex-shrink-0" />
                <span className="text-white/80">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c6912c] text-black font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#b87d35] transition-colors"
              onClick={onClose}
            >
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EngineeringConsultingPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function openServiceModal(service: Service) {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  function closeServiceModal() {
    setIsModalOpen(false)
    setTimeout(() => setSelectedService(null), 300)
  }

  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar />

      <section className="relative w-full">
        <div className="flex items-center justify-end px-4 sm:px-8 md:pr-24 lg:pr-32 h-[35vh] md:h-[40vh] bg-black">
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-bold text-white tracking-tight text-right leading-tight">
            ENGINEERING & CONSULTING
          </h1>
        </div>

        <div className="relative w-full h-[65vh] md:h-[60vh]">
          <Image
            src="/images/firefly-gemini-flash.png"
            alt="Engineering blueprints and technical drawings with calculator"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="w-full bg-[#f8f8f8] py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-[40%_60%] gap-12 lg:gap-20 items-center relative">
            
            <div className="space-y-8 md:space-y-12">
              <div className="flex items-center gap-8">
                <AnimatedCounter end={500} suffix="k+" duration={2500} />
                <div className="flex flex-col">
                  <span className="text-[#1a1a1a] text-sm md:text-base font-bold uppercase tracking-widest leading-tight">Client Savings</span>
                  <span className="text-[#1a1a1a] text-sm md:text-base font-bold uppercase tracking-widest leading-tight">Saved</span>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <AnimatedCounter end={100} suffix="%" duration={2000} />
                <div className="flex flex-col">
                  <span className="text-[#1a1a1a] text-sm md:text-base font-bold uppercase tracking-widest leading-tight">Permitting</span>
                  <span className="text-[#1a1a1a] text-sm md:text-base font-bold uppercase tracking-widest leading-tight">Success</span>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <AnimatedCounter end={10} suffix="+" duration={1800} />
                <div className="flex flex-col">
                  <span className="text-[#1a1a1a] text-sm md:text-base font-bold uppercase tracking-widest leading-tight">Construction Disputes</span>
                  <span className="text-[#1a1a1a] text-sm md:text-base font-bold uppercase tracking-widest leading-tight">Resolution</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute left-[40%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#e0e0e0] to-transparent rotate-12 origin-center" />

            <div className="flex flex-col items-start justify-center space-y-8 lg:pl-12 lg:pt-8 mt-12 lg:mt-0">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.1] tracking-tight">
                <span className="block text-[#6b6b6b]">What Can</span>
                <span className="block text-[#c6912c]">Antova Builders</span>
                <span className="block text-[#6b6b6b]">Do For You?</span>
              </h2>

              <Link 
                href="/#testimonials"
                className="w-full md:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#c6912c] text-[#c6912c] font-bold text-sm uppercase tracking-wider hover:bg-[#c6912c] hover:text-black transition-all duration-300"
              >
                View Our Success Stories
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#0a0a0a] py-20 md:py-28" aria-label="Consulting Services">
        <div className="container mx-auto px-6 md:px-8 max-w-[1600px]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight text-center mb-16">
            Consulting Services
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {services.map(svc => (
              <article
                key={svc.id}
                onClick={() => openServiceModal(svc)}
                className="relative bg-[#111] border-2 border-white/20 rounded-3xl p-8 md:p-10 cursor-pointer group hover:border-[#c6912c]/60 transition-all duration-300 min-h-[400px] flex flex-col"
              >
                {/* Vertical "Services" text */}
                <div className="absolute left-4 top-8 hidden md:block">
                  <span 
                    className="text-white/20 text-xs font-medium tracking-[0.3em] uppercase"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    Services
                  </span>
                </div>

                {/* Expand button */}
                <button
                  className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full transition-all duration-300 group-hover:bg-[#c6912c] group-hover:scale-110"
                  aria-label={`Learn more about ${svc.title}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    openServiceModal(svc)
                  }}
                >
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 14 14" 
                    fill="none" 
                    className="transition-transform duration-300 group-hover:rotate-90"
                  >
                    <path 
                      d="M7 1V13M1 7H13" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      className="text-white group-hover:text-black"
                    />
                  </svg>
                </button>

                {/* Large number */}
                <span className="block text-[6rem] md:text-[7rem] lg:text-[8rem] font-bold text-[#c6912c] leading-none mb-6 ml-4 md:ml-8">
                  {svc.number}
                </span>

                {/* Content */}
                <div className="mt-auto ml-4 md:ml-8 space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight leading-tight">
                    {svc.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    {svc.description}
                  </p>
                  
                  {/* Feature preview */}
                  <div className="pt-4 space-y-2">
                    {svc.features.slice(0, 2).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/40 text-sm">
                        <div className="w-1 h-1 bg-[#c6912c] rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f8f8f8] py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8 max-w-[1400px]">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#c6912c]" />
                <span className="text-[#c6912c] text-sm font-medium tracking-[0.2em] uppercase">
                  Our Results Speak For Us
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.1] tracking-tight">
                <span className="text-[#1a1a1a]">Driving Results</span><br />
                <span className="text-[#1a1a1a]">Through </span>
                <span className="text-[#c6912c]">Expert</span><br />
                <span className="text-[#c6912c]">Consulting</span>
              </h2>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 gap-px bg-[#e0e0e0]">
            {/* Result 1 */}
            <div className="bg-[#f8f8f8] p-8 md:p-12 flex items-center justify-between gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] uppercase leading-tight">
                  $500K+ Client<br />Savings Delivered
                </h3>
                <Link 
                  href="/projects"
                  className="inline-flex items-center justify-center w-12 h-12 bg-[#c6912c]/10 text-[#c6912c] rounded-lg hover:bg-[#c6912c] hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="hidden sm:block w-40 h-40 md:w-48 md:h-48 relative flex-shrink-0">
                <Image 
                  src="/images/isometric-house-1.png" 
                  alt="Construction savings illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Result 2 */}
            <div className="bg-[#f8f8f8] p-8 md:p-12 flex items-center justify-between gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] uppercase leading-tight">
                  100% Permitting<br />Success Rate
                </h3>
                <Link 
                  href="/projects"
                  className="inline-flex items-center justify-center w-12 h-12 bg-[#c6912c]/10 text-[#c6912c] rounded-lg hover:bg-[#c6912c] hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="hidden sm:block w-40 h-40 md:w-48 md:h-48 relative flex-shrink-0">
                <Image 
                  src="/images/isometric-house-2.png" 
                  alt="Permitting success illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Result 3 */}
            <div className="bg-[#f8f8f8] p-8 md:p-12 flex items-center justify-between gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] uppercase leading-tight">
                  10+ Disputes<br />Resolved
                </h3>
                <Link 
                  href="/projects"
                  className="inline-flex items-center justify-center w-12 h-12 bg-[#c6912c]/10 text-[#c6912c] rounded-lg hover:bg-[#c6912c] hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="hidden sm:block w-40 h-40 md:w-48 md:h-48 relative flex-shrink-0">
                <Image 
                  src="/images/isometric-house-3.png" 
                  alt="Dispute resolution illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Result 4 */}
            <div className="bg-[#f8f8f8] p-8 md:p-12 flex items-center justify-between gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] uppercase leading-tight">
                  Projects Delivered<br />On Time & Budget
                </h3>
                <Link 
                  href="/projects"
                  className="inline-flex items-center justify-center w-12 h-12 bg-[#c6912c]/10 text-[#c6912c] rounded-lg hover:bg-[#c6912c] hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="hidden sm:block w-40 h-40 md:w-48 md:h-48 relative flex-shrink-0">
                <Image 
                  src="/images/isometric-house-4.png" 
                  alt="On-time delivery illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#1a1a1a] py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
            Ready to Discuss Your Project?
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Let's talk about your engineering challenges and find the right solution together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto sm:min-w-[280px] px-8 py-4 bg-[#c6912c] text-black font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#b87d35] transition-colors text-center"
            >
              Schedule a Consultation
            </Link>
            <a
              href="tel:+12086258342"
              className="w-full sm:w-auto sm:min-w-[280px] px-8 py-4 border-2 border-white text-white font-bold text-sm uppercase tracking-wider rounded-md hover:bg-white hover:text-black transition-colors text-center"
            >
              Call (208) 625-8342
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <ServiceModal 
        service={selectedService}
        isOpen={isModalOpen}
        onClose={closeServiceModal}
      />
    </div>
  )
}
