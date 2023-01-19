const { sequelize } = require("../models")
const database = require("../models")
const property = database.property
const { Op, or } = require("sequelize");

module.exports = {
    landingPage: async (req, res) => {
        const {lokasi, state} = req.body
        try{
            const response = await database.property.findAll({
                include: [
                    { 
                        model: database.room,
                        where: { availability: true },
                        include: [
                            { 
                                model: database.transaction,
                                // where: {
                                //     [Op.and] : [
                                //         {
                                //             checkIn: {[Op.notBetween]: [state ? state[0].startDate : new Date(), state ? state[0].endDate : new Date()]},
                                //             checkOut: {[Op.notBetween]: [state ? state[0].startDate : new Date(), state ? state[0].endDate : new Date()]}
                                //         }
                                //     ],
                                // }
                            },
                            {
                                model: database.image,
                            }
                        ] 
                    },
                    { 
                        model: database.category,
                        where: { city: lokasi ? lokasi : {[Op.not]: null} },
                    },
                    {
                        model: database.propertypicture,
                        attributes: [[sequelize.col('name'),'picture']]
                    },
                    {
                        model:database.category
                    }
                ]
            })

            const data = response.map(item => {
                const newData = { ...item.dataValues, propertypictures: [{ picture: item.picture }, ...item.propertypictures] }
                delete newData.picture;
                return newData;
            });
            res.status(201).send(data)
        }catch(err){
            console.log(err)
            res.status(404).send(err)
        }
    },
    getById: async (req, res) => {
        console.log(req.body)
        try {
            const response = await database.property.findOne({
                where: { id: req.params.id },
                include: [
                    { model: database.category },
                    { model: database.facility},
                    { model: database.propertypicture},
                    { 
                        model: database.room,
                        where: { availability: true },
                        include: [
                            {
                                model: database.image,
                            }
                        ] 
                    },
                    { 
                        model: database.tenant,
                        include: [
                            {
                                model: database.user,
                                attributes: ["fullName", "photo"], 
                            }
                        ]  
                    },
                ]
            })
            res.status(200).send(response)
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    },
}