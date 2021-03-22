import routes from "./routes";
import jwt from "jsonwebtoken";

export const localsMiddleware = (req, res, next) => {
    res.locals.routes = routes;
    next();
};

export const verifyToken = async (req, res, next) => {
    let decoded;

    const token = req.cookies.token;

    if(!token) {
        return res.json({
            success: false,
            message: "No token"
        });
    }

    try {
        decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        if(error.message === "jwt expired") {
            console.log("expired token");
            return -3;
        } else if(error.message === "invalid token") {
            console.log("invalid token");
            return -2;
        } else {
            console.log("invalid token");
            return -2;
        }
    }

    req.token = token;
    req.user = decoded
    next();
};

//export const middleware = async(req, res, next) => {
//
//};