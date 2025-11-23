'use client'

import React, { useEffect, useRef, useState } from 'react'

interface RevealProps {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
}

export const Reveal: React.FC<RevealProps> = ({
    children,
    className = '',
    delay = 0,
    duration = 700
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={`${className} ${isVisible ? 'animate-in fade-in slide-in-from-bottom-8' : 'opacity-0'}`}
            style={{
                animationDelay: `${delay}ms`,
                animationDuration: `${duration}ms`,
                animationFillMode: 'backwards'
            }}
        >
            {children}
        </div>
    )
}
