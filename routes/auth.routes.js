const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require("bcrypt");

/*Signup*/
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post('/signup', async (req, res) => {
  const normalizedEmail = req.body.email.toLowerCase();

  try {
    const userExists = await User.exists({
      email: normalizedEmail,
    });
    if (userExists) {
      res.render("signup", { msg: "Hey username already exists" });
      return;
    }
    if(req.body.password !== req.body.repeatPassword) {
      res.render("signup", {msg: "Password and repeat password must match"})
      return;
    }
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      email: normalizedEmail,
      password: hash,
    });
    await newUser.save();
    res.redirect("/signin");
  } catch (err) {
    res.render("signup", { msg: "Some kind of error happened" });
  }

})

router.get("/signin", (req, res) => {
  res.render("signin")
})

router.post("/signin", async (req, res) => {
  const normalizedEmail = req.body.email.toLowerCase();
  try {
    const user = await User.findOne({ email: normalizedEmail });
    
    const hashFromDb = user.password;

    const passwordCorrect = await bcrypt.compare(req.body.password, hashFromDb);
    if (!passwordCorrect) {
      res.render("signin", {msg: "incorrect password"} )
      return
    }
    req.session.currentUser = user;
    res.render("profile");
    return
  } catch (err) {
    res.render("signin", { msg: "Wrong username or password" });
  }
})

module.exports = router;