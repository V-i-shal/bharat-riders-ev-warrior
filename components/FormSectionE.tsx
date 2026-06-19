'use client'

import { useState } from 'react'

type Props = {
  onNext: (data: any) => void
  onBack: () => void
}

export default function FormSectionE({ onNext, onBack }: Props) {
  const [openToEV, setOpenToEV] = useState('')
  const [switchReason, setSwitchReason] = useState('')
  const [interested, setInterested] = useState<string[]>([])

  const interestOptions = [
    'EV Rental', 'Insurance Quote', 'Retrofit Info', 'All of the above'
  ]

  function toggleInterest(option: string) {
    if (interested.includes(option)) {
      setInterested(interested.filter(i => i !== option))
    } else {
      setInterested([...interested, option])
    }
  }

  function handleNext() {
    onNext({
      open_to_ev: openToEV === 'yes',
      ev_switch_reason: switchReason,
      interested_in: interested
    })
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Section E — EV Interest</h2>

      <p>Are you open to switching to EV?</p>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {['yes', 'no'].map(val => (
          <button key={val} onClick={() => setOpenToEV(val)}
            style={{ flex: 1, padding: '12px', fontSize: '16px', borderRadius: '6px',
              border: openToEV === val ? '2px solid #16a34a' : '1px solid #ccc',
              backgroundColor: openToEV === val ? '#f0fdf4' : 'transparent',
              color: openToEV === val ? '#16a34a' : 'inherit', cursor: 'pointer' }}>
            {val === 'yes' ? '✓ Yes' : '✗ No'}
          </button>
        ))}
      </div>

      <label>What would make you switch to EV?</label>
      <input value={switchReason} onChange={e => setSwitchReason(e.target.value)}
        style={inputStyle} placeholder="e.g. Lower running cost, better range..." />

      <p>What are you interested in?</p>
      {interestOptions.map(option => (
        <div key={option} onClick={() => toggleInterest(option)}
          style={{ padding: '12px', marginBottom: '8px', borderRadius: '6px',
            border: interested.includes(option) ? '2px solid #16a34a' : '1px solid #ccc',
            backgroundColor: interested.includes(option) ? '#f0fdf4' : 'transparent',
            color: interested.includes(option) ? '#16a34a' : 'inherit', cursor: 'pointer' }}>
          {interested.includes(option) ? '✓ ' : ''}{option}
        </div>
      ))}

      <button onClick={onBack} style={backButtonStyle}>← Back</button>
      <button onClick={handleNext} style={buttonStyle}>Next →</button>
    </div>
  )
}

const inputStyle = {
  display: 'block', width: '100%', padding: '10px',
  marginBottom: '16px', marginTop: '4px', fontSize: '16px',
  borderRadius: '6px', border: '1px solid #ccc'
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