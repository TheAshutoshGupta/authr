"use server"
import * as z from 'zod';

import { LoginSchema } from '@/schemas';

export const login = async (values:z.infer<typeof LoginSchema>)=>{
    const validateField = LoginSchema.safeParse(values);

    if(!validateField.success){
        return ({error:"Invalid data!"});
    }
    return ({success:"Email sent!"});
}