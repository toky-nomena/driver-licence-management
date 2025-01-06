import { useForm } from '@tanstack/react-form';
import { RefreshCw, Save, LucideWand2 } from 'lucide-react';

import type { LicenseFormValues } from './types';

import { GenderRadio } from '@/components/GenderRadio';
import { InputWithCopy } from '@/components/InputWithCopy';
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
import { isValidDateOfBirth, isValidName } from '@/lib/validators';
import { generateRandomData } from '@/utils/data';
import { DriverLicenseFactory } from '@/utils/license/DrivingLicenseFactory';

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
      });

      onSubmit({
        ...value,
        drivingLicense: license,
      });

      licenseForm.reset();
    },
  });

  const onClickReset = () => licenseForm.reset(defaultValues);

  const onClickInspire = () => {
    licenseForm.reset({ ...defaultValues, ...generateRandomData(licenseForm.state.values) });
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
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter first name"
                      className="mt-1"
                    />
                    {field.state.meta.errorMap.onChange && (
                      <p className="mt-1 text-sm text-red-500">
                        {field.state.meta.errorMap.onChange}
                      </p>
                    )}
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
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter last name"
                      className="mt-1"
                    />
                    {field.state.meta.errorMap.onChange && (
                      <p className="mt-1 text-sm text-red-500">
                        {field.state.meta.errorMap.onChange}
                      </p>
                    )}
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
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="date"
                      placeholder="Enter date of birth"
                      className="mt-1"
                    />
                    {field.state.meta.errorMap.onChange && (
                      <p className="mt-1 text-sm text-red-500">
                        {field.state.meta.errorMap.onChange}
                      </p>
                    )}
                  </div>
                )}
              </licenseForm.Field>

              <licenseForm.Field name="province">
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Province</Label>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                      defaultValue={field.state.value}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="QC">Quebec (QC)</SelectItem>
                        <SelectItem value="ON">Ontario (ON)</SelectItem>
                        <SelectItem value="BC">British Columbia (BC)</SelectItem>
                        <SelectItem value="AB">Alberta (AB)</SelectItem>
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
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="email"
                      placeholder="Enter email"
                      className="mt-1"
                    />
                    {field.state.meta.errorMap.onChange && (
                      <p className="mt-1 text-sm text-red-500">
                        {field.state.meta.errorMap.onChange}
                      </p>
                    )}
                  </div>
                )}
              </licenseForm.Field>

              <licenseForm.Field name="option">
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Option</Label>
                    <Input
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
                        <div aria-live="assertive">{error}</div>
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
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow space-x-2">
            <Button type="button" variant="outline" size="sm" onClick={onClickInspire}>
              <LucideWand2 className="mr-1 h-4 w-4" />
              <span>Generate</span>
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onClickReset}>
              <RefreshCw className="mr-1 h-4 w-4" />
              <span>Reset</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="outline">
              <Save className="mr-1 h-4 w-4" />
              <span>Save</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
