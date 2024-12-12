import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";
import { format, parse } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateDriverLicense } from "@/utils/licence";
import { generateFakeData, type Person } from "@/utils/data";
import {
  isValidDateOfBirth,
  isValidName,
  validateEmail,
} from "@/lib/validators";

interface PersonFormProps {
  onSubmit: (person: Person) => void;
}

const defaultValues: Person = {
  firstName: "",
  lastName: "",
  email: "",
  driverLicense: "",
  policyNumber: "",
  dateOfBirth: new Date(),
};

export function PersonForm({ onSubmit }: PersonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Person>({
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);

      // Simulate async submission
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Reset form and call onSubmit
      form.reset();
      setIsSubmitting(false);

      onSubmit({
        ...value,
        driverLicense: generateDriverLicense({
          firstName: value.firstName,
          lastName: value.lastName,
          dateOfBirth: value.dateOfBirth,
        }),
      });
    },
  });

  // Handler to generate fake data
  const handleInspire = () => form.reset(generateFakeData());

  // Handler to reset form
  const handleReset = () => form.reset(defaultValues);

  return (
    <div className="flex flex-col flex-1 p-4 space-y-4 rounded-lg border">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col flex-1 justify-between space-y-4"
      >
        <div className="flex-1 space-y-4">
          <div>
            <label className="block mb-2">First Name *</label>
            <form.Field
              name="firstName"
              validators={{
                onChange: () => {
                  return isValidName(form.state.values.firstName)
                    ? undefined
                    : "First name is required";
                },
              }}
              children={(field) => (
                <>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label className="block mb-2">Last Name *</label>
            <form.Field
              name="lastName"
              validators={{
                onChange: () => {
                  return isValidName(form.state.values.lastName)
                    ? undefined
                    : "Last name is required";
                },
              }}
              children={(field) => (
                <>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Date of Birth Field */}
          <div>
            <label className="block mb-2">Date of Birth *</label>
            <form.Field
              name="dateOfBirth"
              validators={{
                onChange: () =>
                  isValidDateOfBirth(form.state.values.dateOfBirth)
                    ? undefined
                    : "Date of birth is required",
              }}
              children={(field) => (
                <>
                  <Input
                    type="date"
                    value={
                      field.state.value
                        ? format(field.state.value, "yyyy-MM-dd")
                        : undefined
                    }
                    onChange={(e) => {
                      field.handleChange(
                        parse(e.target.value, "yyyy-MM-dd", new Date())
                      );
                    }}
                    onBlur={field.handleBlur}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-2">Email</label>
            <form.Field
              name="email"
              validators={{
                onChange: () => {
                  if (form.state.values.email) {
                    return validateEmail(form.state.values.email)
                      ? undefined
                      : "Invalid email";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <>
                  <Input
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label className="block mb-2">Driver License</label>
            <form.Subscribe
              selector={(state) =>
                [
                  state.values.firstName,
                  state.values.lastName,
                  state.values.dateOfBirth,
                ] as const
              }
              children={([firstName, lastName, dateOfBirth]) => (
                <span className="font-semibold">
                  {generateDriverLicense({
                    firstName,
                    lastName,
                    dateOfBirth,
                  }) || "#############"}
                </span>
              )}
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-2 items-center">
          <Button type="button" variant="outline" onClick={handleInspire}>
            <Sparkles className="mr-2 w-4 h-4" />
            Inspire me
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 w-4 h-4" />
            Reset
          </Button>
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
