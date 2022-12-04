import { ErrorMessage, Secret } from "../enums";
import { authUser } from "../server/repository";
import { decipherToken } from "../utils";
import { sliceToken } from "../utils";
import { Request, Response, NextFunction} from 'express'

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = sliceToken(req.headers.authorization)
    if (token) {
        try {
            const decodedEmailByToken = decipherToken(token, Secret.Secret)
            const user = await authUser(decodedEmailByToken)
            if (!user) {
                return res.status(404).send({
                    message: ErrorMessage.UserNotFound,
                    auth: false
                })
            }
            req.body.email = decodedEmailByToken;

            next();
        } catch (error) {
            return res.status(401).send({ message: ErrorMessage.Authorized })
        }
    } else {
        return res.status(401).send({ message: ErrorMessage.Authorized })
    }
}
