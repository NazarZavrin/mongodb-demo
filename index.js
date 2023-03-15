const express = require('express');
const app = express();
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://user:pass@main-cluster.4gb0vgk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const PORT = process.env.PORT ?? 3000;
let database;

app.get("/", async (req, res, next) => {
    try {
        await client.connect();
        database = client.db("company");
        next();
    } catch (error) {
        console.log(error);
        await client.close();
        res.sendFile(path.join(path.resolve(), "site", "error.html"));
    }
})

app.use(express.static(path.join(path.resolve(), 'site')));

app.put("/add-record", (req, res, next) => {
    express.text({
        limit: parseInt(req.get('Content-Length')),
    })(req, res, next);
}, async (req, res) => {
    let newUser = JSON.parse(req.body);
    let insertResult = await database.collection('users').insertOne(newUser);
    if (insertResult.acknowledged) {
        res.send("success");
    } else {
        res.send("error");
    }
})

app.get("/get-records", async (req, res) => {
    let cursor = database.collection('users').find();
    let users = await cursor.toArray();
    cursor.close();
    res.send(JSON.stringify(users));
});

app.get("/count-records", async (req, res) => {
    let response = {};
    try {
        let numOfRecords = await database.collection('users').countDocuments();
        response.numOfRecords = numOfRecords;
        response.status = "success";
    } catch (error) {
        response.status = "error";
    }
    res.send(JSON.stringify(response));
})

app.delete("/delete-all", async (req, res) => {
    let collectionDeleted = await database.collection('users').drop();
    if (collectionDeleted) {
        res.send("success");
    } else {
        res.send("error");
    }
})

app.get("/get-adults", async (req, res) => {
    let cursor = database.collection('users').find({age: {$gte: 18}});
    let users = await cursor.toArray();
    cursor.close();
    res.send(JSON.stringify(users));
})

app.delete("/delete-one/:userId", async (req, res) => {
    console.log("ID of the user to delete:", req.params.userId);
    let deleteResult = await database.collection('users').deleteOne({_id: ObjectId(req.params.userId)});
    if (deleteResult.acknowledged) {
        res.send("success");
    } else {
        res.send("error");
    }
})

// ↓ launch the server on the port PORT
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
})
