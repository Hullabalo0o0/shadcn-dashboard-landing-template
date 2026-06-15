import { z } from "zod"

export function zodValidator<T extends z.ZodTypeAny>(schema: T) {
  return {
    onChange: ({ value }: { value: z.infer<T> }) => {
      const result = schema.safeParse(value)

      if (result.success) return undefined

      const errors: Record<string, string> = {}

      for (const issue of result.error.issues) {
        const path = issue.path[0]

        if (typeof path === "string") {
          if (!errors[path]) {
            errors[path] = issue.message
          }
        }
      }

      return errors
    },
  }
}