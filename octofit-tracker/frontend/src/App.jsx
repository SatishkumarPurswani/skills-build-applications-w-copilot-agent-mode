import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <span className="brand-mark">O</span>
          <div>
            <p className="eyebrow">OCTOFIT TRACKER</p>
            <h1>Move with purpose.</h1>
          </div>
        </div>
        <span className="status-dot">Live workspace</span>
      </header>
      <div className="app-body">
        <nav className="sidebar" aria-label="Primary navigation">
          <p className="nav-label">Explore</p>
          <NavLink to="/" end>Overview</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">People</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview-page">
      <div className="page-heading">
        <p className="eyebrow">YOUR TRAINING HQ</p>
        <h2>A clearer view of every rep, run, and rally.</h2>
        <p className="lede">Track momentum, celebrate your team, and find your next challenge.</p>
      </div>
      <div className="overview-grid">
        <NavLink className="feature-tile feature-tile-dark" to="/activities">
          <span className="tile-kicker">01 / Activity log</span>
          <strong>See the work add up.</strong>
          <span>Review your team&apos;s latest movement.</span>
        </NavLink>
        <NavLink className="feature-tile feature-tile-coral" to="/leaderboard">
          <span className="tile-kicker">02 / Competition</span>
          <strong>Find your edge.</strong>
          <span>Track points and climb the board.</span>
        </NavLink>
        <NavLink className="feature-tile feature-tile-lime" to="/workouts">
          <span className="tile-kicker">03 / Training</span>
          <strong>Make today count.</strong>
          <span>Choose a workout that meets you there.</span>
        </NavLink>
      </div>
    </section>
  )
}

export default App
