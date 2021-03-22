// global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

//board
const BOARD = "/board";
const LIST = "/list";
const BOARDCREATE = "/boardCreate";
const BOARDDETAIL = "/boardDetail/:id";
const BOARDUPDATE = "/boardUpdate/:id";
const BOARDDELETE = "/boardDelete/:id";


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
const ADMIN_PRODUCT_DETAIL = "/products/detail/:id";
const ADMIN_PRODUCT_EDIT = "/products/edit/:id";
const ADMIN_PRODUCT_DELETE = "/products/delete/:id";

// products
const PRODUCTS = "/products";
const PRODUCTS_DETAIL = "/:id";
const PRODUCTS_WRITE = "/:id/write"
const PRODUCTS_EDIT = "/:id/edit";
const PRODUCTS_DELETE = "/:id/delete"

// api
const API = "/api";

// auth
const AUTH = "/auth";


const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    board: BOARD,
    list: LIST,
    boardCreate: BOARDCREATE,
    boardDetail : BOARDDETAIL,
    boardUpdate : BOARDUPDATE,
    boardDelete : BOARDDELETE,
    user: USER,
    profile: PROFILE,
    userDetail: USER_DETAIL,
    userEdit: USER_EDIT,
    userDelete: USER_DELETE,
    admin: ADMIN,
    adminDetail: ADMIN_DETAIL,
    adminEdit: ADMIN_EDIT,
    adminProductDetail: ADMIN_PRODUCT_DETAIL,
    adminProductEdit: ADMIN_PRODUCT_EDIT,
    adminProductDelete: ADMIN_PRODUCT_DELETE,
    products: PRODUCTS,
    productsDetail: PRODUCTS_DETAIL,
    productsWrite: PRODUCTS_WRITE,
    productsEdit: PRODUCTS_EDIT,
    productsDelete: PRODUCTS_DELETE,
    api: API,
    auth: AUTH
};

export default routes;