const router = require('express').Router();
const { WishController } = require('../Controllers');


router.get('/getWish', WishController.getWish);
router.get('/getListWish', WishController.getListWish);
router.post('/postWish', WishController.postWish);
router.put('/putWish', WishController.putWish);
router.delete('/deleteWish', WishController.deleteWish);
router.post('/getReservation', WishController.getReservation);
router.post('/getFriend', WishController.getFriend);


module.exports = router;