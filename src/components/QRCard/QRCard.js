import React from "react";

import "./QRCard.css";

function QRCard({ tableName, tableImg, tableStatus }) {
    let cardColor;
    if(tableStatus === "FREE") {
        cardColor = "bg-success";
    } else if(tableStatus === "BOOKED") {
        cardColor = "bg-danger";
    }

    return <div className="col-12 col-md-6 col-lg-4 qr-card-div mt-3 mb-3">
    <div className={"qr-card " + cardColor }>
        <h4 className="text-white mb-3">Space: <b>{tableStatus}</b></h4>
        <img className="qr-img" src={"./QR/" + tableImg} alt={tableImg} />
        <h3 className="mt-3 text-white">{tableName}</h3>
    </div>
</div>
}

export default QRCard;