/**
 * Tests for DesignSystemPage (src/pages/DesignSystemPage.tsx)
 *
 * Verifies:
 *   - Page renders without crashing
 *   - Major sections are present (Color Palette, Typography, Buttons, etc.)
 *   - KPI cards render with correct labels
 *   - Fuel level progress bars are rendered
 *   - Design system version label is displayed
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DesignSystemPage from '../pages/DesignSystemPage';

describe('DesignSystemPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<DesignSystemPage />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders the Dispatch logo text', () => {
    const { container } = render(<DesignSystemPage />);

    // The logo uses "Dis" + <span class="dp-logo-red">patch</span>
    const logoElement = container.querySelector('.dp-logo');
    expect(logoElement).toBeTruthy();
    expect(logoElement!.textContent).toContain('Dispatch');
  });

  it('renders the DESIGN SYSTEM label', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('DESIGN SYSTEM')).toBeInTheDocument();
  });

  it('renders the Color Palette section', () => {
    render(<DesignSystemPage />);

    const colorPaletteSections = screen.getAllByText('Color Palette');
    expect(colorPaletteSections.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Typography sections', () => {
    render(<DesignSystemPage />);

    const typographySections = screen.getAllByText('Typography');
    expect(typographySections.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Button sections', () => {
    render(<DesignSystemPage />);

    const buttonSections = screen.getAllByText('Buttons');
    expect(buttonSections.length).toBeGreaterThanOrEqual(1);
  });

  it('renders all 4 KPI cards', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('ORDERS')).toBeInTheDocument();
    expect(screen.getByText('DISPATCH')).toBeInTheDocument();
    expect(screen.getByText('INVENTORY')).toBeInTheDocument();
    expect(screen.getByText('REVENUE')).toBeInTheDocument();
  });

  it('renders KPI values', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('128')).toBeInTheDocument();
    expect(screen.getByText('$84k')).toBeInTheDocument();
    expect(screen.getByText('12,500')).toBeInTheDocument();
  });

  it('renders the Fuel Level section with all fuel types', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('Fuel Level')).toBeInTheDocument();
    // Fuel type names appear in both Color Palette pills and Fuel Level bars
    expect(screen.getAllByText('Diesel').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Regular').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Premium').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('DEF').length).toBeGreaterThanOrEqual(2);
  });

  it('renders the Recent Alerts section', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('Recent Alerts')).toBeInTheDocument();
    expect(screen.getByText('Low fuel warning')).toBeInTheDocument();
    expect(screen.getByText('Order delayed')).toBeInTheDocument();
    expect(screen.getByText('Delivery complete')).toBeInTheDocument();
  });

  it('renders the Order Queue section', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('Order Queue')).toBeInTheDocument();
    expect(screen.getByText('#58294')).toBeInTheDocument();
    expect(screen.getByText('#58295')).toBeInTheDocument();
  });

  it('renders the Driver Leaderboard', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('Driver Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Erik F.')).toBeInTheDocument();
    expect(screen.getByText('Maria S.')).toBeInTheDocument();
  });

  it('renders Status Indicators section', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('Status Indicators')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('renders the Spacing Scale section', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('Spacing Scale')).toBeInTheDocument();
  });

  it('renders the version label', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText(/Design System v1\.0/)).toBeInTheDocument();
  });

  it('renders the Expense Split donut chart section', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('Expense Split')).toBeInTheDocument();
    expect(screen.getByText(/Fuel 56%/)).toBeInTheDocument();
    expect(screen.getByText(/Labor 24%/)).toBeInTheDocument();
  });

  it('renders the Recent Transactions section', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
    expect(screen.getByText('Inventory refill')).toBeInTheDocument();
    expect(screen.getByText('+$9,287')).toBeInTheDocument();
  });

  it('renders action buttons: Get Fuel, Confirm Delivery, etc.', () => {
    render(<DesignSystemPage />);

    const getFuelButtons = screen.getAllByText('Get Fuel');
    expect(getFuelButtons.length).toBeGreaterThanOrEqual(1);

    const confirmButtons = screen.getAllByText('Confirm Delivery');
    expect(confirmButtons.length).toBeGreaterThanOrEqual(1);
  });
});
