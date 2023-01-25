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
    DisableCertainDate: async (req, res) => {
        try {
            const { start_date, end_date } = req.body
            const checkHighSeasonDate = await database.highSeason.findAll({
                where: {
                    roomId: req.params.id
                },
                raw: true
            })
            const startDateHighSeason = checkHighSeasonDate.map(date => {
                return new Date(date.start_date).toString()
            })

            const endDateHighSeason = checkHighSeasonDate.map(date => {
                return new Date(date.end_date).toString()
            })

            if (!start_date) throw "start date is required"
            if (!end_date) throw "end date is required"
            if (startDateHighSeason.includes(new Date(start_date).toString()) === true &&
                endDateHighSeason.includes(new Date(end_date).toString()) === true)
                throw "Room high seasons is detacted, please first delete the high seasons room"

            await database.unavailableDates.create({
                start_date,
                end_date,
                disableRoom: true,
                roomId: req.params.id
            })
            res.status(201).send("disable Certain Date created!")
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    },
    deleteDisableCertainDate: async (req, res) => {
        try{
            await database.unavailableDates.destroy({
                where : {
                    id : req.params.id
                }
            })
            res.status(200).send("unavaible Dates deleted")
        }catch(err){
            console.log(err)
            res.status(404).send(err)
        }
    },
    highSeason: async (req, res) => {
        try {
            const { start_date, end_date, price } = req.body
            const checkDisableDate = await database.unavailableDates.findAll({
                where: {
                    roomId: req.params.id
                },
                raw: true
            })
            const startDateDisable = checkDisableDate.map(date => {
                return new Date(date.start_date).toString()
            })


            const endDateDisable = checkDisableDate.map(date => {
                return new Date(date.end_date).toString()
            })

            if (!start_date) throw "Start date is required"
            if (!end_date) throw "End date is required"
            if (!price) throw "Price is required"
            if (startDateDisable.includes(new Date(start_date).toString()) === true &&
                endDateDisable.includes(new Date(end_date).toString()) === true)
                throw "Room disable is detacted, please first delete the disabled room"

            await database.highSeason.create({
                start_date,
                end_date,
                price,
                roomId: req.params.id
            })
            res.status(200).send("high season created!")
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    },
    deleteHighSeaason: async (req, res) => {
        try{
            await database.highSeason.destroy({
                where: {
                    id : req.params.id
                }
            })
            res.status(200).send("high season deleted")
        }catch(err){
            console.log(err)
            res.status(401).send(err)
        }
    }
}