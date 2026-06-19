'use client'

import { useState } from 'react'
import { User, Phone, MapPin, Bike, Calendar } from 'lucide-react'

type Props = {
  onNext: (data: any) => void
  t: any
}

export default function FormSectionA({ onNext, t }: Props) {
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
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError('Name should only contain letters')
      return
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setError('Phone number must be exactly 10 digits')
      return
    }
    if (!/^[a-zA-Z\s]+$/.test(city)) {
      setError('City should only contain letters')
      return
    }
    setError('')
    onNext({ name, phone, city, platform, experience })
  }

  function handleNameChange(value: string) {
    if (/^[a-zA-Z\s]*$/.test(value)) setName(value)
  }

  function handlePhoneChange(value: string) {
    if (/^[0-9]*$/.test(value) && value.length <= 10) setPhone(value)
  }

  function handleCityChange(value: string) {
    if (/^[a-zA-Z\s]*$/.test(value)) setCity(value)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ color: '#fff', margin: '0 0 2px' }}>Let's get to know you</h2>
      <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 20px' }}>Tell us about yourself.</p>

      <label style={labelStyle}>{t.name}</label>
      <div style={inputWrapStyle}>
        <User size={18} color="#71717a" />
        <input value={name} onChange={e => handleNameChange(e.target.value)}
          style={inputStyle} placeholder={t.name} />
      </div>

      <label style={labelStyle}>{t.phone}</label>
      <div style={inputWrapStyle}>
        <Phone size={18} color="#71717a" />
        <input value={phone} onChange={e => handlePhoneChange(e.target.value)}
          style={inputStyle} placeholder="10 digit number" inputMode="numeric" />
      </div>

      <label style={labelStyle}>{t.city}</label>
      <div style={inputWrapStyle}>
        <MapPin size={18} color="#71717a" />
        <input value={city} onChange={e => handleCityChange(e.target.value)}
          style={inputStyle} placeholder={t.city} />
      </div>

      <label style={labelStyle}>{t.platform}</label>
      <div style={inputWrapStyle}>
        <Bike size={18} color="#71717a" />
        <select value={platform} onChange={e => setPlatform(e.target.value)} style={selectStyle}>
          <option value="">Select platform</option>
          <option value="swiggy">Swiggy</option>
          <option value="zomato">Zomato</option>
          <option value="blinkit">Blinkit</option>
          <option value="porter">Porter</option>
          <option value="dunzo">Dunzo</option>
          <option value="other">Other</option>
        </select>
      </div>

      <label style={labelStyle}>{t.experience}</label>
      <div style={inputWrapStyle}>
        <Calendar size={18} color="#71717a" />
        <input value={experience} onChange={e => setExperience(e.target.value)}
          style={inputStyle} placeholder="e.g. 3" type="number" min="0" max="50" />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleNext} style={buttonStyle}>{t.next} →</button>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  color: '#d4d4d8',
  marginBottom: '6px',
  marginTop: '16px'
}

const inputWrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: '#0a0a0a',
  border: '1px solid #3f3f46',
  borderRadius: '10px',
  padding: '12px 14px'
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#fff',
  fontSize: '16px'
}

const selectStyle: React.CSSProperties = {
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#fff',
  fontSize: '16px'
}

const buttonStyle = {
  backgroundColor: '#16a34a',
  color: 'white',
  padding: '14px 24px',
  fontSize: '16px',
  fontWeight: 600,
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  width: '100%',
  marginTop: '24px'
}