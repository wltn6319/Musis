import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import routes from "../routes";
import product from "../models/product";

dotenv.config;


export const getHome = (req, res) => {
    let token = req.cookies.token //로그인이 되어있는지 판별 (로그인시 상단에 <로그아웃 프로필> 표시 안되있을시 <로그인? 표시 )
    product.find((err, products) => {
        res.render("home", 
        {pageTitle: "Home",
        products : products,
        user : token
    });
    })
}

export const getJoin = (req, res) => {
    res.render("join.ejs");
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
    res.render("join_success.ejs", {userid: userID, username: name});
}


export const getLogin = (req, res) => {
    res.render("login.ejs");
}

export const postLogin = async (req, res, next) => {
    const {
        userID, userPW
    } = req.body;

    let user;
    try {
        user = await User.findOne({
            userID: userID
        });

        if(!user) return res.status(401).send("No find User");
        const comparePassword = bcrypt.compare(userPW, user.userPW);
        if(!comparePassword) return res.status(401).send("Passwords do not match");

        const token = jwt.sign(
            {
                name: user.name,
                id: user.userID,
                _id: user._id
            },
            process.env.SECRET_KEY,
            { expiresIn: 3600 }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 5 * 60 * 1000
        });
        console.log({
            token,
            user
        })
        res.redirect("/");

    } catch (error) {
        return res.status(401).send("Error");
    }
}

export const logOut = (req, res) => {
    res.clearCookie("token");
    res.redirect(routes.home);
}

