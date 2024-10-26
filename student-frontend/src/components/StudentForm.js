import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  // State for form data
  const [studentData, setStudentData] = useState({
    name: '',
    age: ' ',
    email: '',
    marks: '',
  });
  
  // State to display success message
  const [message, setMessage] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to the backend API
      const response = await axios.post('http://localhost:5000/api/students', studentData);
      console.log(response)
      
      // Show confirmation message if successful
      setMessage('Student data submitted successfully!');
    } catch (error) {
      console.error('Error submitting student data', error);
      setMessage('There was an error submitting the student data.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '300px' }}>
        <h2>Student Information</h2>

        <div>
          <label>Name: </label>
          <input type="text" name="name" value={studentData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Age: </label>
          <input type="text" name="age" value={studentData.age} onChange={handleChange} required />
        </div>

        <div>
          <label>Email: </label>
          <input type="email" name="email" value={studentData.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Marks: </label>
          <input type="number" name="marks" value={studentData.marks} onChange={handleChange} required />
        </div>

        <button type="submit">Submit</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default StudentForm;
