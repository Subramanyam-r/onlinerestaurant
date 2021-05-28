const express = require("express");
const app = express();
const server = require("http").createServer(app);
require('dotenv').config();
let menu = require("./Menu.js");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const cors = require("cors");

corsOptions={
    cors: true,
   }
const io = require("socket.io")(server, corsOptions);
const PORT = process.env.PORT || 3001;
app.use(cors());

let tables = ["FREE", "FREE", "FREE", "FREE", "FREE", "FREE"];
let menuRooms = ["", "", "", "", "", ""];
let menusockets = ["", "", "", "", "", ""];
let orders = [];

app.get("/", (req, res) => {
    res.send("Checkup: Balajee Bhavan backend is up!");
});

io.on("connection", socket => {
    console.log("A new customer connected!  |  " + socket.id);
    socket.emit("tableUpdate", {tables});

    socket.on("sendotp", ({phno, table}, callback) => {
        client.verify.services('VA58729189f567cadecbcc90d4931cb24d')
             .verifications
             .create({to: "+91"+phno, channel: 'sms'})
             .then(verification => {
                 console.log(verification.sid);
             });

        menuRooms[parseInt(table)-1] = phno;
        callback();
    });

    socket.on("gettables", (callback) => {
        callback(tables);
    });

    socket.on("joinedmenu", (table, callback) => {
        let room = "menu-" + table;
        socket.join(room);
        console.log(`joined: menu-${table}`);
        tables[parseInt(table)-1] = "BOOKED";
        menusockets[parseInt(table)-1] = socket.id;
        socket.broadcast.emit("tableUpdate", {tables});
        callback(menu);
    });

    socket.on("joinrestaurant", (callback) => {
        let room = "restaurant";
        socket.join(room);
        callback(orders, menu);
    });

    socket.on("orderplaced", (itemName, nos, table, callback) => {
        orders.push({
            table: parseInt(table),
            item: itemName,
            status: "Pending Confirmation",
            nos: parseInt(nos),
            phno: menuRooms[parseInt(table) - 1]
        });
        menu.find(item => item.name === itemName).available -= nos;
        io.in("restaurant").emit("ordersupdate", orders, menu);
        io.emit("menuupdate", menu);
        socket.emit("yourOrder", orders.filter(order => order.table === parseInt(table)));
    });

    socket.on("orderstatusupdate", (index, status) => {
        orders[index].status = status;
        let table = orders[index].table;
        socket.to(`menu-${table}`).emit("orderupdate", orders.filter(order => order.table === table));
        io.in("restaurant").emit("ordersupdate", orders, menu);
    });

    // socket.on("leftmenu", (table) => {
    //     console.log("leftenu")
    //     tables[parseInt(table)-1] = "FREE";
    //     socket.broadcast.emit("tableUpdate", {tables});
    //     orders = orders.filter(order => order.table !== parseInt(table));
    //     io.in("restaurant").emit("ordersupdate", orders);
    // });

    socket.on("disconnect", () => {
        if(menusockets.findIndex(order => socket.id) !== -1) {
            let table = menusockets.findIndex(order => order === socket.id)+1;
            tables[parseInt(table)-1] = "FREE";
            socket.broadcast.emit("tableUpdate", {tables});
            orders = orders.filter(order => order.table !== parseInt(table));
            menusockets[parseInt(table)-1] = "";
            menuRooms[parseInt(table)-1] = "";

            io.in("restaurant").emit("ordersupdate", orders, menu);
        }
        console.log("User Disconnected: " + socket.id);
    });

    socket.on("restaurantmenuupdate", (newMenu => {
        menu = newMenu;
        io.emit("menuupdate", menu);
    }))

    socket.on("validateotp", ({otp, table, phno}, callback) => {
        client.verify.services('VA58729189f567cadecbcc90d4931cb24d')
      .verificationChecks
      .create({to: "+91"+phno, code: otp})
      .then(verification_check => {
          callback(verification_check.status === "approved");
      }).catch(err => { if(err) callback(false) });
    });
});

server.listen(PORT, () => {
    console.log("Server is running on PORT " + PORT);
});