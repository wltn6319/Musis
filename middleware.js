import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.routes = routes;
    next();
};

export const isAuthenticate = (req) => {
    console.log(req.user);
    if(!req.user) {
        throw Error("You need to login for this action!");
    }
};