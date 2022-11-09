import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import SideBar from '../../Component/SideBar'


const NFTamt = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [selected, setSelected]= useState(false);
  const [selected1, setSelected1] = useState(false);

  useEffect(() => {
   let selected= JSON.parse( localStorage.getItem("function"))
   console.log(selected.function.inputs[0].type, "to check the inputs")
   setData(selected.function.inputs) 
  //  setSelected(selected.function.inputs[0].type)
   const selectedData = selected.function.inputs[0].type;
   if (selectedData  == 'uint256'){
      setSelected(true);
   }
   if(!(selectedData == "uint256")){
    setSelected1(true);
 
   }
  }, []);

  // async function value (data) {
  //   try {
  //     let res =

  //   }catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <div id="NFTBfrAmt-inner">
      <div className="new-dashboard">
        <section className="profile-sec profile-sects">
          <div className="container">
            <div className="row">
              <SideBar/>
              <form className="funds-sec">
                <ToastContainer />

                <div className="col-head mt-1 " id="col-head">
                  <h3 className="nft-text">ADD a new NFT collection</h3>

                  <div className="link-head  " id="nft-section">
                    <div className="nft-part">
                      <h4 className="nft-heading">
                        {" "}
                        What values should we pass to your function?
                      </h4>

                      <div
                        className="input-group  flex-nowrap mt-3 "
                        id="three-input"
                      >
                        <div className="threeb-ones">
                          <h6>Parameter</h6>
                          <div className="threeb-one">
                             {data?.map((item,i) => {
                              return(
                               <h4 key={i}>{item?.type} {item.name}</h4>
                              )
                            })}
                           
                          </div>
                        </div>
                        <div className="threeb-two">
                          <h6>Value</h6>
                          <select className=" form-border w-100">
                            <option>select</option>
                            <option  selected ={selected}>Quantity of mint</option>
                            <option selected ={selected1}>Receiving Wallet</option>
                            <option>Dynamic Value</option>
                          </select>
                        </div>
                        <div className="threeb-two"></div>
                      </div>

                      <div className="grey-section">
                        <div className="grey-parts">
                          <p>
                            Specify the values that should be used for each
                            parameter. There are 3 types of parameter:
                          </p>
                        </div>

                        <div className="grey-parts">
                          <h6>
                            {" "}
                            <b> Quantity to Mint</b> (mandatory)
                          </h6>
                          <p>
                            NFTpay will set this parameter to the quantity to be
                            minted, which is chosen by the buyer. You must
                            include this field type as one of your parameters.
                          </p>
                        </div>
                        <div className="grey-parts">
                          <h6>
                            {" "}
                            <b> Receiving Wallet</b> (optional)
                          </h6>
                          <p>
                            our contract requires a parameter which specifies a
                            destination wallet address for NFTs, select the
                            receiving wallet type. NFTpay will set this
                            parameter to the msg.sender address, which will
                            always point to an NFTpay custodial wallet.
                          </p>
                        </div>

                        <div className="grey-parts">
                          <h6>
                            {" "}
                            <b> Dynamic Value</b> (optional)
                          </h6>
                          <p>
                            If you need to send any other parameters to your
                            contract, you can send them from your website to the
                            NFTpay payment form using a queryString. QueryString
                            names should match the parameter name to be
                            specified. We'll show you how to specify these
                            parameters when it's time to install the NFTpay
                            script on your site.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="nft-part pt-0 ">
                      <div className="nft-btnsec mt-0 pb-2 pt-0">
                        <button className="btn back-nftbtn" type="button">
                          Cancel
                        </button>
                        <Link href="/nftPages/nftAmt">
                        <button className="btn next-nftbtn" type="button">
                          Add Collection
                        </button>
                        </Link>
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
          tabIndex="-1"
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
