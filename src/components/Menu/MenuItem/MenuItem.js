import React, { useState } from "react";
import Modal from "../../Modal/Modal";

import "./MenuItem.css";

function MenuItem({item, socket, table}) {
    const [nos, setNos] = useState("");

    function handleOrderPlaceClick() {
        if(parseInt(item.available) >= parseInt(nos) && parseInt(nos) !== "" && parseInt(nos) > 0) {
            socket.emit("orderplaced", item.name, parseInt(nos), table, () => {
            });
        } else {
            window.$("#itemNotAvailable").modal();
        }
    }
    return <div className="col-md-6 col-xl-4 mb-4 mt-4">
        <div className="bg-primary menu-item text-light text-center">
            <h4>{item.name}</h4>
            <img class="food-img" src={item.img} alt={item.name} />
            <div className="row">
                <div className="col-5 text-left">
                    <p className="mt-3 mb-2">Available: {item.available}</p>
                </div>
                <div className="col-7 text-right">
                    <p className="mt-3 mb-2">Waiting Time: {item.waitingTime} min</p>
                </div>
            </div>

            <div className="row text-right mt-3">
            <div className="col-3">
                <p className="mb-0 text-left"><i class="fas fa-rupee-sign mr-1"></i><b>{item.price}</b></p>
            </div>
            <div className="col-auto"></div>
                    <input type="number" className="form-control menu-item-nos mr-3" placeholder="nos." value={nos} onChange={(e) => setNos(e.target.value)} />
                    <button className="btn btn-outline-light" onClick={handleOrderPlaceClick} required>Order</button>

            </div>
        </div>
        <Modal id="itemNotAvailable" title="Not Available" content="The Quantity you have entered is more than available quantity for that item!" />
    </div>
}

export default MenuItem;