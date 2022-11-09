import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";
import { data } from "jquery";
import { faLowVision } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../SideBar";
import supabase from "../../utils/SupabaseClient";
import { idText } from "typescript";

const NFTamt = () => {
  const nftPriceInputRef = useRef();
  const nftMintedInputRef = useRef();
  const webAddressInputRef = useRef();
  const descriptionInputRef = useRef();
  const [finalData, setFinalData] = useState();
  const [id, setId] = useState();
  const router = useRouter();

  async function getToken() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    console.log(session?.user?.id, "to get the id from session")
    setId(session?.user?.id)
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect (()=>{
    const data = localStorage.getItem("function")
    console.log(JSON.parse(data),"to see the function data to add more")
    setFinalData(JSON.parse(data))
  },[])

 async function postFinalData(data) {
    try{
      let res = await axios.post ("/api/postFinalData",{id:id,data})
      const response = res.data;
      console.log(response,"to get the response from api to post final data")
    }catch(err){
      console.log(err)
    }
  }


  async function formSubmitHandler(event){
    event.preventDefault()

    console.log(finalData,"to see the data to send to api")

     

    const nftPrice = nftPriceInputRef.current.value;
    console.log(nftPrice,"to see the value of nft price")
    const nftMinted = nftMintedInputRef.current.value;
    console.log(nftMinted,"to see the value of nft minted")
    const webAddress = webAddressInputRef.current.value;
    console.log(webAddress, "to see the description")
    const description = descriptionInputRef.current.value
    console.log(description, "to see the description");
    

    const data = {
      network: finalData?.value,
      smartContract: finalData?.contractAddress,
      nftPrice: nftPrice,
      maxPerMint:nftMinted,
      webAddress: webAddress,
      description:description,
      selectedFunction: finalData?.function.name,
      parameter:finalData?.function.inputs,
      contractName:finalData?.contractName,
      userId:id,
    }

    console.log(data,"to check the data on local storage")
    postFinalData(data);
    // router.push("/nftPages/nftStart")
    window.location="/nftPages/nftStart"
    }




  return (
    <div id="NFTAmt-inner">
      <div className="new-dashboard">
        <section className="profile-sec profile-sects">
          <div className="container">
            <div className="row">
              <SideBar/>
              <form className="funds-sec" onSubmit={formSubmitHandler}>
                <ToastContainer />

                <div className="col-head mt-1 " id="col-head">
                  <h3 className="nft-text">ADD a new NFT collection</h3>

                  <div className="link-head  " id="nft-section">
                    <div className="nft-part">
                      <h4 className="nft-heading">
                        {" "}
                        What's the price of one NFT?
                      </h4>
                      <p className="nft-para">
                        Price is in the network currency (eg. Ethereum) For
                        TestNet contracts ensure the price is no more than 0.001
                        ETH.
                      </p>
                      <div
                        class="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        <input
                        ref={nftPriceInputRef}
                          type="text"
                          className="form-control form-border"
                          placeholder="0.01"
                        />
                      </div>
                    </div>

                    <div className="nft-part pt-0">
                      <h4 className="nft-heading">
                        What's the maximum quantity that can be minted in one
                        purchase?
                      </h4>
                      <p className="nft-para">
                        We may limit this futher,depending on the price of your
                        NFTs.
                      </p>
                      <div
                        class="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        <input
                          ref={nftMintedInputRef}
                          type="text"
                          className="form-control form-border"
                          placeholder="10"
                        />
                      </div>
                    </div>

                    <div className="nft-part pt-0">
                      <h4 className="nft-heading">
                        What's your website address?
                      </h4>
                      <div
                        class="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        <input
                          ref={webAddressInputRef}
                          type="text"
                          className="form-control form-border"
                          placeholder="https://codepen.io/mr-beasy"
                        />
                      </div>
                    </div>

                    <div className="nft-part pt-0">
                      <h4 className="nft-heading">
                        Add a description of your project
                      </h4>
                      <div
                        class="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        <textarea
                          ref={descriptionInputRef}
                          type="text"
                          className="form-control "
                          placeholder="https://codepen.io/mr-beasy"
                          id="textarea-nft"
                        />
                      </div>
                    </div>

                    <div className="nft-part pt-0">
                      <div class="form-check" id="check-froms">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          checked
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          I accept the NFTpay{" "}
                          <span className="terms-text">
                            terms and conditions
                          </span>{" "}
                          of use.
                        </label>
                      </div>
                    </div>

                    <div className="nft-part pt-0">
                      <div className="nft-btnsec mt-0 pt-0">
                        <button className="btn back-nftbtn" type="button">
                          Cancel
                        </button>
                        <button className="btn next-nftbtn" type="submit">
                          Add Collection
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabindex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel"></h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h4>5% to 10% Per month</h4>
                <p>Up to 3x with all work & non worthy incoms.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <a
                  href="/activateWallet"
                  type="button"
                  className="btn btn-primary"
                >
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTamt;
