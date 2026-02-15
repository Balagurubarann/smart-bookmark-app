"use client";

import z from "zod";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, FieldLabel, Field, FieldError, FieldContent } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { formSchema } from "@/lib/supabase/schemas/bookmark";
import { createBookmark } from "@/lib/supabase/actions/bookmark";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof formSchema>

export default function CreateBookMark() {

    const form = useForm<FormData>({
        defaultValues: {
            title: "",
            url: "",
            description: "",
            is_favourite: false
        },
        resolver: zodResolver(formSchema),
    })

    const router = useRouter();

    function handleSubmit(data: FormData) {

       createBookmark(data)
        .then(() => {
            router.refresh()
        })
        .then(() => {
            toast.success("Bookmark created successfully");
        })
            
    }

    return (
        <div className="container mx-auto w-[100vmin] mt-4">
        
            <Card className="w-full max-w-lg mx-auto">
                
                <CardHeader>
                    
                    <CardTitle className="text-2xl font-medium">
                        Add Bookmark
                    </CardTitle>
                    <CardDescription>
                        Create a new bookmark
                    </CardDescription>

                </CardHeader>

                <CardContent>
                    
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <FieldGroup>
                            <Controller 
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Title *</FieldLabel>
                                        <Input 
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            required
                                        />
                                        {
                                            fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />

                            <Controller 
                                name="url"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>URL *</FieldLabel>
                                        <Input 
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            required
                                        />
                                        {
                                            fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />

                            <Controller 
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                        <Textarea 
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            className="resize-none"
                                        />
                                        {
                                            fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )
                                        }
                                    </Field>
                                )}
                            />

                            <Controller 
                                name="is_favourite"
                                control={form.control}
                                render={({ field: { value, onChange, ...field }, fieldState }) => (
                                    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                                        <Checkbox 
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            checked={value}
                                            onCheckedChange={onChange}
                                        />

                                        <FieldContent>
                                            <FieldLabel htmlFor={field.name}>Add to favourite</FieldLabel>
                                            {
                                                fieldState.error && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )
                                            }
                                        </FieldContent>
                                    </Field>
                                )}
                            />

                            <Field orientation="horizontal" className="w-full">
                                <Button
                                    type="submit"
                                    className="grow"
                                    disabled={form.formState.isSubmitting}
                                >
                                    Add Bookmark
                                    <Bookmark className="ml-2" />
                                </Button>
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <Link href="/">Cancel</Link>
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>

                </CardContent>

            </Card>

        </div>
    )

}
