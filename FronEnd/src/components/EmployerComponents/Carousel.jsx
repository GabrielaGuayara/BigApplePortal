import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight} from 'lucide-react'


const Carousel = ({ children:slides, autoSlide = false, autoSlideInterval = 3000 }) => {
    const [curr, setCurr] = useState(0)

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])


    return (
        <div className='overflow-hidden relative'>
            <div className='flex transition-transform ease-out duration-500' style={{ transform: `translateX(-${curr * 100}%)` }}>
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button onClick={prev} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                    <ChevronLeft />
                </button>
                <button onClick={next} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                    <ChevronRight />
                </button>
            </div>

            <div className='absolute bottom-2 right-0 left-0'>
              <div className='bg-slate-50 w-fit p-2 mb-10 bg-opacity-50 rounded-xl text-center m-auto'>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Why Choose The Big Apple Portal?</h1>
                  <p className="text-xl mb-8">Kickstart your career with hands-on learning opportunities</p>
                </div>
            <div/>

                <div className='flex items-center justify-center gap-2'>
                    {slides.map((s, i) => (
                        <div key={i} className={`transition-all min-w-3.5 h-1.5 bg-white rounded-full  ${curr === i ? "p-0.5" : "bg-opacity-50"}`} />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Carousel