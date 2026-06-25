'use client'

import { useState } from 'react'

type Props = {
  onNext: (data: any) => void
  onBack: () => void
  t: any
  defaultValues: any
}

export default function FormSectionB({ onNext, onBack, t, defaultValues }: Props) {
  const [vehicleCategory, setVehicleCategory] = useState(defaultValues?.vehicleCategory || '')
  const [vehicleType, setVehicleType] = useState(defaultValues?.vehicleType || '')
  const [customVehicleType, setCustomVehicleType] = useState(defaultValues?.customVehicleType || '')
  const [vehicleBrand, setVehicleBrand] = useState(defaultValues?.vehicleBrand || '')
  const [vehicleModel, setVehicleModel] = useState(defaultValues?.vehicleModel || '')
  const [fuelingMethod, setFuelingMethod] = useState(defaultValues?.fuelingMethod || '')
  const [weeklyFuel, setWeeklyFuel] = useState(defaultValues?.weeklyFuel || '')
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(defaultValues?.monthlyMaintenance || '')
  const [error, setError] = useState('')

  // Fueling options change based on vehicle type
  const fuelingOptions: Record<string, { value: string, label: string }[]> = {
    petrol: [
      { value: 'petrol_pump', label: 'Petrol Pump' }
    ],
    diesel: [
      { value: 'diesel_pump', label: 'Diesel Pump' }
    ],
    ev: [
      { value: 'home_charging', label: 'Home Charging' },
      { value: 'swap_station', label: 'Battery Swap Station' },
      { value: 'office_charging', label: 'Office / Hub Charging' }
    ],
    other: [
      { value: 'petrol_pump', label: 'Petrol Pump' },
      { value: 'home_charging', label: 'Home Charging' },
      { value: 'swap_station', label: 'Battery Swap Station' },
      { value: 'other_fueling', label: 'Other' }
    ]
  }

  function handleVehicleTypeChange(type: string) {
    setVehicleType(type)
    setFuelingMethod('') // reset fueling when vehicle type changes
  }

  function handleNext() {
    const finalVehicleType = vehicleType === 'other' ? customVehicleType : vehicleType

    if (!vehicleCategory || !vehicleType || !vehicleBrand || !vehicleModel || !fuelingMethod) {
      setError('Please fill all fields')
      return
    }
    if (vehicleType === 'other' && !customVehicleType) {
      setError('Please enter your vehicle type')
      return
    }
    setError('')
    onNext({
      vehicleCategory,
      vehicleType: finalVehicleType,
      customVehicleType,
      vehicleBrand,
      vehicleModel,
      fuelingMethod,
      weeklyFuel,
      monthlyMaintenance
    })
  }

  return (
    <div>
      <h2 style={{ color: '#fff', margin: '0 0 2px' }}>Your Vehicle</h2>
      <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 20px' }}>Tell us about your ride.</p>

      {/* Vehicle Category — 2 wheeler or 4 wheeler */}
      <label style={labelStyle}>Vehicle Category</label>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '4px' }}>
        {['Two Wheeler', 'Four Wheeler'].map(cat => (
          <div key={cat} onClick={() => setVehicleCategory(cat)}
            style={{
              flex: 1, padding: '12px', borderRadius: '10px', cursor: 'pointer',
              textAlign: 'center', fontSize: '14px', fontWeight: 600,
              border: vehicleCategory === cat ? '2px solid #16a34a' : '1px solid #3f3f46',
              backgroundColor: vehicleCategory === cat ? '#052e16' : '#0a0a0a',
              color: vehicleCategory === cat ? '#4ade80' : '#a1a1aa'
            }}>
            {cat === 'Two Wheeler' ? '🛵 Two Wheeler' : '🚗 Four Wheeler'}
          </div>
        ))}
      </div>

      {/* Vehicle Type */}
      <label style={labelStyle}>Vehicle Type</label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '4px' }}>
        {['petrol', 'diesel', 'ev', 'other'].map(type => (
          <div key={type} onClick={() => handleVehicleTypeChange(type)}
            style={{
              padding: '12px', borderRadius: '10px', cursor: 'pointer',
              textAlign: 'center', fontSize: '14px', fontWeight: 600,
              border: vehicleType === type ? '2px solid #16a34a' : '1px solid #3f3f46',
              backgroundColor: vehicleType === type ? '#052e16' : '#0a0a0a',
              color: vehicleType === type ? '#4ade80' : '#a1a1aa'
            }}>
            {type === 'petrol' ? '⛽ Petrol' : type === 'diesel' ? '🛢️ Diesel' : type === 'ev' ? '⚡ Electric (EV)' : '❓ Other'}
          </div>
        ))}
      </div>

      {/* Custom vehicle type if Other */}
      {vehicleType === 'other' && (
        <div style={inputWrapStyle}>
          <input value={customVehicleType} onChange={e => setCustomVehicleType(e.target.value)}
            style={inputStyle} placeholder="Enter your vehicle type" />
        </div>
      )}

      {/* Vehicle Brand */}
      <label style={labelStyle}>Vehicle Brand</label>
      <div style={inputWrapStyle}>
        <input value={vehicleBrand} onChange={e => setVehicleBrand(e.target.value)}
          style={inputStyle} placeholder="e.g. Honda, TVS, Ola, Maruti" />
      </div>

      {/* Vehicle Model */}
      <label style={labelStyle}>Vehicle Model</label>
      <div style={inputWrapStyle}>
        <input value={vehicleModel} onChange={e => setVehicleModel(e.target.value)}
          style={inputStyle} placeholder="e.g. Activa, iQube, Alto" />
      </div>

      {/* Fueling Method — conditional based on vehicle type */}
      {vehicleType && (
        <>
          <label style={labelStyle}>
            {vehicleType === 'ev' ? 'Charging Method' : 'Fueling Method'}
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '4px' }}>
            {fuelingOptions[vehicleType]?.map(option => (
              <div key={option.value} onClick={() => setFuelingMethod(option.value)}
                style={{
                  padding: '12px 16px', borderRadius: '10px', cursor: 'pointer',
                  fontSize: '14px',
                  border: fuelingMethod === option.value ? '2px solid #16a34a' : '1px solid #3f3f46',
                  backgroundColor: fuelingMethod === option.value ? '#052e16' : '#0a0a0a',
                  color: fuelingMethod === option.value ? '#4ade80' : '#a1a1aa'
                }}>
                {fuelingMethod === option.value ? '✓ ' : ''}{option.label}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Weekly spend */}
      <label style={labelStyle}>
        {vehicleType === 'ev' ? 'Weekly Charging Spend (₹)' : 'Weekly Fuel Spend (₹)'}
      </label>
      <div style={inputWrapStyle}>
        <input value={weeklyFuel} onChange={e => setWeeklyFuel(e.target.value)}
          style={inputStyle} placeholder="e.g. 500" type="number" inputMode="numeric" min="50" step="50" />
      </div>

      {/* Monthly maintenance */}
      <label style={labelStyle}>Monthly Maintenance Spend (₹)</label>
      <div style={inputWrapStyle}>
        <input value={monthlyMaintenance} onChange={e => setMonthlyMaintenance(e.target.value)}
         style={inputStyle} placeholder="e.g. 800" type="number" inputMode="numeric" min="100" step="100" />
      </div>

      {error && <p style={{ color: '#f87171', marginTop: '12px', fontSize: '14px' }}>{error}</p>}

      <button onClick={onBack} style={backButtonStyle}>← {t.back}</button>
      <button onClick={handleNext} style={buttonStyle}>{t.next} →</button>
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