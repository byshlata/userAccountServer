import { Path } from "../enums";
import { PrismaClient } from '@prisma/client'

const express = require('express')
const cors = require('cors')
const register = require('./routes/registerRouter')
const login = require('./routes/loginRouter')
const user = require('./routes/userRouter')
const auth = require('./routes/authRouter')
const uploadFile = require('./routes/avatarCloud')
const pdf = require('./routes/fileCloud')
const { config } = require('dotenv')

config()

export const prisma = new PrismaClient()

const app = express();

process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p)
})

const corsOptions = {
    origin: ["https://byshlata.github.io", "http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
}

app.use(cors(corsOptions))
app.use(express.json())

app.use(`${Path.Register}`, register)
app.use(`${Path.Login}`, login)
app.use(`${Path.Update}`, user)
app.use(`${Path.Delete}`, user)
app.use(`${Path.Auth}`, auth)
app.use(`${Path.UploadCloud}`, uploadFile)
app.use(`${Path.CreatePDF}`, pdf)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

