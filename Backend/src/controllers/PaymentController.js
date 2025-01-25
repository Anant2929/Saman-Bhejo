const crypto = require('crypto')
const axios = require('axios')



const Payment = async( req,res) =>{

try {

    let {
        MUID ,
        transactionId ,
        name ,
        mobile,
        amount 
    } =  req.body;
    console.log(" reaponse in payment", req.body)

    let salt_key= "96434309-7796-8924-ab56988a6076"
    let merchant_id = "PGTESTPAYUAT86"
    const data =  {
        merchantId :merchant_id,
        merchantTransactionId  :transactionId,
        name : name,
        amount: amount * 100,
        redirectURl:`https://localhost:5000/status?id=${transactionId}`,
        redirectMode:'POST',
        mobileNumber: mobile,
        paymentInstrument:{
            type : "PAY_PAGE"
        }

    }
    const keyIndex = 1 ;
    const payload = JSON.stringify(data)
    const payloadMain = Buffer.from(payload).toString('base64');
    const string = payloadMain + '/pg/v1/pay' + salt_key
    const hash = crypto.createHash('sha256').update(string).digest('hex')

    const checkSum = hash + '###' + 1;


    const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
    const options = {
        method:"POST",
        url:prod_URL,
        headers:{
            'accept':'application/json',
            "content-type" : "application/json",
            "X-VERIFY":checkSum,
        },
        data:{
            request:payloadMain
        }
    }

    await axios(options).then(response =>{
        // res.json(response.data)
    }).catch(error=>{
        // console.log("error",error)
    })
}
catch(e){
    // console.log("error",e)
}
}




module.exports = { Payment };