// const mongoose = require('mongoose')
// // const mongoDbClient = require("mongodb").MongoClient
// const mongoURI = 'mongodb://gofood:"food12345"@cluster0-shard-00-00.d1d4z.mongodb.net:27017,cluster0-shard-00-01.d1d4z.mongodb.net:27017,cluster0-shard-00-02.d1d4z.mongodb.net:27017/gofoodMERN?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority' // Customer change url to your db you created in atlas
// // mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/gofoodMERN?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
// module.exports = function () {
//     mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//         // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
//         if (err) console.log("---" + err)
//         else {
//             // var database =
//             console.log("connected to mongo")
//             const foodCollection = await mongoose.connection.db.collection("food_items");
//             foodCollection.find({}).toArray(async function (err, data) {
//                 const categoryCollection = await mongoose.connection.db.collection("food_category");
//                 categoryCollection.find({}).toArray(async function (err, Catdata) {
//                     console.log(err, data, Catdata);

//                 })
//             });
//             // listCollections({name: 'food_items'}).toArray(function (err, database) {
//             // });
//             //     module.exports.Collection = database;
//             // });
//         }
//     })
// };



const mongoose = require("mongoose");

const databaseURI = "mongodb+srv://gofood:food12345@cluster0.2sexopl.mongodb.net/gofoodMERN?retryWrites=true&w=majority"
const mongoDB = async () => {
    await mongoose.connect(databaseURI, { useNewUrlParser: true,})
        
        .then(async() => {
            console.log("Connected");
            const fetchData =await mongoose.connection.db.collection("food_items")
            fetchData.find({}).toArray(async function (err, data) {
                const fetchCate =await mongoose.connection.db.collection("food_category")
                fetchCate.find({}).toArray(function (err, cateData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.food_category = cateData;
                        // console.log(global.food_category);
                        // console.log(global.food_items);
                    }
                })
            })
        }).catch(() => {
            console.log("some thing went wrong");
        })
}

module.exports = mongoDB;