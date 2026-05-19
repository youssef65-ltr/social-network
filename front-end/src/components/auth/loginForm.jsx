import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// import { toast } from "sonner"
import * as z from "zod"

import { axiosClient } from "../../../api/axios"

import { Loader } from 'lucide-react';

const formSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(30, "Password must be at most 30 characters"),
})

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "admin@gmail.com",
            password: "12345678",
        },
    })

    const onSubmit = async (data) => {
        try {
            await axiosClient.get("/sanctum/csrf-cookie")
            await axiosClient.post("/login", data)
            // toast.success("Logged in successfully!")
        } catch (err) {
            const serverErrors = err?.response?.data?.errors

            if (serverErrors) {
                // Map Laravel validation errors back into the form
                Object.entries(serverErrors).forEach(([field, messages]) => {
                    setError(field, {
                        type: "server",
                        message: Array.isArray(messages) ? messages[0] : messages,
                    })
                })
            } else {
                // toast.error(err?.response?.data?.message ?? "Something went wrong.")
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldSet>
                <FieldGroup>
                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            aria-invalid={!!errors.email}
                            {...register("email")}
                        />
                        {errors.email ? (
                            <FieldError>{errors.email.message}</FieldError>
                        ) : (
                            <FieldDescription>Email should be valid</FieldDescription>
                        )}
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Your password"
                            aria-invalid={!!errors.password}
                            {...register("password")}
                        />
                        {errors.password ? (
                            <FieldError>{errors.password.message}</FieldError>
                        ) : (
                            <FieldDescription>At least 8 characters</FieldDescription>
                        )}
                    </Field>

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader className="animate-spin"/>} login
                    </Button>
                </FieldGroup>
            </FieldSet>
        </form>
    )
}