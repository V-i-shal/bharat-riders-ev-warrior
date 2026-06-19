'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')

  async function handleLogin() {
    if (!password) return
    setLoading(true)
    setError('')

    const response = await fetch(`/api/admin?password=${password}`)
    const result = await response.json()

    if (result.error) {
      setError('Wrong password')
    } else {
      setData(result)
    }
    setLoading(false)
  }

  const filteredRiders = data?.allRiders?.filter((r: any) => {
    if (filter === 'all') return true
    if (filter === 'insurance') return r.insurance_lead
    return r.lead_tag === filter
  })

  if (!data) {
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: '60px auto' }}>
        <h1 style={{ textAlign: 'center' }}>🔐 Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter admin password"
          style={inputStyle}
        />
        <button onClick={handleLogin} style={buttonStyle} disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>📊 Admin Dashboard</h1>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div style={statCard('#f0fdf4', '#16a34a')}>
          <p style={{ margin: 0, color: '#6b7280' }}>Total Riders</p>
          <h2 style={{ margin: '4px 0 0', color: '#16a34a' }}>{data.total}</h2>
        </div>
        <div style={statCard('#fefce8', '#ca8a04')}>
          <p style={{ margin: 0, color: '#6b7280' }}>Petrol Riders</p>
          <h2 style={{ margin: '4px 0 0', color: '#ca8a04' }}>{data.petrolRiders}</h2>
        </div>
        <div style={statCard('#eff6ff', '#1d4ed8')}>
          <p style={{ margin: 0, color: '#6b7280' }}>EV Riders</p>
          <h2 style={{ margin: '4px 0 0', color: '#1d4ed8' }}>{data.evRiders}</h2>
        </div>
        <div style={statCard('#f0fdf4', '#15803d')}>
          <p style={{ margin: 0, color: '#6b7280' }}>Swing Riders</p>
          <h2 style={{ margin: '4px 0 0', color: '#15803d' }}>{data.swingRiders}</h2>
        </div>
        <div style={statCard('#fef2f2', '#dc2626')}>
          <p style={{ margin: 0, color: '#6b7280' }}>Insurance Leads</p>
          <h2 style={{ margin: '4px 0 0', color: '#dc2626' }}>{data.insuranceLeads}</h2>
        </div>
      </div>

      {/* City Breakdown */}
      <div style={sectionStyle}>
        <h3>📍 City Breakdown</h3>
        {Object.entries(data.cityCount).map(([city, count]: any) => (
          <div key={city} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
            <span>{city}</span>
            <span style={{ fontWeight: 600 }}>{count} riders</span>
          </div>
        ))}
      </div>

      {/* Top Referrers */}
      <div style={sectionStyle}>
        <h3>🏆 Top Referrers</h3>
        {data.topRiders.map((rider: any, i: number) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
            <div>
              <span style={{ fontWeight: 600 }}>#{i + 1} {rider.name}</span>
              <span style={{ color: '#6b7280', marginLeft: '8px', fontSize: '13px' }}>{rider.city}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '2px 8px', borderRadius: '12px', fontSize: '13px' }}>
                {rider.points} pts
              </span>
              <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '12px', fontSize: '13px' }}>
                {rider.leadTag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* All Riders Table */}
      <div style={sectionStyle}>
        <h3>👥 All Riders</h3>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {['all', 'petrol', 'ev', 'swing', 'insurance'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '6px 14px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                backgroundColor: filter === f ? '#16a34a' : '#e5e7eb',
                color: filter === f ? 'white' : '#374151', fontSize: '13px' }}>
              {f === 'insurance' ? '🚨 Insurance Leads' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>City</th>
                <th style={thStyle}>Platform</th>
                <th style={thStyle}>Vehicle</th>
                <th style={thStyle}>Tag</th>
                <th style={thStyle}>Points</th>
                <th style={thStyle}>Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders?.map((rider: any) => (
                <tr key={rider.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={tdStyle}>{rider.name}</td>
                  <td style={tdStyle}>{rider.city}</td>
                  <td style={tdStyle}>{rider.delivery_platform}</td>
                  <td style={tdStyle}>{rider.vehicle_type}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '2px 8px', borderRadius: '12px', fontSize: '12px',
                      backgroundColor: rider.lead_tag === 'ev' ? '#eff6ff' : rider.lead_tag === 'swing' ? '#f0fdf4' : '#fefce8',
                      color: rider.lead_tag === 'ev' ? '#1d4ed8' : rider.lead_tag === 'swing' ? '#16a34a' : '#ca8a04'
                    }}>
                      {rider.lead_tag}
                    </span>
                  </td>
                  <td style={tdStyle}>{rider.points}</td>
                  <td style={tdStyle}>{rider.referral_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  display: 'block', width: '100%', padding: '12px',
  marginBottom: '12px', marginTop: '16px', fontSize: '16px',
  borderRadius: '8px', border: '1px solid #ccc'
}
const buttonStyle = {
  backgroundColor: '#16a34a', color: 'white', padding: '12px 24px',
  fontSize: '16px', border: 'none', borderRadius: '8px',
  cursor: 'pointer', width: '100%'
}
const sectionStyle = {
  border: '1px solid #e5e7eb', borderRadius: '12px',
  padding: '20px', marginBottom: '20px'
}
const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '10px 12px',
  fontWeight: 600, color: '#374151'
}
const tdStyle: React.CSSProperties = {
  padding: '10px 12px', color: '#374151'
}
function statCard(bg: string, color: string) {
  return {
    backgroundColor: bg, borderRadius: '12px',
    padding: '16px', border: `1px solid ${color}20`
  }
}