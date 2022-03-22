const router = require("express").Router();

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.use(isLoggedIn);

router.get("/profile", (req, res) => {
    const loggedInUser = req.session.user
    console.log(loggedInUser);
    res.render("profile", {loggedInUser})
})



module.exports = router;