import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    // Determine the backend API URL based on the environment
    const API_URL = process.env.REACT_APP_API_URL || '';

    const handleClick = async () => {
        if (!user) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/workouts/${workout._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            // Log the raw response text for debugging
            const rawText = await response.text();
            console.log('Raw response text:', rawText);

            const json = JSON.parse(rawText); // Parse manually

            if (response.ok) {
                dispatch({ type: 'DELETE_WORKOUT', payload: json });
            } else {
                console.error('Failed to delete workout:', json.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong> {workout.load}</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
};

export default WorkoutDetails;
