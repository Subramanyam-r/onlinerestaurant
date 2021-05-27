import React from "react";

function AuthSendOtp({ phno, setPhno, handleSendOtp, counter }) {
    return <div>
        <h5 className="mb-4">Please enter your mobile number below to receive the OTP</h5>
        <div className="row mb-3">
            <div className="col-sm-8 col-lg-5">
                <label>Mobile</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">+91</span>
                    </div>
                    <input className="form-control" placeholder="10-digit mobile number" value={phno} onChange={(e) => setPhno(e.target.value)} maxLength="10" />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <button id="sendotp-btn" className="btn btn-primary d-inline" onClick={handleSendOtp}>Send OTP</button> 
                <p id="counter-p" className="mt-0 ml-2 d-inline" hidden>{counter>=10 ? "0:"+counter : "0:0"+counter}</p>
            </div>
        </div>
    </div>
}

export default AuthSendOtp;