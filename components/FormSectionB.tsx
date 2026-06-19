'use client'

import { useState } from 'react'

type Props = {
  onNext: (data: any) => void
  onBack: () => void
  t: any 
}

export default function FormSectionB({ onNext, onBack, t}: Props) {
  const [vehicleType, setVehicleType] = useState('')
  const [vehicleBrand, setVehicleBrand] = useState('')
  const [vehicleModel, setVehicleModel] = useState('')
  const [fuelingMethod, setFuelingMethod] = useState('')
  const [weeklyFuel, setWeeklyFuel] = useState('')
  const [monthlyMaintenance, setMonthlyMaintenance] = useState('')
  const [error, setError] = useState('')

  function handleNext() {
    if (!vehicleType || !vehicleBrand || !vehicleModel || !fuelingMethod) {
      setError('Please fill all fields')
      return
    }
    setError('')
    onNext({ vehicleType, vehicleBrand, vehicleModel, fuelingMethod, weeklyFuel, monthlyMaintenance })
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>{t.title}</h2>

      <label>{t.vehicleType}</label>
      <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} style={inputStyle}>
        <option value="">Select type</option>
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
        <option value="ev">Electric (EV)</option>
        <option value="other">Other</option>
      </select>

      <label>{t.vehicleBrand}</label>
      <input value={vehicleBrand} onChange={e => setVehicleBrand(e.target.value)}
        style={inputStyle} placeholder={t.vehicleBrand} />

      <label>{t.vehicleModel}</label>
      <input value={vehicleModel} onChange={e => setVehicleModel(e.target.value)}
        style={inputStyle} placeholder={t.vehicleModel} />

      <label>{t.fuelingMethod}</label>
      <select value={fuelingMethod} onChange={e => setFuelingMethod(e.target.value)} style={inputStyle}>
        <option value="">Select method</option>
        <option value="petrol_pump">Petrol Pump</option>
        <option value="home_charging">Home Charging</option>
        <option value="swap_station">Battery Swap Station</option>
        <option value="office_charging">Office / Hub Charging</option>
      </select>

      <label>{t.weeklyFuel}</label>
      <input value={weeklyFuel} onChange={e => setWeeklyFuel(e.target.value)}
        style={inputStyle} placeholder="e.g. 500" type="number" />

      <label>{t.monthlyMaintenance}</label>
      <input value={monthlyMaintenance} onChange={e => setMonthlyMaintenance(e.target.value)}
        style={inputStyle} placeholder="e.g. 800" type="number" />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={onBack} style={backButtonStyle}>← {t.back}</button>
      <button onClick={handleNext} style={buttonStyle}>{t.next} →</button>
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
  width: '100%',
  marginTop: '8px'
}

const backButtonStyle = {
  backgroundColor: '#6b7280',
  color: 'white',
  padding: '12px 24px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  width: '100%',
  marginBottom: '8px'
}