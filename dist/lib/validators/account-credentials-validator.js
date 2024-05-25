"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var AuthCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
});
exports.default = AuthCredentialsValidator;
