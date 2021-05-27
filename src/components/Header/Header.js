import React from "react";

function Header() {
    return <div>
       <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
  <a className="navbar-brand" href="/">Balajee Bhavan</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-link" href="/">Customer <span className="sr-only">(current)</span></a>
      <a className="nav-link" href="/">Restaurant</a>
    </div>
  </div>
</nav>
    </div>
}

export default Header;