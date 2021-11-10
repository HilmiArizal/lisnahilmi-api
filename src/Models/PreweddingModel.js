const mongooseSchema = require("mongoose");


const PreweddingModel = new mongooseSchema.Schema({
    image: {
        type: String,
    },
    status: {
        type: String,
    },
    order: {
        type: Number,
    }
}, { timestamps: true });


module.exports = mongooseSchema.model("Prewedding", PreweddingModel);