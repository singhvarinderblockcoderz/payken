import React from 'react'
import FaVerifyCode from '../Component/2FaVerifyCode'
import {getSession} from 'next-auth/react'



const wallet = () => {
  return (
    <div>
        <FaVerifyCode/>
    </div>
  )
}

export default wallet

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props:{
//       session
//     }
//   }
// }