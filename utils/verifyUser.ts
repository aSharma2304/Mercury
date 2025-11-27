'use server'
import { auth } from '@clerk/nextjs/server'

export const isAuthenticated = async ()=>{
    const { isAuthenticated } = await auth();

    if(!isAuthenticated){
        return false;
    }

    return true;

}