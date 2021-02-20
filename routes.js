// global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// users
const USER = "/user";
const PROFILE = "/profile";
const USER_DETAIL = "/:id";
const USER_EDIT = "/:id/edit";
const USER_DELETE = "/:id/delete";

// admin
const ADMIN = "/admin";
const ADMIN_DETAIL = "/:id";
const ADMIN_EDIT = "/:id/edit";

// products

// api
const API = "/api";

// auth
const AUTH = "/auth";


const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    user: USER,
    profile: PROFILE,
    userDetail: USER_DETAIL,
    userEdit: USER_EDIT,
    userDelete: USER_DELETE,
    admin: ADMIN,
    adminDetail: ADMIN_DETAIL,
    adminEdit: ADMIN_EDIT,
    api: API,
    auth: AUTH
};

export default routes;