import React from "react";

import "./Footer.css";

function Footer() {
    return <div className="pt-3 pb-3 bg-danger text-light">
        <div className="footer-icons-div text-center">
            <i className="fab fa-github footer-icons fa-2x mr-4"></i>
            <i className="fab fa-linkedin footer-icons fa-2x mr-4"></i>
            <i className="fas fa-envelope footer-icons fa-2x"></i>
        </div>
        <div className="footer-copyright text-center pt-4 pb-3">
            <i className="far fa-copyright"></i> Balajee Bhavan 2021
        </div>
    </div>
}

export default Footer;