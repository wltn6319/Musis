export const getProfile = (req, res, next) => {
    return res.json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.token
    })
}

export const postProfile = async (req, res, next) => {

}