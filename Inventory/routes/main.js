const router = require('express').Router()
const {
    getGroup, getItem, getSupplier, getUnit, getUser,
    addGroup, addItem, addSupplier, addUnit, addUser, 
    updateSupplier,
    deleteSupplier
} = require('../controllers/main')

router.route('/groups').get(getGroup).post(addGroup)
router.route('/items').get(getItem).post(addItem)
router.route('/suppliers').get(getSupplier).post(addSupplier).put(updateSupplier).delete(deleteSupplier)
router.route('/units').get(getUnit).post(addUnit)
router.route('/users').get(getUser).post(addUser)

module.exports = router