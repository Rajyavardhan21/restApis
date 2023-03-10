// let express = require("express");
// let app = express();
// let port = 9500;
// let mongo = require("mongodb");
// let MongoClient = mongo.MongoClient;
// let mongoUrl = "mongodb://localhost:27017/test";
// let db;
// // // mongodb://0.0.0.0:27017/
// // // mongodb://localhost:27017

// // app.get("/", (req, resp) => {
// //   resp.send("<h1>Hello World! from node and express in home route</h1> ");
// // });
// app.get("/location", (req, resp) => {
//   db.collection("location")
//     .find()
//     .toArray((err, result) => {
//       if (err) throw err;
//       resp.send(result);
//     });
// });
// // app.get("/Cuisines", (req, resp) => {
// //   resp.send("<h1>Hello World! from node and express in Cuisines route</h1> ");
// // });
// // app.get("/restaurants", (req, resp) => {
// //   resp.send(
// //     "<h1>Hello World! from node and express in restaurants route</h1> "
// //   );
// // });

// // // connect with mongodb
// // MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, dc) => {
// //   if (err) console.log("Error while connecting");
// //   db = dc.db("newProducts");
// //   app.listen(port, () => {
// //     console.log(`Server is running on port ${port}`);
// //   });
// // });

// // Import the express library
// // const express = require("express");

// // Create a new express application
// // const app = express();

// // Set the port to 6000
// // const port = 4000;

// // Define a route for the root URL
// app.get("/", (req, res) => {
//   // Send a response to the client
//   res.send("<h1>Hello World! from node and express in home route</h1>");
// });

// // Define a route for the /Cuisines URL
// app.get("/Cuisines", (req, res) => {
//   // Send a response to the client
//   res.send("<h1>Hello World! from node and express in Cuisines route</h1>");
// });

// // Define a route for the /restaurants URL
// app.get("/restaurants", (req, res) => {
//   // Send a response to the client
//   res.send("<h1>Hello World! from node and express in restaurants route</h1>");
// });

// // Start the server and listen on the specified port
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
 ////////////////////////////////////////////////////////////////////////

 // updated code

const express = require("express");
const app = express();
const port = 9500;
const { MongoClient } = require("mongodb");
const mongoUrl = "mongodb://localhost:27017/test";
//test is the name of database in which i have the lcations collection
let db;

app.get("/location", async (req, resp) => {
  try {
    const locationCollection = db.collection("locations");
    const result = await locationCollection.find().toArray();
    resp.send(result);
  } catch (err) {
    console.error("Error retrieving data from MongoDB:", err);
    resp.status(500).send("Error retrieving data from MongoDB");
  }
});

// Define a route for the root URL
app.get("/", (req, res) => {
  // Send a response to the client
  res.send("<h1>Hello World! from node and express in home route</h1>");
});

// Define a route for the /Cuisines URL
app.get("/Cuisines", (req, res) => {
  // Send a response to the client
  res.send("<h1>Hello World! from node and express in Cuisines route</h1>");
});

// Define a route for the /restaurants URL
app.get("/restaurants", (req, res) => {
  // Send a response to the client
  res.send("<h1>Hello World! from node and express in restaurants route</h1>");
});

(async () => {
  const client = new MongoClient(mongoUrl);

  try {
    // Connect to MongoDB
    await client.connect();

    console.log("Connected to MongoDB");

    // Access the database
    db = client.db();

    // Start the server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
})();
