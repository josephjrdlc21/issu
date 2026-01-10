"use client";

import { Button, TextField, Callout, Text } from "@radix-ui/themes"
import { CiCircleInfo } from "react-icons/ci";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/validations/issue";
import ErrorMessage from "@/components/error-message";
import Spinner from "@/components/spinner";
import { z } from 'zod';
import "easymde/dist/easymde.min.css";

type IssueForm =z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function NewIssue() {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
        } catch (error) {
            setIsSubmitting(false);
            setError('An unexpected error occurred.')
        }
    });

    return (
        <div className="max-w-xl">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Icon>
                        <CiCircleInfo />
                    </Callout.Icon>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            )}
           
            <form
                onSubmit={onSubmit}
                    className="space-y-3"
                >
                <div className="space-y-1">
                    <TextField.Root placeholder="Title" {...register("title")} />
                    <ErrorMessage>
                        {errors.title?.message}
                    </ErrorMessage>
                </div>

                <div className="space-y-1">
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                        )}
                    />
                    <ErrorMessage>
                        {errors.description?.message}
                    </ErrorMessage>
                </div>

                <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
            </form>
        </div>
    )
}
