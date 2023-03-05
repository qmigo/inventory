const mongoose = require('mongoose')

const SupplierSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    gst:{
        type: String,
        required: true
    },
    contactName:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
})

const ItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    group:{
        type: mongoose.Types.ObjectId,
        ref: 'Group',
    },
    unit:{
        type: mongoose.Types.ObjectId,
        ref: 'Unit'
    },
    openingStock:{
        type: String,
        required: true
    },
    openingStockValue:{
        type: String,
        required: true
    },
    taxCategory:{
        type: String,
        required: true
    },
    hsnCode:{
        type: String,
        required: true
    },
    purchasePrice:{
        type: String,
        required: true
    },
    discount:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

const UnitSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

const GroupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    organisation:{
        type: String,
        required: true
    },
    contactPerson:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    }
})

const Supplier = mongoose.model('Supplier',SupplierSchema)
const Item = mongoose.model('Item',ItemSchema)
const Unit = mongoose.model('Unit',UnitSchema)
const Group = mongoose.model('Group',GroupSchema)
const User = mongoose.model('User',UserSchema)

module.exports = {
    Supplier,
    Item,
    Unit,
    Group,
    User
}