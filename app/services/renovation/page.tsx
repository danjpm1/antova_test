"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const teamMembers = [
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

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeCard, setActiveCard] = useState(1)

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

  return (
    <div className="min-h-screen w-full bg-black">
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

      <section className="relative w-full bg-white pt-16 pb-14 md:pt-24 md:pb-24">
        <div className="px-6 md:px-12 lg:px-24">
          <h2
            className="mb-14 uppercase md:mb-16 text-gray-500 tracking-tight"
            style={{ fontSize: "var(--text-heading-lg)" }}
          >
            OUR TEAM
          </h2>

          <div className="mb-14 max-w-4xl">
            <p
              className="leading-relaxed text-gray-800"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              Antova&apos;s team blends master craftsmanship with AI-powered precision to shape complexity into luxury.
              Every project reflects our commitment to excellence and innovation.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-start">
              <div className="ml-auto w-full bg-white shadow-sm md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
                <div className="aspect-[16/10] bg-gray-200" />
                <div className="p-3" style={{ backgroundColor: "var(--primary)" }}>
                  <h3 className="mb-1 text-base font-semibold text-black">Matthew Shaffer</h3>
                  <p className="text-xs text-black">CEO, Managing Principal</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-7">
              {teamMembers.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className={`w-full bg-white shadow-sm md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] ${
                    index === 3 ? "lg:ml-auto" : ""
                  }`}
                >
                  <div className="aspect-[16/10] bg-gray-200" />
                  <div className="p-3" style={{ backgroundColor: "var(--primary)" }}>
                    <h3 className="mb-1 text-base font-semibold text-black">{member.name}</h3>
                    <p className="text-xs text-black">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


