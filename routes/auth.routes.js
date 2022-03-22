const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require("bcrypt");

/*Signup*/
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post('/signup', async (req, res) => {
  const normalizedEmail = req.body.email.toLowerCase();

  try {
    const userExists = await User.exists({
      email: normalizedEmail,
    });
    if (userExists) {
      res.render("auth/signup", { msg: "Hey username already exists" });
      return;
    }
    if(req.body.password !== req.body.repeatPassword) {
      res.render("auth/signup", {msg: "Password and repeat password must match"})
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
    res.render("auth/signup", { msg: "Some kind of error happened" });
  }

})

router.get("/signin", (req, res) => {
  res.render("auth/signin")
})

router.post("/signin", async (req, res) => {
  const normalizedEmail = req.body.email.toLowerCase();
  try {
    const user = await User.findOne({ email: normalizedEmail });
    
    const hashFromDb = user.password;

    const passwordCorrect = await bcrypt.compare(req.body.password, hashFromDb);
    if (!passwordCorrect) {
      res.render("auth/signin", {msg: "incorrect password"} )
      return
    }
    req.session.user = user;
    res.redirect("/profile");
    return
  } catch (err) {
    res.render("auth/signin", { msg: "Wrong username or password" });
  }
})

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      return res
        .status(500)
        .render("auth/logout", {msg: err.message})
    }
    res.redirect("/")
  })
})

module.exports = router;