const UCL_News = require('../Models/unclassified.js');
const CL_News = require('../Models/classified.js')
const User = require('../Models/User.js');
const bcrypt = require('bcryptjs');


exports.fetchallnews =
    async (req, res) => {
        if (req.params.category) {
            const news = await CL_News.find({ ministry: req.params.category })
            return res.send(news)

        } else {
            const news = await CL_News.find({})
            return res.send(news)
        }

    }

// exports.createnews =
//     async (req, res) => {
//         const { title, description, date, url } = req.body
//         const image = req.files.image[0].path;
//         const news = await News.create({ title, description, date, image, url })
//         res.json({
//             title: news.title,
//             description: news.description,
//             date: news.date,
//             image: news.image,
//             url: news.url
//         })
//     }

// exports.uploaded =


// exports.createUser =
//     async(req,res)=>{
//         const {name,email} = await req.body
//         const salt = await bcrypt.genSalt(10);
//         const password = await bcrypt.hash(req.body.password, salt);
//         const user = await User.create({name,email,password})
//         res.json({
//             name:user.name,
//             email:user.email,
//             password:user.password
//         })
//     }

// exports.deleteUser =
//     async (req, res) => {
//         const { id } = req.params
//         if (User.findById(id)) {
//             await User.deleteOne({ "_id": id })
//         }
//         else {
//             res.json({
//                 message: "User not found"
//             })
//         }

//         res.json({
//             message: "User deleted"
//         })
//     }

// exports.getnewsbyid =
//     async (req, res) => {
//         const { id } = req.params
//         const news = await CL_News.findOne({ '_id': id })
//         res.json({
//             title: news.title,
//             description: news.description,
//             date: news.date,
//             ministry: news.ministry,
//             image: news.image,
//             type: news.type,
//             url: news.url,
//             auther: news.auther,
//             validation: news.validation,
//             tag: news.tag,
//             sentimate: news.sentimate,
//         })
//     }


// exports.uploaded =
//     async (req, res) => {
//         let user = req.user.id;

//         if (!user) {
//             return res.send("Unauthorized")
//         }


//     }
