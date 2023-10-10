const express=require('express')

const fs=require('fs')

const router=express.Router()

router.get('/login',(req,res,next)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/message" method="POST"><input type="text" name="username" id="username"><button type="submit">Login</button></form>')
})

router.use('/message',(req,res,next)=>{
    const readData=fs.readFileSync('./message.txt','utf8')
    res.send(`<h4>${readData}</h4><form onsubmit= "document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST"><input type="text" name="message"><input type="hidden" name="username" id="username"><button type="submit">send</button></form>`)
})

router.post('/',(req,res,next)=>{
    var str=" "+JSON.parse(JSON.stringify(req.body.username))+" : "+JSON.parse(JSON.stringify(req.body.message))
    console.log(JSON.parse(JSON.stringify(req.body)))
    fs.appendFile('./message.txt',str,err=>{
       // console.log(str)
    })
    res.redirect('/message')
})


module.exports=router