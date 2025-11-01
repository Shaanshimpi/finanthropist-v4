'use client'
import React from 'react'
import { WelcomeSection } from './WelcomeSection'

export const PostInstructorSection: React.FC = () => {
  return (
    <section
      className="post-instructor-section relative overflow-hidden"
      style={{ height: '100vh', minHeight: '100vh' }}
    >
      <div
        className="post-instructor-pinned flex items-center justify-center"
        style={{ height: '100vh', minHeight: '100vh' }}
      >
        <h2 className="post-instructor-title text-5xl md:text-7xl font-black tracking-tight uppercase bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-[#FCC22F] bg-clip-text text-transparent" style={{ willChange: 'transform' }}>FINANTHROPIST</h2>

      <WelcomeSection />
      </div>
    </section>
  )
}

export default PostInstructorSection


