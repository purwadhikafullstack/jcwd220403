const database = require("../models")

module.exports = {
    roomSetAlvaible: async (req, res) => {
        try {
            await database.room.update({
                availability: true
            }, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send("room alvaible")
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    },
    roomSetDisable: async (req, res) => {
        try {
            await database.room.update({
                availability: false
            }, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send("room disable")
        } catch (err) {
            console.log(err)
            res.status(401).send(err)
        }
    },
    disableCertainDate: async (req, res) => {
        try {
            const { date } = req.body
            if (!date) throw "date is required"
            await database.unavailableDates.create({
                date: date,
                roomId: req.params.id
            })
            res.status(201).send("disable Certain Date created!")
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    }
}