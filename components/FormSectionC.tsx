'use client'

import { useState } from 'react'

type Props = {
  onNext: (data: any) => void
  onBack: () => void
  defaultValues: any
}

export default function FormSectionC({ onNext, onBack, defaultValues }: Props) {
  const [challenges, setChallenges] = useState<string[]>(defaultValues?.challenges || [])
  const [otherChallenge, setOtherChallenge] = useState(defaultValues?.otherChallenge || '')
  const [error, setError] = useState('')

  const options = [
    'High fuel / charging cost',
    'Vehicle breakdown',
    'No insurance coverage',
    'Low earnings per delivery',
    'Traffic & road issues',
    'Charging station not available',
    'Battery range anxiety',
    'High maintenance cost',
    'No job security',
    'Late payments from platform',
    'Others'
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
    if (challenges.includes('Others') && !otherChallenge) {
      setError('Please describe your other challenge')
      return
    }
    setError('')
    onNext({
      challenges,
      otherChallenge
    })
  }

  return (
    <div>
      <h2 style={{ color: '#fff', margin: '0 0 2px' }}>Your Challenges</h2>
      <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 20px' }}>
        Select up to 3 challenges you face daily.
      </p>

      {options.map(option => (
        <div key={option}>
          <div onClick={() => toggleChallenge(option)}
            style={{
              padding: '12px 16px', marginBottom: '8px', borderRadius: '10px',
              cursor: 'pointer', fontSize: '14px',
              border: challenges.includes(option) ? '2px solid #16a34a' : '1px solid #3f3f46',
              backgroundColor: challenges.includes(option) ? '#052e16' : '#0a0a0a',
              color: challenges.includes(option) ? '#4ade80' : '#a1a1aa',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}>
            <span style={{
              width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0,
              border: challenges.includes(option) ? '2px solid #16a34a' : '2px solid #3f3f46',
              backgroundColor: challenges.includes(option) ? '#16a34a' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', color: 'white'
            }}>
              {challenges.includes(option) ? '✓' : ''}
            </span>
            {option}
          </div>

          {/* Show text box if Others is selected */}
          {option === 'Others' && challenges.includes('Others') && (
            <div style={{
              backgroundColor: '#0a0a0a', border: '1px solid #3f3f46',
              borderRadius: '10px', padding: '12px 14px', marginBottom: '8px'
            }}>
              <input
                value={otherChallenge}
                onChange={e => setOtherChallenge(e.target.value)}
                style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                placeholder="Describe your challenge..."
              />
            </div>
          )}
        </div>
      ))}

      {error && <p style={{ color: '#f87171', marginTop: '12px', fontSize: '14px' }}>{error}</p>}

      <button onClick={onBack} style={backButtonStyle}>← Back</button>
      <button onClick={handleNext} style={buttonStyle}>Next →</button>
    </div>
  )
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#16a34a', color: 'white', padding: '14px 24px',
  fontSize: '16px', fontWeight: 600, border: 'none', borderRadius: '10px',
  cursor: 'pointer', width: '100%', marginTop: '12px'
}
const backButtonStyle: React.CSSProperties = {
  backgroundColor: '#27272a', color: '#a1a1aa', padding: '14px 24px',
  fontSize: '16px', fontWeight: 600, border: 'none', borderRadius: '10px',
  cursor: 'pointer', width: '100%', marginTop: '16px'
}