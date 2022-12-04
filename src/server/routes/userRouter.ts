import { Path, ErrorMessage, Message } from '../../enums'
import { checkAuth } from "../../utils";
import express from "express";
import {
    Empty,
    ErrorResponseType, UserEmailType, UserResponseType,
    UsersUpdateType
} from "types";
import { deleteUser, updateUser } from "../repository";


const router = express.Router();

router.delete<Empty, ErrorResponseType, UserEmailType, Empty>(`${Path.Root}`, checkAuth, async (req, res) => {
    try {
        const { email } = req.body
        const user = await deleteUser(email)

        return user
            ? res.status(200).send({message: Message.DeleteUser})
            : res.status(403).send({message: ErrorMessage.DeleteUserError })
    } catch (error) {
        res.status(500).send({message: ErrorMessage.ServerError })
    }
});


router.post<Empty, UserResponseType | ErrorResponseType, UsersUpdateType, Empty>(`${Path.Root}`, checkAuth, async (req, res) => {
    try {
        const { email, lastName, firstName } = req.body
        const user = await updateUser({email, firstName, lastName })

        return res.status(200).send({user})
    } catch (error) {
        res.status(500).send({message: ErrorMessage.UpdateUsers})
    }
});

module.exports = router
