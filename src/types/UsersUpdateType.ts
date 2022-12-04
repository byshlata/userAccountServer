import { UserEmailType } from "types/UserEmailType";

export type UsersUpdateType = UserEmailType & {
    firstName?: string
    lastName?: string
    image?: string
    pdf?: string
}
