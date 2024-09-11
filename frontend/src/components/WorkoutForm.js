

import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext()

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Check if fields are empty
    //     if (!title || !load || !reps) {
    //         setError('All fields are required');
    //         return;
    //     }

    //     // Check if load and reps are numbers
    //     if (isNaN(load) || isNaN(reps)) {
    //         setError('Load and Reps must be numbers');
    //         return;
    //     }

    //     if (!user) {
    //         setError('You must be logged in')
    //         return
    //     }

    //     const workout = {
    //         title,
    //         load: Number(load),  // Ensure load is a number
    //         reps: Number(reps)   // Ensure reps is a number
    //     };

    //     const response = await fetch('/api/workouts', {
    //         method: 'POST',
    //         body: JSON.stringify(workout),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     });

    //     const json = await response.json();

    //     if (!response.ok) {
    //         setError(json.error || 'An error occurred.');
    //     } else {
    //         setError(null);
    //         setTitle('');
    //         setLoad('');
    //         setReps('');
    //         console.log('new workout added:', json);
    //         dispatch({type: 'CREATE_WORKOUT', payload: json})
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if fields are empty
        if (!title || !load || !reps) {
            setError('All fields are required');
            return;
        }
    
        // Check if load and reps are numbers
        if (isNaN(load) || isNaN(reps)) {
            setError('Load and Reps must be numbers');
            return;
        }
    
        if (!user) {
            setError('You must be logged in');
            return;
        }
    
        const workout = {
            title,
            load: Number(load),  // Ensure load is a number
            reps: Number(reps)   // Ensure reps is a number
        };
    
        try {
            const response = await fetch('/api/workouts', {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
    
            // Check if the response is OK
            if (!response.ok) {
                const errorText = await response.text(); // Get text in case it's not JSON
                setError(`An error occurred: ${errorText}`);
                return;
            }
    
            // Attempt to parse JSON
            const json = await response.json();
    
            setError(null);
            setTitle('');
            setLoad('');
            setReps('');
            console.log('New workout added:', json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
    
        } catch (error) {
            console.error('Error submitting workout:', error);
            setError('An error occurred while submitting the workout.');
        }
    };
    

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Load (in kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />
            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button type="submit">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;
