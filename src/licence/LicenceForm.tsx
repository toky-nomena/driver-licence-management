import { useForm } from '@tanstack/react-form';
import { RefreshCw, Save, LucideWand2 } from 'lucide-react';
import { useEffect } from 'react';

import type { LicenseFormValues } from './types';

import { GenderRadio } from '@/components/GenderRadio';
import { Button } from '@/components/ui/button';
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

export function LicenceForm({ onSubmit }: LicenseFormProps) {
  const licenseForm = useForm<LicenseFormValues>({
    defaultValues,
    onSubmit: async (values) => {
      onSubmit(values.value);
      licenseForm.reset();
    },
  });

  useEffect(() => {
    const firstName = licenseForm.getFieldValue('firstName');
    const lastName = licenseForm.getFieldValue('lastName');
    const dateOfBirth = licenseForm.getFieldValue('dateOfBirth');

    if (firstName && lastName && dateOfBirth) {
      const newLicenseNumber = DriverLicenseFactory.generate({ firstName, lastName, dateOfBirth });
      licenseForm.setFieldValue('drivingLicense', newLicenseNumber.license);
    }
  }, [licenseForm]);

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
                    <Input
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
                    <Input
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
                    <Label htmlFor={field.name}>Date of Birth (Date de naissance)</Label>
                    <Input
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
                    <Input
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
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter description"
                    className="mt-1 resize-none"
                  />
                </div>
              )}
            </licenseForm.Field>

            <licenseForm.Field name="drivingLicense">
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>Driving License</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter driving license number"
                    className="mt-1"
                    readOnly
                  />
                </div>
              )}
            </licenseForm.Field>
          </div>
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow space-x-2">
            <Button type="button" variant="outline" size="sm" onClick={onClickInspire}>
              <LucideWand2 className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onClickReset}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
