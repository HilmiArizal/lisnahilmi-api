const router = require('express').Router();
const { WishController } = require('../Controllers');


router.get('/getWish', WishController.getWish);
router.post('/postWish', WishController.postWish);
router.put('/putWish', WishController.putWish);
router.delete('/deleteWish', WishController.deleteWish);


module.exports = router;