import express from "express"
const app = express();


app.get("/", (req,res)=>{
    res.send("test")
})

const server = app.listen(process.env.PORT || 3001,()=>{
    console.log(`server running on: http://localhost:${server.address().port}`);
})