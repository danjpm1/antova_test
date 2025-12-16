"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedCounter } from "@/components/animated-counter"

import { X } from "lucide-react"

const SCROLL_MULTIPLIER = 0.85

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

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export default function EngineeringConsultingPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const updateScrollProgress = useRef(
    debounce(() => {
      const el = carouselRef.current
      if (!el) return
      const max = el.scrollWidth - el.clientWidth
      setScrollProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0)
    }, 16)
  ).current

  function scrollCarousel(dir: number) {
    const el = carouselRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * SCROLL_MULTIPLIER, behavior: "smooth" })
  }

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
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight text-center mb-16">
            Consulting Services
          </h2>

          <div
            ref={carouselRef}
            onScroll={updateScrollProgress}
            role="region"
            aria-label="Services carousel"
            className="flex flex-col md:flex-row gap-8 md:overflow-x-auto md:snap-x md:snap-mandatory pb-4 md:-mx-6 md:px-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map(svc => (
              <article
                key={svc.id}
                onClick={() => openServiceModal(svc)}
                className="flex-shrink-0 w-full md:w-[50vw] lg:w-[480px] md:snap-center bg-[#1a1a1a] border border-white/10 rounded-2xl p-10 md:p-12 relative cursor-pointer group hover:border-[#c6912c]/50 transition-all duration-300"
              >
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

                <span className="block text-[8rem] md:text-[10rem] lg:text-[12rem] font-bold text-[#c6912c] leading-none mb-6">
                  {svc.number}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-tight">
                  {svc.title}
                </h3>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  {svc.description}
                </p>
              </article>
            ))}
          </div>

          <nav className="hidden md:flex items-center justify-center gap-6 mt-8" aria-label="Carousel navigation">
            <button
              onClick={() => scrollCarousel(-1)}
              className="w-12 h-12 flex items-center justify-center text-white border border-white/30 rounded-full hover:bg-white/10 hover:text-[#c6912c] transition-all"
              aria-label="Previous slide"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div 
              className="w-48 md:w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden" 
              role="progressbar" 
              aria-valuenow={Math.round(scrollProgress)} 
              aria-valuemin={0} 
              aria-valuemax={100}
            >
              <div
                className="h-full bg-[#c6912c] rounded-full transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            <button
              onClick={() => scrollCarousel(1)}
              className="w-12 h-12 flex items-center justify-center text-white border border-white/30 rounded-full hover:bg-white/10 hover:text-[#c6912c] transition-all"
              aria-label="Next slide"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
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
              className="w-full sm:w-auto px-8 py-4 bg-[#c6912c] text-black font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#b87d35] transition-colors"
            >
              Schedule a Consultation
            </Link>
            <a
              href="tel:+12086258342"
              className="w-full sm:w-auto px-8 py-4 border-2 border-white/30 text-white font-bold text-sm uppercase tracking-wider rounded-md hover:border-[#c6912c] hover:text-[#c6912c] transition-colors"
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
