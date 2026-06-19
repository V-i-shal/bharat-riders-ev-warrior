'use client'

import { useState } from 'react'
import FormSectionA from '@/components/FormSectionA'
import FormSectionB from '@/components/FormSectionB'
import FormSectionC from '@/components/FormSectionC'
import FormSectionD from '@/components/FormSectionD'
import FormSectionE from '@/components/FormSectionE'
import FormSectionF from '@/components/FormSectionF'

export default function FormPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})

  function handleNext(data: any) {
    setFormData(prev => ({ ...prev, ...data }))
    setStep(prev => prev + 1)
  }

  function handleBack() {
    setStep(prev => prev - 1)
  }

async function handleSubmit(data: any) {
  const finalData = { ...formData, ...data }

  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(finalData)
  })

  const result = await response.json()

  if (result.error) {
    alert('Error: ' + result.error)
    return
  }

  alert(`✅ Registered!\n\nYour referral code: ${result.referralCode}\nPoints: ${result.points}\n\n📱 WhatsApp sent:\n"${result.whatsappMessage}"`)
}
  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '20px' }}>Road Warrior 🏍️</h1>
      <p style={{ textAlign: 'center', color: '#6b7280' }}>Step {step} of 6</p>

      {step === 1 && <FormSectionA onNext={handleNext} />}
      {step === 2 && <FormSectionB onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <FormSectionC onNext={handleNext} onBack={handleBack} />}
      {step === 4 && <FormSectionD onNext={handleNext} onBack={handleBack} />}
      {step === 5 && <FormSectionE onNext={handleNext} onBack={handleBack} />}
      {step === 6 && <FormSectionF onSubmit={handleSubmit} onBack={handleBack} />}
    </div>
  )
}