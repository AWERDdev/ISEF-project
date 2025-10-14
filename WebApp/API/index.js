const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const cors = require('cors')

const connectDB = require('./DB/DB');

connectDB()

app.use(cors({
    origin: 'http://localhost:3000'||'http://localhost:3001',
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    console.log("Node JS API has been called")
    return({message:"This is node JS API"})
})
const Usersignup = require('./AUTH/USER/HandleSignup')
const Userlogin = require('./AUTH/USER/HandleLogin')
const COMPsignup = require('./AUTH/COMPANY/HandleSignup')
const COMPlogin = require('./AUTH/COMPANY/HandleLogin')
const COMPUpdate = require('./AUTH/COMPANY/HandleDataUpdate')
const UserUpdate = require('./AUTH/USER/HandleDataUpdate')
const AdminSignup = require('./AUTH/Admin/Adminsingup')
const AdminLogin = require('./AUTH/Admin/AdminLogin')
const MEDPageRoutes = require('./Routes/MEDPage')
const UserActivityRoutes = require('./Routes/UserActivity')
const QuoteRequestRoutes = require('./Routes/QuoteRequest')
const ShoppingCartRoutes = require('./Routes/ShoppingCart')
const PaymentRoutes = require('./Routes/Payment')
const isAUTH = require('./AUTH/isAUTH')

app.use('/apiAUTH/user',Usersignup)
app.use('/apiAUTH/user',Userlogin)

app.use('/apiAUTH/COMP',COMPsignup)
app.use('/apiAUTH/COMP',COMPlogin)

app.use('/apiAUTH/COMP',COMPUpdate)
app.use('/apiAUTH/user',UserUpdate)

app.use('/apiAUTH/admin',AdminSignup)
app.use('/apiAUTH/admin',AdminLogin)

app.use('/apiAUTH',isAUTH)

app.use('/api/MEDPage', MEDPageRoutes)
app.use('/api/user-activity', UserActivityRoutes)
app.use('/api/quote-request', QuoteRequestRoutes)
app.use('/api/shopping-cart', ShoppingCartRoutes)
app.use('/api/payment', PaymentRoutes)

app.listen(port,()=>{
    console.log(`Node API running on Port ${port}`)
})