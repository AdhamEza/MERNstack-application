const Task = require('../models/taskModel')
const mongoose = require('mongoose')

const createTask = async (req, res) => {
    const {title, student, points, result} = req.body

    let emptyFields = [] 
    if(!title) {
        emptyFields.push('title')
    }
    if(!student) {
        emptyFields.push('student')
    }
    if(!points) {
        emptyFields.push('points')
    }
    if(!result) {
        emptyFields.push('result')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }
    

    try{
        const task = await Task.create({title, student, points, result})
        res.status(200).json(task)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

const getTasks = async (req,res) => {
    const tasks = await Task.find({}).sort({createdAt: -1})

    res.status(200).json(tasks)
}

const getTask = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }
    const task = await Task.findById(id)

    if(!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

const deleteTask = async (req,res) =>{
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if(!task){
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

const updateTask = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!task){
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}


module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}