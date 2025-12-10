"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const STEPS = [
  {
    number: "1",
    title: "Design",
    description: "We design spaces where form and function meet with timeless precision.",
    image: "/aerial.jpg",
    alt: "Luxury home aerial view with pool",
  },
  {
    number: "2",
    title: "Renovate",
    description: "Renovation is transformation – we restore, refine, and reimagine your home.",
    image: "/luxury-modern-cabin-interior-with-large-windows-wo1.jpg",
    alt: "Kitchen installation",
  },
  {
    number: "3",
    title: "Live it",
    description: "Live in the art you created — crafted for comfort and quiet luxury.",
    image: "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    alt: "Electrical system at night",
  },
]

const ROTATION_INTERVAL = 4000
const SWIPE_THRESHOLD = 50

export default function RenovationPage() {
  const [activeStep, setActiveStep] = useState(0)
  const touchStartX = useRef(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length)
    }, ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return

    const direction = deltaX > 0 ? 1 : -1
    setActiveStep((prev) => (prev + direction + STEPS.length) % STEPS.length)
  }

  const currentStep = STEPS[activeStep]

  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar />

      <section className="relative w-full">
        <div className="flex items-center justify-end px-4 sm:px-8 md:pr-24 lg:pr-32 h-[30vh] bg-black">
          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-bold text-white tracking-tight">
            RENOVATION
          </h1>
        </div>

        <div className="relative w-full h-[70vh] overflow-hidden">
          <img
            src="/luxury-modern-cabin-interior-with-large-windows-wo.jpg"
            alt="Modern mountain home"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <div className="bg-black h-32" />
      <div className="w-full h-[2px] bg-[#D4A574]" />

      <section className="bg-black text-white py-12 md:py-32">
        <div className="container mx-auto px-5 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-16 mb-10 md:mb-20">
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-4">
                Luxury + Comfort.
              </h2>
              <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-gray-400">
                Built to Last Forever.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6 text-[15px] md:text-lg text-gray-300 mt-4 lg:mt-0">
              <p className="leading-[1.7] md:leading-8">
                Antova Builder specializes in luxury home renovations, transforming spaces into sanctuaries that blend
                timeless elegance with modern comfort.
              </p>
              <p className="leading-[1.7] md:leading-8">
                Luxury isn't just about premium materials; it's about precision execution and unwavering attention to
                detail. Through collaboration and meticulous craftsmanship, every renovation becomes a masterpiece that
                stands the test of time.
              </p>
              <p className="font-semibold text-white pt-1 md:pt-2">Excellence today, legacy tomorrow.</p>
            </div>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden w-full px-5">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden"
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeStep * 100}%)` }}
            >
              {STEPS.map((step, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="relative w-full h-[300px] mb-6 overflow-hidden">
                    <img src={step.image} alt={step.alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 w-full">
            {STEPS.map((step, i) => {
              const isActive = activeStep === i
              return (
                <div key={i} className="flex flex-col">
                  <div className={`h-[2px] w-full transition-colors duration-300 ${isActive ? "bg-white" : "bg-gray-600"}`} />
                  <div className="flex items-center gap-2 mt-4">
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
                        isActive ? "bg-[#c6912c] text-black" : "bg-transparent border border-gray-600 text-gray-600"
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-gray-600"}`}>
                      {step.title}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-left pr-8 mt-2">
            <p className="text-sm text-gray-300 leading-relaxed">{currentStep.description}</p>
          </div>
        </div>

        {/* Desktop carousel */}
        <div className="hidden md:flex w-full justify-center px-6">
          <div className="w-full max-w-[1400px]">
            <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden">
              <img
                src={currentStep.image}
                alt={currentStep.alt}
                className="w-full h-full object-cover transition-opacity duration-300"
                key={activeStep}
              />
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12">
              {STEPS.map((step, i) => {
                const isActive = activeStep === i
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="relative text-center cursor-pointer transition-all hover:opacity-80"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-[2px] transition-colors ${isActive ? "bg-[#c6912c]" : "bg-gray-700"}`} />

                    <div className="flex items-center justify-center gap-3 pt-6 pb-4">
                      <span
                        className={`flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold transition-all duration-300 ${
                          isActive ? "bg-[#c6912c] text-black" : "bg-transparent border-2 border-gray-600 text-gray-600"
                        }`}
                      >
                        {step.number}
                      </span>
                      <h3 className={`text-xl font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`}>
                        {step.title}
                      </h3>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed px-1 sm:px-0 transition-colors ${isActive ? "text-white" : "text-gray-500"}`}>
                      {step.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
