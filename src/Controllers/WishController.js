const { WishModel } = require("../Models");


module.exports = {
    getWish: async (req, res) => {
        await WishModel.find()
            .then((dataWish) => {
                if (dataWish.length === 0) return res.status(404).send({ message: 'Data Empty' });
                return res.status(200).send({ message: 'Data Successful', dataWish });
            })
            .catch((err) => {
                res.status(500).send({ message: "Data Error" })
            });
    },

    postWish: async (req, res) => {
        const dataWish = new WishModel(req.body);
        await dataWish.save()
            .then((dataWish) => {
                res.status(200).send({ message: 'Data Successful', dataWish });
            })
            .catch((err) => {
                res.status(500).send({ message: 'Data Error' })
            });
    },

    putWish: async (req, res) => {
        const changeDataWish = req.body;
        await WishModel.updateOne(
            { _id: req.query.id },
            { $set: req.body },
        )
            .then((dataWish) => {
                res.status(200).send({ message: 'Data Successful', changeDataWish });
            })
            .catch((err) => {
                res.status(500).send({ message: 'Data Error' });
            });
    },

    deleteWish: async (req, res) => {
        await WishModel.deleteOne({ _id: req.query.id })
            .then((dataWish) => {
                res.status(200).send({ message: 'Data Successful', dataWish });
            })
            .catch((err) => {
                res.status(500).send({ message: 'Data Error' });
            })
    }
}   