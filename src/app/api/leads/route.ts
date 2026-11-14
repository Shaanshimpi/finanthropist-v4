import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { message: 'Name, email, and phone are required fields' },
        { status: 400 }
      )
    }

    let message = (body.message || '').trim()
    const trackingLines: string[] = []

    const source = body.source || body.utm_source
    const medium = body.medium || body.utm_medium
    const campaign = body.campaign || body.utm_campaign
    const referrer = body.referrer
    const landingPage = body.landingPage || body.page

    if (source) trackingLines.push(`Source: ${source}`)
    if (medium) trackingLines.push(`Medium: ${medium}`)
    if (campaign) trackingLines.push(`Campaign: ${campaign}`)
    if (referrer) trackingLines.push(`Referrer: ${referrer}`)
    if (landingPage) trackingLines.push(`Landing Page: ${landingPage}`)

    if (trackingLines.length > 0) {
      const trackingBlock = `\n\n[Traffic & Attribution]\n${trackingLines.join('\n')}`
      message = message ? `${message}${trackingBlock}` : `[Traffic & Attribution]\n${trackingLines.join('\n')}`
    }

    // Create the lead in Payload
    const lead = await payload.create({
      collection: 'leads',
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message,
        status: 'new',
      },
    })

    return NextResponse.json(
      {
        message: 'Lead created successfully',
        id: lead.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Failed to create lead',
      },
      { status: 500 }
    )
  }
}
