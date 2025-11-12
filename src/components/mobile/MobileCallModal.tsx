'use client'

import React, { useEffect } from 'react'

type MobileCallModalProps = {
  open: boolean
  onClose: () => void
  numbers: string[]
}

export const MobileCallModal: React.FC<MobileCallModalProps> = ({ open, onClose, numbers }) => {
  useEffect(() => {
    if (!open) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [open])

  if (!open) return null

  const handleBackdropClick = () => onClose()
  const handleContentClick: React.MouseEventHandler<HTMLDivElement> = (event) =>
    event.stopPropagation()

  const normalizeNumber = (num: string) => num.replace(/[^\d+]/g, '')

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-end justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-slate-900 p-6 text-white shadow-2xl"
        onClick={handleContentClick}
      >
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/20" />
        <div className="space-y-4 text-center">
          <div>
            <h3 className="text-lg font-bold">Call Our Team</h3>
            <p className="mt-1 text-sm text-white/60">
              Choose a number to connect with our advisors instantly.
            </p>
          </div>

          <div className="space-y-3">
            {numbers.map((number) => (
              <a
                key={number}
                href={`tel:${normalizeNumber(number)}`}
                className="block rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-base font-semibold tracking-wide transition hover:border-[#FCC22F] hover:bg-white/15"
              >
                {number}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileCallModal

