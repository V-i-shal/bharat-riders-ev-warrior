'use client'

import { useState } from 'react'

type Props = {
  onNext: (data: any) => void
  onBack: () => void
  defaultValues: any
}

export default function FormSectionE({ onNext, onBack, defaultValues }: Props) {
  const [openToEV, setOpenToEV] = useState(defaultValues?.open_to_ev === true ? 'yes' : defaultValues?.open_to_ev === false ? 'no' : '')
  const [switchReason, setSwitchReason] = useState(defaultValues?.ev_switch_reason || '')
  const [interested, setInterested] = useState<string[]>(defaultValues?.interested_in || [])
  const [error, setError] = useState('')

  const interestOptions = [
    { value: 'ev_rental', label: '🛵 Rent an EV and try it out' },
    { value: 'insurance_quote', label: '🛡️ Get an insurance quote' },
    { value: 'retrofit_info', label: '🔧 Convert my petrol bike to EV' },
    { value: 'all', label: '⭐ All of the above' }
  ]

  function toggleInterest(value: string) {
    if (value === 'all') {
      if (interested.includes('all')) {
        setInterested([])
      } else {
        setInterested(['ev_rental', 'insurance_quote', 'retrofit_info', 'all'])
      }
      return
    }
    if (interested.includes(value)) {
      setInterested(interested.filter(i => i !== value && i !== 'all'))
    } else {
      setInterested([...interested.filter(i => i !== 'all'), value])
    }
  }

  function handleNext() {
    if (!openToEV) {
      setError('Please answer whether you are open to switching to EV')
      return
    }

    // If not open to EV, skip all other questions
    if (openToEV === 'no') {
      setError('')
      onNext({
        open_to_ev: false,
        ev_switch_reason: '',
        interested_in: []
      })
      return
    }

    setError('')
    onNext({
      open_to_ev: true,
      ev_switch_reason: switchReason,
      interested_in: interested
    })
  }

  return (
    <div>
      <h2 style={{ color: '#fff', margin: '0 0 2px' }}>EV Interest</h2>
      <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 20px' }}>
        Tell us about your interest in electric vehicles.
      </p>

      {/* Open to EV — Yes/No */}
      <label style={labelStyle}>Are you open to switching to an electric vehicle?</label>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
        {[
          { value: 'yes', label: '✓ Yes, interested' },
          { value: 'no', label: '✗ Not right now' }
        ].map(opt => (
          <div key={opt.value} onClick={() => { setOpenToEV(opt.value); setError('') }}
            style={{
              flex: 1, padding: '14px', borderRadius: '10px', cursor: 'pointer',
              textAlign: 'center', fontSize: '14px', fontWeight: 600,
              border: openToEV === opt.value ? '2px solid #16a34a' : '1px solid #3f3f46',
              backgroundColor: openToEV === opt.value ? '#052e16' : '#0a0a0a',
              color: openToEV === opt.value ? '#4ade80' : '#a1a1aa'
            }}>
            {opt.label}
          </div>
        ))}
      </div>

      {/* If NOT open to EV — show a simple message and go next */}
      {openToEV === 'no' && (
        <div style={{
          backgroundColor: '#1c1917', border: '1px solid #3f3f46',
          borderRadius: '10px', padding: '16px', marginTop: '12px'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
            No problem! You can click Next to continue.
          </p>
        </div>
      )}

      {/* If open to EV — show follow-up questions */}
      {openToEV === 'yes' && (
        <>
          <label style={{ ...labelStyle, marginTop: '20px' }}>
            What would make you switch to EV?
          </label>
          <div style={{
            backgroundColor: '#0a0a0a', border: '1px solid #3f3f46',
            borderRadius: '10px', padding: '12px 14px', marginBottom: '4px'
          }}>
            <input
              value={switchReason}
              onChange={e => setSwitchReason(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
              placeholder="e.g. Lower running cost, better range, subsidies..."
            />
          </div>

          <label style={{ ...labelStyle, marginTop: '20px' }}>
            What would you like to know more about?
          </label>
          <p style={{ color: '#71717a', fontSize: '12px', marginBottom: '12px', marginTop: '4px' }}>
            Select all that apply
          </p>
          {interestOptions.map(option => (
            <div key={option.value} onClick={() => toggleInterest(option.value)}
              style={{
                padding: '12px 16px', marginBottom: '8px', borderRadius: '10px',
                cursor: 'pointer', fontSize: '14px',
                border: interested.includes(option.value) ? '2px solid #16a34a' : '1px solid #3f3f46',
                backgroundColor: interested.includes(option.value) ? '#052e16' : '#0a0a0a',
                color: interested.includes(option.value) ? '#4ade80' : '#a1a1aa',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}>
              <span style={{
                width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0,
                border: interested.includes(option.value) ? '2px solid #16a34a' : '2px solid #3f3f46',
                backgroundColor: interested.includes(option.value) ? '#16a34a' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', color: 'white'
              }}>
                {interested.includes(option.value) ? '✓' : ''}
              </span>
              {option.label}
            </div>
          ))}
        </>
      )}

      {error && <p style={{ color: '#f87171', marginTop: '12px', fontSize: '14px' }}>{error}</p>}

      <button onClick={onBack} style={backButtonStyle}>← Back</button>
      <button onClick={handleNext} style={buttonStyle}>Next →</button>
    </div>
  )
}

const labelStyle = {
  display: 'block', fontSize: '13px',
  color: '#d4d4d8', marginBottom: '6px', marginTop: '16px'
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