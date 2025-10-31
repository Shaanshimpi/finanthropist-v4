'use client'
import React from 'react'

export const PostInstructorSection: React.FC = () => {
  return (
    <section
      className="post-instructor-section"
      style={{ height: 'calc(100vh - 4rem)', minHeight: 'calc(100vh - 4rem)' }}
    >
      <div
        className="post-instructor-pinned flex items-center justify-center"
        style={{ height: 'calc(100vh - 4rem)', minHeight: 'calc(100vh - 4rem)' }}
      >
       <h2 className="post-instructor-title text-5xl md:text-7xl font-black tracking-tight uppercase bg-gradient-to-r from-[#FCC22F] via-[#C71C22] to-[#FCC22F] bg-clip-text text-transparent">FINANTHROPIST</h2>

      </div>
    </section>
  )
}

export default PostInstructorSection


