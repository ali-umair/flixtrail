import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';

@Injectable()
export class UserAuthService {

    db = drizzle(process.env.DATABASE_URL!);
    constructor() { }

    async registerUser(user: any) {
        const { username, email, password } = user;

        const usernameExists = await this.db.select({
            field1: schema.usersTable.username,
            field2: schema.usersTable.email,
        }).from(schema.usersTable).where(eq(schema.usersTable.username, username));

        const emailExists = await this.db.select({
            field1: schema.usersTable.username,
            field2: schema.usersTable.email,
        }).from(schema.usersTable).where(eq(schema.usersTable.email, email));

        if (usernameExists?.length > 0 && emailExists?.length > 0) {
            return "User already registered";
        }
        else if (usernameExists?.length > 0) {
            return "Username already exists";
        }
        else if (emailExists?.length > 0) {
            return "Email already exists";
        }
        else {
            const newUser = await this.db.insert(schema.usersTable).values([{ username: username, email: email, password: password }]).returning();

            return "User registered successfully";
        }
    }
}