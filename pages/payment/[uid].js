import axios from "axios";
import React from "react";
import PaykenPayment from "../../Component/NFT/PaykenPayment";

const paykenpayment = ({response, price }) => {
  console.log(response,price);
  return (
    <div>
      <PaykenPayment props={response} price={price} />
    </div>
  );
};

export default paykenpayment;

export async function getServerSideProps(context) {
  let { params } = await context;
  let contractIdentity = await params.uid;
  // console.log(contractIdentity, "lllll");

        let res = await axios.post("http://13.126.156.148:5000/api/v1/auth/getci",{contractIdentity:contractIdentity})
        const response = res.data;
        // console.log(response,"to get the response from api to get data by contract Identity")
        var config = {
          method: 'get',
          url:"https://api.etherscan.io/api?module=stats&action=ethprice&apikey=CZTBTD5SBFHCUMGDCWSSCDU8B2H3MPAJSC",
        };
        let res2 =  await axios(config);
        console.log(res2,"to get the response from api to get eth value")
        let rate =res2.data.result.ethusd ;

  return {
    props: {
      response,price:rate,
    },
  };
}
