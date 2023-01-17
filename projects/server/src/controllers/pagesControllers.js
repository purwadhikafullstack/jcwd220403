const { sequelize } = require("../models")
const database = require("../models")
const property = database.property

module.exports = {
    landingPage: async (req, res) => {
        try{
            const response = await database.property.findAll({
                include: [
                    {
                        model: database.propertypicture,
                        attributes: [[sequelize.col('name'),'picture']]
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
        try {
            const { id } = req.params;
            const prop = await property.findOne(
                { where: { id } }
                );

            res.status(200).send("succes");
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
}