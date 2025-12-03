'use client'
import React, { useState, FormEvent } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { useContactContent } from '@/hooks/useContactContent'
import { Reveal } from '@/components/ui/Reveal'

export default function ContactPage() {
    const { hero, info, form } = useContactContent()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
    const [submitMessage, setSubmitMessage] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)
        setSubmitMessage('')

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            message: formData.get('message') as string,
        }

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || 'Failed to submit form')
            }

            setSubmitStatus('success')
            setSubmitMessage('Thank you! Your message has been sent successfully. We will get back to you soon.')
            ;(e.target as HTMLFormElement).reset()
        } catch (error) {
            setSubmitStatus('error')
            setSubmitMessage(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong. Please try again later or contact us directly.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12">
            <div className="container mx-auto px-4 lg:px-8">
                <Reveal className="mx-auto max-w-4xl text-center mb-16">
                    <h1 className="text-4xl font-black text-white lg:text-6xl mb-6">
                        {hero.title}
                    </h1>
                    <p className="text-xl text-slate-300">
                        {hero.description}
                    </p>
                </Reveal>

                <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
                    {/* Section 1: Contact Information */}
                    <Reveal delay={200} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white mb-8">{info.title}</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-[#FCC22F]/10 text-[#FCC22F]">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Phone Numbers</h3>
                                    <div className="space-y-1">
                                        {info.phoneNumbers.map((phone, index) => (
                                            <a
                                                key={index}
                                                href={`tel:${phone.replace(/\s+/g, '')}`}
                                                className="block text-slate-300 hover:text-[#FCC22F] transition-colors"
                                            >
                                                {phone}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-[#FCC22F]/10 text-[#FCC22F]">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Email Address</h3>
                                    <a
                                        href={`mailto:${info.email}`}
                                        className="text-slate-300 hover:text-[#FCC22F] transition-colors"
                                    >
                                        {info.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-[#FCC22F]/10 text-[#FCC22F]">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Office Location</h3>
                                    <p className="text-slate-300">
                                        {info.location}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </Reveal>

                    {/* Section 2: Simple Message Form */}
                    <Reveal delay={400} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white mb-8">{form.title}</h2>

                        {submitStatus && (
                            <div
                                className={`mb-6 rounded-lg border p-4 flex items-start gap-3 ${
                                    submitStatus === 'success'
                                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                                }`}
                            >
                                {submitStatus === 'success' ? (
                                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                ) : (
                                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                )}
                                <p className="text-sm">{submitMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-300">
                                        {form.fields.name}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-[#FCC22F] focus:outline-none focus:ring-1 focus:ring-[#FCC22F]"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-slate-300">
                                        {form.fields.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-[#FCC22F] focus:outline-none focus:ring-1 focus:ring-[#FCC22F]"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-300">
                                    {form.fields.email}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-[#FCC22F] focus:outline-none focus:ring-1 focus:ring-[#FCC22F]"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-300">
                                    {form.fields.message}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-[#FCC22F] focus:outline-none focus:ring-1 focus:ring-[#FCC22F]"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-xl bg-[#C71C22] px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#a5161b] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? 'Sending...' : form.button}
                            </button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </div>
    )
}
