import React from 'react'
import MultiFactor from '../../Component/Settings/MultiFactor'





const multiFactor = () => {
  return (
    <div>
      <MultiFactor/>
    </div>
  )
}

export default multiFactor;

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