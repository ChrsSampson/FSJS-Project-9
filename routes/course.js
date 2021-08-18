const express = require('express');
const router = express.Router();
const catchAsync = require('../middleware/catchAsync');

const Course = require('../models').course

// Show all courses
router.get('/', catchAsync(async (req, res) => {
    try{
        const courses = await Course.findAll()
        res.status(200).json(courses) 
    }
    catch(e){
        res.status(400).json({Error: e.message})
    }
}));

// Show a course
router.get('/:id', catchAsync(async (req, res) => {
    try{
        const course = await Course.findByPk(req.params.id)
        res.status(200).json(course) 
    }
    catch(e){
        res.status(400).json({Error: e.message})
    }
}));

// create a course
router.post('/', catchAsync(async (req, res) => {
    try{
        const course = await Course.create(req.body)
        res.status(201).location('/') 
    }
    catch(e){
        res.status(400).json({Error: e.message})
    }
}));

// update a course
router.put('/:id', catchAsync(async (req, res) => {
    try{
        const course = await Course.update(req.body, req.params.id)
        res.status(204).location('/')
    }
    catch(e){
        res.status(400).json({Error: e.message})
    }
}));

// delete a course
router.delete('/:id', catchAsync(async (req, res) => {
    try{
        await Course.destroy({where: {id:req.params.id} })
        res.status(204).location('/')
    }
    catch(e){
        res.status(400).json({Error: e.message})
    }
}));

module.exports = router;