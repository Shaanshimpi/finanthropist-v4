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

    // Create the lead in Payload
    const lead = await payload.create({
      collection: 'leads',
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message || '',
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

