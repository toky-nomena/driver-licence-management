import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { CalendarIcon, Loader2, RefreshCw, Wand } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { generateDriverLicense } from "@/utils/licence";
import { generateFakeData, Person } from "@/utils/data";
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
  dateOfBirth: undefined,
};

export function PersonForm({ onSubmit }: PersonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Person>({
    defaultValues,
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
    <div className="p-4 space-y-4 rounded-lg border">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block mb-2">First Name *</label>
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) => {
                return isValidName(value)
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
              onChange: ({ value }) => {
                return isValidName(value) ? undefined : "Last name is required";
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
              onChange: ({ value }) =>
                isValidDateOfBirth(value)
                  ? undefined
                  : "Date of birth is required",
            }}
            children={(field) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.state.value && "text-muted-foreground"
                    )}
                  >
                    {field.state.value ? (
                      format(field.state.value, "MM/dd/yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={field.state.value}
                    onSelect={(date) => field.handleChange(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block mb-2">Email</label>
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (value) {
                  return validateEmail(value) ? undefined : "Invalid email";
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

        {/* Action Buttons */}
        <div className="flex gap-2 items-center">
          <Button type="button" variant="outline" onClick={handleInspire}>
            <Wand className="mr-2 w-4 h-4" />
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
