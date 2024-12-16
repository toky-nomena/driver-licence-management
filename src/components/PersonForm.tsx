import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Loader2, RefreshCw, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DriverLicenseFactory } from '@/utils/licence/DriverLicenseFactory';
import { generateFakeData, type Person } from '@/utils/data';
import { isValidDateOfBirth, isValidName, validateEmail } from '@/lib/validators';
import { InputWithCopy } from './InputWithCopy';
import { ProvinceSelect } from './ProvinceSelect';
import { InputLabel } from './InputLabel';
import { CopyButton } from './ui/copy-button';
import { Alert } from './ui/alert';

interface PersonFormProps {
  onSubmit: (person: Person) => void;
}

const defaultValues: Person = {
  firstName: '',
  lastName: '',
  email: '',
  driverLicense: '',
  description: '',
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
    <div className="flex flex-1 flex-col space-y-4 rounded-lg border p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-1 flex-col justify-between space-y-4"
      >
        <div className="flex-1 space-y-4">
          {/* Last Name Field */}

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
          {/* Date of Birth Field */}
          <div>
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
          <div>
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
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={handleInspire}>
            <Sparkles className="mr-2 h-4 w-4" />
            Inspire me
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
