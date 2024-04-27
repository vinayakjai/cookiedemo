const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser")
const app=express();


app.use(cors({
    origin:"https://democookie.netlify.app",
    credentials:true,
    exposedHeaders: ["Set-Cookie"]
}))

app.use(cookieParser());

app.use(bodyParser.json());

app.get('/cookie',(req,res)=>{
    const {token}=req.cookies;
    console.log(req.cookies);
    if(!token){
        return res.json({
            message:"cookie not present",
        })
    }

    return res.json({
        message:"cookie fetched successfully",
        token,
    })
})

app.post('/cookie',(req,res)=>{
    let {tokenValue}=req.body;

    return res.cookie("token",tokenValue,{
       sameSite:"none",
       secure:true,
    }).json({
        message:"cookie initialised",
    })
})
app.listen(3000,()=>{
    console.log("server is up");
})
