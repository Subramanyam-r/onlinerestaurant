import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import AuthSendOtp from "./AuthSubs/AuthSendOtp";
import AuthAuthenticate from "./AuthSubs/AuthAuthenticate";

import "./Auth.css";

let socket;

function Auth({ ENDPOINT, location }) {
    const [table, setTable] = useState("");
    const [isBooked, setIsBooked] = useState(); 
    const [phno, setPhno] = useState("");
    const [otp, setOtp] = useState("");
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        if(counter === 0) {
            document.getElementById("counter-p").classList.add("invisible");
            document.getElementById("sendotp-btn").removeAttribute("disabled");
        }
      }, [counter]);

    useEffect( () => {
        setTable(queryString.parse(location.search).table)
        socket = io(ENDPOINT);

        socket.emit("gettables", (tables) => {
            if(tables[parseInt(queryString.parse(location.search).table)-1] === "BOOKED") {
                setIsBooked(true);
            } else {
                setIsBooked(false);
            }
        });

        socket.on("tableUpdate", ({tables}) => {
            if(tables[parseInt(queryString.parse(location.search).table)-1] === "BOOKED") {
                setIsBooked(true);
            } else {
                setIsBooked(false);
            }
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        } 
    }, [location.search, ENDPOINT]);


    function handleSendOtp() {
        socket.emit("sendotp", {phno, table}, () => {

        });
        document.querySelectorAll(".auth-locked-input").forEach(ele => ele.removeAttribute("disabled"));

        document.getElementById("sendotp-btn").textContent = "Resend OTP";
        document.getElementById("sendotp-btn").setAttribute("disabled", true);

        document.getElementById("counter-p").classList.remove("invisible")
        setCounter(60);
    }

    if(isBooked) {
        window.location.replace("/booked");
    } else {
        return <div>
            <div className="container auth-main-div">
                <h1>Authentication: Table {table}</h1>
                <hr className="mb-5" />
                <AuthSendOtp phno={phno} setPhno={setPhno} handleSendOtp={handleSendOtp} counter={counter} />
                <AuthAuthenticate otp={otp} setOtp={setOtp} socket={socket} table={table} phno={phno} />
            </div>
        </div>
    }

}

export default Auth;