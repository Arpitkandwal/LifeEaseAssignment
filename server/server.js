const io = require("socket.io")(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods:["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("run", (run) => {
        console.log(run);
        io.emit("run", run);
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
})
