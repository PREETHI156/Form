// routes/studentRoutes.js
const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// POST endpoint to receive student data
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET endpoint to retrieve all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Implement logic to calculate cutoff marks
router.get('/cutoff', async (req, res) => {
  try {
    const students = await Student.find();
    const cutoff = calculateCutoff(students);
    res.status(200).json({ cutoff });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function calculateCutoff(students) {
  // Implement your cutoff logic here
  // For example, return the average marks as cutoff
  const totalMarks = students.reduce((acc, student) => acc + student.marks, 0);
  return students.length > 0 ? totalMarks / students.length : 0;
}

module.exports = router;
