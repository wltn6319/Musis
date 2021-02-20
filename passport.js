import bcrypt from "bcrypt";
import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import dotenv from "dotenv";
import User from "./models/User";

dotenv.config;

const localStrategy = passportLocal.Strategy;
const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const isAuthenticate = () => {
    
}


const localStrategyOptions = {
    usernameField: "userID",
    passwordField: "userPW"
}

const jwtStrategyOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

const localVerify = async (id, pw, done) => {
    let user;
    try {
        user = await User.findOne({
            userID: id
        })

        if(!user) return done(null, false);
        const samePassword = bcrypt.compare(pw, user.userPW);
        if(!samePassword) return done(null, false);
    } catch (error) {
        done(error);
    }
    return done(null, user)
}

const jwtVerify = async (payload, done) => {
    let user;
    try {
        user = await User.findOne(payload.userID);
        if(!user) return done(null, false);
    } catch (error) {
        return done(error);
    }
    return done(null, user);
}

passport.use(new localStrategy(localStrategyOptions, localVerify));
passport.use(new JWTstrategy(jwtStrategyOptions, jwtVerify));