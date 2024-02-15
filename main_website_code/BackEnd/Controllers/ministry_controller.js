const User = require('../Models/User')
const News = require('../Models/classified')
const fetchuser = require('../middleware/fetchuser')


//1. endpoint for reporting news as fake: POST api/ministry/report (login required!!)
// router.post("/report", fetchuser, async (req, res) => {
exports.myreport = async (req, res) => {
    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            return res.status(401).json({ error: "unauthorized" })
        }

        if (user.userType != "rootAdmin" && user.userType != "Ministry") {
            return res.status(401).json({ error: "unauthorized" })
        }

        let news = await News.findById(req.body.newsid)

        if (!news) {
            return res.status(404).json({ error: "invalid url" })

        }
           
        await News.findByIdAndUpdate(req.body.newsid, { validation: req.body.validation })
        res.status(200).json({ success: "news reported as fake" })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "unauthorized" })
    }
}


// router.post("/fetchministryallnews", fetchuser, async (req, res) => {


exports.fetchministryallnews = async (req, res) => {

    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            return res.status(401).json({ error: "unauthorized" })
        }
        if (user.userType != "rootAdmin" && user.userType != "Ministry") {
            return res.status(401).json({ error: "unauthorized" })
        }
        let allnews = await News.find({ ministry: user.categoryofMinistry })
        return res.status(200).json({ news: allnews })

    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "unauthorized" })
    }
}


//2. endpoint for getting news stats of requesting minsitry: GET api/ministry/stats (login required!!)

// router.post("/fetchrealnews", fetchuser, async (req, res) => {

exports.fetchfakenews = async (req, res) => {

    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            return res.status(401).json({ error: "unauthorized" })
        }

        if (user.userType != "rootAdmin" && user.userType != "Ministry") {
            return res.status(401).json({ error: "unauthorized" })
        }

        let allnews = await News.find({ ministry: user.categoryofMinistry, validation: "fake" })

        return res.status(200).json({ news: allnews })

    } catch (error) {
        return res.status(401).json({ error: "unauthorized" })
    }
}

// router.post("/fetchrealnews", fetchuser, async (req, res) => {
exports.fetchrealnews = async (req, res) => {

    try {
        let user = await User.findById(req.user?.id)
        if (!user) {

            console.log("No user")
            return res.status(401).json({ error: "unauthorized" })
        }

        if (user.userType != "rootAdmin" && user.userType != "Ministry") {
            return res.status(401).json({ error: "unauthorized" })
        }

        let allnews = await News.find({ ministry: user.categoryofMinistry, validation: "real" })

        return res.status(200).json({ news: allnews })

    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "unauthorized" })
    }
}

// router.post("/fetchpositivenews", fetchuser, async (req, res) => {
exports.fetchpositivenews = async (req, res) => {

    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            return res.status(401).json({ error: "unauthorized" })
        }

        if (user.userType != "rootAdmin" && user.userType != "Ministry") {
            return res.status(401).json({ error: "unauthorized" })
        }

        let allnews = await News.find({ ministry: user.categoryofMinistry, sentiment: "POSITIVE" })

        return res.status(200).json({ news: allnews })

    } catch (error) {
        return res.status(401).json({ error: "unauthorized" })
    }
}

// router.post("/fetchnegativenews", fetchuser, async (req, res) => {
exports.fetchnegativenews = async (req, res) => {

    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            return res.status(401).json({ error: "unauthorized" })
        }

        if (user.userType != "rootAdmin" && user.userType != "Ministry") {
            return res.status(401).json({ error: "unauthorized" })
        }

        let allnews = await News.find({ ministry: user.categoryofMinistry, sentiment: "NEGATIVE" })

        return res.status(200).json({ news: allnews })

    } catch (error) {
        return res.status(401).json({ error: "unauthorized" })
    }
}

// router.post("/fetchneutralnews", fetchuser, async (req, res) => {

exports.fetchneutralnews = async (req, res) => {

    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            return res.status(401).json({ error: "unauthorized" })
        }

        if (user.userType != "rootAdmin" && user.userType != "Ministry") {
            return res.status(401).json({ error: "unauthorized" })
        }

        let allnews = await News.find({ ministry: user.categoryofMinistry, sentiment: "NEUTRAL" })

        return res.status(200).json({ news: allnews })

    } catch (error) {
        return res.status(401).json({ error: "unauthorized" })
    }
}

// router.post("/stats", fetchuser, async (req, res) => {

exports.stats = async (req, res) => {

    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            return res.status(401).json({ error: "unauthorized" })
        }  
            k

        if (user.userType != "rootAdmin" && user.userType != "Ministry") {
            return res.status(401).json({ error: "unauthorized" })
        }

        let allnews = await News.find({ ministry: user.categoryofMinistry })

        //validation count
        let validation = allnews.map((news) => { if (news.validation == 'real') return news.validation })
        let real = 0;
        let fake = 0;
        validation.forEach(element => {
            element == 'real' ? real++ : fake++;
        });

        //sentiment count
        let neutral = 0;
        let positive = 0;
        let negative = 0;
        let sentiment = allnews.map((news) => { return news.sentiment })
        sentiment.forEach(element => {
            if (element == 'positive') {
                positive++;
            }
            else if (element == 'neutral') {
                neutral++;
            }
            else {
                negative++;
            }
        });

        //auhtors frequency info
        const newsAuthors = allnews.map((news) => { return news.author })
        const authorFrequency = newsAuthors.reduce((acc, author) => {
            if (acc[author]) {
                acc[author]++;
            } else {
                acc[author] = 1;
            }
            return acc;
        }, {});
        const authorFrequencyArray = Object.entries(authorFrequency);
        authorFrequencyArray.sort((a, b) => b[1] - a[1]);

        //news languages count info
        const languages = allnews.map((news) => { return news.language })
        const languagefrequency = languages.reduce((acc, language) => {
            if (acc[language]) {
                acc[language]++;
            } else {
                acc[language] = 1;
            }
            return acc;
        }, {});


        return res.status(200).json({ totalnewscount: allnews.length, real, fake, positive, negative, neutral, languagefrequency, authorFrequencyArray })

    } catch (error) {
        return res.status(401).json({ error: "unauthorized" })
    }
}
