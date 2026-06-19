'use client'

import { useState } from 'react'

type Props = {
  onNext: (data: any) => void
  onBack: () => void
}

export default function FormSectionC({ onNext, onBack }: Props) {
  const [challenges, setChallenges] = useState<string[]>([])
  const [error, setError] = useState('')

  const options = [
    'High fuel cost',
    'Vehicle breakdown',
    'No insurance',
    'Low earnings',
    'Traffic & road issues',
    'Charging station not available',
    'Battery range anxiety',
    'High maintenance cost'
  ]

  function toggleChallenge(option: string) {
    if (challenges.includes(option)) {
      setChallenges(challenges.filter(c => c !== option))
    } else {
      if (challenges.length >= 3) {
        setError('Select max 3 challenges')
        return
      }
      setChallenges([...challenges, option])
    }
    setError('')
  }

  function handleNext() {
    if (challenges.length === 0) {
      setError('Please select at least 1 challenge')
      return
    }
    setError('')
    onNext({ challenges })
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Section C — Your Challenges</h2>
      <p style={{ color: '#6b7280' }}>Select up to 3 pain points</p>

      {options.map(option => (
        <div key={option} onClick={() => toggleChallenge(option)}
          style={{
            padding: '12px',
            marginBottom: '8px',
            borderRadius: '6px',
            border: challenges.includes(option) ? '2px solid #16a34a' : '1px solid #ccc',
            backgroundColor: challenges.includes(option) ? '#f0fdf4' : 'transparent',
            cursor: 'pointer',
            color: challenges.includes(option) ? '#16a34a' : 'inherit'
          }}>
          {challenges.includes(option) ? '✓ ' : ''}{option}
        </div>
      ))}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={onBack} style={backButtonStyle}>← Back</button>
      <button onClick={handleNext} style={buttonStyle}>Next →</button>
    </div>
  )
}

const buttonStyle = {
  backgroundColor: '#16a34a', color: 'white', padding: '12px 24px',
  fontSize: '16px', border: 'none', borderRadius: '6px',
  cursor: 'pointer', width: '100%', marginTop: '8px'
}
const backButtonStyle = {
  backgroundColor: '#6b7280', color: 'white', padding: '12px 24px',
  fontSize: '16px', border: 'none', borderRadius: '6px',
  cursor: 'pointer', width: '100%', marginBottom: '8px'
}