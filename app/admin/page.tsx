'use client'

import { useState } from 'react'
import { Users, Fuel, Zap, RefreshCw, Shield, TrendingUp, Award, Coins } from 'lucide-react'

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
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '32px', maxWidth: '380px', width: '100%', backgroundColor: '#18181b', borderRadius: '16px', border: '1px solid #27272a' }}>
          <h1 style={{ textAlign: 'center', color: '#fff', fontSize: '22px' }}>🔐 Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            style={loginInputStyle}
          />
          <button onClick={handleLogin} style={buttonStyle} disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          {error && <p style={{ color: '#f87171', textAlign: 'center' }}>{error}</p>}
        </div>
      </div>
    )
  }

  const maxCityCount = Math.max(...(Object.values(data.cityCount) as number[]), 1)
  const recentRiders = [...(data.allRiders || [])]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  const totalRiders = data.total || 1
  const conversionPotential = Math.round(((data.swingRiders + data.evRiders) / totalRiders) * 100)
  const totalPoints = data.allRiders?.reduce((sum: number, r: any) => sum + (r.points || 0), 0) || 0
  const activeReferrals = data.allRiders?.filter((r: any) => r.points > 10).length || 0

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '24px 16px 60px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 800, margin: 0 }}>Admin Dashboard</h1>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: '6px 0 0' }}>Overview of rider registrations and leads</p>
          </div>
          <span style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            backgroundColor: '#052e16', color: '#4ade80', fontSize: '12px', fontWeight: 600,
            padding: '6px 12px', borderRadius: '20px', border: '1px solid #166534'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'inline-block' }} />
            Live Data
          </span>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          <StatCard icon={<Users size={20} color="#4ade80" />} value={data.total} label="Total Riders" />
          <StatCard icon={<Fuel size={20} color="#fbbf24" />} value={data.petrolRiders} label="Petrol Riders" />
          <StatCard icon={<Zap size={20} color="#60a5fa" />} value={data.evRiders} label="EV Riders" />
          <StatCard icon={<RefreshCw size={20} color="#4ade80" />} value={data.swingRiders} label="Swing Riders" />
          <StatCard icon={<Shield size={20} color="#f87171" />} value={data.insuranceLeads} label="Insurance Leads" />
        </div>

        {/* City Breakdown */}
        <Section title="📍 City Breakdown">
          {Object.entries(data.cityCount).map(([city, count]: any) => {
            const pct = Math.round((count / maxCityCount) * 100)
            return (
              <div key={city} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#e4e4e7', fontSize: '14px', fontWeight: 500 }}>{city}</span>
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>{count} riders</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#27272a', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, backgroundColor: '#16a34a', borderRadius: '6px' }} />
                </div>
              </div>
            )
          })}
        </Section>

        {/* Top Referrers */}
        <Section title="🏆 Top Referrers">
          {data.topRiders.map((rider: any, i: number) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < data.topRiders.length - 1 ? '1px solid #27272a' : 'none' }}>
              <div>
                <span style={{ color: '#e4e4e7', fontWeight: 600, fontSize: '14px' }}>#{i + 1} {rider.name}</span>
                <span style={{ color: '#71717a', marginLeft: '8px', fontSize: '12px' }}>{rider.city}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Tag color="#4ade80" bg="#052e16">{rider.points} pts</Tag>
                <Tag color="#60a5fa" bg="#0c1e3e">{rider.leadTag}</Tag>
              </div>
            </div>
          ))}
        </Section>

        {/* Recent Registrations */}
        <Section title="🕒 Recent Registrations">
          {recentRiders.map((rider: any) => (
            <div key={rider.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #27272a' }}>
              <div>
                <span style={{ color: '#e4e4e7', fontWeight: 600, fontSize: '14px' }}>{rider.name}</span>
                <span style={{ color: '#71717a', marginLeft: '8px', fontSize: '12px' }}>{rider.city}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Tag color={rider.lead_tag === 'ev' ? '#60a5fa' : rider.lead_tag === 'swing' ? '#4ade80' : '#fbbf24'}
                     bg={rider.lead_tag === 'ev' ? '#0c1e3e' : rider.lead_tag === 'swing' ? '#052e16' : '#3f2d05'}>
                  {rider.lead_tag}
                </Tag>
                <span style={{ color: '#71717a', fontSize: '11px' }}>
                  {new Date(rider.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </span>
              </div>
            </div>
          ))}
        </Section>

        {/* Bottom Analytics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          <AnalyticsCard icon={<TrendingUp size={20} color="#4ade80" />} value={`${conversionPotential}%`} label="Conversion Potential" sub="riders open to EV or already on EV" />
          <AnalyticsCard icon={<Award size={20} color="#60a5fa" />} value={activeReferrals} label="Active Referrals" sub="riders who referred at least 1 person" />
          <AnalyticsCard icon={<Coins size={20} color="#fbbf24" />} value={totalPoints} label="Total Points Distributed" sub="across all registered riders" />
        </div>

        {/* All Riders Table */}
        <Section title="👥 All Riders">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {['all', 'petrol', 'ev', 'swing', 'insurance'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '6px 14px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                  backgroundColor: filter === f ? '#16a34a' : '#27272a',
                  color: filter === f ? 'white' : '#a1a1aa', fontSize: '13px' }}>
                {f === 'insurance' ? '🚨 Insurance Leads' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#27272a' }}>
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
                  <tr key={rider.id} style={{ borderBottom: '1px solid #27272a' }}>
                    <td style={tdStyle}>{rider.name}</td>
                    <td style={tdStyle}>{rider.city}</td>
                    <td style={tdStyle}>{rider.delivery_platform}</td>
                    <td style={tdStyle}>{rider.vehicle_type}</td>
                    <td style={tdStyle}>
                      <Tag color={rider.lead_tag === 'ev' ? '#60a5fa' : rider.lead_tag === 'swing' ? '#4ade80' : '#fbbf24'}
                           bg={rider.lead_tag === 'ev' ? '#0c1e3e' : rider.lead_tag === 'swing' ? '#052e16' : '#3f2d05'}>
                        {rider.lead_tag}
                      </Tag>
                    </td>
                    <td style={tdStyle}>{rider.points}</td>
                    <td style={tdStyle}>{rider.referral_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

      </div>
    </div>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode, value: number, label: string }) {
  return (
    <div style={{
      backgroundColor: '#18181b', borderRadius: '16px', border: '1px solid #27272a',
      padding: '18px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    }}>
      <div style={{ marginBottom: '10px' }}>{icon}</div>
      <div style={{ color: '#fff', fontSize: '28px', fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '6px' }}>{label}</div>
    </div>
  )
}

function AnalyticsCard({ icon, value, label, sub }: { icon: React.ReactNode, value: any, label: string, sub: string }) {
  return (
    <div style={{
      backgroundColor: '#18181b', borderRadius: '16px', border: '1px solid #27272a',
      padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    }}>
      <div style={{ marginBottom: '10px' }}>{icon}</div>
      <div style={{ color: '#fff', fontSize: '24px', fontWeight: 800 }}>{value}</div>
      <div style={{ color: '#e4e4e7', fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>{label}</div>
      <div style={{ color: '#71717a', fontSize: '11px', marginTop: '2px' }}>{sub}</div>
    </div>
  )
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: '#18181b', borderRadius: '16px', border: '1px solid #27272a',
      padding: '24px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    }}>
      <h3 style={{ color: '#fff', fontSize: '16px', marginTop: 0, marginBottom: '16px' }}>{title}</h3>
      {children}
    </div>
  )
}

function Tag({ children, color, bg }: { children: React.ReactNode, color: string, bg: string }) {
  return (
    <span style={{ backgroundColor: bg, color, padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
      {children}
    </span>
  )
}

const loginInputStyle: React.CSSProperties = {
  display: 'block', width: '100%', padding: '12px',
  marginBottom: '12px', marginTop: '20px', fontSize: '15px',
  borderRadius: '10px', border: '1px solid #3f3f46',
  backgroundColor: '#0a0a0a', color: '#fff'
}
const buttonStyle: React.CSSProperties = {
  backgroundColor: '#16a34a', color: 'white', padding: '12px 24px',
  fontSize: '15px', fontWeight: 600, border: 'none', borderRadius: '10px',
  cursor: 'pointer', width: '100%'
}
const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '10px 12px',
  fontWeight: 600, color: '#a1a1aa'
}
const tdStyle: React.CSSProperties = {
  padding: '10px 12px', color: '#e4e4e7'
}