import { useForm } from "@tanstack/react-form"
import { z } from "zod"

export function useZodForm<T extends z.ZodTypeAny>(
  schema: T,
  onSubmit: (value: z.infer<T>) => Promise<void> | void
) {
  return useForm({
    defaultValues: schema.parse({}), // optional fallback (you can remove later)

    validators: {
      onChange: ({ value }) => {
        const result = schema.safeParse(value)

        if (result.success) return undefined

        return result.error.issues[0]?.message
      },
    },

    onSubmit: async ({ value }) => {
      await onSubmit(value)
    },
  })
}