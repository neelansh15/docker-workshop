const app = require("express")();

const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://test:test@mycluster.prvob.mongodb.net/docker-workshop?retryWrites=true&w=majority";

const PORT = 8000;

const users = [
  {
    id: 1,
    firstname: "Joe",
    lastname: "who?",
    profile_image: "somelink.com/keriferojoeg",
  },
  {
    id: 2,
    firstname: "Jeremy",
    lastname: "Clarkson",
    profile_image: "thegrandtour.com/oewifuoewhg",
  },
];

app.get("/", async (req, res) => {
  try {
    const client = new MongoClient(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    await client.connect()
    const collection = client.db().collection("users")
    const cursor = await collection.find({})
    let data = []
    await cursor.forEach((item) => data.push(item))
    res.send(data)
  } catch (e) {
      console.error(e)
    res.status(500).send({ error: e });
  }
});

app.get("/:firstname", async (req, res) => {
    try {
        const client = new MongoClient(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        await client.connect()
        const collection = client.db().collection("users")
        const data = await collection.findOne({
            firstname: req.params.firstname
        })
        res.send(data)
      } catch (e) {
          console.error(e)
        res.status(500).send({ error: e });
      }
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
