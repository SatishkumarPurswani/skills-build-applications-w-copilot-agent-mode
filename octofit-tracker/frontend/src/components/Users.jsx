import { useEffect, useState } from 'react'
import { getCollection } from '../api'
import { DataPage, EmptyState } from './Activities'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getCollection('/api/users/').then(setUsers).catch((requestError) => setError(requestError.message)) }, [])

  return <DataPage eyebrow="THE CREW" title="People" error={error}>
    <div className="people-grid">{users.map((user) => <article className="person-row" key={user._id}>
      <span className="avatar avatar-large">{user.avatar || user.name?.slice(0, 2).toUpperCase()}</span><div><strong>{user.name}</strong><p>{user.email}</p></div>
    </article>)}</div>
    {!users.length && !error && <EmptyState text="No people have joined the workspace yet." />}
  </DataPage>
}

export default Users