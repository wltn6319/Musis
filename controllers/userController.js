export const getProfile = (req, res, next) => {
    const decoded = req.user;
   
    const context = {
            userid : decoded.id,
            username : decoded.name
    }
    res.render("profile.ejs", context);
}

export const postProfile = async (req, res, next) => {

}