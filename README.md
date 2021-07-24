# reveal

A CLI tool to Manage Passwords.

## Setup
- SQL Setup (I'm using postgreSQL)
``` sql
create database reveal;
create table passwords (app VARCHAR(32) PRIMARY KEY,email VARCHAR(100), password TEXT,timestamp TIMESTAMP DEFAULT NOW());
```
- `npm install`
- `npm link` (to make this project a Globally available CLI Tool)

## References
- [node postgres library](https://node-postgres.com/api/client)
- [Encryption and Decryption](https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb)
