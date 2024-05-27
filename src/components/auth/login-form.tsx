"use client"
import {
    Form,
    FormControl,
    FormField,
    FormItem, 
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FaEye } from "react-icons/fa";
import { Button } from "../ui/button";
import { FormError } from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";


import { login } from "@/actions/login";

 const LoginForm = () => {
    const [isPending, setPending]=useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

const onSubmit = (values:z.infer<typeof LoginSchema>)=>{
    setPending(()=>{login(values)});
    
}

    return ( <CardWrapper
    headerLabel="Welcome Back"
    backButtonLabel="Don't have an account?"
    backButtonHref="/auth/register"
    showSocial>
        <Form {...form}>
            <form onClick={form.handleSubmit(onSubmit)}
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
                <FormError message=""/>
                <FormSuccess message=""/>
                <Button disabled={isPending} type="submit" className="w-full">Login</Button>
            </form>
        </Form>
    </CardWrapper> );
}
export default LoginForm;
 
