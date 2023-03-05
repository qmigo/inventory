const {
    getAllJobs,
    getJob,
    postJob,
    deleteJob,
    updateJob
} = require('../controllers/jobs')
const express = require('express')
const router = express.Router()

router.route('/').get(getAllJobs).post(postJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router