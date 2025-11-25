'use client'
import React from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useContactContent } from '@/hooks/useContactContent'
import { Reveal } from '@/components/ui/Reveal'

export default function ContactPage() {
    const { hero, info, form } = useContactContent()

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

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-[#FCC22F]/10 text-[#FCC22F]">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Business Hours</h3>
                                    <p className="text-slate-300 whitespace-pre-line">
                                        {info.hours}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Section 2: Simple Message Form */}
                    <Reveal delay={400} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white mb-8">{form.title}</h2>

                        <form className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-300">{form.fields.name}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-[#FCC22F] focus:outline-none focus:ring-1 focus:ring-[#FCC22F]"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-slate-300">{form.fields.phone}</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-[#FCC22F] focus:outline-none focus:ring-1 focus:ring-[#FCC22F]"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-300">{form.fields.email}</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-[#FCC22F] focus:outline-none focus:ring-1 focus:ring-[#FCC22F]"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-300">{form.fields.message}</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-[#FCC22F] focus:outline-none focus:ring-1 focus:ring-[#FCC22F]"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-[#C71C22] px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#a5161b] hover:scale-[1.02]"
                            >
                                {form.button}
                            </button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </div>
    )
}
