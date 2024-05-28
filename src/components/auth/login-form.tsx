"use client"
import {
    Form,
    FormControl,
    FormField,
    FormItem, 
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { useTransition, useState, useEffect } from "react";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FormError } from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";


import { login } from "@/actions/login";

 const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, setPending]=useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    //rerendering check
    useEffect(() => {
        console.log("LoginForm component re-rendered");
    });
    

const onSubmit = (values:z.infer<typeof LoginSchema>)=>{
    setError("");
    setSuccess("");
    setPending(()=>{login(values)
    .then((data)=>{
        setError(data.error);
        setSuccess(data.success);
        }
    );
    
})}

    return ( <CardWrapper
    headerLabel="Welcome Back"
    backButtonLabel="Don't have an account?"
    backButtonHref="/auth/register"
    showSocial>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input
                                disabled={isPending}
                                {...field}
                                type="email"
                                placeholder="johndoe@example.com"
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="password"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                <Input
                                disabled={isPending}
                                {...field}
                                type="password"
                                placeholder="********"
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>
                <Button disabled={isPending} type="submit" className="w-full">Login</Button>
            </form>
        </Form>
    </CardWrapper> );
}
export default LoginForm;
 
