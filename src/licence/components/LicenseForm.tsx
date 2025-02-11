import { useForm } from '@tanstack/react-form';
import { RefreshCw, Save, LucideWand2, Loader2 } from 'lucide-react';

import type { LicenseFormValues } from '../types';
import { DriverLicenseFactory } from '../utils/license/DrivingLicenseFactory';
import { provinces } from '../utils/provinces';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { useTranslate } from '@/i18n/TranslationContext';
import { GenderRadio } from '@/licence/components/GenderRadio';
import { InputWithCopy } from '@/licence/components/InputWithCopy';
import { generateRandomData, merge } from '@/licence/utils/data';
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
  middleName: '',
  option: 1,
};

export function LicenseForm({ onSubmit }: LicenseFormProps) {
  const { t } = useTranslate();

  const licenseForm = useForm<LicenseFormValues>({
    defaultValues,
    onSubmit: async ({ value }) => {
      // Simulate a 500ms delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { license: drivingLicense } = DriverLicenseFactory.generate(value);

      if (drivingLicense) {
        onSubmit({ ...value, drivingLicense });
        reset({ province: value.province });
      }
    },
  });

  const reset = (newValues: Partial<LicenseFormValues>) => {
    licenseForm.reset(merge(newValues, defaultValues));
    licenseForm.setFieldValue('province', newValues.province);
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
      role="form"
      className="flex h-full flex-col bg-background shadow-md @container"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void licenseForm.handleSubmit();
      }}
    >
      <div className="gap-2 border-b p-3">
        <h2 className="font-semibold">{t('newLicense')}</h2>
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-4 p-4">
          <div className="space-y-6">
            <div className="grid gap-4 @[400px]:grid-cols-2">
              <licenseForm.Field
                name="firstName"
                validators={{
                  onChange: ({ value }) => isValidName(t('firstName'), value),
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor="firstName">{t('firstName')}</Label>
                    <InputWithCopy
                      data-testid="firstName"
                      aria-labelledby={field.name}
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value.trim())}
                      placeholder={t('enterFirstName')}
                      className="mt-1"
                      error={field.state.meta.errorMap.onChange}
                    />
                  </div>
                )}
              </licenseForm.Field>
              <licenseForm.Field
                name="lastName"
                validators={{
                  onChange: ({ value }) => isValidName(t('lastName'), value),
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor="lastName">{t('lastName')}</Label>
                    <InputWithCopy
                      data-testid="lastName"
                      aria-labelledby={field.name}
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value.trim())}
                      placeholder={t('enterLastName')}
                      className="mt-1"
                      error={field.state.meta.errorMap.onChange}
                    />
                  </div>
                )}
              </licenseForm.Field>
            </div>

            <div className="grid gap-4 @[400px]:grid-cols-2">
              <licenseForm.Field
                name="dateOfBirth"
                validators={{
                  onChange: ({ value }) => isValidDateOfBirth(value),
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>{t('dateOfBirth')}</Label>
                    <InputWithCopy
                      data-testid="dateOfBirth"
                      aria-labelledby={field.name}
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="date"
                      placeholder={t('enterDateOfBirth')}
                      className="mt-1"
                      error={field.state.meta.errorMap.onChange}
                    />
                  </div>
                )}
              </licenseForm.Field>

              <licenseForm.Field name="province">
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>{t('province')}</Label>
                    <Select
                      data-testid="province"
                      aria-labelledby={field.name}
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t('selectProvince')} />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province.code} value={province.code}>
                            {province.name} ({province.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </licenseForm.Field>
            </div>

            <licenseForm.Field name="gender">
              {(field) => (
                <div>
                  <Label>{t('gender')}</Label>
                  <GenderRadio
                    data-testid="gender"
                    aria-labelledby={field.name}
                    className="mt-1"
                    disabled={licenseForm.state.isSubmitting}
                    value={field.state.value as 'male' | 'female'}
                    onChange={(value) => field.handleChange(value)}
                  />
                </div>
              )}
            </licenseForm.Field>

            <div className="grid gap-4 @[400px]:grid-cols-2">
              <licenseForm.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      return t('invalidEmail');
                    }
                  },
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>{t('email')}</Label>
                    <InputWithCopy
                      data-testid="email"
                      aria-labelledby={field.name}
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value.trim())}
                      type="email"
                      placeholder={t('enterEmail')}
                      className="mt-1"
                      error={field.state.meta.errorMap.onChange}
                    />
                  </div>
                )}
              </licenseForm.Field>

              <licenseForm.Field name="option">
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>{t('option')}</Label>
                    <Input
                      data-testid="option"
                      aria-labelledby={field.name}
                      disabled={licenseForm.state.isSubmitting}
                      name={field.name}
                      type="number"
                      value={String(field.state.value)}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      placeholder={t('enterOption')}
                      className="mt-1"
                    />
                  </div>
                )}
              </licenseForm.Field>
            </div>

            <licenseForm.Field name="description">
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>{t('description')}</Label>
                  <Textarea
                    data-testid="description"
                    aria-labelledby={field.name}
                    disabled={licenseForm.state.isSubmitting}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value.trim())}
                    placeholder={t('enterDescription')}
                    className="mt-1 resize-none"
                  />
                </div>
              )}
            </licenseForm.Field>

            <licenseForm.Subscribe
              selector={(state) => state.values}
              children={(values) => {
                const { license } = DriverLicenseFactory.generate(values);
                return (
                  <div>
                    <span className="flex items-center gap-2">
                      <Alert variant="default">
                        <AlertTitle>
                          <span className="mb-2 block text-sm font-medium">
                            {t('drivingLicense')}
                          </span>
                        </AlertTitle>
                        <AlertDescription>
                          {license ? (
                            <div className="flex items-center gap-4">
                              <span
                                data-testid="generatedLicense"
                                className="text-xl font-semibold"
                                aria-label={t('generatedLicense')}
                              >
                                {license}
                              </span>
                              <CopyButton value={license} />
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              {t('emptyFormWarning')}
                            </span>
                          )}
                        </AlertDescription>
                      </Alert>
                    </span>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </ScrollArea>

      <licenseForm.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        children={([canSubmit, isSubmitting]) => (
          <div className="border-t p-4">
            <div className="flex flex-col gap-2 @[400px]:flex-row @[400px]:items-center">
              <div className="flex flex-1 flex-col gap-2 @[400px]:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClickInspire}
                  disabled={isSubmitting}
                >
                  <LucideWand2 className="mr-1 h-4 w-4" />
                  <span>{t('generate')}</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClickReset}
                  disabled={isSubmitting}
                >
                  <RefreshCw className="mr-1 h-4 w-4" />
                  <span>{t('reset')}</span>
                </Button>
              </div>
              <Button type="submit" variant="outline" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-1 h-4 w-4" />
                )}
                <span>{t('save')}</span>
              </Button>
            </div>
          </div>
        )}
      />
    </form>
  );
}
