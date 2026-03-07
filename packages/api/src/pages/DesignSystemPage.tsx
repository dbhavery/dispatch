import React from 'react';

// Note: Ensure tailwind.config.js has fontFamily: { sans: ['Montserrat', 'sans-serif'] }

export default function DispatchDesignSystemPage() {
  return (
    <main className="min-h-screen bg-[#141414] font-sans">
      {/* Top Brand Header */}
      <header className="w-full bg-black/40 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-semibold text-white tracking-tight">
          Sta<span className="text-[#a30000]">Full</span>
        </span>
        <span className="rounded-full bg-[#2a2a2a] border border-neutral-700 px-3 py-1 text-xs font-medium text-neutral-300">
          Design System v1.0
        </span>
      </header>

      <div className="max-w-6xl mx-auto">
        {/* Intro / Hero Section */}
        <section className="px-6 py-8 md:py-10">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Dispatch Design System
              </h1>
              <p className="text-[#e1e1e1] leading-relaxed mb-6">
                The official design system for Dispatch fuel delivery applications.
                This page documents the brand colors, typography scale, and core UI
                components used across all portals and interfaces.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#2a2a2a] px-3 py-1 text-xs font-medium text-[#cfcfcf]">
                  Dark Theme
                </span>
                <span className="rounded-full bg-[#2a2a2a] px-3 py-1 text-xs font-medium text-[#cfcfcf]">
                  Fuel Delivery
                </span>
                <span className="rounded-full bg-[#2a2a2a] px-3 py-1 text-xs font-medium text-[#cfcfcf]">
                  UI Components
                </span>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6">
                <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium mb-4">
                  Summary
                </p>
                <ul className="space-y-3 text-sm text-[#e1e1e1]">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a30000] flex-shrink-0" />
                    Colors — Brand, neutral, and status palette
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a30000] flex-shrink-0" />
                    Typography — Montserrat with defined weights
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a30000] flex-shrink-0" />
                    Components — Buttons, cards, inputs, badges
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a30000] flex-shrink-0" />
                    Usage rules — Consistent spacing and radii
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Color System Section */}
        <section className="px-6 py-8 border-t border-neutral-800">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-100 mb-2">
            Color System
          </h2>
          <p className="text-[#cfcfcf] mb-8 max-w-2xl">
            Brand red is used sparingly for primary actions and accents. Neutrals form the
            foundation of all surfaces. Status colors appear only on small indicators.
          </p>

          {/* Brand & Neutral Palette */}
          <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium mb-4">
            Brand &amp; Neutral Palette
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="h-16 bg-[#a30000]" />
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-100">Brand Red</p>
                <p className="text-xs text-neutral-400 font-mono">#a30000</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="h-16 bg-black" />
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-100">Black</p>
                <p className="text-xs text-neutral-400 font-mono">#000000</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="h-16 bg-[#1a1a1a] border-b border-neutral-700" />
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-100">Dark Gray 1</p>
                <p className="text-xs text-neutral-400 font-mono">#1a1a1a</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="h-16 bg-[#2a2a2a]" />
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-100">Dark Gray 2</p>
                <p className="text-xs text-neutral-400 font-mono">#2a2a2a</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="h-16 bg-white" />
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-100">White</p>
                <p className="text-xs text-neutral-400 font-mono">#ffffff</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="h-16 bg-[#e1e1e1]" />
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-100">Light Gray 1</p>
                <p className="text-xs text-neutral-400 font-mono">#e1e1e1</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="h-16 bg-[#cfcfcf]" />
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-100">Light Gray 2</p>
                <p className="text-xs text-neutral-400 font-mono">#cfcfcf</p>
              </div>
            </div>
          </div>

          {/* Status Colors */}
          <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium mb-4">
            Status Colors
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="h-16 bg-[#22c55e]" />
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-100">Success</p>
                <p className="text-xs text-neutral-400 font-mono">#22c55e</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="h-16 bg-[#eab308]" />
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-100">Warning</p>
                <p className="text-xs text-neutral-400 font-mono">#eab308</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="h-16 bg-[#ef4444]" />
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-100">Error</p>
                <p className="text-xs text-neutral-400 font-mono">#ef4444</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
              <div className="h-16 bg-[#3b82f6]" />
              <div className="p-3">
                <p className="text-sm font-medium text-neutral-100">Info</p>
                <p className="text-xs text-neutral-400 font-mono">#3b82f6</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="px-6 py-8 border-t border-neutral-800">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-100 mb-2">
            Typography
          </h2>
          <p className="text-[#cfcfcf] mb-8 max-w-2xl">
            Montserrat is used throughout Dispatch applications. Only weights 400, 500,
            600, and 700 are permitted. No italics are used anywhere in the design system.
          </p>

          <div className="space-y-4">
            <div className="bg-[#1a1a1a] rounded-xl p-4 md:p-6 border border-neutral-800">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium mb-2">
                    Heading 1
                  </p>
                  <p className="text-3xl md:text-4xl font-semibold text-white">
                    Dispatch H1 — Page Title
                  </p>
                </div>
                <code className="text-xs bg-[#2a2a2a] text-neutral-300 px-3 py-2 rounded-lg font-mono flex-shrink-0">
                  text-3xl md:text-4xl font-semibold text-white
                </code>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-4 md:p-6 border border-neutral-800">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium mb-2">
                    Heading 2
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-neutral-100">
                    Section Heading
                  </p>
                </div>
                <code className="text-xs bg-[#2a2a2a] text-neutral-300 px-3 py-2 rounded-lg font-mono flex-shrink-0">
                  text-xl md:text-2xl font-semibold text-neutral-100
                </code>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-4 md:p-6 border border-neutral-800">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium mb-2">
                    Body Text
                  </p>
                  <p className="text-base font-normal text-[#e1e1e1]">
                    Standard body text for paragraphs, descriptions, and general content
                    throughout the application.
                  </p>
                </div>
                <code className="text-xs bg-[#2a2a2a] text-neutral-300 px-3 py-2 rounded-lg font-mono flex-shrink-0">
                  text-base font-normal text-[#e1e1e1]
                </code>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-4 md:p-6 border border-neutral-800">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium mb-2">
                    Caption / Label
                  </p>
                  <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium">
                    FORM LABEL OR CAPTION TEXT
                  </p>
                </div>
                <code className="text-xs bg-[#2a2a2a] text-neutral-300 px-3 py-2 rounded-lg font-mono flex-shrink-0">
                  text-xs tracking-wide uppercase font-medium
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section className="px-6 py-8 border-t border-neutral-800">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-100 mb-2">
            Core Components
          </h2>
          <p className="text-[#cfcfcf] mb-8 max-w-2xl">
            Preview of common UI elements. All components follow the brand colors,
            consistent spacing, and defined corner radii.
          </p>

          <div className="space-y-6">
            {/* Buttons */}
            <div className="bg-[#1a1a1a] rounded-xl p-4 md:p-6 border border-neutral-800">
              <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium mb-4">
                Buttons
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium bg-[#a30000] text-white hover:bg-red-700 transition-shadow shadow-sm hover:shadow-md"
                >
                  Primary
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium bg-transparent border border-neutral-600 text-[#e1e1e1] hover:bg-[#2a2a2a] hover:border-neutral-500 transition-colors"
                >
                  Secondary
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-neutral-400 hover:text-[#e1e1e1] hover:bg-[#2a2a2a] transition-colors"
                >
                  Ghost
                </button>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium bg-neutral-700 text-neutral-500 cursor-not-allowed opacity-50"
                >
                  Disabled
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="bg-[#1a1a1a] rounded-xl p-4 md:p-6 border border-neutral-800">
              <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium mb-4">
                Cards
              </p>
              <div className="max-w-sm">
                <div className="bg-[#141414] border border-neutral-800 rounded-xl p-4 md:p-6 shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">Card Title</h3>
                    <span className="rounded-full bg-[#a30000]/20 border border-[#a30000]/30 px-2 py-0.5 text-xs font-medium text-[#e1e1e1]">
                      Component
                    </span>
                  </div>
                  <p className="text-sm text-[#cfcfcf] leading-relaxed">
                    A standard card with dark background, subtle border, and
                    rounded corners for content grouping.
                  </p>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="bg-[#1a1a1a] rounded-xl p-4 md:p-6 border border-neutral-800">
              <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium mb-4">
                Inputs
              </p>
              <div className="max-w-sm space-y-2">
                <label className="block text-sm font-medium text-[#e1e1e1]">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-[#141414] border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#a30000] focus:border-[#a30000] transition-colors"
                />
                <p className="text-xs text-neutral-400">
                  Your email will remain private and secure.
                </p>
              </div>
            </div>

            {/* Badges / Status Chips */}
            <div className="bg-[#1a1a1a] rounded-xl p-4 md:p-6 border border-neutral-800">
              <p className="text-xs tracking-wide text-neutral-400 uppercase font-medium mb-4">
                Badges / Status Chips
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-[#22c55e] px-3 py-1 text-xs font-medium text-black">
                  Success
                </span>
                <span className="inline-flex items-center rounded-full bg-[#eab308] px-3 py-1 text-xs font-medium text-black">
                  Warning
                </span>
                <span className="inline-flex items-center rounded-full bg-[#ef4444] px-3 py-1 text-xs font-medium text-white">
                  Error
                </span>
                <span className="inline-flex items-center rounded-full bg-[#3b82f6] px-3 py-1 text-xs font-medium text-white">
                  Info
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-neutral-800 text-center">
          <p className="text-sm text-neutral-500">
            Dispatch Design System v1.0
          </p>
        </footer>
      </div>
    </main>
  );
}
