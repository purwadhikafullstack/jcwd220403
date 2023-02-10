const database = require("../models")
const { Op, Sequelize } = require("sequelize");

module.exports = {
    landingPage: async (req, res) => {
        const {lokasi, state, fasilitas, order, order_direction, limit} = req.body
        try{
            const result = await database.property.findAll({
                attributes: ['id', 'name', 'description', 'picture'],
                include: [
                    { 
                        model: database.room,
                        attributes: ['price', 'picture', 'propertyId'],
                        required: false,
                        include: [
                            { 
                                model: database.transaction,
                                attributes: ['id'],
                                required: false,
                                where: {
                                    [Op.or] : [
                                        {
                                            [Op.and]: [
                                                {
                                                    checkIn: {[Op.lt]: state ? state[0].startDate : new Date()},
                                                    checkOut: {[Op.gt]: state ? state[0].endDate : new Date()},
                                                    transactionStatus: {[Op.notIn]: ['Dibatalkan', 'Gagal']}
                                                }
                                            ]
                                        },
                                        {
                                            [Op.and]: [
                                                {
                                                    checkIn: {[Op.lt]: state ? state[0].endDate : new Date()},
                                                    checkOut: {[Op.gt]: state ? state[0].startDate : new Date()},
                                                    transactionStatus: {[Op.notIn]: ['Dibatalkan', 'Gagal']}
                                                }
                                            ]
                                        },
                                    ],
                                },
                            },
                            { 
                                model: database.unavailableDates,
                                attributes: ['id'],
                                required: false,
                                where: {
                                    [Op.or] : [
                                        {
                                            [Op.and]: [
                                                {
                                                    start_date: {[Op.lt]: state ? state[0].startDate : new Date()},
                                                    end_date: {[Op.gt]: state ? state[0].endDate : new Date()},
                                                }
                                            ]
                                        },
                                        {
                                            [Op.and]: [
                                                {
                                                    start_date: {[Op.lt]: state ? state[0].endDate : new Date()},
                                                    end_date: {[Op.gt]: state ? state[0].startDate : new Date()},
                                                }
                                            ]
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    { 
                        attributes: ['city', 'province', 'country', 'locationDetail'],
                        model: database.category,
                        where: { city: lokasi ? lokasi : {[Op.not]: null} },
                    },
                    { 
                        model: database.facility,
                        attributes: ['name'],
                        where: {
                           name : fasilitas ? {
                                [Op.like]: "%" + fasilitas + "%"
                            } : {[Op.not]: null} 
                        }
                    },
                    
                ],
                having: [
                    {
                        [Op.and]: [
                            {
                                'rooms.transactions.id': null,
                                'rooms.unavailableDates.id': null
                            }
                        ]
                    }
                ],
            })

            const available = result.map(item => {
                return item.dataValues.id
            })

            const response = await database.property.findAll({
                attributes: ['id', 'name', 'description', 'picture'],
                where: {id: {[Op.in]: available}},
                include: [
                    { 
                        model: database.room,
                        attributes: ['price', 'picture', 'propertyId'],
                    },
                    { 
                        attributes: ['city', 'province', 'country', 'locationDetail'],
                        model: database.category,
                    }, 
                    {
                        model: database.propertypicture,
                        attributes: [[Sequelize.col('name'),'picture']]
                    },
                    { 
                        model: database.facility,
                        attributes: ['name'],
                    },
                    
                ],
                order: [
                    order === "price" ? [{ model: database.room }, order, order_direction] : 
                    ["id", "ASC"]
                ],
                limit,
                offset: 0
            })
            
            const data = response.map(item => {
                const newData = { ...item.dataValues, propertypictures: [{ picture: item.picture }, ...item.propertypictures] }
                delete newData.picture;
                return newData;
            });
            res.status(201).send({data, pages: available.length})
        }catch(err){
            console.log(err)
            res.status(404).send(err)
        }
    },
    getById: async (req, res) => {
        try {
            const {lokasi, state} = req.body

            const response = await database.property.findOne({
                include: [
                    { 
                        model: database.room,
                        where: { propertyId: req.params.id },
                        include: [
                            { 
                                model: database.transaction,
                                required: false,
                                where: {
                                    [Op.or] : [
                                        {
                                            [Op.and]: [
                                                {
                                                    checkIn: {[Op.lt]: state ? state[0].startDate : new Date()},
                                                    checkOut: {[Op.gt]: state ? state[0].endDate : new Date()},
                                                    transactionStatus: {[Op.notIn]: ['Dibatalkan', 'Gagal']}
                                                }
                                            ]
                                        },
                                        {
                                            [Op.and]: [
                                                {
                                                    checkIn: {[Op.lt]: state ? state[0].endDate : new Date()},
                                                    checkOut: {[Op.gt]: state ? state[0].startDate : new Date()},
                                                    transactionStatus: {[Op.notIn]: ['Dibatalkan', 'Gagal']}
                                                }
                                            ]
                                        },
                                    ],
                                },
                            },
                            { 
                                model: database.unavailableDates,
                                required: false,
                                attributes: ['id'],
                                where: {
                                    [Op.or] : [
                                        {
                                            [Op.and]: [
                                                {
                                                    start_date: {[Op.lt]: state ? state[0].startDate : new Date()},
                                                    end_date: {[Op.gt]: state ? state[0].endDate : new Date()},
                                                }
                                            ]
                                        },
                                        {
                                            [Op.and]: [
                                                {
                                                    start_date: {[Op.lt]: state ? state[0].endDate : new Date()},
                                                    end_date: {[Op.gt]: state ? state[0].startDate : new Date()},
                                                }
                                            ]
                                        },
                                    ],
                                },
                            },
                            {
                                model: database.image,
                                attributes: [[Sequelize.col('name'), 'picture']]
                            },
                            {
                                model : database.highSeason
                            }
                        ] 
                    },
                    {
                        model: database.propertypicture,
                        attributes: [[Sequelize.col('name'),'picture']]
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
                    {
                        model:database.category
                    }
                ]
            })
            
            res.status(200).send(response)
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    },
}