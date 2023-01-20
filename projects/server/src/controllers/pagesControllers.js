const { sequelize } = require("../models")
const database = require("../models")
const property = database.property
const { Op, or, Sequelize } = require("sequelize");

module.exports = {
    landingPage: async (req, res) => {
        const {lokasi, state} = req.body
        console.log(state)
        try{
            const response = await database.property.findAll({
                include: [
                    { 
                        model: database.room,
                        include: [
                            { 
                                model: database.transaction,
                                where: {
                                    [Op.or] : [
                                        {
                                            [Op.and]: [
                                                {
                                                    checkIn: {[Op.lte]: state ? state[0].startDate : new Date()},
                                                    checkOut: {[Op.gte]: state ? state[0].endDate : new Date()}
                                                }
                                            ]
                                        },
                                        {
                                            [Op.and]: [
                                                {
                                                    checkIn: {[Op.lt]: state ? state[0].endDate : new Date()},
                                                    checkOut: {[Op.gte]: state ? state[0].startDate : new Date()}
                                                }
                                            ]
                                        },
                                    ]
                                }
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

            const result = response.filter(item => item.rooms.length !== item.qtyroom)
            
            const data = result.map(item => {
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
        try {
            const cekin = '2023-01-21T14:00:00.000Z'
            const cekot = '2023-01-26T14:00:00.000Z'
            const response = await database.property.findOne({
                where: { id: req.params.id },
                include: [
                    { model: database.category },
                    { model: database.facility},
                    { model: database.propertypicture},
                    { 
                        model: database.room,
                        include: [
                            {
                                model: database.image,
                            },
                            { 
                                model: database.transaction,
                                where: {
                                    [Op.or]: [
                                        {
                                            checkin: {[Op.gte]: new Date()},
                                            id: null
                                        },
                                    ]

                                },
                                raw: true

                            },
                        ] 
                    },
                    // { 
                    //     model: database.tenant,
                    //     include: [
                    //         {
                    //             model: database.user,
                    //             attributes: ["fullName", "photo"], 
                    //         }
                    //     ]  
                    // },
                ]
            })
            
            res.status(200).send(response)
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    },
    getRoom: async (req, res) => {
        try {
            const cekin = '2023-01-21T14:00:00.000Z'
            const cekot = '2023-01-26T14:00:00.000Z'
            const lokasi = ""

            const response = await database.property.findAll({
                attributes: [
                    'property.id',
                    [
                        sequelize.fn('COUNT', sequelize.col('property.id')), 'jumlah kamar'
                    ]
                ],
                include: [
                    { 
                        model: database.room,
                        attributes: [],
                        required: true,
                        include: [
                            { 
                                model: database.transaction,
                                where: {
                                    [Op.or] : [
                                        {
                                            [Op.and]: [
                                                {
                                                    checkIn: cekin,
                                                    checkOut: cekot
                                                }
                                            ]
                                        },
                                        {
                                            [Op.and]: [
                                                {
                                                    checkIn: cekot,
                                                    checkOut: cekin
                                                }
                                            ]
                                        },
                                    ]
                                },
                                attributes: [],
                            },
                            {
                                model: database.image,
                                attributes: [],
                            }
                        ] 
                    },
                ],
                group: 'rooms.propertyId'
            })


            res.status(200).send(response)
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    }
}