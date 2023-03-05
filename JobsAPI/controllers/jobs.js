const Job = require('../model/Jobs')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError} = require('../errors/index')


const getAllJobs = async(req, res)=>{
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('updatedAt')
    res.status(StatusCodes.OK).json({count: jobs.length, jobs})
}

const getJob = async(req, res)=>{
    const {
        params: { id:jobId },
        user: {userId} 
    } = req
    
    const job = await Job.findOne({ 
        _id: jobId,
        createdBy: userId
    }) 
    if(!job)
    {
        throw new NotFoundError(`The Job not exists with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const postJob = async(req, res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = async(req, res)=>{
    const {
        params: { id:jobId },
        user: {userId} 
    } = req
    const job = await Job.findByIdAndRemove({
        _id: jobId,
        createdBy: userId
    })

    if(!job)
    throw new NotFoundError(`The Job not exists with id ${jobId}`)

    res.status(StatusCodes.OK).send()
}

const updateJob = async(req, res)=>{
    const {
        params: { id:jobId },
        user: {userId},
        body: {company, position} 
    } = req

    if(company == '' || position == '')
    throw new BadRequestError('Enter a company name and position')

    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body, 
        { runValidators: true, new: true })
    
    if(!job)
    throw new NotFoundError(`The Job not exists with id ${jobId}`)

    res.status(StatusCodes.OK).json({ job })
}

module.exports = {
    getAllJobs,
    getJob,
    postJob,
    deleteJob,
    updateJob
}