// import { useEffect} from 'react'
// import WorkoutDetails from '../components/WorkoutDetails';
// import WorkoutForm from '../components/WorkoutForm';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from "../hooks/useAuthContext"

// const Home = () => {

//   const {workouts, dispatch} = useWorkoutsContext()
//   const {user} = useAuthContext()

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       const response = await fetch('/api/workouts', {
//         headers: {
//           'Authorization': `Bearer ${user.token}`
//         }
//       });
//       const json = await response.json()

//       if (response.ok) {
//         dispatch({type: 'SET_WORKOUTS', payload: json})
//       }
//     }

//     if (user) {
//       fetchWorkouts()
//     }

//   }, [dispatch, user])


//   return (
//     <div className="home">
//         <div className="workouts">
//           {workouts && workouts.map((workout) => (
//             <WorkoutDetails key={workout._id} workout={workout} />
//           ))}
//         </div>
//         <WorkoutForm />
//     </div>
//   )
// }

// export default Home 

import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  // Determine the backend API URL based on the environment
  const API_URL = process.env.REACT_APP_API_URL || ''; // Default to '' for development

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/workouts`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: json });
        } else {
          console.error('Failed to fetch workouts:', json.error);
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    if (user) {
      fetchWorkouts();
    }

  }, [dispatch, user, API_URL]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;