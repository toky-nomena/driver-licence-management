import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';

import { provinces } from '../../utils/provinces';
import { LicenseDetails } from '../LicenseDetails';

import { TranslationProvider } from '@/i18n/TranslationContext';
import { format } from '@/lib/date';

describe('LicenseDetails', () => {
  const renderWithTranslation = (ui: React.ReactElement) => {
    return render(<TranslationProvider>{ui}</TranslationProvider>);
  };

  const mockLicense = {
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Michael',
    dateOfBirth: '1990-05-15',
    province: 'ON',
    email: 'john.doe@example.com',
    drivingLicense: 'DL123456',
    description: 'Professional driver',
  };

  beforeEach(() => {
    localStorage.setItem('language', 'en');
  });

  it('renders license details correctly', () => {
    renderWithTranslation(<LicenseDetails license={mockLicense} />);

    // Check personal details
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Michael')).toBeInTheDocument();

    // Check formatted date of birth
    const formattedDOB = format(mockLicense.dateOfBirth, 'YYYY-MM-DD');
    expect(screen.getByText(formattedDOB)).toBeInTheDocument();

    // Check province
    const provinceDetails = provinces.find((p) => p.code === mockLicense.province);
    expect(screen.getByText(provinceDetails?.code || mockLicense.province)).toBeInTheDocument();

    // Check other details
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('DL123456')).toBeInTheDocument();
    expect(screen.getByText('Professional driver')).toBeInTheDocument();
  });

  it('handles license without middle name', () => {
    const licenseWithoutMiddleName = { ...mockLicense, middleName: '' };

    renderWithTranslation(<LicenseDetails license={licenseWithoutMiddleName} />);

    // Verify middle name section is not rendered
    expect(screen.queryByText('Middle Name')).not.toBeInTheDocument();
  });

  it('handles license without description', () => {
    const licenseWithoutDescription = { ...mockLicense, description: undefined };

    renderWithTranslation(<LicenseDetails license={licenseWithoutDescription} />);

    // Verify description section is not rendered
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });

  it('displays copy functionality for each detail', () => {
    renderWithTranslation(<LicenseDetails license={mockLicense} />);

    // Check that each detail is wrapped in a Copy component
    const copyElements = screen.getAllByRole('button', { name: /copy/i });
    expect(copyElements.length).toBeGreaterThan(0);
  });
});
