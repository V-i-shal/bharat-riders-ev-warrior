'use client'

import { useState } from 'react'

export default function ScorePage() {
  const [phone, setPhone] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSearch() {
    if (!phone) {
      setError('Please enter your phone number')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)

    const response = await fetch(`/api/score?phone=${phone}`)
    const data = await response.json()

    if (data.error) {
      setError(data.error)
    } else {
      setResult(data)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>🏆 My Score</h1>
      <p style={{ textAlign: 'center', color: '#6b7280' }}>
        Enter your WhatsApp number to check your points
      </p>

      <input
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Your WhatsApp number"
        style={inputStyle}
      />

      <button onClick={handleSearch} style={buttonStyle} disabled={loading}>
        {loading ? 'Searching...' : 'Check My Score'}
      </button>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '24px', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ textAlign: 'center' }}>Namaste {result.name}! 👋</h2>

          <div style={cardStyle}>
            <p style={{ color: '#6b7280', margin: 0 }}>Your Points</p>
            <h2 style={{ color: '#16a34a', margin: '4px 0 0' }}>{result.points} pts</h2>
          </div>

          <div style={cardStyle}>
            <p style={{ color: '#6b7280', margin: 0 }}>Your Referral Code</p>
            <h2 style={{ color: '#1d4ed8', margin: '4px 0 0', letterSpacing: '2px' }}>{result.referralCode}</h2>
            <p style={{ color: '#6b7280', fontSize: '13px', margin: '4px 0 0' }}>
              Share this with other riders to earn +5 points each!
            </p>
          </div>

          <div style={cardStyle}>
            <p style={{ color: '#6b7280', margin: 0 }}>Total Referrals</p>
            <h2 style={{ margin: '4px 0 0' }}>{result.totalReferrals} riders referred</h2>
          </div>

          <div style={cardStyle}>
            <p style={{ color: '#6b7280', margin: 0 }}>Next Milestone</p>
            <h2 style={{ margin: '4px 0 0' }}>Reach {result.nextMilestone} referrals 🎯</h2>
          </div>
        </div>
      )}
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
const cardStyle = {
  backgroundColor: '#f9fafb', borderRadius: '8px',
  padding: '16px', marginBottom: '12px'
}