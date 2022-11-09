import React, { useEffect, useState } from "react";
import Link from "next/link";
import SideBar from "./SideBar";




const Welcome = () => {
  return (
    <div className="new-dashboard">
      <SideBar/>
  <div className="profile-sec profile-sects">
    <div className="container">
   
        <div className="scanQR-heading--div">
          <h1 className="scanQR-heading">Two Factor Authentication</h1>
        </div>
        </div>
    <div className="scanQR-section">

    
        <section className="sec-fa">
        <div className="container">
          <div className="row justify-content-center">
            <div className="mail-sec">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    <div className=" first-item">
                      <div className="part-head">
                        <div className="left-part" id="scan-QR-code">
                          <div className="check">
                            <span className="number number-1">1</span>
                          </div>
    
                          <div className="email-text" >
                            <h6 className="scaning-text">SCAN QR Code</h6>
                          </div>
                        </div>
                        <div className="right-part" id="right-bg"></div>
                      </div>
                    </div>
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    <div className="col-md-4 second-item">
                      <div className="part-head">
                        <div className="left-part">
                          <div className="check">
                            <span className="number number-1">2</span>
                          </div>
                          <div className="email-text mt-2">
                            <h6>Verify</h6>
                          </div>
                        </div>
    
                        <div className="right-part" id="right-bg"></div>
                      </div>
                    </div>
                  </button>
                </li>
                <li className="nav-item third-part" role="presentation">
                  <button
                    className="nav-link third-content"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#contact"
                    type="button"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                  >
                    <div className="col-md-4 third-item">
                      <div className="part-head">
                        <div className="left-part">
                          <div className="check">
                            <span className="number number-1">3</span>
                          </div>
                          <div className="email-text mt-2">
                            <h6>COMPLETE</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    
    
        <div id="welcome-inner">
          <div className="dark-overlay">
            <div className="container">
              <div className="row">
                <div className="column">
                  <form>
                    <div className=" form-group">
                      <img
                        src="/success.png"
                        style={{ width: "30%", marginBottom: "30px" }}
                      />
                    </div>
                    <div className="form-group">
                      <h3>AUTHENTICATED SUCCESSFULLY</h3>
                      <p className="pt-2">
                        Your authentication has been completed successfully
                      </p>
                      <div className="dashboard">
                        <Link href={"/dashboard"}>
                          <button
                            className="btn btn-round form-btn w-50 p-0 mb-3"
                            style={{ marginTop: "30px", height:"50px", fontSize:"16px", fontWeight:"600", backgroundColor:"#103703", color:"white" }}
                            type="submit"
                          >
                            DASHBOARD
                          </button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    
        </div>
        </div>
        </div>
  );
};

export default Welcome;
