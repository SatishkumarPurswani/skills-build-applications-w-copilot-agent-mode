import { useEffect, useState } from 'react'
import { getCollection } from '../api'
import { DataPage, EmptyState } from './Activities'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  //-8000.app.github.dev/api/workouts
  useEffect(() => { getCollection('/api/workouts/').then(setWorkouts).catch((requestError) => setError(requestError.message)) }, [])

  return <DataPage eyebrow="YOUR NEXT SESSION" title="Workouts" error={error}>
    <div className="card-grid">{workouts.map((workout) => <article className="info-card workout-card" key={workout._id}>
      <span className="difficulty">{workout.difficulty}</span><h3>{workout.title}</h3><p>{workout.description}</p>
      <ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul>
    </article>)}</div>
    {!workouts.length && !error && <EmptyState text="No workouts are available yet." />}
  </DataPage>
}

export default Workouts