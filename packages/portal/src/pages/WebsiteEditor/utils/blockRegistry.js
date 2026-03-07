/**
 * Block Registry
 * Defines all available block types for the Website Editor
 */

export const BLOCK_CATEGORIES = {
  layout: {
    label: 'Layout',
    description: 'Page structure and sections',
  },
  content: {
    label: 'Content',
    description: 'Feature grids, CTAs, and sections',
  },
  media: {
    label: 'Media',
    description: 'Images and videos',
  },
  text: {
    label: 'Text',
    description: 'Rich text content',
  },
  navigation: {
    label: 'Navigation',
    description: 'Header and footer',
  },
};

// Icon paths for block types
const BLOCK_ICONS = {
  hero: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  sectionHeader: 'M4 6h16M4 12h16M4 18h7',
  separator: 'M5 12h14',
  featureGrid: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  stepsGrid: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  ctaSection: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z',
  franchiseSection: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  image: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  video: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  richText: 'M4 6h16M4 12h16m-7 6h7',
  header: 'M4 6h16M4 12h8m-8 6h16',
  footer: 'M4 6h16M4 10h16M4 14h16M4 18h16',
};

// Block definitions
export const BLOCK_TYPES = {
  // Layout blocks
  hero: {
    type: 'hero',
    category: 'layout',
    label: 'Hero Section',
    description: 'Full-width hero with background image, title, and CTA',
    icon: BLOCK_ICONS.hero,
    defaultProps: {
      title: 'Hero Title',
      subtitle: 'Subtitle text goes here',
      ctaText: 'Get Started',
      ctaLink: '#',
      backgroundImage: '',
      backgroundColor: 'var(--gray-900)',
      textAlignment: 'center',
      height: 'large', // small, medium, large
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'textarea', label: 'Subtitle' },
      ctaText: { type: 'text', label: 'Button Text' },
      ctaLink: { type: 'text', label: 'Button Link' },
      backgroundImage: { type: 'image', label: 'Background Image' },
      backgroundColor: { type: 'color', label: 'Background Color' },
      textAlignment: { type: 'select', label: 'Text Alignment', options: ['left', 'center', 'right'] },
      height: { type: 'select', label: 'Height', options: ['small', 'medium', 'large'] },
    },
  },

  sectionHeader: {
    type: 'sectionHeader',
    category: 'layout',
    label: 'Section Header',
    description: 'Section title with optional subtitle',
    icon: BLOCK_ICONS.sectionHeader,
    defaultProps: {
      title: 'Section Title',
      subtitle: '',
      alignment: 'center',
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      alignment: { type: 'select', label: 'Alignment', options: ['left', 'center', 'right'] },
    },
  },

  separator: {
    type: 'separator',
    category: 'layout',
    label: 'Separator',
    description: 'Horizontal divider line',
    icon: BLOCK_ICONS.separator,
    defaultProps: {
      style: 'solid', // solid, dashed, dotted
      color: 'var(--gray-700)',
      spacing: 'medium', // small, medium, large
    },
    schema: {
      style: { type: 'select', label: 'Style', options: ['solid', 'dashed', 'dotted'] },
      color: { type: 'color', label: 'Color' },
      spacing: { type: 'select', label: 'Spacing', options: ['small', 'medium', 'large'] },
    },
  },

  // Content blocks
  featureGrid: {
    type: 'featureGrid',
    category: 'content',
    label: 'Feature Grid',
    description: 'Grid of feature cards with icons',
    icon: BLOCK_ICONS.featureGrid,
    defaultProps: {
      columns: 3,
      features: [
        { icon: 'check', title: 'Feature 1', description: 'Description text' },
        { icon: 'check', title: 'Feature 2', description: 'Description text' },
        { icon: 'check', title: 'Feature 3', description: 'Description text' },
      ],
    },
    schema: {
      columns: { type: 'select', label: 'Columns', options: [2, 3, 4] },
      features: {
        type: 'array',
        label: 'Features',
        itemSchema: {
          icon: { type: 'icon', label: 'Icon' },
          title: { type: 'text', label: 'Title', required: true },
          description: { type: 'textarea', label: 'Description' },
        },
      },
    },
  },

  stepsGrid: {
    type: 'stepsGrid',
    category: 'content',
    label: 'Steps Grid',
    description: 'Numbered steps or process flow',
    icon: BLOCK_ICONS.stepsGrid,
    defaultProps: {
      layout: 'horizontal', // horizontal, vertical
      steps: [
        { number: '01', title: 'Step 1', description: 'Description' },
        { number: '02', title: 'Step 2', description: 'Description' },
        { number: '03', title: 'Step 3', description: 'Description' },
      ],
    },
    schema: {
      layout: { type: 'select', label: 'Layout', options: ['horizontal', 'vertical'] },
      steps: {
        type: 'array',
        label: 'Steps',
        itemSchema: {
          number: { type: 'text', label: 'Number' },
          title: { type: 'text', label: 'Title', required: true },
          description: { type: 'textarea', label: 'Description' },
        },
      },
    },
  },

  ctaSection: {
    type: 'ctaSection',
    category: 'content',
    label: 'CTA Section',
    description: 'Call-to-action section with button',
    icon: BLOCK_ICONS.ctaSection,
    defaultProps: {
      title: 'Ready to get started?',
      description: 'Sign up now and start your journey.',
      buttonText: 'Sign Up',
      buttonLink: '#',
      buttonStyle: 'primary', // primary, secondary
      backgroundColor: 'var(--gray-850)',
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      description: { type: 'textarea', label: 'Description' },
      buttonText: { type: 'text', label: 'Button Text' },
      buttonLink: { type: 'text', label: 'Button Link' },
      buttonStyle: { type: 'select', label: 'Button Style', options: ['primary', 'secondary'] },
      backgroundColor: { type: 'color', label: 'Background Color' },
    },
  },

  franchiseSection: {
    type: 'franchiseSection',
    category: 'content',
    label: 'Franchise Section',
    description: 'Franchise opportunity details',
    icon: BLOCK_ICONS.franchiseSection,
    defaultProps: {
      title: 'Own a Dispatch Franchise',
      description: 'Join our growing network of franchise owners.',
      benefits: [
        'Proven business model',
        'Comprehensive training',
        '99% AI-automated operations',
      ],
      ctaText: 'Learn More',
      ctaLink: '#',
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      description: { type: 'textarea', label: 'Description' },
      benefits: { type: 'stringArray', label: 'Benefits' },
      ctaText: { type: 'text', label: 'Button Text' },
      ctaLink: { type: 'text', label: 'Button Link' },
    },
  },

  // Media blocks
  image: {
    type: 'image',
    category: 'media',
    label: 'Image',
    description: 'Single image with optional caption',
    icon: BLOCK_ICONS.image,
    defaultProps: {
      src: '',
      alt: 'Image description',
      caption: '',
      size: 'full', // small, medium, large, full
      alignment: 'center',
    },
    schema: {
      src: { type: 'image', label: 'Image', required: true },
      alt: { type: 'text', label: 'Alt Text', required: true },
      caption: { type: 'text', label: 'Caption' },
      size: { type: 'select', label: 'Size', options: ['small', 'medium', 'large', 'full'] },
      alignment: { type: 'select', label: 'Alignment', options: ['left', 'center', 'right'] },
    },
  },

  video: {
    type: 'video',
    category: 'media',
    label: 'Video',
    description: 'Embedded video player',
    icon: BLOCK_ICONS.video,
    defaultProps: {
      url: '',
      poster: '',
      autoplay: false,
      loop: false,
      muted: true,
    },
    schema: {
      url: { type: 'text', label: 'Video URL', required: true },
      poster: { type: 'image', label: 'Poster Image' },
      autoplay: { type: 'toggle', label: 'Autoplay' },
      loop: { type: 'toggle', label: 'Loop' },
      muted: { type: 'toggle', label: 'Muted' },
    },
  },

  // Text blocks
  richText: {
    type: 'richText',
    category: 'text',
    label: 'Rich Text',
    description: 'Formatted text content',
    icon: BLOCK_ICONS.richText,
    defaultProps: {
      content: '<p>Enter your text here...</p>',
      maxWidth: 'medium', // small, medium, large, full
    },
    schema: {
      content: { type: 'richtext', label: 'Content', required: true },
      maxWidth: { type: 'select', label: 'Max Width', options: ['small', 'medium', 'large', 'full'] },
    },
  },

  // Navigation blocks
  header: {
    type: 'header',
    category: 'navigation',
    label: 'Header',
    description: 'Page header with logo and navigation',
    icon: BLOCK_ICONS.header,
    defaultProps: {
      logoText: 'Dispatch',
      showLogo: true,
      navLinks: [
        { label: 'Home', href: '#home' },
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Contact', href: '#contact' },
      ],
      ctaText: 'Sign In',
      ctaLink: '/login',
      sticky: true,
    },
    schema: {
      logoText: { type: 'text', label: 'Logo Text' },
      showLogo: { type: 'toggle', label: 'Show Logo' },
      navLinks: {
        type: 'array',
        label: 'Navigation Links',
        itemSchema: {
          label: { type: 'text', label: 'Label', required: true },
          href: { type: 'text', label: 'Link', required: true },
        },
      },
      ctaText: { type: 'text', label: 'CTA Button Text' },
      ctaLink: { type: 'text', label: 'CTA Button Link' },
      sticky: { type: 'toggle', label: 'Sticky Header' },
    },
  },

  footer: {
    type: 'footer',
    category: 'navigation',
    label: 'Footer',
    description: 'Page footer with links and copyright',
    icon: BLOCK_ICONS.footer,
    defaultProps: {
      columns: [
        {
          title: 'Company',
          links: [
            { label: 'About', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Contact', href: '#' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'Blog', href: '#' },
            { label: 'Documentation', href: '#' },
            { label: 'Support', href: '#' },
          ],
        },
      ],
      copyright: '2026 Dispatch Holdings LLC. All rights reserved.',
      showSocial: true,
    },
    schema: {
      columns: {
        type: 'array',
        label: 'Link Columns',
        itemSchema: {
          title: { type: 'text', label: 'Column Title', required: true },
          links: {
            type: 'array',
            label: 'Links',
            itemSchema: {
              label: { type: 'text', label: 'Label', required: true },
              href: { type: 'text', label: 'Link', required: true },
            },
          },
        },
      },
      copyright: { type: 'text', label: 'Copyright Text' },
      showSocial: { type: 'toggle', label: 'Show Social Links' },
    },
  },
};

/**
 * Get block definition by type
 */
export function getBlockDefinition(type) {
  return BLOCK_TYPES[type] || null;
}

/**
 * Get blocks by category
 */
export function getBlocksByCategory(category) {
  return Object.values(BLOCK_TYPES).filter(block => block.category === category);
}

/**
 * Create a new block instance
 */
export function createBlock(type) {
  const definition = getBlockDefinition(type);
  if (!definition) return null;

  return {
    id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    props: { ...definition.defaultProps },
  };
}

/**
 * Validate block props against schema
 */
export function validateBlock(block) {
  const definition = getBlockDefinition(block.type);
  if (!definition) return { valid: false, errors: ['Unknown block type'] };

  const errors = [];

  Object.entries(definition.schema).forEach(([key, field]) => {
    if (field.required && !block.props[key]) {
      errors.push(`${field.label} is required`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

export default BLOCK_TYPES;
