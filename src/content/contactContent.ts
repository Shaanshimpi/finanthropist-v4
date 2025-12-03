export type ContactContent = {
    hero: {
        title: string
        description: string
    }
    info: {
        title: string
        phoneNumbers: string[]
        email: string
        location: string
        hours: string
    }
    form: {
        title: string
        fields: {
            name: string
            phone: string
            email: string
            message: string
        }
        button: string
    }
}

export const contactContent: ContactContent = {
    hero: {
        title: 'Get in Touch',
        description: "We're here to help you on your trading journey. Reach out to us for any queries.",
    },
    info: {
        title: 'Contact Information',
        phoneNumbers: ['+91 7066334499', '+91 7066337676'],
        email: 'info@finanthropist.com',
        location: 'Nashik, Maharashtra',
        hours: 'Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed',
    },
    form: {
        title: 'Send us a Message',
        fields: {
            name: 'Full Name',
            phone: 'Phone Number',
            email: 'Email Address',
            message: 'Message',
        },
        button: 'Send Message',
    },
}
