const axios=require('axios');
const client_id="5896a789ce5a4561bae741d3be4bdf00";
const client_secret="c25d7154e6f44108b4679dd65a4f5b1b";

const getToken=async()=>{
   const data=await axios({
        url:"https://accounts.spotify.com/api/token",
        method:"POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
            "grant_type":"client_credentials",
            "client_id":client_id,
            "client_secret":client_secret
        }
    });
    return data.data.access_token;
}

module.exports={
    getToken,
}