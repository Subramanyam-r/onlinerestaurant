import React from "react";
import Modal from "../../Modal/Modal";

function AuthAuthenticate({ otp, setOtp, socket, table, phno }) {

    function handleAuthenticate() {
        console.log("test");
        socket.emit("validateotp", {otp, table, phno}, (res) => {
            if(res) {
                window.location.replace("/menu?table="+table);
            } else {
                window.$("#wrongOTPModal").modal();
            }
        });
    }

    return <div>    
        <div className="row mt-5 mb-3">
            <div className="col-sm-8 col-lg-5">
                <label>OTP</label>
                <input className="form-control auth-locked-input" placeholder="Enter the OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" disabled/>
            </div>
        </div>
        <button className="btn btn-success auth-locked-input" onClick={handleAuthenticate}>Authenticate</button>
        <Modal id="wrongOTPModal" title="Incorrect OTP!" content="The OTP you have entered is invalid! Please enter the correct OTP." />
    </div>
}

export default AuthAuthenticate;