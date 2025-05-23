import z from "zod"

export const AdminSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})