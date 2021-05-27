import React, { useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import MenuItem from "./MenuItem/MenuItem";
import YourOrders from "./YourOrders/YourOrders";
import Modal from "../Modal/Modal";

import "./Menu.css";

let socket;
function Menu({ ENDPOINT, location }) {

    const [table, setTable] = useState("");
    const [menu, setMenu] = useState([]);
    const [yourOrders, setYourOrders] = useState([]);

    useState( () => {
        setTable(queryString.parse(location.search).table);
        socket = io(ENDPOINT);

        socket.emit("joinedmenu", queryString.parse(location.search).table, (menu) => {
            setMenu(menu);
        });

        socket.on("menuupdate", (menu) => {
            setMenu(menu);
        });

        socket.on("yourOrder", yourOrders => {
            setYourOrders(yourOrders);
        });

        socket.on("orderupdate", (yourOrders) => {
            setYourOrders(yourOrders);
            console.log(yourOrders, "oderUpdate");
        })

        return () => {
            socket.emit("disconnect");
            socket.emit("leftmenu");
            socket.off();
        } 
    }, [location.search, ENDPOINT]);

    function handlePayClick(mode) {
        if(mode === "cash") {
            window.$("#paybycash").modal();
        } else if(mode === "online") {
            window.$("#payonline").modal();
        }
        window.$("#payment-btns").addClass("invisible");
        window.$("#menu-div").addClass("d-none");
    }

    return <div className="container menu-main">
            <div id="menu-div">
                <h1>Menu: Table {table}</h1>
                <hr className="mt-3 mb-3" />
                <div className="row">
                    {menu.map(item => <MenuItem item={item} socket={socket} table={table} />)}
                </div>
            </div>

        {yourOrders.length > 0 && <div>
            <h1>Your Cart</h1>
            <hr className="mt-3" />
        </div>}
        <div className="row">
            {yourOrders.map(yourOrder => <YourOrders yourOrder={yourOrder} />)}
        </div>
        {yourOrders.length > 0 && <div id="payment-btns" className="text-right mt-4">
            <h5 className="mb-3 mr-3">Your Bill: <i class="fas fa-rupee-sign ml-1"></i>{yourOrders.reduce((acc, order) => acc+(menu.find(dish => dish.name === order.item).price) * order.nos, 0 )}</h5>
            <button className="btn btn-lg btn-success mr-3 mb-3" onClick={( () => handlePayClick("cash") )}>Pay by cash</button>
            <button className="btn btn-lg btn-primary mr-3 mb-3" onClick={( () => handlePayClick("online") )}>Pay online while we cook</button>
        </div>}
        <Modal id={"payonline"} title={"Payment"} content={"Payment Successfull. Enjoy your meal!"} />
        <Modal id={"paybycash"} title={"Payment"} content={"Please have exact change ready to pay after eating. Thank you!"} />

    </div>
}

export default Menu;