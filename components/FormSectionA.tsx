'use client'

import { useState } from 'react'

type Props = {
  onNext: (data: any) => void
}

export default function FormSectionA({ onNext }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [platform, setPlatform] = useState('')
  const [experience, setExperience] = useState('')
  const [error, setError] = useState('')

  function handleNext() {
    if (!name || !phone || !city || !platform || !experience) {
      setError('Please fill all fields')
      return
    }
    setError('')
    onNext({ name, phone, city, platform, experience })
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Section A — Your Profile</h2>

      <label>Full Name</label>
      <input value={name} onChange={e => setName(e.target.value)}
        style={inputStyle} placeholder="Enter your name" />

      <label>WhatsApp Number</label>
      <input value={phone} onChange={e => setPhone(e.target.value)}
        style={inputStyle} placeholder="10 digit number" />

      <label>City</label>
      <input value={city} onChange={e => setCity(e.target.value)}
        style={inputStyle} placeholder="Your city" />

      <label>Delivery Platform</label>
      <select value={platform} onChange={e => setPlatform(e.target.value)} style={inputStyle}>
        <option value="">Select platform</option>
        <option value="swiggy">Swiggy</option>
        <option value="zomato">Zomato</option>
        <option value="blinkit">Blinkit</option>
        <option value="porter">Porter</option>
        <option value="dunzo">Dunzo</option>
        <option value="other">Other</option>
      </select>

      <label>Years of Experience</label>
      <input value={experience} onChange={e => setExperience(e.target.value)}
        style={inputStyle} placeholder="e.g. 3" type="number" />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleNext} style={buttonStyle}>Next →</button>
    </div>
  )
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '16px',
  marginTop: '4px',
  fontSize: '16px',
  borderRadius: '6px',
  border: '1px solid #ccc'
}

const buttonStyle = {
  backgroundColor: '#16a34a',
  color: 'white',
  padding: '12px 24px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  width: '100%'
}