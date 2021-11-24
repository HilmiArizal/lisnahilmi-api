const { WishModel } = require("../Models");


module.exports = {
    getWish: async (req, res) => {
        await WishModel.find().sort({ _id: -1 })
            .then((dataWish) => {
                if (dataWish.length === 0) return res.status(404).send({ message: 'Data Empty' });
                return res.status(200).send({ message: 'Data Successful', dataWish });
            })
            .catch((err) => {
                res.status(500).send({ message: "Data Error" })
            });
    },

    getListWish: async (req, res) => {
        const search = req.query.search;
        const currentPage = parseInt(req.query.currentPage);
        const perPage = parseInt(req.query.perPage);
        let totalData;

        function escapeRegex(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }

        await WishModel.find().countDocuments()
            .then((count) => {
                totalData = count;
                const regex = new RegExp(escapeRegex(search), "gi");
                if (!search) {
                    return WishModel.find().skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
                } else {
                    return WishModel.find({ $or: [{ name: regex }] }).skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
                }
            })
            .then((results) => {
                res.status(200).send({
                    message: results.length > 0 ? 'Get Data Successful' : 'Empty Data',
                    data: results,
                    total_data: totalData,
                    per_page: perPage,
                    current_page: currentPage
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
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
    },

    getReservation: async (req, res) => {
        await WishModel.find(req.body)
            .then((dataWish) => {
                res.status(200).send({ message: 'Data Successful', dataWish });
            })
            .catch((err) => {
                res.status(500).send({ message: 'Data Error' });
            })
    },

    getSession: async (req, res) => {
        await WishModel.find(req.body)
            .then((dataWish) => {
                res.status(200).send({ message: 'Data Successful', dataWish });
            })
            .catch((err) => {
                res.status(500).send({ message: 'Data Error' });
            })
    },

    getFriend: async (req, res) => {
        const friend = req.body;
        const currentPage = parseInt(req.query.currentPage);
        const perPage = parseInt(req.query.perPage);
        let totalData;

        await WishModel.find().countDocuments()
            .then((count) => {
                totalData = count;
                if (!friend) {
                    return WishModel.find().skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
                } else {
                    return WishModel.find(friend).skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
                }
            })
            .then((results) => {
                res.status(200).send({
                    message: results.length > 0 ? 'Get Data Successful' : 'Empty Data',
                    data: results,
                    total_data: totalData,
                    per_page: perPage,
                    current_page: currentPage
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    }

}   