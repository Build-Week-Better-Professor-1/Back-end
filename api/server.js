const express = require("express");

const auth = require("./auth.js");
const router = require('../router/router.js')

const server = express();

server.use(express.json());

server.get("/api", (req, res) => {
  res.status(200).json({ running: true });
});

server.use("/api/auth", auth.router);
server.use('/api/students', )

module.exports = server;
