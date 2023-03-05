const {Supplier,
    Item,
    Unit,
    Group,
    User} = require('../model/Schema')

const getSupplier = async(req, res)=>{
    const suppliers = await Supplier.find({ })
    res.status(200).json({data: suppliers})
}

const addSupplier = async(req, res)=>{
    const supplier = await Supplier.create(req.body.data)
    res.status(200).json({data: supplier})
}

const updateSupplier = async(req, res)=>{
    const supplier = await Supplier.findByIdAndUpdate(req.body.data._id, req.body.data, {
        runValidators:true,
        new:true
    })
    res.status(201).json({data:supplier})
}
const deleteSupplier = async(req, res)=>{
    console.log(req.body)
    await Supplier.findOneAndDelete(req.body._id)
    res.status(200).json({msg:'Success'})
} 

const getItem = async(req, res)=>{
    const items = await Item.find({})
    res.status(200).json({data:items})
}

const addItem = async(req, res)=>{
    const item = await Item.create(req.body.data)
    res.status(200).json({data: item})
}

const getUnit = async(req, res)=>{
    const units = await Unit.find({})
    res.status(200).json({data:units})
}

const addUnit = async(req, res)=>{
    const unit = await Unit.create(req.body.data)
    res.status(200).json({data: unit})
}

const getGroup = async(req, res)=>{
    const groups = await Group.find({})
    res.status(200).json({data: groups})
}

const addGroup = async(req, res)=>{
    const group = await Group.create(req.body.data)
    res.status(200).json({data: group})
}
const getUser = async(req, res)=>{
    const user = await User.find({})
    res.status(200).json({data:user})
}  

const addUser = async(req, res)=>{
    const user = await User.create(req.body.data)
    res.status(200).json({data: user})
}

module.exports = {
    getGroup, getItem, getSupplier, getUnit, getUser,
    addGroup, addItem, addSupplier, addUnit, addUser,
    updateSupplier,
    deleteSupplier
}