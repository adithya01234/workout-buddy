import { useEffect, useState, useCallback } from "react";
import WorkoutDetails from "../components/workoutdetails";
import WorkoutForm from "../components/workoutform";
import { useWorkoutsContext } from "../hooks/useworkoutcontext";

export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      } else {
        setError(json.error || "Failed to fetch workouts");
      }
    } catch (err) {
      setError("Network error. Could not fetch workouts.");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  if (loading) {
    return <div className="home">Loading workouts...</div>;
  }

  if (error) {
    return (
      <div className="home">
        <div className="error">{error}</div>
        <WorkoutForm />
      </div>
    );
  }

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <div>No workouts yet. Add your first workout!</div>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}
