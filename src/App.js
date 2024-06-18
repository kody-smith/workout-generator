import React, { useState } from 'react';
import WorkoutForm from './components/WorkoutForm';
import "./App.css"

const App = () => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [displayPlan, setDisplayPlan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (formData) => {
    setDisplayPlan(true);
    setIsLoading(true);
    const response = await fetch('http://localhost:5000/api/generate-workout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });


    if (response.ok) {
      const data = await response.json();
      setWorkoutPlan(data.workoutPlan);
      setIsLoading(false);
    }
  };

  // const changeDisplay = (currState) => {
  //   return setDisplayPlan(!currState);
  // };

  return (
    <>
    <div className="App">
      {isLoading ? 
        <div className="loader-container">
          <div className="loader"></div> 
        </div>
        : null
      }
      {
      <div>
        {!displayPlan && (
          <div>
            <h1>Workout Planner</h1>
            <WorkoutForm onSubmit={handleFormSubmit} />
          </div>
        )}
        
        {displayPlan && workoutPlan && (
          <div>
            <h2>Generated Workout Plan</h2>
            <div className="response-div">
              <pre className="workout-plan">{workoutPlan}</pre>
            </div>
            {/* <button onSubmit={window.location.reload()}><span>&#171;</span>Go Back</button> */}
          </div>
        )}
      </div>
      }
    </div>
    </>
  );
};
export default App;