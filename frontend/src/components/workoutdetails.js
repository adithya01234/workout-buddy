import "./WorkoutDetails.css";
import { useWorkoutsContext } from "../hooks/useworkoutcontext";
import { useState, memo } from "react";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [error, setError] = useState(null);

  if (!workout) {
    return <div>No workout data available.</div>;
  }

  const handleDelete = async () => {
    setError("Deleting...");
    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: "DELETE",
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error || "Failed to delete workout");
        return;
      }
      dispatch({ type: "DELETE_WORKOUT", payload: json.workout });
      setError(null);
    } catch (err) {
      setError("Network error. Could not delete workout.");
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{new Date(workout.createdAt).toLocaleString()}</p>
      <button
        onClick={handleDelete}
        style={{ marginTop: "10px" }}
        disabled={error === "Deleting..."}
      >
        {error === "Deleting..." ? "Deleting..." : "Delete"}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default memo(WorkoutDetails);
