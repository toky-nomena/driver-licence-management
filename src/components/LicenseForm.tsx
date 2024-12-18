import { useForm } from '@tanstack/react-form';
import { Eraser, Loader2, Save, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { GenderRadio } from './GenderRadio';
import { InputLabel } from './InputLabel';
import { InputWithCopy } from './InputWithCopy';
import { ProvinceSelect } from './ProvinceSelect';
import { Alert } from './ui/alert';
import { CopyButton } from './ui/copy-button';
import { Input } from './ui/input';

import { Button } from '@/components/ui/button';
import { isValidDateOfBirth, isValidName, validateEmail } from '@/lib/validators';
import { generateRandomData } from '@/utils/data';
import type { DrivingLicensePayData } from '@/utils/data';
import { DriverLicenseFactory } from '@/utils/license/DrivingLicenseFactory';

interface LicenseFormProps {
  onSubmit: (person: DrivingLicensePayData) => void;
}

const defaultValues: DrivingLicensePayData = {
  firstName: '',
  lastName: '',
  email: '',
  drivingLicense: '',
  description: '',
  gender: 'male',
  dateOfBirth: '',
  province: 'QC',
};

export function LicenseForm({ onSubmit }: LicenseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DrivingLicensePayData>({
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);

      // Simulate async submission
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Reset form and call onSubmit
      form.reset();
      setIsSubmitting(false);
      const license = DriverLicenseFactory.generate({
        firstName: value.firstName,
        lastName: value.lastName,
        dateOfBirth: value.dateOfBirth,
        province: value.province,
        gender: value.gender,
        option: value.option,
      });

      onSubmit({
        ...value,
        drivingLicense: license.license,
        createdAt: new Date(),
      });
    },
  });

  // Handler to generate fake data
  const handleInspire = () => {
    form.reset(generateRandomData(form.state.values));
  };

  // Handler to reset form
  const handleReset = () => form.reset(defaultValues);

  return (
    <div className="flex flex-1 flex-col space-y-4 overflow-auto rounded-lg border">
      <form
        aria-disabled={isSubmitting}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-1 flex-col justify-between p-4"
        noValidate
        role="form"
        aria-label="Driving License Information Form"
      >
        <div className="flex-1 space-y-6">
          {/* First Name Field */}
          <div>
            <InputLabel description="Prénom" required htmlFor="firstName">
              First Name
            </InputLabel>
            <form.Field
              name="firstName"
              validators={{
                onChange: () => {
                  return isValidName('First name', form.state.values.firstName);
                },
              }}
              children={(field) => (
                <InputWithCopy
                  id="firstName"
                  name="firstName"
                  disabled={isSubmitting}
                  value={field.state.value}
                  error={field.state.meta.errors[0] || undefined}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-required="true"
                  aria-invalid={!!field.state.meta.errors[0]}
                  aria-describedby="firstName-error"
                />
              )}
            />
          </div>

          {/* Last Name Field */}
          <div>
            <InputLabel description="Nom de famille" required htmlFor="lastName">
              Last Name
            </InputLabel>
            <form.Field
              name="lastName"
              validators={{
                onChange: () => {
                  return isValidName('Last name', form.state.values.lastName);
                },
              }}
              children={(field) => (
                <InputWithCopy
                  id="lastName"
                  name="lastName"
                  disabled={isSubmitting}
                  value={field.state.value}
                  error={field.state.meta.errors[0] || undefined}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-required="true"
                  aria-invalid={!!field.state.meta.errors[0]}
                  aria-describedby="lastName-error"
                />
              )}
            />
          </div>

          {/* Date of Birth and Province Fields */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <InputLabel description="Date de naissance" required htmlFor="dateOfBirth">
                Date of Birth
              </InputLabel>
              <form.Field
                name="dateOfBirth"
                validators={{
                  onChange: () => {
                    return isValidDateOfBirth(form.state.values.dateOfBirth);
                  },
                }}
                children={(field) => (
                  <InputWithCopy
                    id="dateOfBirth"
                    name="dateOfBirth"
                    disabled={isSubmitting}
                    type="date"
                    value={field.state.value}
                    error={field.state.meta.errors[0] || undefined}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-required="true"
                    aria-invalid={!!field.state.meta.errors[0]}
                    aria-describedby="dateOfBirth-error"
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <InputLabel htmlFor="province">Province</InputLabel>
              <form.Field
                name="province"
                children={(field) => (
                  <ProvinceSelect
                    disabled={isSubmitting}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    aria-required="true"
                  />
                )}
              />
            </div>
          </div>

          {/* Gender Field */}
          <div>
            <InputLabel>Gender</InputLabel>
            <form.Field
              name="gender"
              children={(field) => (
                <GenderRadio
                  disabled={isSubmitting}
                  value={field.state.value as 'male' | 'female'}
                  onChange={(value) => field.handleChange(value)}
                />
              )}
            />
          </div>

          {/* Email Field and Option Field */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <InputLabel description="Adresse email" htmlFor="email">
                Email
              </InputLabel>
              <form.Field
                name="email"
                validators={{
                  onChange: () => {
                    return validateEmail(form.state.values.email);
                  },
                }}
                children={(field) => (
                  <InputWithCopy
                    id="email"
                    name="email"
                    disabled={isSubmitting}
                    type="email"
                    value={field.state.value}
                    error={field.state.meta.errors[0] || undefined}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={!!field.state.meta.errors[0]}
                    aria-describedby="email-error"
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <InputLabel htmlFor="option">Option</InputLabel>
              <form.Field
                name="option"
                children={(field) => (
                  <Input
                    id="option"
                    name="option"
                    disabled={isSubmitting}
                    min="1"
                    max="3"
                    type="number"
                    value={String(field.state.value)}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                  />
                )}
              />
            </div>
          </div>
          <div>
            <InputLabel description="Description" htmlFor="description">
              Description
            </InputLabel>
            <form.Field
              name="description"
              children={(field) => (
                <InputWithCopy
                  id="description"
                  name="description"
                  disabled={isSubmitting}
                  value={field.state.value}
                  error={field.state.meta.errors[0] || undefined}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              )}
            />
          </div>

          <div>
            <InputLabel>Driving License</InputLabel>
            <form.Subscribe
              selector={(state) =>
                [
                  state.values.firstName,
                  state.values.lastName,
                  state.values.dateOfBirth,
                  state.values.province,
                ] as const
              }
              children={([firstName, lastName, dateOfBirth, province]) => {
                const { license, error } = DriverLicenseFactory.generate({
                  firstName,
                  lastName,
                  dateOfBirth,
                  province,
                });

                return (
                  <Alert variant="default" aria-live="polite">
                    <span className="flex items-center gap-2">
                      {license ? (
                        <span
                          className="text-xl font-semibold"
                          aria-label="Generated Driver License Number"
                        >
                          {license}
                        </span>
                      ) : (
                        <div aria-live="assertive">{error}</div>
                      )}
                      {license && <CopyButton value={license} />}
                    </span>
                  </Alert>
                );
              }}
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div
          className="sticky bottom-0 left-0 right-0 z-50 flex items-center gap-2 p-2 backdrop-blur-sm"
          role="toolbar"
          aria-label="Form Actions"
        >
          <Button
            type="button"
            variant="outline"
            onClick={handleInspire}
            disabled={isSubmitting}
            aria-label="Generate Random Driving License Data"
            className="transition-colors duration-200 hover:bg-primary/10 focus:ring-2 focus:ring-primary/50"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Random Data
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isSubmitting}
            aria-label="Reset Form to Default Values"
            className="transition-colors duration-200 hover:bg-destructive/10 focus:ring-2 focus:ring-destructive/50"
          >
            <Eraser className="mr-2 h-4 w-4" />
            Reset Form
          </Button>
          <Button
            type="submit"
            variant="default"
            className="flex-1 transition-colors duration-200 hover:bg-primary/90 focus:ring-2 focus:ring-primary/50"
            disabled={isSubmitting}
            aria-label={isSubmitting ? 'Saving Driving License Data...' : 'Save Driving License'}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}
