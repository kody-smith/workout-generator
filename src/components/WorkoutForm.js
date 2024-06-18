// src/WorkoutForm.js

import React, { useState } from 'react';
import "./WorkoutForm.css"

const WorkoutForm = ({ onSubmit }) => {
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [focuses, setFocuses] = useState([]);
  const [timeConstraint, setTimeConstraint] = useState('');
  const [coolDown, setCoolDown] = useState('None');

  const muscleGroupOptions = [
    'Chest', 'Tricep', 'Shoulders', 'Back', 'Bicep', 'Legs',
  ];

  const focusOptions = [
    'Upper Chest', 'Lower Chest',
    'Lats', 'Traps', 'Mid Back', 'Lower Back',
    'Medial Head Tricep', 'Long Head Tricep', 'Lateral Head Tricep',
    'Long Head Bicep', 'Short Head Bicep', 
    'Posterior Delt','Lateral Delt', 'Anterior Delt', 
    'Quads', 'Glutes', 'Hamstrings', 'Calves'
  ];

  const timeConstraintOptions = ['30min', '1hr', '1.5hr'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      muscleGroups,
      focuses,
      timeConstraint,
      coolDown
    });
  };

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <div className="input-group-container input-group-container1">
        <h2>Muscle Groups:</h2>
        <div className="input-group">
            {muscleGroupOptions.map((option) => (
            <div key={option}>
                <input
                type="checkbox"
                value={option}
                onChange={(e) => {
                    if (e.target.checked) {
                    setMuscleGroups([...muscleGroups, option]);
                    } else {
                    setMuscleGroups(muscleGroups.filter((mg) => mg !== option));
                    }
                }}
                />
                {option}
            </div>
            ))}
        </div>
      </div>

      <div className="input-group-container input-group-container2">
        <h2>Focuses:</h2>
        <div className="input-group">
            {focusOptions.map((option) => (
            <div key={option}>
                <input
                type="checkbox"
                value={option}
                onChange={(e) => {
                    if (e.target.checked) {
                    setFocuses([...focuses, option]);
                    } else {
                    setFocuses(focuses.filter((focus) => focus !== option));
                    }
                }}
                />
                {option}
            </div>
            ))}
        </div>
        </div>
      <div className="input-group-container input-group-container3">
        <h2>Time Constraint:</h2>
        <div className="input-group">
            
            {timeConstraintOptions.map((option) => (
            <div key={option}>
                <input
                type="radio"
                name="timeConstraint"
                value={option}
                onChange={(e) => setTimeConstraint(e.target.value)}
                />
                {option}
            </div>
            ))}
        </div>
      </div>

      <button type="submit" className="submit-btn">Generate Workout Plan</button>
    </form>
  );
};

export default WorkoutForm;
