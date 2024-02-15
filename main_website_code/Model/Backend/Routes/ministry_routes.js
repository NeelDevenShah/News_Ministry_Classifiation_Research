//routes for minstry users
const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')

const { myreport, fetchministryallnews, fetchfakenews, fetchrealnews, fetchpositivenews, fetchnegativenews, fetchneutralnews, stats } = require('../Controllers/ministry_controller')


router.post("/report", fetchuser, myreport)
router.get("/fetchministryallnews", fetchuser, fetchministryallnews)
router.get("/fetchrealnews", fetchuser, fetchrealnews)
router.get("/fetchfakenews", fetchuser, fetchfakenews)
router.get("/fetchpositivenews", fetchuser, fetchpositivenews)
router.get("/fetchnegativenews", fetchuser, fetchnegativenews)
router.get("/fetchneutralnews", fetchuser, fetchneutralnews)
router.get("/stats", fetchuser, stats)


//To do:
//upload news : news to ocr api and response to unclassifiedDB
//send negative news to ministry using email

module.exports = router;