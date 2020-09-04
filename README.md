# What is k-utilities?

`my-utilities` is a npm that contains functions that do simple tasks etc...

# Installation

`npm i k-utilities --save`

`import { Crypto, Hashing, Request, Logger } from "k-utilities";`

# Initialization

```
const passCrypto = new Crypto("16-hex-key");

const encryptedPass = passCrypto.encrypt("password-to-be-encrypted")

const decryptedPass = passCrypto.decrypt(encryptedPass)

```

to get a `key` run in terminal: `openssl rand 16 -hex`
