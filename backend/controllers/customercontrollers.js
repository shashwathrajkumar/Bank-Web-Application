const Customer = require('../models/customermodel')
const mongoose = require('mongoose')

const getcustomers = async (req,res) => {
    const customers = await Customer.find({})
    res.status(200).json(customers)
}

const getcustomer = async(req,res) => {
    const {id}  = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }
    const customer = await Customer.findById(id)

    if(!customer){
        return res.status(404).json({error: 'No such customer found'})
    }
    res.status(200).json(customer)
}

const createnewcustomer = async (req,res) => {
    const {Customer_ID, Customer_name,Contact_no,Address,Password} = req.body

    try {
        const customer = await Customer.create({Customer_ID, Customer_name,Contact_no,Address,Password})
        res.status(200).json(customer)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const delcustomer = async(req,res) => {
    const {id}  = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }
    const customer = await Customer.findOneAndDelete({_id :id})

    if(!customer){
        return res.status(400).json({error: "Not found"})
    }
    res.status(200).json(customer)
}

const updatecustomer = async (req,res) => {
    const {id}  = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }

    const customer = await Customer.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!customer){
        return res.status(400).json({error: "Not found"})
    }
    res.status(200).json(customer)
}
module.exports = {createnewcustomer,getcustomers,getcustomer,delcustomer,updatecustomer}

