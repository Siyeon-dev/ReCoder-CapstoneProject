var express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const id = "ycj@naver.com"
const pw = "123123"

app.use(cors())
app.use(bodyParser.json())
app.post("/", (req,res)=>{
    console.log (req.body )
    if(req.body.s_email === id && req.body.s_password === pw){
        res.statusCode = 200
        const obj = {token: "백엔드 일해라!!!!!"}
        res.json(obj)
    }else{
        res.statusCode = 422
        res.json({error:"비밀번호를 틀렸습니다"})
    }
   
    
})

app.listen(9090,()=>{console.log('서버열림!')})