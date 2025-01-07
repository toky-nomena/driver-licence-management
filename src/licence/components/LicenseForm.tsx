import { useForm } from '@tanstack/react-form';
import { RefreshCw, Save, LucideWand2, Loader2 } from 'lucide-react';

import type { LicenseFormValues } from '../types';
import { DriverLicenseFactory } from '../utils/license/DrivingLicenseFactory';

import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GenderRadio } from '@/licence/components/GenderRadio';
import { InputWithCopy } from '@/licence/components/InputWithCopy';
import { generateRandomData } from '@/licence/utils/data';
import { isValidDateOfBirth, isValidName } from '@/licence/utils/validators';

interface LicenseFormProps {
  onSubmit: (license: LicenseFormValues) => void;
}

const defaultValues: LicenseFormValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  drivingLicense: '',
  description: '',
  gender: 'male',
  province: 'QC',
  option: 1,
};

export function LicenseForm({ onSubmit }: LicenseFormProps) {
  const licenseForm = useForm<LicenseFormValues>({
    defaultValues,
    onSubmit: async ({ value }) => {
      const { license } = DriverLicenseFactory.generate({
        firstName: value.firstName,
        lastName: value.lastName,
        dateOfBirth: value.dateOfBirth,
        province: value.province,
        option: value.option,
      });

      await new Promise((resolve) => setTimeout(resolve, 700));

      onSubmit({
        ...value,
        drivingLicense: license,
      });

      reset({ province: value.province });
    },
  });

  const reset = (newValues: Partial<LicenseFormValues>) => {
    const data = {
      firstName: newValues.firstName || defaultValues.firstName,
      lastName: newValues.lastName || defaultValues.lastName,
      dateOfBirth: newValues.dateOfBirth || defaultValues.dateOfBirth,
      email: newValues.email || defaultValues.email,
      drivingLicense: newValues.drivingLicense || defaultValues.drivingLicense,
      description: newValues.description || defaultValues.description,
      gender: newValues.gender || defaultValues.gender,
      province: newValues.province || defaultValues.province,
      option: newValues.option || defaultValues.option,
    };

    console.log({ newValues, data });

    licenseForm.reset(data);
  };

  const onClickReset = () => {
    reset({ province: licenseForm.state.values.province || defaultValues.province });
  };

  const onClickInspire = () => {
    reset({
      ...generateRandomData(licenseForm.state.values),
      province: licenseForm.state.values.province || defaultValues.province,
    });
  };

  return (
    <form
      className="flex h-full flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void licenseForm.handleSubmit();
      }}
    >
      <div className="border-b p-3">
        <h2 className="font-semibold">New License</h2>
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-4 p-4">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <licenseForm.Field
                name="firstName"
                validators={{
                  onChange: ({ value }) => isValidName('First name', value),
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>First Name (Prénom)</Label>
                    <InputWithCopy
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter first name"
                      className="mt-1"
                      error={field.state.meta.errorMap.onChange}
                    />
                  </div>
                )}
              </licenseForm.Field>
              <licenseForm.Field
                name="lastName"
                validators={{
                  onChange: ({ value }) => isValidName('Last name', value),
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Last Name (Nom de famille)</Label>
                    <InputWithCopy
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter last name"
                      className="mt-1"
                      error={field.state.meta.errorMap.onChange}
                    />
                  </div>
                )}
              </licenseForm.Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <licenseForm.Field
                name="dateOfBirth"
                validators={{
                  onChange: ({ value }) => isValidDateOfBirth(value),
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Date of Birth</Label>
                    <InputWithCopy
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="date"
                      placeholder="Enter date of birth"
                      className="mt-1"
                      error={field.state.meta.errorMap.onChange}
                    />
                  </div>
                )}
              </licenseForm.Field>

              <licenseForm.Field name="province">
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Province</Label>
                    <Select
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="QC">Quebec (QC)</SelectItem>
                        <SelectItem value="ON">Ontario (ON)</SelectItem>
                        <SelectItem value="BC">British Columbia (BC)</SelectItem>
                        <SelectItem value="AB">Alberta (AB)</SelectItem>
                        <SelectItem value="NB">New Brunswick (NB)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </licenseForm.Field>
            </div>

            <licenseForm.Field name="gender">
              {(field) => (
                <div>
                  <Label className="block text-sm font-medium text-gray-700">Gender</Label>
                  <GenderRadio
                    disabled={licenseForm.state.isSubmitting}
                    className="mt-1"
                    value={field.state.value as 'male' | 'female'}
                    onChange={(value) => field.handleChange(value)}
                  />
                </div>
              )}
            </licenseForm.Field>

            <div className="grid gap-4 md:grid-cols-2">
              <licenseForm.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      return 'Invalid email format';
                    }
                  },
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Email (Adresse email)</Label>
                    <InputWithCopy
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="email"
                      placeholder="Enter email"
                      className="mt-1"
                      error={field.state.meta.errorMap.onChange}
                    />
                  </div>
                )}
              </licenseForm.Field>

              <licenseForm.Field name="option">
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Option</Label>
                    <Input
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      type="number"
                      value={String(field.state.value)}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      placeholder="Enter option"
                      className="mt-1"
                    />
                  </div>
                )}
              </licenseForm.Field>
            </div>

            <licenseForm.Field name="description">
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>Description</Label>
                  <Textarea
                    disabled={licenseForm.state.isSubmitting}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter description"
                    className="mt-1 resize-none"
                  />
                </div>
              )}
            </licenseForm.Field>

            <licenseForm.Subscribe
              selector={(state) =>
                [
                  state.values.firstName,
                  state.values.lastName,
                  state.values.dateOfBirth,
                  state.values.province,
                  state.values.option,
                ] as const
              }
              children={([firstName, lastName, dateOfBirth, province, option]) => {
                const { license, errors } = DriverLicenseFactory.generate({
                  firstName,
                  lastName,
                  dateOfBirth,
                  province,
                  option,
                });

                return (
                  <div>
                    <Label className="mb-2 block text-sm font-medium">Driving License</Label>

                    <span className="flex items-center gap-2">
                      {license ? (
                        <span
                          className="text-xl font-semibold"
                          aria-label="Generated Driver License Number"
                        >
                          {license}
                        </span>
                      ) : (
                        <ul aria-live="assertive" className="list-disc pl-6 text-sm text-red-500">
                          {errors.map((error) => (
                            <li key={error}>{error}</li>
                          ))}
                        </ul>
                      )}
                      {license && <CopyButton value={license} />}
                    </span>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </ScrollArea>

      <licenseForm.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-grow space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClickInspire}
                  disabled={isSubmitting}
                >
                  <LucideWand2 className="mr-1 h-4 w-4" />
                  <span>Generate</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClickReset}
                  disabled={!canSubmit || isSubmitting}
                >
                  <RefreshCw className="mr-1 h-4 w-4" />
                  <span>Reset</span>
                </Button>
              </div>
              <div className="flex gap-2">
                <Button type="submit" variant="outline" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-1 h-4 w-4" />
                  )}
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      />
    </form>
  );
}
