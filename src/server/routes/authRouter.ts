import express from "express";
import { Empty, ErrorResponseType, UserEmailType, UserResponseType } from "types";
import { Path, ErrorMessage } from '../../enums'
import { checkAuth } from "../../utils";
import { authUser } from "../repository";

const router = express.Router();

router.get<Empty, UserResponseType | ErrorResponseType, UserEmailType, Empty>(`${Path.Root}`, checkAuth, async (req, res) => {
    try {
        const { email } = req.body
        const user = await authUser(email)

        return user
            ? res.status(200).send({ user })
            : res.status(401).send({ message: ErrorMessage.Authorized })
    } catch (error) {
        return res.status(500).send({ message: ErrorMessage.ServerError })
    }
});

module.exports = router
