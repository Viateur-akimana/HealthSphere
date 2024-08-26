import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"

declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }

export const createUser = async(user:CreateUserParams) => {
    try {
        const newUser = await users.create(ID.unique(),user.email,user.phone,user.name)
        console.log({newUser})
        
    } catch (error: any) {
        if (error && error?.code === 409) {
            const existingUser = await users.list([
                Query.equal('email',[user.email])
            ])
            return existingUser?.users[0]
        }
    }
}