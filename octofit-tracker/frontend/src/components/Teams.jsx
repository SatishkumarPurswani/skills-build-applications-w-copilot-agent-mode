import { useEffect, useState } from 'react'
import { getCollection } from '../api'
import { DataPage, EmptyState } from './Activities'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  //-8000.app.github.dev/api/teams
  useEffect(() => { getCollection('/api/teams/').then(setTeams).catch((requestError) => setError(requestError.message)) }, [])

  return <DataPage eyebrow="COLLECTIVE ENERGY" title="Teams" error={error}>
    <div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id}>
      <span className="card-index">TEAM</span><h3>{team.name}</h3>
      <p>{team.members?.length || 0} members</p>
      <div className="avatar-stack">{team.members?.slice(0, 5).map((member) => <span className="avatar" key={member._id}>{member.avatar || member.name?.slice(0, 2).toUpperCase()}</span>)}</div>
    </article>)}</div>
    {!teams.length && !error && <EmptyState text="Create a team to start training together." />}
  </DataPage>
}

export default Teams