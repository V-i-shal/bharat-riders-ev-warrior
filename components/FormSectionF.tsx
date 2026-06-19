'use client'

import { useState } from 'react'

type Props = {
  onSubmit: (data: any) => void
  onBack: () => void
}

export default function FormSectionF({ onSubmit, onBack }: Props) {
  const [referralCode, setReferralCode] = useState('')

  function handleSubmit() {
    onSubmit({ referred_by_code: referralCode })
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Section F — Referral</h2>
      <p style={{ color: '#6b7280' }}>Were you referred by another rider?</p>

      <label>Referral Code (optional)</label>
      <input value={referralCode} onChange={e => setReferralCode(e.target.value)}
        style={inputStyle} placeholder="e.g. RW-4821" />

      <button onClick={onBack} style={backButtonStyle}>← Back</button>
      <button onClick={handleSubmit} style={buttonStyle}>Submit Form ✓</button>
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