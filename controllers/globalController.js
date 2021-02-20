import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/User";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config;


export const getHome = (req, res) => {
    res.render("home", {pageTitle: "Home"});
}

export const getJoin = (req, res) => {
    res.render("join", {pageTitle:"Join"});
}

export const postJoin = async (req, res, next) => {
    const {
        name,
        userID,
        userPW,
        confirmPW
    } = req.body;

    if( userPW !== confirmPW )  {
        return res.json({
            message: "Wrong Password",
            joinSuccess: false
        });
    }

    const sameUserID = await User.findOne({ userID });
    if(sameUserID) {
        return res.json({
            message: "이미 존재하는 아이디입니다.",
            joinSuccess: false
        });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPW, salt);
    const newUser = new User({
        userID: userID,
        userPW: hash,
        name: name
    })
    newUser.save((err, newUser) => {
        if(err) return console.log(err);
        console.dir(newUser);
    })
    res.json(newUser);
}


export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
}

export const postLogin = (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user) =>{
        if( err || !user ) res.status(400).json(err);
        req.login(user, { session: false }, (error) => {
            try {
                if(error) return res.json(error);

                const token = jwt.sign(
                    { 
                       name: user.name,
                       ID: user.userID,
                       _id: user._id
                     },
                     process.env.SECRET_KEY,
                     { expiresIn: 3600 }
                    );
                    req.user = user;
                return res.json({ 
                    message: "Login Success",
                    token
                 });
            } catch (error) {
                return res.json(error);
            }
        });
    })(req, res, next);
}