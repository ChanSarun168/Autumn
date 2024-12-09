import z from "zod"

export const userSchema = z.object({
    name : z.string().min(3).max(255),
    email : z.string().email(),
    phonenumber : z.string().min(7).max(15),
    password:z.string().min(8)
})