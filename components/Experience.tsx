import { workExperience } from '@/data'
import React from 'react'
import { Button } from './ui/moving-border'
import Image from 'next/image'

const Experience = () => {
  return (
    <section id="experience" className="project-container pb-20 pt-36">
    <h1 className="heading text-white">
      My
      <span className="text-blue-600"> Work Experience</span>
    </h1>
    
    <div className='w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10'>
        {workExperience.map((card) => (
            <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000)}
            borderRadius='1.75rem'
            className='flex-1 text-white border-neutral-200 dark:border-slate-800'
            >
                <div className='experience-card flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2'>
                    <Image 
                    src={card.thumbnail}
                    alt={card.thumbnail}
                    width={50}
                    height={50}
                    className='lg:w-32 md:w-20 w-16'
                    />
                    <div className='card-details lg:ms-5'>
                        <h1 className='text-center text-xl md:text-2xl font-bold'> {card.title} </h1>
                        <h3 className='text-center text-white-200'> {card.company} </h3>
                        <p className='text-start text-white-100 mt-3 font-semibold'> {card.desc} </p>
                    </div>
                </div>
            </Button>
        ))}
    </div>
    </section>
  )
}

export default Experience