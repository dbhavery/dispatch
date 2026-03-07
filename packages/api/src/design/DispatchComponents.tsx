/**
 * Dispatch JSX Reference Components v2.0
 * Authoritative Design System - React/JSX Components
 * Created: 2026-01-21
 * Authority: Design Authority
 *
 * IMPORTANT: These are reference implementations.
 * All components follow the design rules from tokens.css and components.css.
 * DO NOT modify without explicit approval.
 */

import React, { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// =============================================================================
// TYPES
// =============================================================================

type ButtonVariant = 'primary' | 'secondary' | 'icon';
type PillVariant = 'red' | 'green' | 'yellow' | 'blue' | 'grey' | 'success' | 'warning' | 'error' | 'info';
type FuelType = 'diesel' | 'regular' | 'premium' | 'def';

interface CardProps {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

interface PillProps {
  variant?: PillVariant;
  glossy?: boolean;
  children: ReactNode;
  className?: string;
}

interface ProgressProps {
  value: number;
  max?: number;
  variant?: PillVariant;
  className?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  recessed?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

interface FuelGaugeProps {
  level: number;
  fuelType: FuelType;
  className?: string;
}

// =============================================================================
// CARD COMPONENTS
// =============================================================================

/**
 * Base Card Component - Satin finish with top sheen
 *
 * Usage:
 * <SfCard>Content here</SfCard>
 * <SfCard clickable onClick={handleClick}>Clickable card</SfCard>
 */
export function SfCard({ children, className = '', clickable = false, onClick }: CardProps) {
  const baseClass = clickable ? 'dp-card dp-card-clickable' : 'dp-card';
  return (
    <div
      className={`${baseClass} ${className}`.trim()}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Feature Card - For feature highlights
 */
export function SfCardFeature({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`dp-card dp-card-feature ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

/**
 * KPI Card - For metrics and statistics
 */
export function SfCardKpi({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`dp-card dp-card-kpi ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Map Card - For map displays (16:9 aspect ratio)
 */
export function SfCardMap({ children, className = '' }: Omit<CardProps, 'clickable' | 'onClick'>) {
  return (
    <div className={`dp-card dp-card-map ${className}`.trim()}>
      {children}
    </div>
  );
}

/**
 * Map Surface - The actual map container
 */
export function SfMapSurface({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`dp-map-surface ${className}`.trim()}>
      {children}
    </div>
  );
}

// =============================================================================
// BUTTON COMPONENTS
// =============================================================================

/**
 * Button Component - Primary (glossy red), Secondary (outline), Icon
 *
 * Usage:
 * <SfButton variant="primary">Get Started</SfButton>
 * <SfButton variant="secondary">Learn More</SfButton>
 * <SfButton variant="icon"><IconComponent /></SfButton>
 */
export function SfButton({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const variantClass = {
    primary: 'dp-btn-primary',
    secondary: 'dp-btn-secondary',
    icon: 'dp-btn-icon'
  }[variant];

  return (
    <button className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

/**
 * Theme Toggle Button
 */
export function SfThemeToggle({ onClick, className = '' }: { onClick?: () => void; className?: string }) {
  return (
    <button className={`dp-theme-toggle ${className}`.trim()} onClick={onClick} aria-label="Toggle theme">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    </button>
  );
}

// =============================================================================
// PILL / BADGE COMPONENTS
// =============================================================================

/**
 * Pill Component - Glossy badges with color variants
 *
 * Usage:
 * <SfPill variant="success" glossy>Active</SfPill>
 * <SfPill variant="red">Alert</SfPill>
 */
export function SfPill({ variant = 'grey', glossy = true, children, className = '' }: PillProps) {
  const baseClass = glossy ? 'dp-pill-glossy' : 'dp-pill';
  const variantClass = `dp-pill-${variant}`;

  return (
    <span className={`${baseClass} ${variantClass} ${className}`.trim()}>
      {children}
    </span>
  );
}

// =============================================================================
// PROGRESS BAR COMPONENT
// =============================================================================

/**
 * Progress Bar - Glossy fill with recessed track
 *
 * Usage:
 * <SfProgress value={75} variant="green" />
 */
export function SfProgress({ value, max = 100, variant = 'red', className = '' }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const fillClass = `dp-fill-${variant === 'success' ? 'green' : variant === 'error' ? 'red' : variant}`;

  return (
    <div className={`dp-progress-track ${className}`.trim()}>
      <div
        className={`dp-progress-fill ${fillClass}`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
}

// =============================================================================
// FORM COMPONENTS
// =============================================================================

/**
 * Input Field - Standard and recessed variants
 *
 * Usage:
 * <SfInput placeholder="Enter text..." />
 * <SfInput recessed placeholder="Recessed input" />
 */
export function SfInput({ recessed = false, className = '', ...props }: InputProps) {
  const inputClass = recessed ? 'dp-input dp-input-recessed' : 'dp-input';

  return (
    <input className={`${inputClass} ${className}`.trim()} {...props} />
  );
}

/**
 * Checkbox Component
 */
export function SfCheckbox({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input type="checkbox" className={`dp-checkbox ${className}`.trim()} {...props} />
  );
}

/**
 * Radio Component
 */
export function SfRadio({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input type="radio" className={`dp-radio ${className}`.trim()} {...props} />
  );
}

/**
 * Toggle Switch Component
 */
export function SfToggle({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input type="checkbox" className={`dp-toggle ${className}`.trim()} {...props} />
  );
}

// =============================================================================
// LIST COMPONENTS
// =============================================================================

/**
 * Leaderboard Item
 */
export function SfLeaderboardItem({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      className={`dp-leaderboard-item ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Customer List Item
 */
export function SfCustomerItem({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      className={`dp-customer-item ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Vehicle Grid Item
 */
export function SfVehicleItem({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      className={`dp-vehicle-item ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

// =============================================================================
// SCROLLABLE CONTAINER
// =============================================================================

/**
 * Scrollable Container - Dark and Light variants with recessed styling
 *
 * Usage:
 * <SfScrollable theme="dark" style={{ height: '200px' }}>Content</SfScrollable>
 */
export function SfScrollable({
  theme = 'dark',
  children,
  className = '',
  style
}: {
  theme?: 'dark' | 'light';
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const themeClass = theme === 'dark' ? 'dp-scrollable-dark' : 'dp-scrollable-light';

  return (
    <div className={`${themeClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

// =============================================================================
// DIVIDER COMPONENT
// =============================================================================

/**
 * Divider - Horizontal and Vertical variants
 *
 * Usage:
 * <SfDivider />
 * <SfDivider vertical />
 */
export function SfDivider({ vertical = false, className = '' }: { vertical?: boolean; className?: string }) {
  const dividerClass = vertical ? 'dp-divider-vertical' : 'dp-divider';

  return <div className={`${dividerClass} ${className}`.trim()} />;
}

// =============================================================================
// MODAL COMPONENT
// =============================================================================

/**
 * Modal Component - With backdrop and animated content
 *
 * Usage:
 * <SfModal isOpen={showModal} onClose={() => setShowModal(false)}>
 *   <SfCard>Modal content here</SfCard>
 * </SfModal>
 */
export function SfModal({ isOpen, onClose, children, className = '' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={`dp-modal-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`dp-modal-content ${isOpen ? 'active' : ''} ${className}`.trim()}
        role="dialog"
        aria-modal="true"
      >
        {children}
        <button
          className="dp-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
}

// =============================================================================
// TYPOGRAPHY COMPONENTS
// =============================================================================

/**
 * Text Components - Heading, Subheading, Body, Muted
 */
export function SfTextHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`dp-text-heading ${className}`.trim()}>{children}</h2>;
}

export function SfTextSubheading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`dp-text-subheading ${className}`.trim()}>{children}</p>;
}

export function SfTextBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`dp-text-body ${className}`.trim()}>{children}</p>;
}

export function SfTextMuted({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`dp-text-muted ${className}`.trim()}>{children}</span>;
}

export function SfTextLarge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`dp-text-large ${className}`.trim()}>{children}</span>;
}

// =============================================================================
// LAYOUT COMPONENTS
// =============================================================================

/**
 * Page Container
 */
export function SfPage({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`dp-page ${className}`.trim()}>{children}</div>;
}

/**
 * Main Grid (3-column layout)
 */
export function SfMainGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`dp-main-grid ${className}`.trim()}>{children}</div>;
}

/**
 * Column
 */
export function SfColumn({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`dp-column ${className}`.trim()}>{children}</div>;
}

// =============================================================================
// FUEL GAUGE COMPONENT
// =============================================================================

/**
 * Fuel Gauge - Tank visualization with glossy fill
 *
 * Usage:
 * <SfFuelGauge level={75} fuelType="diesel" />
 */
export function SfFuelGauge({ level, fuelType, className = '' }: FuelGaugeProps) {
  const fuelClass = `dp-fuel-${fuelType}`;
  const clampedLevel = Math.min(100, Math.max(0, level));

  return (
    <div className={`dp-fuel-gauge ${className}`.trim()}>
      <div
        className={`dp-fuel-level ${fuelClass}`}
        style={{ height: `${clampedLevel}%` }}
        role="meter"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${fuelType} fuel level: ${level}%`}
      />
    </div>
  );
}

// =============================================================================
// GLOSSY UTILITY COMPONENT
// =============================================================================

/**
 * Glossy wrapper - Adds glossy sheen to any element
 *
 * Usage:
 * <SfGlossy fill="red"><div>Glossy content</div></SfGlossy>
 */
export function SfGlossy({
  fill = 'red',
  children,
  className = ''
}: {
  fill?: 'red' | 'green' | 'yellow' | 'blue' | 'grey';
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`dp-glossy dp-fill-${fill} ${className}`.trim()}>
      {children}
    </div>
  );
}

// =============================================================================
// EXPORT ALL
// =============================================================================

export default {
  // Cards
  SfCard,
  SfCardFeature,
  SfCardKpi,
  SfCardMap,
  SfMapSurface,
  // Buttons
  SfButton,
  SfThemeToggle,
  // Pills
  SfPill,
  // Progress
  SfProgress,
  // Forms
  SfInput,
  SfCheckbox,
  SfRadio,
  SfToggle,
  // Lists
  SfLeaderboardItem,
  SfCustomerItem,
  SfVehicleItem,
  // Scrollable
  SfScrollable,
  // Divider
  SfDivider,
  // Modal
  SfModal,
  // Typography
  SfTextHeading,
  SfTextSubheading,
  SfTextBody,
  SfTextMuted,
  SfTextLarge,
  // Layout
  SfPage,
  SfMainGrid,
  SfColumn,
  // Fuel Gauge
  SfFuelGauge,
  // Glossy
  SfGlossy
};
