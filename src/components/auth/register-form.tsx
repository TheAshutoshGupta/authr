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
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FaEye } from "react-icons/fa";
import { Button } from "../ui/button";
import { FormError } from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";


import { register } from "@/actions/register";

 const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, setPending]=useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name:""
        },
    });

    //rerendering check
    useEffect(() => {
        console.log("LoginForm component re-rendered");
    });
    

const onSubmit = (values:z.infer<typeof RegisterSchema>)=>{
    setError("");
    setSuccess("");
    setPending(()=>{register(values)
    .then((data)=>{
        setError(data.error);
        setSuccess(data.success);
        }
    );
    
})}

    return ( <CardWrapper
    headerLabel="Create an Account"
    backButtonLabel="Already have an Account?"
    backButtonHref="/auth/login"
    showSocial>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                    <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                <Input
                                disabled={isPending}
                                {...field}
                                type="text"
                                placeholder="John Doe"
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            
                        )}
                        />


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
                <Button disabled={isPending} type="submit" className="w-full">Sign Up</Button>
            </form>
        </Form>
    </CardWrapper> );
}
export default LoginForm;
 
