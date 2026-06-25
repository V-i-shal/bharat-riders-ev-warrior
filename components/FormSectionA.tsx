'use client'

import { useState } from 'react'
import { User, Phone, MapPin, Bike, Calendar } from 'lucide-react'

const CITIES = [
  'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal',
  'Visakhapatnam', 'Patna', 'Vadodara', 'Coimbatore', 'Other'
]

type Props = {
  onNext: (data: any) => void
  t: any
  defaultValues: any
}

export default function FormSectionA({ onNext, t, defaultValues }: Props) {
  const [name, setName] = useState(defaultValues?.name || '')
  const [phone, setPhone] = useState(defaultValues?.phone || '')
  const [city, setCity] = useState(defaultValues?.city || '')
  const [customCity, setCustomCity] = useState(defaultValues?.customCity || '')
  const [area, setArea] = useState(defaultValues?.area || '')
  const [platform, setPlatform] = useState(defaultValues?.platform || '')
  const [customPlatform, setCustomPlatform] = useState(defaultValues?.customPlatform || '')
  const [experience, setExperience] = useState(defaultValues?.experience || '')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  function handleNameChange(value: string) {
    if (/^[a-zA-Z\s]*$/.test(value)) setName(value)
  }

  function handlePhoneChange(value: string) {
    if (/^[0-9]*$/.test(value) && value.length <= 10) setPhone(value)
  }

  async function handleNext() {
    const finalCity = city === 'Other' ? customCity : city
    const finalPlatform = platform === 'other' ? customPlatform : platform

    if (!name || !phone || !city || !platform || !experience) {
      setError('Please fill all fields')
      return
    }
    if (city === 'Other' && !customCity) {
      setError('Please enter your city name')
      return
    }
    if (platform === 'other' && !customPlatform) {
      setError('Please enter your delivery platform')
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

    // Check duplicate phone number before moving to next step
    setChecking(true)
    setError('')
    const response = await fetch(`/api/score?phone=${phone}`)
    const result = await response.json()
    setChecking(false)

    if (!result.error) {
      setError('This WhatsApp number is already registered. Each rider can register only once.')
      return
    }

    setError('')
    onNext({
      name,
      phone,
      city: finalCity,
      customCity,
      area,
      platform: finalPlatform,
      customPlatform,
      experience
    })
  }

  return (
    <div>
      <h2 style={{ color: '#fff', margin: '0 0 2px' }}>Let's get to know you</h2>
      <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 20px' }}>Tell us about yourself.</p>

      {/* Name */}
      <label style={labelStyle}>{t.name}</label>
      <div style={inputWrapStyle}>
        <User size={18} color="#71717a" />
        <input value={name} onChange={e => handleNameChange(e.target.value)}
          style={inputStyle} placeholder={t.name} />
      </div>

      {/* Phone */}
      <label style={labelStyle}>{t.phone}</label>
      <div style={inputWrapStyle}>
        <Phone size={18} color="#71717a" />
        <input value={phone} onChange={e => handlePhoneChange(e.target.value)}
          style={inputStyle} placeholder="10 digit number" inputMode="numeric" />
      </div>

      {/* City dropdown */}
      <label style={labelStyle}>{t.city}</label>
      <div style={inputWrapStyle}>
        <MapPin size={18} color="#71717a" />
        <select value={city} onChange={e => setCity(e.target.value)} style={selectStyle}className="dark-select">
          <option value="">Select your city</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Custom city input if Other selected */}
      {city === 'Other' && (
        <div style={inputWrapStyle}>
          <MapPin size={18} color="#71717a" />
          <input value={customCity} onChange={e => setCustomCity(e.target.value)}
            style={inputStyle} placeholder="Enter your city name" />
        </div>
      )}

      {/* Area/locality */}
      <label style={labelStyle}>Area / Locality</label>
      <div style={inputWrapStyle}>
        <MapPin size={18} color="#71717a" />
        <input value={area} onChange={e => setArea(e.target.value)}
          style={inputStyle} placeholder="e.g. Koramangala, Whitefield" />
      </div>

      {/* Platform */}
      <label style={labelStyle}>{t.platform}</label>
      <div style={inputWrapStyle}>
        <Bike size={18} color="#71717a" />
        <select value={platform} onChange={e => setPlatform(e.target.value)} style={selectStyle} className="dark-select">
          <option value="">Select platform</option>
          <option value="swiggy">Swiggy</option>
          <option value="zomato">Zomato</option>
          <option value="blinkit">Blinkit</option>
          <option value="porter">Porter</option>
          <option value="dunzo">Dunzo</option>
          <option value="zepto">Zepto</option>
          <option value="bigbasket">BigBasket</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Custom platform if Other selected */}
      {platform === 'other' && (
        <div style={inputWrapStyle}>
          <Bike size={18} color="#71717a" />
          <input value={customPlatform} onChange={e => setCustomPlatform(e.target.value)}
            style={inputStyle} placeholder="Enter your platform name" />
        </div>
      )}

      {/* Experience */}
      <label style={labelStyle}>{t.experience}</label>
      <div style={inputWrapStyle}>
        <Calendar size={18} color="#71717a" />
        <input value={experience} onChange={e => setExperience(e.target.value)}
          style={inputStyle} placeholder="e.g. 3" type="number" min="0" max="50" />
      </div>

      {error && <p style={{ color: '#f87171', marginTop: '12px', fontSize: '14px' }}>{error}</p>}

      <button onClick={handleNext} disabled={checking}
        style={{ ...buttonStyle, opacity: checking ? 0.7 : 1 }}>
        {checking ? 'Checking...' : `${t.next} →`}
      </button>
    </div>
  )
}

const labelStyle = {
  display: 'block', fontSize: '13px',
  color: '#d4d4d8', marginBottom: '6px', marginTop: '16px'
}
const inputWrapStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '10px',
  backgroundColor: '#0a0a0a', border: '1px solid #3f3f46',
  borderRadius: '10px', padding: '12px 14px', marginBottom: '4px'
}
const inputStyle: React.CSSProperties = {
  flex: 1, background: 'transparent', border: 'none',
  outline: 'none', color: '#fff', fontSize: '16px'
}
const selectStyle: React.CSSProperties = {
  flex: 1, background: '#0a0a0a', border: 'none',
  outline: 'none', color: '#fff', fontSize: '16px',
  width: '100%'
}
const buttonStyle: React.CSSProperties = {
  backgroundColor: '#16a34a', color: 'white', padding: '14px 24px',
  fontSize: '16px', fontWeight: 600, border: 'none', borderRadius: '10px',
  cursor: 'pointer', width: '100%', marginTop: '24px'
}