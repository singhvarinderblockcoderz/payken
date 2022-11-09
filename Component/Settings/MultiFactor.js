import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
// import Arrow from "../public/arrow.svg";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { fas } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../SideBar";
import supabase from "../../utils/SupabaseClient";

 export default function EnrollMFA ({
  onEnrolled,
  onCancelled,
})
{
 
  const [factorId, setFactorId] = useState('')
  const [qr, setQR] = useState('') // holds the QR code image SVG
  const [verifyCode, setVerifyCode] = useState('') // contains the code entered by the user
  const [error, setError] = useState('') // holds an error message

  const onEnableClicked = () => {
    setError('')
    ;(async () => {
      const challenge = await supabase.auth.mfa.challenge({ factorId })
      if (challenge.error) {
        setError(challenge.error.message)
        throw challenge.error
      }

      const challengeId = challenge.data.id

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: verifyCode,
      })
      if (verify.error) {
        setError(verify.error.message)
        throw verify.error
      }

      onEnrolled()
    })()
  }

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      })
      if (error) {
        throw error
      }

      setFactorId(data.id)

      // Supabase Auth returns an SVG QR code which you can convert into a data
      // URL that you can place in an <img> tag.
      setQR(data.totp.qr_code)
    })()
  }, [])

  return (
    <>
      {error && <div className="error">{error}</div>}
      <img src={qr} />
      <input
        type="text"
        value={verifyCode}
        onChange={(e) => setVerifyCode(e.target.value.trim())}
      />
      <input type="button" value="Enable" onClick={onEnableClicked} />
      <input type="button" value="Cancel" onClick={onCancelled} />
    </>
  )
}



  // return (
  //   <div id="changepassword-inner" class="profile-sects pt-0">
  //     <div className="dark-overlay">
  //       <div className="container-fluid">
  //         <div className="row">
  //           <SideBar />
  //           <ToastContainer />
  //           <div className="col">
  //             <div className="card text-center card-form">
  //               <div className="card-body">
  //                 <h3>Change Your Email</h3>
  //                 <p>
  //                   Please provide valid credentails to change your registered
  //                   email
  //                 </p>
  //                 <form>
  //                   <div className="form-group mb-4">
  //                     <input
  //                       defaultValue={showNewEmail || email}
  //                       type="email"
  //                       name="oldemail"
  //                       // disabled
  //                       className="form-control form-control-lg"
  //                       placeholder="Enter Your Registered Email"
  //                       style={{ textAlign: "left" }}
  //                     />
  //                   </div>
  //                   <div className="form-group mb-4">
  //                     <input
  //                       type="email"
  //                       name="newemail"
  //                       className="form-control form-control-lg"
  //                       placeholder="Enter New Email Here"
  //                       style={{ textAlign: "left" }}
  //                       onChange={(e) => setNewEmail(e.target.value)}
  //                     />
                      
  //                   </div>
  //                   {verify && (
  //                       <p style={{textAlign:"left"}}>
  //                         A Confirmation Link has been sent to your current and New Email.. <br/> 
  //                         please click confirm on both to change email.
  //                       </p>
  //                     )}
  //                   <Button
  //                     className="form-group w-100 btn-outline-light"
  //                     style={{
  //                       marginTop: "5px",
  //                       background: "#103703",
  //                       borderRadius: "100px",
  //                       marginBottom: "4px",
  //                     }}
  //                     type="submit"
  //                     disabled={isLoading}
  //                     onClick={(e) => emailModify(e)}
  //                   >
  //                     {isLoading ? "Loading…" : "   Submit"}
  //                   </Button>
  //                 </form>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )

;
