const axios=require('axios');

const getSearch=async(req,res)=>{
   const {search}=req.query;
   const {access_token}=req.query;
   let query="q="+search+"&type=track";
   const data=await axios({
        url:"https://api.spotify.com/v1/search?"+query,
        method:"GET",
        headers:{
            "Authorization":"Bearer "+access_token
        },
    });
    // data.data.tracks.items.forEach(element => {
    //     console.log(element.name);
    //     console.log(element.type);
    //     console.log(element.uri);
    // });
    res.send({message:"sucess",items:data.data.tracks.items},)
}

module.exports={
    getSearch,
}