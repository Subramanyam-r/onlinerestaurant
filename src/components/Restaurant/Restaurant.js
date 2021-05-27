import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Order from "../Order/Order";
import MenuUpdateModal from "./MenuUpdateModal/MenuUpdateModal";

import "./Restaurant.css";

let socket;
function Restaurant({ ENDPOINT, location }) {
    const [orders, setOrders] = useState([]);
    const [menu, setMenu] = useState([]);

    useEffect( () => {
        socket = io(ENDPOINT);

        socket.emit("joinrestaurant", (orders, menu) => {
            setOrders(orders);
            setMenu(menu);
        });

        socket.on("ordersupdate", (orders, menu) => {
            setOrders(orders);
            setMenu(menu);
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        } 
    }, [location.search, ENDPOINT]);

    function handleMenuUpdate() {
        window.$("#menuUpdateModal").modal();
    }

    return <div className="container restaurant-main">
        <div className="row">
            <div className="col-6">
                <h1 className="d-inline">Restaurant Portal</h1>
            </div>
            <div className="text-right col-6">
                <button className="btn btn-primary mt-3" onClick={handleMenuUpdate}>Menu Update</button>
            </div>
        </div>
        <hr className="mb-3 mt-3" />
        <div className="row">
            {orders.map((order, i) => <Order order={order} index={i} socket={socket} />)}
        </div>
        <MenuUpdateModal menu={menu} setMenu={setMenu} socket={socket} />
    </div>
}

export default Restaurant;