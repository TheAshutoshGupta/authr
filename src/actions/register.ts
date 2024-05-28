"use server"
import * as z from 'zod';
import bcrypt from 'bcrypt';
import{ db } from '@/lib/db';

import { RegisterSchema } from '@/schemas';

export const register = async (values:z.infer<typeof RegisterSchema>)=>{
    const validatedField = RegisterSchema.safeParse(values);

    if(!validatedField.success){
        return ({error:"Invalid data!"});
    }
    const {email, password, name}=validatedField.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where:{
            email,
        }
    });
    if(existingUser){
        return ({error:"Email already exists!"});
    }
    await db.user.create({
        data:{
            email,
            password:hashedPassword,
            name,
        }
    });

//Todo send verification email
    return ({success:"User Created!"});
}