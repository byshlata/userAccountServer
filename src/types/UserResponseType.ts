import { UserSendType } from "types/index";
import { UserTokenType } from "types/UserTokenType";

export type UserResponseType = {
    user: UserSendType & UserTokenType
}
