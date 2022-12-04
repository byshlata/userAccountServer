import { Nullable } from "types/Nullable";
import { UserTokenType } from "types/UserTokenType";

export type UserSendType = UserTokenType & {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    image?: Nullable<string>,
    pdf?: Nullable<string>,
}
