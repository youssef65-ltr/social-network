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
import { Textarea } from "@/components/ui/textarea"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Loader } from "lucide-react"
import { registerUser, selectAuthStatus } from "@/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/gif"]

const formSchema = z
    .object({
        username: z
            .string().regex(/^[a-zA-Z0-9_-]+$/, {
                message: "Only alphanumeric characters, dashes, and underscores are allowed",
            })
            .min(1, "Username is required")
            .max(30, "Username must be at most 30 characters"),

        name: z
            .string()
            .min(1, "Name is required")
            .max(30, "Name must be at most 30 characters"),

        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),

        age: z
            .coerce  // coerce converts the string input value to a number
            .number({ invalid_type_error: "Age must be a number" })
            .int()
            .min(14, "You must be at least 14 years old")
            .max(100, "Age must be at most 100"),

        bio: z
            .string()
            .min(50, "Bio must be at least 50 characters")
            .max(250, "Bio must be at most 250 characters")
            .optional()
            .or(z.literal("")),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        password_confirmation: z
            .string()
            .min(1, "Please confirm your password"),

        profile_img: z
            .instanceof(File)
            .refine((f) => f.size <= MAX_FILE_SIZE, "Max image size is 2MB")
            .refine((f) => ACCEPTED_IMAGE_TYPES.includes(f.type), "Only jpeg, png, jpg, gif are allowed")
            .optional(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    })

export default function RegisterForm() {
    const dispatch = useAppDispatch()
    const authStatus = useAppSelector(selectAuthStatus)
    const isLoading = authStatus === "loading"

    const {
        register,
        handleSubmit,
        setError,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            name: "",
            email: "",
            age: "",
            bio: "",
            password: "",
            password_confirmation: "",
        },
    })

    // Watch the file so the label can show the selected filename
    const selectedFile = watch("profile_img")

    const onSubmit = async (data) => {
        try {
            await dispatch(registerUser(data)).unwrap()
        } catch (err) {
            const serverErrors = err?.errors
            if (serverErrors) {
                Object.entries(serverErrors).forEach(([field, messages]) => {
                    setError(field, {
                        type: "server",
                        message: Array.isArray(messages) ? messages[0] : messages,
                    })
                })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldSet>
                <FieldGroup>

                    {/* Username */}
                    <Field>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input
                            id="username"
                            type="text"
                            placeholder="e.g. john_doe"
                            aria-invalid={!!errors.username}
                            {...register("username")}
                        />
                        {errors.username ? (
                            <FieldError>{errors.username.message}</FieldError>
                        ) : (
                            <FieldDescription>Max 30 characters</FieldDescription>
                        )}
                    </Field>

                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            placeholder="e.g. John Doe"
                            aria-invalid={!!errors.name}
                            {...register("name")}
                        />
                        {errors.name ? (
                            <FieldError>{errors.name.message}</FieldError>
                        ) : (
                            <FieldDescription>Your display name</FieldDescription>
                        )}
                    </Field>

                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="john@example.com"
                            aria-invalid={!!errors.email}
                            {...register("email")}
                        />
                        {errors.email ? (
                            <FieldError>{errors.email.message}</FieldError>
                        ) : (
                            <FieldDescription>Must be a valid email address</FieldDescription>
                        )}
                    </Field>

                    {/* Age */}
                    <Field>
                        <FieldLabel htmlFor="age">Age</FieldLabel>
                        <Input
                            id="age"
                            type="number"
                            placeholder="e.g. 20"
                            aria-invalid={!!errors.age}
                            {...register("age")}
                        />
                        {errors.age ? (
                            <FieldError>{errors.age.message}</FieldError>
                        ) : (
                            <FieldDescription>Must be between 14 and 100</FieldDescription>
                        )}
                    </Field>

                    {/* Bio */}
                    <Field>
                        <FieldLabel htmlFor="bio">Bio</FieldLabel>
                        <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            aria-invalid={!!errors.bio}
                            {...register("bio")}
                        />
                        {errors.bio ? (
                            <FieldError>{errors.bio.message}</FieldError>
                        ) : (
                            <FieldDescription>Optional · 100–250 characters</FieldDescription>
                        )}
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Min 8 characters"
                            aria-invalid={!!errors.password}
                            {...register("password")}
                        />
                        {errors.password ? (
                            <FieldError>{errors.password.message}</FieldError>
                        ) : (
                            <FieldDescription>At least 8 characters</FieldDescription>
                        )}
                    </Field>

                    {/* Confirm Password */}
                    <Field>
                        <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
                        <Input
                            id="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Repeat your password"
                            aria-invalid={!!errors.password_confirmation}
                            {...register("password_confirmation")}
                        />
                        {errors.password_confirmation ? (
                            <FieldError>{errors.password_confirmation.message}</FieldError>
                        ) : (
                            <FieldDescription>Must match the password above</FieldDescription>
                        )}
                    </Field>

                    {/* Profile Image */}
                    <Field>
                        <FieldLabel htmlFor="profile_img">Profile Image</FieldLabel>
                        <Input
                            id="profile_img"
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/gif"
                            aria-invalid={!!errors.profile_img}
                            onChange={(e) =>
                                // manually push the File object into react-hook-form
                                setValue("profile_img", e.target.files?.[0], {
                                    shouldValidate: true,
                                })
                            }
                        />
                        {errors.profile_img ? (
                            <FieldError>{errors.profile_img.message}</FieldError>
                        ) : selectedFile ? (
                            <FieldDescription>{selectedFile.name}</FieldDescription>
                        ) : (
                            <FieldDescription>Optional · jpeg, png, jpg, gif · max 2MB</FieldDescription>
                        )}
                    </Field>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader className="animate-spin" />} Register
                    </Button>
                    
                </FieldGroup>
            </FieldSet>
        </form>
    )
}
