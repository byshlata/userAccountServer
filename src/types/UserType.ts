import { UserSendType } from "types/index";

export type UserType = Omit<UserSendType, 'token'> & {
    password: string,
}

