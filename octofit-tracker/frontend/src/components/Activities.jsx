import { useEffect, useState } from 'react'
import { getCollection } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getCollection('/api/activities/').then(setActivities).catch((requestError) => setError(requestError.message))
  }, [])

  return <DataPage eyebrow="MOVEMENT LOG" title="Activities" error={error}>
    <div className="table-wrap">
      <table className="table align-middle">
        <thead><tr><th>Person</th><th>Type</th><th>Duration</th><th>Distance</th><th>Points</th></tr></thead>
        <tbody>{activities.map((activity) => <tr key={activity._id}>
          <td><strong>{activity.user?.name || 'Unknown athlete'}</strong></td>
          <td className="text-capitalize">{activity.type}</td>
          <td>{activity.duration} min</td>
          <td>{activity.distance ? `${activity.distance} km` : '—'}</td>
          <td><span className="points">+{activity.points}</span></td>
        </tr>)}</tbody>
      </table>
      {!activities.length && !error && <EmptyState text="No activity has been logged yet." />}
    </div>
  </DataPage>
}

export function DataPage({ eyebrow, title, error, children }) {
  return <section className="data-page">
    <div className="page-heading compact-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
    {error ? <div className="alert alert-warning">{error}. Check that the API is running on port 8000.</div> : children}
  </section>
}

export function EmptyState({ text }) { return <p className="empty-state">{text}</p> }

export default Activities