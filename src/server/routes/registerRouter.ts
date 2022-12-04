import { createUser } from "../repository";
import { ErrorMessage, Path } from "../../enums";
import express from "express";
import { Empty, ErrorResponseType, UserCreateType, UserResponseType } from "types";

const router = express.Router();

router.post<Empty, UserResponseType | ErrorResponseType, UserCreateType, Empty>(`${Path.Root}`, async (req, res) => {
    try {
        const {email, password, firstName, lastName} = req.body
        const user = await createUser({firstName, lastName, email, password})

        return user
            ? res.status(200).send({ user })
            : res.status(400).send({message: ErrorMessage.EmailIsUse})
    } catch (error) {
        return res.status(500).send({message: ErrorMessage.ServerError})
    }
});

module.exports = router
