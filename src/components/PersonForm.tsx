import { useForm } from '@tanstack/react-form';
import { Eraser, Loader2, Save, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { GenderRadio } from './GenderRadio';
import { InputLabel } from './InputLabel';
import { InputWithCopy } from './InputWithCopy';
import { ProvinceSelect } from './ProvinceSelect';
import { Alert } from './ui/alert';
import { CopyButton } from './ui/copy-button';

import { Button } from '@/components/ui/button';
import { isValidDateOfBirth, isValidName, validateEmail } from '@/lib/validators';
import { generateFakeData, type Person } from '@/utils/data';
import { DriverLicenseFactory } from '@/utils/licence/DriverLicenseFactory';

interface PersonFormProps {
  onSubmit: (person: Person) => void;
}

const defaultValues: Person = {
  firstName: '',
  lastName: '',
  email: '',
  driverLicense: '',
  description: '',
  gender: 'male',
  dateOfBirth: '',
  province: 'QC',
};

export function PersonForm({ onSubmit }: PersonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Person>({
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);

      // Simulate async submission
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Reset form and call onSubmit
      form.reset();
      setIsSubmitting(false);
      const license = DriverLicenseFactory.generate({
        firstName: value.firstName,
        lastName: value.lastName,
        dateOfBirth: value.dateOfBirth,
        province: value.province,
        gender: value.gender,
      });

      onSubmit({
        ...value,
        driverLicense: license.license,
        createdAt: new Date(),
      });
    },
  });

  // Handler to generate fake data
  const handleInspire = () => {
    form.reset(generateFakeData(form.state.values));
  };

  // Handler to reset form
  const handleReset = () => form.reset(defaultValues);

  return (
    <div className="space-y-4rounded-lg flex flex-1 flex-col overflow-auto border">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-1 flex-col justify-between space-y-4 p-4"
      >
        <div className="flex-1 space-y-4 bg-background">
          {/* First Name Field */}
          <div>
            <InputLabel description="Prénom" required>
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
                  value={field.state.value}
                  error={field.state.meta.errors[0] || undefined}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              )}
            />
          </div>

          {/* Last Name Field */}
          <div>
            <InputLabel description="Nom de famille" required>
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
                  value={field.state.value}
                  error={field.state.meta.errors[0] || undefined}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              )}
            />
          </div>

          {/* Date of Birth and Province Fields */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <InputLabel description="Date de naissance" required>
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
                    type="date"
                    value={field.state.value}
                    error={field.state.meta.errors[0] || undefined}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <InputLabel>Province</InputLabel>
              <form.Field
                name="province"
                children={(field) => (
                  <ProvinceSelect
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
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
                  value={field.state.value as 'male' | 'female'}
                  onChange={(value) => field.handleChange(value)}
                />
              )}
            />
          </div>

          {/* Email Field */}
          <div>
            <InputLabel description="Adresse email">Email</InputLabel>
            <form.Field
              name="email"
              validators={{
                onChange: () => {
                  return validateEmail(form.state.values.email);
                },
              }}
              children={(field) => (
                <InputWithCopy
                  type="email"
                  value={field.state.value}
                  error={field.state.meta.errors[0] || undefined}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              )}
            />
          </div>
          <div>
            <InputLabel description="Description">Description</InputLabel>
            <form.Field
              name="description"
              children={(field) => (
                <InputWithCopy
                  value={field.state.value}
                  error={field.state.meta.errors[0] || undefined}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              )}
            />
          </div>

          <div>
            <InputLabel>Driver License</InputLabel>
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
                  <Alert variant={error ? 'destructive' : 'default'}>
                    <span className="flex items-center gap-2">
                      {license ? (
                        <span className="text-xl font-semibold">{license}</span>
                      ) : (
                        <div>{error}</div>
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
        <div className="sticky bottom-0 left-0 right-0 z-50 flex items-center gap-2 bg-white/90 p-2 backdrop-blur-sm">
          <Button type="button" variant="outline" onClick={handleInspire}>
            <Sparkles className="mr-2 h-4 w-4" />
            Inspire me
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            <Eraser className="mr-2 h-4 w-4" />
            Clear form
          </Button>
          <Button type="submit" variant="outline" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
