import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Tab, Tabs, Sonnet } from "react-bootstrap";
import Navbar from "../ui/Navbar";
import { useRef } from "react";
import { Alert } from "react-bootstrap";
import SideBar from '../../Component/SideBar'
import Script from "next/script";
import supabase from "../../utils/SupabaseClient";

const NFTDashboard = (id) => {
  const [data, setData] = useState();
  const [value, setValue] = useState(1);
  // const [id, setId] = useState();
  const contractAddressRef = useRef();
  const router = useRouter();
  const [error, setError] = useState(null);
// console.log(id,'to see user id hererejdkjfkdj')

  async function getFinalDataById() {
    try{

      // const {
      //   data: { session },
      // } = await supabase.auth.getSession();
      // console.log(
      //   session,
      //   "to get the session from supabase to get the token"
      // );

      // console.log(session?.user?.id,"to get the id from session to get nft data")
      // setId(session?.user?.id)
      let res = await axios.post ("/api/getFinalDataById", {id:id.userId})
      const response = res.data.data;
      setData(response)
      console.log(response, "to get the response from api to get data by Id")
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    console.log(id.userId,'htttt');
    getFinalDataById();
  },[])

  async function contractIdentity(e){
    e.preventDefault();
    console.log(e.target.value);
    const contract = e.target.value;
    router.push({
      pathname: "/payment/" + contract,
    });
  }

  return (
    <div id="NFTDashboard-inner">
      <div className="new-dashboard">
        <section className="profile-sec profile-sects">
          <div className="container-fluid">
            <div className="row">
              <SideBar/>
              <form className="funds-sec">
                <ToastContainer />

                <div className="col-head p-0" id="col-head">
                    <Link href="/nftStart">
                  <div className="nft-btnsec pb-5 " id="nftDashboard-btnSec">
                    <button style={{background:"white", color:"black"}}className="btn back-nftbtn " type="button">
                      Back to collection
                    </button>{" "}
                  </div>
                    </Link>
                  <h3 className="nft-text">Your Collection</h3>
                  <div class="alert alert-light" id="alert-light" role="alert">
                    <h6 style={{color:"black"}}> Your NFTpay integration is in review.</h6>
                    <p className="mb-0" style={{color:"black"}} >
                      We are reviewing your contract and will email you with an
                      update within 24 hours.
                    </p>
                  </div>

                  <Tabs
                    eventKey="Wallet"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab
                      eventKey="HOW TO USE NFTPAY"
                    className="btn-ajayaar nav-link active"
                      title="HOW TO USE NFTPAY"
                      style={{ height: "50px" }}
                    >
                      {/* <TokenPage/> */}
                      <div className="nftDashboard-tabhead">
                        <div className="nftDashboard-tab pt-0">
                          <h4>{data?.contractName || "Undefined"}  contract</h4>
                          <div className="nft-btnsec pt-0 pb-4 mt-2">
                            <button
                              className="btn back-nftbtn"
                              id="dashboardtab-buttons"
                              value={data?.contractIdentity}
                              onClick={(e)=>contractIdentity(e)}
                              type="button"
                            >
                              Load The NFTpay form
                            </button>
                            {/* <Script id="creatify_script" src="https://payken-payment.vercel.app/"/>

<button onClick="show_creatify_popup()">Buy with card</button> */}
{/* <iframe src="https://payken-payment.vercel.app/" width={"100%"} height="100%" /> */}
                          </div>
                        </div>

                        <div class="description">
                          {/* <!-- price  --> */}
                          <div id="price_read" class="property">
                            <div class="prompt">Price of one NFT</div>
                            <div class="value">
                              {data?.nftPrice} MATIC &nbsp;{" "}
                              <a
                                onclick="edit_contract_price()"
                                class="link under"
                              >
                                {/* change price */}
                              </a>
                            </div>
                          </div>

                          <div class="property">
                            <div class="prompt">Max per transaction</div>
                            <div class="value">{data?.maxPerMint}</div>
                          </div>
                          <div class="property">
                            <div class="prompt">Network</div>
                            <div class="value">{data?.network} Test Mumbai</div>
                          </div>
                          <div class="property">
                            <div class="prompt">Address</div>
                            <div class="value">
                              {data?.smartContract}
                            </div>
                          </div>
                          <div class="property">
                            <div class="prompt">Contract identifier</div>
                            <div class="value">
                              {data?.contractIdentity}
                            </div>
                          </div>
                          <div class="property">
                            <div class="prompt">Explorer</div>
                            <div class="value">
                              <a
                                target="_blank"
                                rel="no-reference"
                                href={data?.explorer}
                              >
                                explorer link
                                {/* <img src="/img/icons/launch.svg" /> */}
                              </a>
                            </div>
                          </div>
                          <div class="property">
                            <div class="prompt">Minting function name</div>
                            <div class="value">{data?.selectedFunction}</div>
                          </div>
                          <br />

                          <h2>How to add NFTpay to your website</h2>

                          <div class="standard">
                            There are 2 ways to add the NFTpay payment form to
                            your website. Both options involve copy-pasting some
                            code directly onto a webpage on your site.
                            <b>Select and use just one option below.</b>
                            <br />
                            <br />
                          </div>

                          <div
                            id="warn_contract_includes_dynamic_parms"
                            class="errorbox hidden"
                          >
                            This collection includes{" "}
                            <span
                              id="infobox_contract_name1"
                              class="infobox_key"
                            >
                              dynamic values
                            </span>{" "}
                            which you must modify at runtime.
                          </div>
                          <br />

                          <div class="contract_subhead">
                            Option 1: Embeddable credit card form code
                          </div>
                          <div class="standard">
                            <b>Option 1</b> provides an injected script which
                            adds a 'Buy with Card' button and displays the
                            payment form in a popup. This option may not always
                            work with third-party website building platforms.
                          </div>
                          <br />
                          <div>
                            Copy this code into your web page. You must replace
                            any{" "}
                            <span class="embedded_parm_val">
                              dynamic variables
                            </span>{" "}
                            at runtime.
                          </div>

                          <div id="embedded_code_div" class="embedded_code">
                            &lt;!-- VOXI on Polygon Test Mumbai --&gt; <br />
                            &lt;link rel="stylesheet" type="text/css"
                            href="https://sandbox.nftpay.xyz/css/iframe_inject.css"
                            /&gt;
                            <br />
                            &lt;script id="creatify_script"
                            src="https://sandbox.nftpay.xyz/libs/iframe_inject.js?contract_uuid=5d30068d-6ab1-4e0f-8cdf-c055a2a9deaf"&gt;&lt;/script&gt;{" "}
                            <br />
                            <br />
                            &lt;button onclick="show_creatify_popup()"&gt;Buy
                            with card&lt;
                          </div>
                          <br />

                          <button
                            id="copy_to_clipboard_script_button"
                            onclick="copy_to_clipboard(this, 'embedded_code_textarea')"
                            class="tertiary compact pad"
                            style={{backgroundColor:"white", color:"black"}}
                          >
                            Copy
                          </button>
                          <br />
                          <br />
                          <br />

                          <div class="contract_subhead">
                            Option 2: Embeddable iFrame
                          </div>
                          <div class="standard">
                            <b>Option 2</b> provides an iframe that displays the
                            pay form. This option requires you to decide how and
                            when to display it but works with almost all
                            third-party website building platforms.
                          </div>
                          <br />
                          <div>
                            Copy this iframe into your web page. You must
                            replace any{" "}
                            <span class="embedded_parm_val">
                              dynamic variables
                            </span>{" "}
                            at runtime.
                          </div>
                          <textarea
                            rows="2"
                            id="embedded_iframe_textarea"
                            class="hidden"
                          ></textarea>
                          <div id="embedded_iframe_div" class="embedded_code">
                            &lt;!-- iframe version --&gt; <br />
                            &lt;iframe height="550" style="border:none"
                            src="https://sandbox.nftpay.xyz/iframe/iframe_pay/5d30068d-6ab1-4e0f-8cdf-c055a2a9deaf?"&gt;&lt;/iframe&gt;
                          </div>
                          <br />

                          <button
                            id="copy_to_clipboard_iframe_button"
                            onclick="copy_to_clipboard(this, 'embedded_iframe_textarea')"
                            class="tertiary compact pad"
                            style={{backgroundColor:"white", color:"black"}}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </Tab>
                    <Tab
                      eventKey="YOUR SALES"
                      className="btn-ajayaar"
                      title="YOUR SALES"
                      style={{ height: "50px" }}
                    >
                      <div className="nftDashboard-tabhead">
                        <h2>Your NFTpay sales</h2>

                        <div
                          id="datatable_transactions_wrapper"
                          class="dataTables_wrapper no-footer"
                        >
                          <div
                            id="datatable_transactions_filter"
                            class="dataTables_filter"
                          >
                            <label>
                              Search:
                              <input
                                type="search"
                                class=""
                                placeholder=""
                                aria-controls="datatable_transactions"
                              />
                            </label>
                          </div>
                          <table
                            id="datatable_transactions"
                            class="admin_table dataTable no-footer"
                            role="grid"
                            aria-describedby="datatable_transactions_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="datatable_transactions"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Transaction UUID: activate to sort column ascending"
                                  style={{ width: "0px" }}
                                >
                                  Transaction UUID
                                </th>
                                <th
                                  class="sorting_desc"
                                  tabindex="0"
                                  aria-controls="datatable_transactions"
                                  rowspan="1"
                                  colspan="1"
                                  aria-sort="descending"
                                  aria-label="Timestamp: activate to sort column ascending"
                                  style={{ width: "0px" }}
                                >
                                  Timestamp
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="datatable_transactions"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Hash: activate to sort column ascending"
                                  style={{ width: "0px" }}
                                >
                                  Hash
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="datatable_transactions"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Status: activate to sort column ascending"
                                  style={{ width: "0px" }}
                                >
                                  Status
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="datatable_transactions"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Status: activate to sort column ascending"
                                  style={{ width: "0px" }}
                                >
                                  Partner querystring
                                </th>
                              </tr>
                            </thead>
                            <tbody id="datarows_transactions">
                              <tr class="odd">
                                <td
                                  valign="top"
                                  colspan="5"
                                  class="dataTables_empty"
                                >
                                  No data available
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div
                            class="dataTables_info"
                            id="datatable_transactions_info"
                            role="status"
                            aria-live="polite"
                          >
                            Showing 0 to 0 of 0 entries
                          </div>
                          <div
                            class="dataTables_paginate paging_simple_numbers"
                            id="datatable_transactions_paginate"
                          >
                            <a
                              class="paginate_button previous disabled"
                              aria-controls="datatable_transactions"
                              data-dt-idx="0"
                              tabindex="0"
                              id="datatable_transactions_previous"
                            >
                              Previous
                            </a>
                            <span></span>
                            <a
                              class="paginate_button next disabled"
                              aria-controls="datatable_transactions"
                              data-dt-idx="1"
                              tabindex="0"
                              id="datatable_transactions_next"
                            >
                              Next
                            </a>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab
                      eventKey="TECH SUPPORT"
                      style={{ height: "50px" }}
                      title="TECH SUPPORT"
                    >
                      {/* <Sonnet /> */}
                      <div className="nft-btnsec pt-0 pb-4 mt-2">
                        <button
                          className="btn back-nftbtn"
                          id="dashboardtab-buttons"
                          type="button"
                        >
                          Load The NFTpay form
                        </button>
                      </div>
                    </Tab>
                  </Tabs>
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

export default NFTDashboard;

