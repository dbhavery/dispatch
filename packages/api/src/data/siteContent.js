/**
 * Site Content - Editable content for dispatch.app
 * This file contains all editable text, prices, and media references
 * for the Dispatch landing page and related pages.
 *
 * NOTE: This file is the source of truth for site content.
 * The HQ Portal Website Editor reads/writes to this data.
 */

// Environment-aware auth URLs
const isDev = import.meta.env?.DEV ?? (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production');
const AUTH_BASE = isDev ? 'http://localhost:5170' : 'https://auth.dispatch.app';

export const SITE_CONTENT = {
  // ==========================================
  // GLOBAL / BRAND
  // ==========================================
  brand: {
    name: 'Dispatch',
    tagline: 'Mobile fuel delivery for the modern world.',
    copyright: '© 2026 Dispatch Holdings, LLC. All rights reserved.',
    logos: {
      dark: '/logos/dispatch-logo.svg',
      light: '/logos/dispatch-logo-light-transparent.svg',
      white: '/logos/dispatch-logo-white-transparent.svg',
    },
  },

  // ==========================================
  // NAVIGATION
  // ==========================================
  navigation: {
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Franchise', href: '#franchise' },
    ],
    signInUrl: AUTH_BASE,
    signUpUrl: `${AUTH_BASE}/start`,
    signInText: 'Sign In',
    getStartedText: 'Get Started',
  },

  // ==========================================
  // HERO SECTION
  // ==========================================
  hero: {
    title: 'Fuel Delivery,',
    titleAccent: 'Reimagined',
    subtitle: 'Skip the gas station. Get fuel delivered directly to your vehicle wherever you park. Save time, save money, save hassle.',
    primaryCta: {
      text: 'Start Free Trial',
      url: `${AUTH_BASE}/start`,
    },
    secondaryCta: {
      text: 'Watch Demo',
      action: 'showDemoModal',
    },
    stats: [
      { value: '50K+', label: 'Happy Customers' },
      { value: '2M+', label: 'Gallons Delivered' },
      { value: '4.9', label: 'App Rating' },
    ],
  },

  // ==========================================
  // FEATURES SECTION
  // ==========================================
  featuresSection: {
    title: 'Why Choose Dispatch?',
    subtitle: 'The smarter way to fuel your vehicle',
  },

  features: [
    {
      id: 'mobile-delivery',
      iconDark: '/icons/truck-white.svg',
      iconLight: '/icons/truck-black.svg',
      title: 'Mobile Fuel Delivery',
      description: 'Fuel delivered directly to your vehicle at home, work, or anywhere.',
      details: {
        heading: 'Fuel Comes to You',
        bullets: [
          'Delivery to your home, office, or any parking location',
          'All fuel types: Regular, Premium, Diesel, and DEF',
          'GPS-tracked deliveries with real-time notifications',
          'Contactless filling while you sleep, work, or shop',
        ],
      },
    },
    {
      id: 'save-time',
      iconDark: '/icons/speedometer-white.svg',
      iconLight: '/icons/speedometer-black.svg',
      title: 'Save Time',
      description: 'No more gas station trips. Schedule deliveries around your life.',
      details: {
        heading: 'Your Time Matters',
        bullets: [
          'Schedule one-time or recurring deliveries',
          'Flexible delivery windows that fit your schedule',
          'Average customer saves 2+ hours per month',
          'Never wait in line or detour to a gas station again',
        ],
      },
    },
    {
      id: 'guaranteed-savings',
      iconDark: '/icons/currency-dollar-white.svg',
      iconLight: '/icons/currency-dollar-black.svg',
      title: 'Guaranteed Savings',
      description: 'Always $0.10+ below pump prices. No hidden fees, no markup.',
      details: {
        heading: 'Transparent & Fair',
        bullets: [
          'Guaranteed $0.10+ below local pump prices',
          'No membership fees or hidden charges',
          'Bulk delivery discounts for fleets',
          'Subscription plans with additional savings',
        ],
      },
    },
    {
      id: 'safe-secure',
      iconDark: '/icons/shield-check-white.svg',
      iconLight: '/icons/shield-check-black.svg',
      title: 'Safe & Secure',
      description: 'Licensed, insured, and trained delivery professionals.',
      details: {
        heading: 'Safety First',
        bullets: [
          'All drivers are licensed, bonded, and insured',
          'DOT-compliant vehicles and equipment',
          'Background-checked delivery professionals',
          'Spill-proof technology and safety protocols',
        ],
      },
    },
  ],

  // ==========================================
  // HOW IT WORKS SECTION
  // ==========================================
  howItWorksSection: {
    title: 'How It Works',
    subtitle: 'Getting fuel has never been easier',
  },

  steps: [
    {
      id: 'signup',
      number: '1',
      title: 'Sign Up',
      description: 'Create your free account in seconds',
      details: {
        heading: 'Quick & Easy Registration',
        bullets: [
          'Sign up with email, Google, or Apple in under 60 seconds',
          'Add your vehicle details and preferred fuel type',
          'Set your home, work, or frequently visited locations',
          'No credit card required to create your account',
        ],
      },
    },
    {
      id: 'schedule',
      number: '2',
      title: 'Schedule',
      description: 'Choose a delivery time that works for you',
      details: {
        heading: 'Flexible Scheduling Options',
        bullets: [
          'Choose one-time or recurring delivery schedules',
          'Select morning, afternoon, or overnight delivery windows',
          'Set up auto-fill when your tank drops below a threshold',
          'Reschedule or cancel anytime with no fees',
        ],
      },
    },
    {
      id: 'relax',
      number: '3',
      title: 'Relax',
      description: 'We fill your tank while you go about your day',
      details: {
        heading: 'Contactless Delivery',
        bullets: [
          'Our certified driver arrives at your scheduled time',
          'Your vehicle is filled safely and professionally',
          'Receive real-time notifications and digital receipt',
          'Rate your experience and track your fuel history',
        ],
      },
    },
  ],

  // ==========================================
  // PRICING SECTION
  // ==========================================
  pricingSection: {
    title: 'Choose Your Plan',
    subtitle: 'Subscription plans to fit every lifestyle',
  },

  pricing: [
    {
      id: 'weekly',
      name: 'Weekly',
      price: 14.99,
      period: '/week',
      description: 'Flexible weekly deliveries',
      features: [
        'Up to 2 deliveries per week',
        'Real-time tracking',
        'Email receipts',
      ],
      highlight: false,
      ctaText: 'Get Started',
    },
    {
      id: 'biweekly',
      name: 'Bi-Weekly',
      price: 24.99,
      period: '/2 weeks',
      description: 'Best value for regular drivers',
      features: [
        'Up to 4 deliveries per period',
        'Priority scheduling',
        'SMS notifications',
        '5% fuel savings',
      ],
      highlight: true,
      badge: 'Most Popular',
      ctaText: 'Get Started',
    },
    {
      id: 'monthly',
      name: 'Monthly',
      price: 39.99,
      period: '/month',
      description: 'Perfect for commuters',
      features: [
        'Up to 8 deliveries per month',
        'Flexible delivery windows',
        'Dedicated support',
        '8% fuel savings',
      ],
      highlight: false,
      ctaText: 'Get Started',
    },
    {
      id: 'annual',
      name: 'Annual',
      price: 399.99,
      period: '/year',
      description: 'Maximum savings for families',
      features: [
        'Unlimited deliveries',
        'All premium features',
        'Multi-vehicle support',
        '12% fuel savings',
      ],
      highlight: false,
      ctaText: 'Get Started',
    },
  ],

  // ==========================================
  // CTA SECTION
  // ==========================================
  cta: {
    title: 'Ready to Never Visit a Gas Station Again?',
    subtitle: 'Join thousands of customers who have made the switch to Dispatch.',
    buttonText: 'Get Started Free',
    buttonUrl: `${AUTH_BASE}/start`,
  },

  // ==========================================
  // FRANCHISE SECTION
  // ==========================================
  franchiseSection: {
    prefix: 'Own a',
    suffix: 'Franchise',
    subtitle: 'Join the mobile fuel delivery revolution',
  },

  franchiseCards: [
    {
      id: 'opportunities',
      iconDark: '/icons/office-building-white.svg',
      iconLight: '/icons/office-building-black.svg',
      title: 'Franchise Opportunities',
      description: 'Launch your own Dispatch territory with our proven business model, comprehensive training, and ongoing support.',
      linkText: 'Learn More',
      comingSoon: true,
    },
    {
      id: 'investor',
      iconDark: '/icons/trending-up-white.svg',
      iconLight: '/icons/trending-up-black.svg',
      title: 'Investor Relations',
      description: 'Explore investment opportunities in one of the fastest-growing segments of the fuel delivery industry.',
      linkText: 'View Opportunities',
      comingSoon: true,
    },
  ],

  // ==========================================
  // FOOTER
  // ==========================================
  footer: {
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '#features' },
          { label: 'How It Works', href: '#how-it-works' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#', comingSoon: true },
          { label: 'Franchise', href: '#franchise' },
          { label: 'Contact', href: '#', comingSoon: true },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy', href: '#', comingSoon: true },
          { label: 'Terms', href: '#', comingSoon: true },
        ],
      },
    ],
  },

  // ==========================================
  // MODALS
  // ==========================================
  modals: {
    comingSoon: {
      heading: 'Coming Soon',
      message: 'This page is currently under construction. Check back soon!',
      buttonText: 'Got It',
    },
    demo: {
      title: 'Demo Coming Soon',
      heading: 'See Dispatch in Action',
      message: "Our product demo video is currently in production. Sign up to be notified when it's ready!",
      buttonText: 'Get Notified',
    },
  },
};

export default SITE_CONTENT;
