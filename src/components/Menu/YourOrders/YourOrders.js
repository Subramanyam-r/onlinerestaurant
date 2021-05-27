import React from "react";

function YourOrders({ yourOrder }) {
    let cardColor = "bg-secondary";
    if(yourOrder.status === "RECEIVED") {
        cardColor = "bg-dark";
    } else if(yourOrder.status === "ACCEPTED") {
        cardColor = "bg-primary";
    } else if(yourOrder.status === "PREPARING") {
        cardColor = "bg-warning";
    } else if(yourOrder.status === "READY!") {
        cardColor = "bg-success";
    }

    return <div className="col-md-6 col-xl-4 mb-2 mt-2">
        
        <div className={`${cardColor} order-item text-light text-center mt-5`}>
            <h4>{yourOrder.item} x{yourOrder.nos}</h4>
            <hr class="border-white" />

            <div className="row">
                <div className="col-4 text-left">
                    <p className="ml-2 mb-0">Table: {yourOrder.table}</p>
                </div>
                <div className="col-8 text-right">
                    <p className="mr-2 mb-0">{yourOrder.status}</p>
                </div>
            </div>
        </div>
    </div>
}

export default YourOrders;