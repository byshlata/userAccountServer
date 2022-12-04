import { ErrorMessage, Path } from '../../enums'
import { loginUser } from "../repository";
import express from "express";
import { Empty, ErrorResponseType, UserLoginType, UserResponseType } from "types";

const router = express.Router();

router.post<Empty, UserResponseType | ErrorResponseType, UserLoginType, Empty>(`${Path.Root}`, async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await loginUser({ password, email })

        return user
            ? res.status(200).send({ user })
            : res.status(400).send({ message: ErrorMessage.EmailOrPassword })
    } catch (error) {
        return res.status(500).send({ message: ErrorMessage.ServerError })
    }
});

module.exports = router
