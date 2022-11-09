import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";

const stripePromise = loadStripe(
  "pk_test_51LxThRSIs5MqMViAdKdpIT57Qgx7wgxC34MBxRUofCRsIl6DYak8752zIBemujzjTPG5dmX5RSBTYe32DQjn7ot300ICSJGUXN"
);

const Purchase = ({ props, price }) => {
  console.log(props, price, "to see the contract Identity");
  console.log(props?.data.maxPerMint, "to get the contract Identity");
  console.log(props?.data.description, "to check the descriptioin");

  const [isLoading, setIsLoading] = useState(false);
  const [upCount, setUpCount] = useState(1);
  const [max, setMax] = useState(props?.data.maxPerMint);
  const [min, setMin] = useState(1);
  const [description, setDescription] = useState(props?.data?.description);
  const emailInputRef = useRef();
  const [checkEmail, setCheckEmail] = useState();
  const [check, setCheck] = useState();

  async function addClickHandler(e) {
    if (upCount + 1 > max) return;
    setUpCount(upCount + 1);
  }
  async function seprectClickHandler(e) {
    if (upCount - 1 < min) return;
    setUpCount(upCount - 1);
  }

  async function emailCheckHandler(e) {
    e.preventDefault();

    const email = emailInputRef.current.value;

    if (!email) {
      toast.error("Please Provide the payken email");
      return;
    }

    if (!email.includes(".com")) {
      toast.error("Please Provide valid Email");
      return;
    }

    setCheckEmail(email);
  }

    // async function buyNft(data) {
    //   try {
    //     let res = await axios.post("/api/buyNft",data);
    //     const response = res.data;
    //     console.log(response, "to get the response from nft");
    //     toast.success("Nft data added successfully");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // async function formSubmitHandler(event) {
    //   event.preventDefault();

    //   const data = {
    //     userId,
    //     tokenId,
    //     Qauntity,
    //     transactioncc,
    //     transactionStatus,
    //   };

    //   console.log(data,"data entered to buy the nft")

    //   buyNft(data)
    // }

  let amount = 1;
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    // clientSecret,
    appearance,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    // let total = JSON.parse(localStorage.getItem("query"));

    try {
      console.log(Math.ceil(price));
      const response = await axios.post("/api/payment/checkout_sessions", {
        data: {
          amount: price,
          quantity: upCount,
          description: description,
          email: checkEmail,
        },
      });

      // let token =  localStorage.getItem('token')
      const stripe = await stripePromise;
      console.log(response, "id here for  you");

      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      console.log(response.data.id, "id here for  you");
      if (error) {
        setIsLoading(false);
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* <SideBar /> */}
      <div id="home-inner" className="profile-sects profile-sects2 pt-0">
        <div className="dark-overlay">
          <div className="container-fluid">
            <div className="row">
              <ToastContainer />
              <div className="col" id="card-head">
                <div className="card text-center text-light card-form">
                  <div className="card-body " id="emalCheckId">
                    {/* <div className="purchase-heading">
                      <h3 className="purchase-txt">PURCHASE </h3>
                      <p>Set 2 of 3</p>
                    </div> */}

                    {checkEmail ? (
                      <form id="purchase-form">
                        <div className="purchase-heading">
                          <h3 className="purchase-txt">PURCHASE </h3>
                          <p>Set 2 of 3</p>
                        </div>
                        <div className="progress" id="purchase-progress">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "100%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>

                        <p className="purchase-text">
                          Purchase your NFT with NFTpay
                        </p>

                        <h6>Choose quantity</h6>
                        <div className="number-section">
                          <div className="number-count">
                            <h3> {upCount}</h3>
                          </div>
                          <div className="arrows-section">
                            <i
                              className="bi bi-caret-up-fill"
                              onClick={(e) => addClickHandler(e.target.value)}
                            ></i>
                            <i
                              className="bi bi-caret-down-fill"
                              onClick={(e) =>
                                seprectClickHandler(e.target.value)
                              }
                            ></i>
                          </div>
                        </div>
                        <h4>SuperDope</h4>
                        <h6 style={{ color: "black" }} className="max-text">
                          Maximum {max}
                        </h6>
                        <h6 style={{ color: "black" }} className="max-text">
                          {" "}
                          Price {price}{" "}
                        </h6>
                        <h6 style={{ color: "black" }} className="max-text">
                          {" "}
                          Total Price {(price * upCount).toFixed(4)}
                        </h6>

                        <div className="form-check mt-3" id="form-checkers">
                          <input
                            className="form-check-input checker-setting"
                            type="checkbox"
                            value=""
                            required
                            id="defaultCheck1"
                            onChange={(e) => console.log(e.currentTarget.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            I Agreed to all terms and conditions
                          </label>
                        </div>
                        {/* <div>
                        <ConnectButton/>
                      </div> */}

                        {/* <Link href="/connectButton"> */}
                        <div className="google-btn mt-2">
                          <Button
                            variant="secondary"
                            className="form-group w-100 btn-outline-light"
                            id="create-btn"
                            style={{ marginTop: "1rem !important" }}
                            type="button"
                            disabled={isLoading}
                            onClick={onSubmit}
                          >
                            {isLoading ? "Loading…" : "   Submit"}
                          </Button>
                        </div>
                        {/* </Link> */}
                      </form>
                    ) : (
                      <form id="email-form">
                        <div className="purchase-heading">
                          <h3 className="purchase-txt">PURCHASE </h3>
                          <p>Set 1 of 3</p>
                        </div>
                        <div className="progress" id="purchase-progress">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "100%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="input-group mb-3" id="emailCheck">
                          <input
                            ref={emailInputRef}
                            type="email"
                            className="form-control"
                            placeholder="Enter Your Email Here"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                          />
                          <h6 style={{ textAlign: "left", marginTop: "20px" }}>
                            Please Provide Payken Email to Purchase the selected
                            NFT
                          </h6>
                        </div>
                        <div className="google-btn mt-2">
                          <Button
                            variant="secondary"
                            className="form-group w-100 btn-outline-light"
                            id="create-btn"
                            style={{ marginTop: "3rem !important" }}
                            type="button"
                            disabled={isLoading}
                            onClick={emailCheckHandler}
                          >
                            {isLoading ? "Loading…" : "   Submit"}
                          </Button>
                        </div>
                        {/* </Link> */}
                      </form>

                      // <form id="email-check">
                      //   <div className="purchase-heading">
                      //     <h3 className="purchase-txt">PURCHASE </h3>
                      //     <p>Set 1 of 3</p>
                      //   </div>
                      //   <div className="input-group mb-3" id="emailCheck">
                      //     <input
                      //       ref={emailInputRef}
                      //       type="email"
                      //       className="form-control"
                      //       placeholder="Email"
                      //       aria-label="Email"
                      //       aria-describedby="basic-addon1"
                      //     />
                      //     <h6 style={{ textAlign: "left" }}>
                      //       Please Provide Payken Email to Purchase the selected
                      //       NFT
                      //     </h6>
                      //   </div>
                      //   <button
                      //     onClick={emailCheckHandler}
                      //     disabled={isLoading}
                      //     type="button"
                      //     className="btn "
                      //     id="create-btn"
                      //   >
                      //     {isLoading ? "loading..." : "Submit"}
                      //   </button>
                      // </form>
                    )}
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

export default Purchase;
