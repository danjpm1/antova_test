"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"text" | "fade" | "logo" | "reveal">("text")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    let animationId: number

    const animate = () => {
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8
        data[i] = Math.max(0, Math.min(255, data[i] + noise))
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
      }
      
      ctx.putImageData(imageData, 0, 0)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("fade"), 1500)
    const timer2 = setTimeout(() => setPhase("logo"), 2000)
    const timer3 = setTimeout(() => setPhase("reveal"), 3500)
    const timer4 = setTimeout(() => onComplete(), 4200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-700 ${
        phase === "reveal" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        className={`absolute z-10 transition-opacity duration-500 ease-in-out ${
          phase === "text" ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1
          className="text-[55px] md:text-[66px] lg:text-[77px] font-normal tracking-wide"
          style={{ 
            background: "linear-gradient(90deg, white 0%, white 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 100%)",
            backgroundSize: "200% 100%",
            backgroundPosition: "100% 0",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "textReveal 1.2s ease-out forwards",
          }}
        >
          About Us
        </h1>
      </div>

      <div
        className={`absolute z-10 transition-opacity duration-500 ease-in-out ${
          phase === "logo" || phase === "reveal" ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="/antova-logo-gold.svg"
          alt="Antova Logo"
          className="h-[100px] md:h-[133px] lg:h-[166px] w-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes textReveal {
            0% {
              background-position: 100% 0;
            }
            100% {
              background-position: 0% 0;
            }
          }
        `
      }} />
    </div>
  )
}

const teamMembers = [
  { name: "Matthew Shaffer", title: "CEO, Managing Principal" },
  { name: "Ragnar", title: "Construction Engineer" },
  { name: "Lagertha", title: "Construction Engineer" },
  { name: "Rollo", title: "Construction Engineer" },
  { name: "Floki", title: "Construction Engineer" },
]

const sections = [
  {
    number: "01",
    title: "Vision",
    description: "Create a world where every detail is under control and every home reflects refined order. We envision spaces where precision meets artistry, and structure creates freedom.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Establish clear structures, set the benchmark for craftsmanship, and deliver a seamless journey. From initial consultation to final handover, we orchestrate every element with precision.",
  },
  {
    number: "03",
    title: "Experience",
    description: "Our team brings refined expertise, blending technical mastery with creative problem-solving. Years of dedication translate into flawless execution across every project phase.",
  },
]

const SectionCard = ({
  number,
  title,
  description,
  cardRef,
  isActive,
  zIndex,
}: {
  number: string
  title: string
  description: string
  cardRef: React.RefObject<HTMLDivElement>
  isActive: boolean
  zIndex: number
}) => (
  <div
    ref={cardRef}
    className="sticky top-0 min-h-[50vh] flex items-center px-6 md:px-12 lg:px-20 py-10 transition-colors duration-300 border-t"
    style={{
      zIndex,
      backgroundColor: isActive ? "var(--card-active)" : "black",
      borderTopColor: isActive ? "var(--primary)" : "transparent",
    }}
  >
    <div className="w-full grid grid-cols-1 gap-y-6 gap-x-16 lg:grid-cols-[auto_1fr] items-center">
      <div
        className="leading-none font-bold tracking-tight"
        style={{ fontSize: "var(--text-number-xl)", color: "var(--primary)" }}
      >
        {number}
      </div>
      <div className="flex flex-col justify-center">
        <h3
          className="mb-4 font-medium"
          style={{ fontSize: "var(--text-heading-md)", color: "var(--primary)", lineHeight: 1.1 }}
        >
          {title}
        </h3>
        <p
          className="leading-relaxed max-w-5xl"
          style={{ fontSize: "var(--text-body-md)", color: "var(--text-light)", lineHeight: 1.7 }}
        >
          {description}
        </p>
      </div>
    </div>
  </div>
)

const TeamMemberCard = ({ name, title }: { name: string; title: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className="w-full aspect-[4/5] overflow-hidden mb-4 flex items-center justify-center"
        style={{ backgroundColor: "#e5e5e5" }}
      >
        <User size={80} color="#9ca3af" />
      </div>
      <h3 
        className="text-xl md:text-2xl tracking-[0.2em] text-center mb-1"
        style={{ 
          fontFamily: "'Bebas Neue', sans-serif",
          color: "#3a3a3a",
          fontWeight: 400,
        }}
      >
        {name}
      </h3>
      <p 
        className="text-sm md:text-base tracking-wide text-center"
        style={{ 
          fontFamily: "'Inter', sans-serif",
          color: "#c6912c",
        }}
      >
        {title}
      </p>
    </div>
  )
}

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeCard, setActiveCard] = useState(1)
  const [showIntro, setShowIntro] = useState(true)

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.findIndex((ref) => ref.current === entry.target)
            if (index !== -1) setActiveCard(index + 1)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    )

    sectionRefs.forEach((ref) => ref.current && observer.observe(ref.current))
    return () => observer.disconnect()
  }, [])

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
  }, [])

  return (
    <div className="min-h-screen w-full bg-black">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      
      <Navbar />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-black">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[50vh]">
            <h1
              className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight"
              style={{ color: "var(--primary)" }}
            >
              ABOUT US
            </h1>

            <div
              className="border-l-2 pl-8 lg:pl-12"
              style={{ borderColor: "var(--primary)" }}
            >
              <p className="text-lg md:text-xl text-white/60 mb-4">
                Antova Builders began with a singular belief:
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl text-white leading-snug font-light">
                True luxury is the freedom to relax while experts handle{" "}
                <span style={{ color: "var(--primary)" }}>the complexity.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative w-full bg-black -mb-16"
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
          transition: "transform 0.45s ease-out",
        }}
      >
        <img
          src="/images/team-construction-new.png"
          alt="Construction team reviewing plans"
          className="h-[250px] w-full object-cover md:h-auto"
        />
      </section>

      <section className="relative w-full bg-black">
        {sections.map((section, index) => (
          <SectionCard
            key={section.title}
            number={section.number}
            title={section.title}
            description={section.description}
            cardRef={sectionRefs[index]}
            isActive={activeCard === index + 1}
            zIndex={index + 1}
          />
        ))}
      </section>

      <section className="relative w-full bg-white py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 
              className="text-3xl md:text-4xl tracking-[0.3em] uppercase mb-4"
              style={{ 
                fontFamily: "'Bebas Neue', sans-serif",
                color: "#3a3a3a",
                fontWeight: 400,
              }}
            >
              OUR TEAM
            </h2>
            <div className="w-12 h-0.5 mx-auto" style={{ backgroundColor: "#c6912c" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 md:gap-y-14 lg:gap-x-10">
            {teamMembers.map((member, index) => (
              <TeamMemberCard 
                key={`${member.name}-${index}`}
                name={member.name}
                title={member.title}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
