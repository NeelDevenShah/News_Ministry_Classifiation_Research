// const express = require('express');
// const app = express();
// const connectDB = require('./db.js');
// const PORT = 5000;
// const cors = require('cors');
// const fetchnews = require('./scrapnews.js');
// const UCL_News = require('./Models/unclassified.js');
// const CL_News = require('./Models/classified.js');
// // const UCL_News = require('./Models/unclassified.js')

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // app.use('/news', require('./Routes/news_routes.js'));
// // app.use('/auth', require('./Routes/auth_routes.js'));
// app.use('/ministry', require('./Routes/ministry_routes.js'));
// app.use('/auth', require('./Routes/auth_routes.js'))
// app.use('/', require('./Routes/news_routes.js'))

// // app.get('/', (req, res) => {
// //     res.send("Running!!!")
// // })

// app.listen(PORT, () => {
//     console.log(`🚀 Server started at http://localhost:${PORT}`);
//     connectDB();
// });

// let x = 0

// // setInterval(async () => {

// //     await (async () => {
// //         try {
// //             let allnews = await fetchnews(); // Wait for the promise to resolve
// //             console.log(allnews[x])
// //             UCL_News.create(await allnews[x])
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     })();

// //     x++;

// // },5 * 1000);

// const classfiynews = async () => {
//     let allunclnews = await UCL_News.find({})

//     allunclnews.forEach(async (element) => {
//         let json = element.toJSON()
//         json["sentiment"] = "neutral"
//         json["ministry"] = "Finance"

//         await CL_News.create(json)
//         await UCL_News.findByIdAndDelete(element.id)
//     });

// }

// // setInterval(() => {

// // }, 2 * 60 * 1000);

// // classfiynews()


const express = require('express');
const app = express();
const connectDB = require('./db.js');
const PORT = 5000;
const cors = require('cors');
const classify = require('./ML/classify.js');
const fetchnews = require('./scrapnews.js');
const User = require('./Models/User.js');

const bcrypt = require('bcryptjs')



// const fetchnews = require('./scrapnews.js');
const UCL_News = require('./Models/unclassified.js');
const CL_News = require('./Models/classified.js');
// const UCL_News = require('./Models/unclassified.js')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/news', require('./Routes/news_routes.js'));
// app.use('/auth', require('./Routes/auth_routes.js'));
app.use('/ministry', require('./Routes/ministry_routes.js'));
app.use('/auth', require('./Routes/auth_routes.js'))
app.use('/', require('./Routes/news_routes.js'))

// app.get('/', (req, res) => {
//     res.send("Running!!!")
// })

app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
    connectDB();
    console.log(`Connected to MongoDb`);
});

let x = 0

// setInterval(async () => {

//     await (async () => {
//         try {
//             let allnews = await fetchnews(); // Wait for the promise to resolve
//             console.log(allnews[x])
//             UCL_News.create(await allnews[x])
//         } catch (error) {
//             console.error(error);
//         }
//     })();

//     x++;

// }, 5 * 1000);

// setInterval(async () => {
//     classify()
// }, 30 * 1000);

const classfiynews = async () => {
    let allunclnews = await UCL_News.find({})

    allunclnews.forEach(async (element) => {
        let json = element.toJSON()
        json["sentiment"] = "neutral"
        json["ministry"] = "Finance"

        await CL_News.create(json)
        await UCL_News.findByIdAndDelete(element.id)
    });

}

// setInterval(() => {

// }, 2 * 60 * 1000);

// classify()

// classfiynews()
