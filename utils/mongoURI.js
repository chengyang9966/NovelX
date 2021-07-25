

let mongURI='mongodb+srv://<username>:<password>@realmcluster.7tf3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongURI=mongURI.replace('<username>',process.env.MONGODB_USER).replace('<password>',process.env.MONGODB_PASSWORD)
console.log('process.env.MONGODB_USER: ', process.env.MONGODB_USER);


module.exports=mongURI