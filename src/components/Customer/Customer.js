import React, { useState, useEffect } from "react";
import QRCard from "../QRCard/QRCard";
import io from "socket.io-client";

import "./Customer.css"
let socket;

function Customer({ ENDPOINT, location }) {
    const [tables, setTables] = useState([]);

    useEffect( () => {
        socket = io(ENDPOINT);

        socket.on("tableUpdate", ({tables}) => {
            setTables(tables);
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        }
    }, [location.search, ENDPOINT]);

    return <div className="customer-main-div container">
        <div className='customer-top text-center'>
            <h1>
                Welcome to <span className="text-danger">Balajee Bhavan</span>!
            </h1>
            <h2 className="mt-4">Choose your table!</h2>
        </div>

        <div className="row">
            {tables.map( (ele, i) => {
                return <QRCard tableName={`Table ${i+1}`} tableImg={`table${i+1}.png`} tableStatus={ele} />
            })}
        </div>
    </div>
}

export default Customer;