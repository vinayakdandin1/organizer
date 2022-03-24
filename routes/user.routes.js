const router = require("express").Router();

const Student = require("../models/Student.model")

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/profile", isLoggedIn, (req, res) => {
    const loggedInUser = req.session.user
    res.render("profile", {loggedInUser})
})

router.get("/createStudents", isLoggedIn, (req, res) => {
    const loggedInUser = req.session.user
    res.render("students/studentsCreate", {loggedInUser})
})

router.post("/createStudents", isLoggedIn, async (req, res) => {
    let students = req.body.studentNames.toLowerCase()
    let studentsArray = students.split(" ")
    studentsArray = studentsArray.map((e) => {
        return e = {"name": e}
    })

    try {
        await Student.insertMany(studentsArray)
        res.redirect("/profile")
        
    } catch (error) {
        console.error(error)
    }   
})

router.get("/createCohort", isLoggedIn, (req, res) => {
    const loggedInUser = req.session.user
    res.render("students/cohort", { loggedInUser })
})

module.exports = router;