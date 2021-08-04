// Library
import express from 'express';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// Models
import {UserModel} from "../../database/user";

const Router = express.Router();

/*
Route       /signup
des         /Signup with email and password
Params      /none
Access      Public
Method      POST
*/
Router.post("/signup", async (req, res) => {
    try{        
        await UserModel.findByEmailAndPhoneNumber(req.body.credentials);
        
        // save to DB
        const newuser = await UserModel.create(req.body.credentials);
        
        // generate JWT auth token and
        const token = newUser.generateJwtToken();
        
        // return
        return res.status(200).json({token, status: "success"});
        
    }catch(error){
        return res.status(500).json({error: error.message});
    };
});

/*
Route       /signin
des         /Signup with email and password
Params      /none
Access      Public
Method      POST
*/


export default Router; 