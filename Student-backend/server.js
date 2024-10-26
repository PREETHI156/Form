const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Initialize the app
const app = express();

// Use CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/student_info', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Student schema and model
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  marks: { type: Number, required: true },
  cutoff: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// Helper function to calculate cutoff marks (you can adjust criteria)
const calculateCutoff = (marks) => {
  // Example: let's say cutoff is 90% of the marks
  return marks * 0.9;
};

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service, e.g., 'gmail'
  auth: {
    user: 'preethir0611@gmail.com', // Your email address
    pass: 'tojt rrbc pncd wunz'   // Your email password (or app password if using Gmail)
  }
});

// Function to send email notification
const sendEmailNotification = (email, name, cutoff) => {
  const mailOptions = {
    from: 'preethir0611@gmail.com',
    to: email, // Student's email
    subject: 'Your Cutoff Marks Notification',
    text: `Dear ${name},\n\nYour cutoff marks have been calculated as: ${cutoff}.\n\nBest regards,\nYour School`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};


app.post('/api/students', async (req, res) => {
  try {
    const { name, age, email, marks } = req.body;
    
    // Calculate cutoff marks
    const cutoff = calculateCutoff(marks);
    
    // Save student data to MongoDB
    const newStudent = new Student({ name, age, email, marks, cutoff });
    await newStudent.save();

    // Send email notification
    sendEmailNotification(email, name, cutoff);

    // Send response back to the frontend
    res.status(201).json({ message: 'Student data saved and email notification sent!', student: newStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error saving student data or sending email', error });
  }
});



// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
