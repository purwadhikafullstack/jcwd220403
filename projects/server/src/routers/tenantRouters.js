const router = require('express').Router();

const { tenantControllers } = require('../controllers');
const {multerUpload} = require("../middlewares/multer")

router.get('/', (req, res) => {
  res.status(200).send('home');
}); 

//post
router.post('/api/betenant', tenantControllers.CreateFastility);
router.post('/api/category', tenantControllers.CreateCategory);
router.post('/api/properties',multerUpload.single('file'),tenantControllers.CreatePropertys)
router.post('/api/room/:id',tenantControllers.createRoomData);

//get data
router.get('/api/property/:id', tenantControllers.getAllDataProperty);
router.get('/api/roombyid/:id', tenantControllers.getRoomPropertyById);

//update
router.patch('/api/editpicture/:id',multerUpload.single('file'), tenantControllers.updatePictureProperty);
router.patch('/api/editname/:id', tenantControllers.updateNameProperty);
router.patch('/api/editfacility/:id', tenantControllers.updateFacility);
router.patch('/api/editdescription/:id', tenantControllers.updateDescProperty);
router.patch('/api/editlocation/:id', tenantControllers.updateLocationDetail);
router.patch('/api/editroom/:id', tenantControllers.updateRoomProperty);

//delete all data property
router.delete('/api/deleteproperty/:id', tenantControllers.deleteAllDataProperty);
router.delete('/api/deleteroom/:id', tenantControllers.deleteDataRooms);

module.exports = router;
