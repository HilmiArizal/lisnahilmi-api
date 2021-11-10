const { PreweddingModel } = require('../Models');
const { uploader } = require("../Services/uploader");
const fs = require("fs");


module.exports = {

    getPrewedding: async (req, res) => {
        await PreweddingModel.find()
        .then((results) => {
            if (results.length > 0) {
                res.status(200).send({ message: "Get Data Successful", results });
            } else {
                res.status(200).send({ message: "Empty Data" });
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    },

    getListPrewedding: async (req, res) => {
        const currentPage = parseInt(req.query.currentPage);
        const perPage = parseInt(req.query.perPage);
        let totalData;

        await PreweddingModel.find().countDocuments()
            .then((count) => {
                totalData = count;
                return PreweddingModel.find().skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
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

    addPrewedding: async (req, res) => {
        try {
            const path = '/imageprewedding';
            const upload = uploader(path, 'IMG').fields([{ name: 'image' }]);
            upload(req, res, (err) => {
                if (err) return res.status(500).send(err);

                const { image } = req.files;
                const imagePath = image ? `${path}/${image[0].filename}` : null;

                const data = JSON.parse(req.body.data);
                data.image = imagePath;

                const dataTeam = new PreweddingModel(data);
                dataTeam.save()
                    .then((data) => {
                        res.status(200).send({
                            message: 'Add Data Successful',
                            data
                        });
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    })
            })
        } catch (err) {
            console.log(err);
        }
    },

    editPrewedding: async (req, res) => {
        try {
            const id = req.query.id;
            const path = '/imageprewedding';
            const upload = uploader(path, 'IMG').fields([{ name: 'image' }]);
            upload(req, res, (err) => {
                if (err) return res.status(500).send(err);

                const { image } = req.files;
                const imagePath = image ? `${path}/${image[0].filename}` : null;

                const data = JSON.parse(req.body.data);
                data.image = imagePath;

                PreweddingModel.findById(id)
                    .then((prewedding) => {
                        if (!image) {
                            data.image = prewedding.image;
                            return Object.assign(prewedding, data);
                        } else {
                            if (!prewedding.image) {
                                return Object.assign(prewedding, data);
                            } else {
                                fs.unlinkSync('./public' + prewedding.image);
                                return Object.assign(prewedding, data);
                            }
                        }
                    })
                    .then((data) => {
                        return data.save();
                    })
                    .then((updateData) => {
                        res.status(200).send({
                            message: 'Update Data Successful',
                            updateData
                        });
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    })
            })
        } catch (err) {
            console.log(err);
        }
    },

    deletePrewedding: async (req, res) => {
        const id = req.params.id;

        await PreweddingModel.findById(id)
            .then((prewedding) => {
                PreweddingModel.deleteOne({ _id: id })
                    .then((results) => {
                        fs.unlinkSync('./public' + prewedding.image);
                        res.status(200).send({ message: "Delete Data Successful", results });
                    })
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    },

    getHideShowPrewedding: async (req, res) => {
        let dataStatus = req.body;

        await PreweddingModel.find(dataStatus)
            .then((results) => {
                if (results.length > 0) {
                    res.status(200).send({ message: "Get Data Successful", results });
                } else {
                    res.status(200).send({ message: "Empty Data" });
                }
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    }

}