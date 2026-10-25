import Section1BgImage from '@/asset/image/propertyManagement/property-management-hero.png'
import Section2Image1 from '@/asset/image/propertyManagement/section-2-image-1.png'
import Section2Image2 from '@/asset/image/propertyManagement/section-2-image-2.png'
import Section3IconPoint1 from '@/asset/image/propertyManagement/icon-give-home.svg'
import Section3IconPoint2 from '@/asset/image/propertyManagement/icon-calendar-check.svg'
import Section3IconPoint3 from '@/asset/image/propertyManagement/icon-groud-money.svg'
import Section4Image1 from '@/asset/image/propertyManagement/section-4-image-1.jpg'
import Section4Image2 from '@/asset/image/propertyManagement/section-4-image-2.jpg'
import Section4Image3 from '@/asset/image/propertyManagement/section-4-image-3.jpg'
import Section5Icon1 from '@/asset/image/propertyManagement/section-5-icon-1.svg'
import Section5Icon2 from '@/asset/image/propertyManagement/section-5-icon-2.svg'
import Section5Icon3 from '@/asset/image/propertyManagement/section-5-icon-3.svg'
import Section5Icon4 from '@/asset/image/propertyManagement/section-5-icon-4.svg'
import Section6Image1 from '@/asset/image/propertyManagement/section-6-point-1.png'
import Section6Image2 from '@/asset/image/propertyManagement/section-6-point-2.png'
import Section6Image3 from '@/asset/image/propertyManagement/section-6-point-3.png'
import Section6Image4 from '@/asset/image/propertyManagement/section-6-point-4.png'
import Section6Image5 from '@/asset/image/propertyManagement/section-6-point-5.png'
import Section6Image6 from '@/asset/image/propertyManagement/section-6-point-6.png'
import Section7Image1 from '@/asset/image/propertyManagement/section-7-slide-1.jpg'
import Section7Image2 from '@/asset/image/propertyManagement/section-7-slide-2.jpg'
import Section7Image3 from '@/asset/image/propertyManagement/section-7-slide-3.jpg'

const contentPropertyManagement = {
    SECTION1: {
        title: 'PROPERTY MANAGEMENT',
        backgroundImage: Section1BgImage,
    },
    SECTION2: [
        {
            title: "Lembongan's Property Management & Destination Specialist.",
            excerpt: 'YOUR PROPERTY. OUR PRIORITY. ',
            description:
                'Professional property management, Sales Marketing and  bookings expertise for villas and boutique resorts across Nusa Lembongan & Nusa Ceningan. ',
            buttonText: 'Discuss Your Property',
            buttonLink: '#',
            backgroundImage: Section2Image1,
        },
        {
            title: 'LOCAL EXPERTISE. PROFESSIONAL MANAGEMENT.',
            excerpt: '',
            description: `Owning an island property should be rewarding — without having to manage every detail yourself. 
\n
From day-to-day operations to bookings, revenue and marketing, The Lembongan Traveller brings everything together through one experienced, on-island team.`,
            buttonText: '',
            buttonLink: '',
            backgroundImage: Section2Image2,
        },
    ],
    SECTION3: {
        title: 'what we do',
        points: [
            {
                title: 'Property Management ',
                description:
                    'Hands-on local management focused on your property, people and guest experience.',
                icon: Section3IconPoint1,
            },
            {
                title: 'Bookings & Distribution ',
                description:
                    'Connecting your property with the right travellers through direct bookings, leading platforms and our established destination network. ',
                icon: Section3IconPoint2,
            },
            {
                title: 'Sales, Marketing & Revenue',
                description:
                    'Commercial strategy, pricing and destination marketing designed to strengthen performance throughout the year.',
                icon: Section3IconPoint3,
            },
        ],
    },
    SECTION4: {
        title: 'MANAGEMENT OPTIONS',
        excerpt:
            '<p><b class="fw-500">Management Built Around Your Property</b></p>',
        description:
            'Not every owner needs the same level of support. We offer flexible management solutions based on your property, your team and how involved you want to be.',
        points: [
            {
                title: 'Full Property Management ',
                description:
                    'For owners looking for complete operational and bookings management.',
                backgroundImage: Section4Image1,
            },
            {
                title: 'Booking Management ',
                description:
                    'For independently operated villas looking to strengthen bookings and revenue. ',
                backgroundImage: Section4Image2,
            },
            {
                title: 'Commercial & Booking Management',
                description: 'For villa complexes and boutique resorts.',
                backgroundImage: Section4Image3,
            },
        ],
    },
    SECTION5: {
        title: 'Why the lembongan traveler',
        description:
            'We work exclusively in Nusa Lembongan & Nusa Ceningan. That focus gives owners an experienced local team combined with destination reach, reservations, revenue management and marketing. All working towards the same goal.',
        points: [
            {
                title: 'On-Island Team',
                description: 'Operations, reservations, finance & marketing.',
                icon: Section5Icon1,
            },
            {
                title: 'Commercial Expertise',
                description:
                    'Beyond occupancy — focused on sustainable performance.',
                icon: Section5Icon2,
            },
            {
                title: 'Destination Specialists',
                description: 'Focused exclusively on Lembongan & Ceningan.',
                icon: Section5Icon3,
            },
            {
                title: 'Established Reach',
                description: 'Connecting travellers with Lembongan since 2013.',
                icon: Section5Icon4,
            },
        ],
    },
    SECTION6: {
        title: 'PEOPLE BEHIND THE LEMBONGAN TRAVELLER ',
        points: [
            {
                title: 'Founder',
                backgroundImage: Section6Image1,
            },
            {
                title: 'Reservation',
                backgroundImage: Section6Image2,
            },
            {
                title: 'Marketing',
                backgroundImage: Section6Image3,
            },
            {
                title: 'Operations',
                backgroundImage: Section6Image4,
            },
            {
                title: 'Engineering',
                backgroundImage: Section6Image5,
            },
            {
                title: 'Finance ',
                backgroundImage: Section6Image6,
            },
        ],
    },
    SECTION7: {
        title: 'Our Portfolio',
        points: [
            {
                title: 'VILLA',
                description:
                    'We work exclusively in Nusa Lembongan & Nusa Ceningan. That focus gives owners an experienced local team ',
                backgroundImage: Section7Image1,
            },
            {
                title: 'resort',
                description:
                    'Boutique resorts with up to 11 rooms, offering personalised service and shared facilities.',
                backgroundImage: Section7Image2,
            },
            {
                title: 'bungalow',
                description:
                    'Bungalow complexes suited to solo travellers, couples and small retreat groups.',
                backgroundImage: Section7Image3,
            },
        ],
        buttonName: 'Explore More',
        buttonLink: '/stay',
    },
    SECTION8: {
        title: "Let's Talk About Your Property ",
        description:
            "Whether you're preparing a new villa for the market, looking for a new management partner or want to improve the performance of an existing property, we'd love to hear from you. \n",
    },
}

export default contentPropertyManagement
