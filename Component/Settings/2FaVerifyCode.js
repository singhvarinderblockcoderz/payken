import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import SideBar from "./SideBar";
import Navbar from "./ui/Navbar";

export default function GoogleAuth() {
  const googleAuthInputRef = useRef();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);

  async function googleauthverify(data) {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/qrCodeVerify", {
        token: token,
        data,
      });
      const response = res.data;
      toast.success("Verification code verified successfully");
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      setTimeout(() => {
        router.push("/completeAuth");
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error("Invalid verification code");
      setError(true);
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
    }
  }

  async function googleAuthVerificationCodeHandler(event) {
    event.preventDefault();
    const otp = googleAuthInputRef.current.value;
    if (!otp) {
      setError(false);
      toast.error("Please Provide the verification code");
      return;
    }
    const data = {
      otp,
    };

    
    googleauthverify(data);
  }

  return (
    <div className='new-dashboard'>
      <SideBar/>
    <div id="qrScanner">
      <form className="profile-sec profile-sectset">
      <div className="container">
   
        <div className="scanQR-heading--div">
          <h1 className="scanQR-heading">Two Factor Authentication</h1>
        </div>
        </div>
     
        <ToastContainer />
       
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

                            <div className="email-text">
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

                          <div className="right-part"></div>
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
                              <span className="number number-3">3</span>
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
        <div className="scanQR-content">
          <h2 className="scanQR-secondary--heading googleAuth-heading">
            Enable Authenticator by verifing <br /> your account
          </h2>

          <div id="qrScanner">
            <div className="login-form googleAuth-form">
              <div className="input-item googleAuth-input">
                <h6 className="item-text googleAuth-text">
                  {" "}
                  Authenticator code
                </h6>
                <input
                  ref={googleAuthInputRef}
                  className="textinput code-inputField"
                  type="number"
                  required
                  name="username"
                  placeholder="Enter Your Verification code Here..."
                />
                <p className="googleAuth-secondary--text">
                  Enter the 6-digit code from Google Authenticator
                </p>
              </div>

              {error && (
                <p
                  style={{
                    color: "red",
                    fontSize: "15px",
                    margin: "0",
                    marginTop: "30px",
                    textAlign: "center",
                    float: "left",
                    width: "100%",
                  }}
                >
                  {" "}
                  Invalid Verification Code{" "}
                </p>
              )}
              {verify && (
                <p
                  style={{
                    color: "green",
                    fontSize: "15px",
                    margin: "0",
                    marginTop: "30px",
                    textAlign: "center",
                    float: "left",
                    width: "100%",
                  }}
                >
                  {" "}
                  User Verified Successfully{" "}
                </p>
              )}

              <div
                className="scan-div googleAuth-btn--div"
                style={{ cursor: "pointer" }}
              >
                <a href="/2fa" className="scan-previous">
                  Previous
                </a>
                <a
                  className="scan-next "
                  onClick={googleAuthVerificationCodeHandler}
                >
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}
