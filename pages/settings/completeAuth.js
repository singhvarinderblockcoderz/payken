import React from 'react'
import Welcome from '../Component/CompleteAuth'
import {getSession} from 'next-auth/react'


const wallet = () => {
  return (
    <div>
        <Welcome/>
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