const express = require("express");

const auth = require("./auth.js");
const studentRouter = require('../router/students/student-router.js');
const userRouter = require('../router/users/user-router.js');

const server = express();

server.use(express.json());

server.get("/api", (req, res) => {
  res.status(200).json({ running: true });
});

server.use("/api/auth", auth.router);
server.use('/api/users', auth, userRouter);
server.use('/api/students', studentRouter);

module.exports = server;
