import { useEffect, useState } from 'react'
import { getCollection } from '../api'
import { DataPage, EmptyState } from './Activities'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getCollection('/api/leaderboard/').then(setEntries).catch((requestError) => setError(requestError.message)) }, [])

  return <DataPage eyebrow="TEAM PULSE" title="Leaderboard" error={error}>
    <div className="ranking-list">{entries.map((entry, index) => <div className="ranking-row" key={entry.user?._id || entry._id}>
      <span className="rank">{String(index + 1).padStart(2, '0')}</span>
      <span className="avatar">{entry.user?.avatar || entry.avatar || '?'}</span>
      <strong>{entry.user?.name || entry.name || 'Unknown athlete'}</strong>
      <span className="ranking-meta">{entry.activities || 0} activities</span>
      <b>{entry.points || 0} pts</b>
    </div>)}</div>
    {!entries.length && !error && <EmptyState text="The leaderboard is waiting for its first activity." />}
  </DataPage>
}

export default Leaderboard