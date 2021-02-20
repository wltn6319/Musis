export const getProfile = (req, res, next) => {
    res.json({
        message: "You made it to the secure route",
        user: req.user
    })
}