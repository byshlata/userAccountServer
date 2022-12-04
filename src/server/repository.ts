import { prisma } from "../server/index";
import { throwError, createAuthUserData } from "../utils";
import {
    Nullable,
    UserCreateType,
    UserLoginType, UserSendType,
    UsersUpdateType,
    UserType
} from "types";

const bcrypt = require("bcrypt");

export const getUserByEmail = async (email: string): Promise<Nullable<UserType>> => {
    return await prisma.users.findUnique({
        where: {
            email: email
        },
    });
}

export const authUser = async (email: string): Promise<Nullable<UserSendType>> => {
    try {
        const user = await getUserByEmail(email)
        if (user) {

            return await createAuthUserData(user)
        } else {

            return null
        }
    } catch (error) {
        return throwError()
    }
}


export const createUser = async (userData: UserCreateType): Promise<Nullable<UserSendType>> => {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(userData.password, salt) as string
        const userByBase = await prisma.users.create({
            data: {
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: passwordHash
            }
        })

        return userByBase ? await createAuthUserData(userByBase) : null
    } catch (error) {
        return throwError()
    }
}

export const loginUser = async ({
                                    email,
                                    password
                                }: UserLoginType): Promise<Nullable<UserSendType>> => {
    try {
        const user = await getUserByEmail(email)
        const isValidPassword = user && await bcrypt.compare(password, user.password);

        return user && isValidPassword ? createAuthUserData(user) : null
    } catch (error) {
        return null
    }
}

export const updateUser = async ({
                                     lastName,
                                     firstName,
                                     image,
                                     pdf,
                                     email
                                 }: UsersUpdateType): Promise<Nullable<any>> => {
    try {
        const user = await prisma.users.update({
            where: {
                email: email
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                image: image,
                pdf: pdf
            }
        });

        return createAuthUserData(user)
    } catch (error) {
        return null
    }
}

export const deleteUser = async (email: string): Promise<Nullable<any>> => {
    try {
        return await prisma.users.delete({
            where: {
                email: email
            },
        });
    } catch (error) {
        return null
    }
}
