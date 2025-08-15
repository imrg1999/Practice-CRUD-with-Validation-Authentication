import {z} from 'zod'

export const validationSchema = z.object({
    name: z.string().min(1,{
        message: "Invalid name"
    }),
    email: z.string().email({
        message: "Add a valid input"
    }),
    age: z.coerce.number().min(18,{
        message: "Under the valid age criteria"
    }),
    contact: z.string().length(10,{
        message: "Invalid Contact Number"
    }),
    password: z.string().min(8,{
        message: "Invalid Format"
    })
});