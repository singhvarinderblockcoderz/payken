import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Alert } from "react-bootstrap";
import SideBar from "../SideBar";
import supabase from "../../utils/SupabaseClient";

const SuccessPage = () => {
  return (
    <div id="Success-inner">
      <div className="successPage">
        <div className="column1">
          <div >
            <img src="/success.png"/>
          </div>
        </div>
        <div className="column2">
          <div className="successPage-heading--div">
            <h3 className="successPage-heading">Payken#151</h3>
            <p className="successPage-heading---content">Payken</p>
          </div>
          <hr/>
          <div>
            <h4 className="successPage-heading--div">
            SuperDope is a demo NFT project by NFTpay.xyz.
            </h4>
          </div>
          <hr/>
          <div>
              <h4>DETAILS:-</h4>
              <ul className="listItems">
                <li>Email-Id:-</li>
                <li>Contract-Id:-</li>
                <li>Amount:-</li>
                <li>Price:-</li>
                <li>Description:-</li>
              </ul>
          </div>


        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
