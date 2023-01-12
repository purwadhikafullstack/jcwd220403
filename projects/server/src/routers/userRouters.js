const router = require("express").Router();
const { userControllers } = require('../controllers');
const { verifyToken } = require('../middlewares/verifyToken');
const { multerUpload } = require("../middlewares/multer");

router.get('/', (req, res) => {
  res.status(200).send('home');
});
router.get('/api/user', verifyToken ,userControllers.getUser);
router.get('/api/users', userControllers.users);
router.get('/api/user/:id', userControllers.userById);
router.get('/api/user/:email/available', userControllers.checkEmail);
router.patch('/api/user/profile', userControllers.updateProfile);
router.patch('/api/user/profilePic',  multerUpload.single("file"), verifyToken, userControllers.updateProfilePic);
router.patch('/api/user/updatePass', verifyToken, userControllers.updatePass);
router.post('/api/user/checkPass', verifyToken, userControllers.checkPass);
router.post('/api/user/otpEmail', userControllers.sendOTP);
router.post('/api/user/verification', verifyToken, userControllers.verification);

module.exports = router;
