"use strict";
const definition = require("./src/definitions");
const User = definition.User;
const Message = definition.Message;

const user = { id: "awesome-id", name: "user-name", email: "user-email", status: "offline" };

const errMsg = User.verify(user);
if (errMsg) throw Error(errMsg);

const usr = new User(user);
const buffer = User.encode(usr).finish();
const newUser = User.decode(buffer);

console.log(newUser);
