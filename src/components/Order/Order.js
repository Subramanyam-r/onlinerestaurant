import React from "react";

import "./Order.css";
function Order({ order, index, socket }) {

    function handleStatusUpdateClick(status) {
        socket.emit("orderstatusupdate", index, status);
    }

    return <div className="col-md-6 col-xl-4 mb-4 mt-4">

        <div className="bg-secondary order-item text-light text-center">
            <h4>{order.item} x{order.nos}</h4>
            <hr className="border-white" />

            <div className="row">
                <div className="col-4 text-left">
                    <p className="ml-2 mb-0">Table: {order.table} {order.phno}</p>
                </div>
                <div className="col-8 text-right">
                    <p className="mr-2 mb-0">{order.status}</p>
                </div>
            </div>

            <hr className="border-white" />
            <div className="row">
                <div className="col-6"> <button className="btn btn-light restaurant-update-btn mt-2 mb-2" onClick={ () => handleStatusUpdateClick("RECEIVED")}><i className="fas fa-sign-in-alt mr-2"></i>Received</button> </div>
                <div className="col-6"> <button className="btn btn-primary restaurant-update-btn mt-2 mb-2" onClick={ () => handleStatusUpdateClick("ACCEPTED")}><i className="fas fa-check-square mr-2"></i>Accepted</button> </div>
                <div className="col-6"> <button className="btn btn-warning restaurant-update-btn mt-2 mb-2" onClick={ () => handleStatusUpdateClick("PREPARING")}><i className="fas fa-sync mr-2"></i>Preparing</button> </div>
                <div className="col-6"> <button className="btn btn-success restaurant-update-btn mt-2 mb-2" onClick={ () => handleStatusUpdateClick("READY!")}><i className="fas fa-utensils mr-2"></i>Ready</button> </div>
            </div>
        </div>

    </div>
}

export default Order;