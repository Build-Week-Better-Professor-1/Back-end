const express = require("express");

const auth = require("./auth.js");
const studentRouter = require('../router/students/student-router.js');
const userRouter = require('../router/users/users-router.js');
const messagesRouter = require('../router/messages/messages-router.js');
const projectsRouter = require('../router/messages/projects-router.js');

const server = express();

server.use(express.json());

server.get("/api", (req, res) => {
  res.status(200).json({ running: true });
});

server.use("/api/auth", auth.router);
server.use('/api/users', auth.validateToken, userRouter);
server.use('/api/students', auth.validateToken, studentRouter);
server.use('/api/messages', messageRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;
