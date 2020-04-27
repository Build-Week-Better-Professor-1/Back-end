const server = require("./server.js");

const port = process.env.PORT || 24272;

server.listen(port, () =>
  console.log(` == server is listening on port ${port} == `)
);
