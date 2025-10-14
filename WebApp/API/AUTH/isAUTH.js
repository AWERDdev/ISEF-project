const express = require('express');
const router = express.Router()
const rust = require('../rust_lib/pkg/rust_lib.js')

router.get('/',(req,res)=>{
    console.log('this is the AUTH Route this makes sure you have a token')
    return({message:"this is the AUTH Route this makes sure you have a token"})
})

router.get('/validateToken',(req,res)=>{
    console.log(`Route called validating token`)
    const authHeader = req.headers.authorization;
    console.log(`Auth header received: ${authHeader}`)
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log(`No valid authorization header`)
        return res.json({message:"No valid authorization header", AUTH: false});
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    console.log(`Token extracted: ${token}`)
    
    try {
        const tokenValid = rust.verify_token_wasm(token);
    if(!tokenValid){
            console.log(`Token invalid`)
            return res.json({message:"Token invalid", AUTH: false});
        } else {
            console.log(`Token valid`)
            return res.json({message:"Token valid", AUTH: true});
        }
    } catch (error) {
        console.log(`Error validating token: ${error}`)
        return res.json({message:"Error validating token", AUTH: false});
    }
})
module.exports = router