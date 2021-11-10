const router = require('express').Router();
const { PreweddingController } = require('../Controllers');


router.get('/getPrewedding', PreweddingController.getPrewedding);
router.get('/getListPrewedding', PreweddingController.getListPrewedding);
router.post('/addPrewedding', PreweddingController.addPrewedding);
router.put('/editPrewedding', PreweddingController.editPrewedding);
router.delete('/deletePrewedding/:id', PreweddingController.deletePrewedding);
router.get('/getHideShowPrewedding', PreweddingController.getHideShowPrewedding);


module.exports = router;