import { Secret } from "../enums";
import { UserSendType, UserType } from "types";

const jwt = require('jsonwebtoken')

export const createAuthUserData = async (user: UserType): Promise<UserSendType> => {
    const token = jwt.sign({
        email: user.email,
    }, Secret.Secret, { expiresIn: '30d' })
    const { password, ...otherUserData } = user

    return Promise.resolve({ token, ...otherUserData })

}
