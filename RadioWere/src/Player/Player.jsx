import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import './Player.css';

function Player() {
  return (
    <div className="container d-flex justify-content-center my-4 mb-5">

      <div id="mobile-box">

        {/* Card */}
        <div className="card">
          <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
            <img className="card-img-top" src="https://mdbootstrap.com/wp-content/uploads/2019/02/flam.jpg" alt="Card image cap" />
            <a href="#!">
              <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
            </a>
          </div>
          <div className="card-body text-center">

            <h5 className="h5 font-weight-bold">
              <a href="#" target="_blank" rel="noopener noreferrer">Dj Flam</a>
            </h5>
            <p className="mb-0">Urban Bachata remix</p>

            <audio id="music" preload="true">
              <source src="#" />
            </audio>
            <div id="audioplayer">
              <i id="pButton" className="fas fa-play"></i>
              <div id="timeline">
                <div id="playhead"></div>
              </div>
            </div>

          </div>
        </div>
        {/* Card */}
      </div>
    </div>
  );
}
export default Player