const app = require('express')()

const PORT = 8080

const users = [
    {
        id: 1,
        firstname: "Joe",
        lastname: "who?",
        profile_image: "somelink.com/keriferojoeg"
    },
    {
        id: 2,
        firstname: "Jeremy",
        lastname: "Clarkson",
        profile_image: "thegrandtour.com/oewifuoewhg"
    }
]

app.get('/', (req, res) => {
    res.json(users)
})

app.get('/:id', (req, res) => {
    res.json(users.filter(item => item.id == req.params.id))
})

app.listen(8080, () => {
    console.log(`Listening on Port ${PORT}`)
})

