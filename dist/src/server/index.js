"use strict";
exports.__esModule = true;
exports.prisma = void 0;
var enums_1 = require("../enums");
var client_1 = require("@prisma/client");
var express = require('express');
var cors = require('cors');
var register = require('./routes/registerRouter');
var login = require('./routes/loginRouter');
var user = require('./routes/userRouter');
var auth = require('./routes/authRouter');
var uploadFile = require('./routes/avatarCloud');
var pdf = require('./routes/fileCloud');
var config = require('dotenv').config;
config();
exports.prisma = new client_1.PrismaClient();
var app = express();
process.on('unhandledRejection', function (reason, p) {
    console.log(reason, p);
});
var corsOptions = {
    origin: ["https://byshlata.github.io", "http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("".concat(enums_1.Path.Register), register);
app.use("".concat(enums_1.Path.Login), login);
app.use("".concat(enums_1.Path.Update), user);
app.use("".concat(enums_1.Path.Delete), user);
app.use("".concat(enums_1.Path.Auth), auth);
app.use("".concat(enums_1.Path.UploadCloud), uploadFile);
app.use("".concat(enums_1.Path.CreatePDF), pdf);
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("server is listening on port ".concat(port));
});
//# sourceMappingURL=index.js.map