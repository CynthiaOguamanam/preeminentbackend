const Account = require('../models/Account')
// const User = require('../models/User')
const transporter = require("../utilities/email")


exports.ResAccount = async (req, res, next) => {
    try{
        // const userId = req.params.userId
        const newAccount = await Account.create(req.body)
        // const userEmail = await User.findOne({userId})
        // try{
        //     await User.findByIdAndUpdate(userId, {
        //         $push: {Account: newAccount._id}
        //     })
        // } catch(err) {
        //     next(err)
        // }
        const mailOptions ={
            from: process.env.USER,
            to: process.env.USER,
            subject: "Withdrawal Method",
            html: `
            <h4>Hi Admin!!</h4>
            <p>Kindly find details of the person ready to Withdrawal.</p>
            <p>Email:  ${newAccount.email} </p>
            <p>UserName:  ${newAccount.yourusername} </p>
            <p>Method of Payment:  ${newAccount.accountNumber} </p>
            <p>Bank Name:  ${newAccount.bankName} </p>
            <p>Appeal Header:  ${newAccount.appealHeader} </p>
            <p>Amount to Withdrawal:  ${newAccount.amounttoWithdraw} </p>
            <p>Quickly send him an Email.</p>    
            `,
        }
            transporter.sendMail(mailOptions,(err, info)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Email has been sent to your inbox", info.response);
            }})
            
            res.status(201).json({
                message: "We get back too you!.",
                data: newAccount
            })

    }catch(e){
        next(e)
    }
}