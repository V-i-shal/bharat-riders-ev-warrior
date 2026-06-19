'use client'

import { useState } from 'react'

type Props = {
  onNext: (data: any) => void
  onBack: () => void
}

export default function FormSectionD({ onNext, onBack }: Props) {
  const [accidental, setAccidental] = useState('')
  const [health, setHealth] = useState('')
  const [paidOutOfPocket, setPaidOutOfPocket] = useState('')
  const [error, setError] = useState('')

  function handleNext() {
    if (!accidental || !health || !paidOutOfPocket) {
      setError('Please answer all questions')
      return
    }
    setError('')
    onNext({
      insurance_accidental: accidental === 'yes',
      insurance_health: health === 'yes',
      paid_out_of_pocket: paidOutOfPocket === 'yes'
    })
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Section D — Insurance</h2>

      <p>Do you have accidental insurance?</p>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {['yes', 'no'].map(val => (
          <button key={val} onClick={() => setAccidental(val)}
            style={{ ...optionStyle, borderColor: accidental === val ? '#16a34a' : '#ccc',
              backgroundColor: accidental === val ? '#f0fdf4' : 'transparent',
              color: accidental === val ? '#16a34a' : 'inherit' }}>
            {val === 'yes' ? '✓ Yes' : '✗ No'}
          </button>
        ))}
      </div>

      <p>Do you have health insurance?</p>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {['yes', 'no'].map(val => (
          <button key={val} onClick={() => setHealth(val)}
            style={{ ...optionStyle, borderColor: health === val ? '#16a34a' : '#ccc',
              backgroundColor: health === val ? '#f0fdf4' : 'transparent',
              color: health === val ? '#16a34a' : 'inherit' }}>
            {val === 'yes' ? '✓ Yes' : '✗ No'}
          </button>
        ))}
      </div>

      <p>Have you ever paid out of pocket for an accident?</p>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {['yes', 'no'].map(val => (
          <button key={val} onClick={() => setPaidOutOfPocket(val)}
            style={{ ...optionStyle, borderColor: paidOutOfPocket === val ? '#16a34a' : '#ccc',
              backgroundColor: paidOutOfPocket === val ? '#f0fdf4' : 'transparent',
              color: paidOutOfPocket === val ? '#16a34a' : 'inherit' }}>
            {val === 'yes' ? '✓ Yes' : '✗ No'}
          </button>
        ))}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={onBack} style={backButtonStyle}>← Back</button>
      <button onClick={handleNext} style={buttonStyle}>Next →</button>
    </div>
  )
}

const optionStyle = {
  flex: 1, padding: '12px', fontSize: '16px',
  borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer'
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