'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/useLanguage'
import FormSectionA from '@/components/FormSectionA'
import FormSectionB from '@/components/FormSectionB'
import FormSectionC from '@/components/FormSectionC'
import FormSectionD from '@/components/FormSectionD'
import FormSectionE from '@/components/FormSectionE'  
import FormSectionF from '@/components/FormSectionF'

export default function FormPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  const { lang, setLang, t } = useLanguage()

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
  const progressPercent = (step / 6) * 100

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingBottom: '40px' }}>

      {/* Language selector — top left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '20px 20px 0' }}>
        <span style={{ fontSize: '13px', color: '#9ca3af' }}>🌐 Language:</span>
        <button onClick={() => setLang('en')}
          style={{ padding: '5px 14px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px',
            backgroundColor: lang === 'en' ? '#16a34a' : '#27272a',
            color: lang === 'en' ? 'white' : '#a1a1aa' }}>
          English
        </button>
        <button onClick={() => setLang('hi')}
          style={{ padding: '5px 14px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px',
            backgroundColor: lang === 'hi' ? '#16a34a' : '#27272a',
            color: lang === 'hi' ? 'white' : '#a1a1aa' }}>
          हिंदी
        </button>
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center', padding: '32px 20px 8px' }}>
        <h1 style={{ margin: 0, fontSize: '46px', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>
          Road Warrior 🛵
        </h1>
        <p style={{ color: '#9ca3af', opacity: 0.85, marginTop: '12px', fontSize: '14px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
          Helping delivery riders unlock better opportunities, rewards, and EV solutions.
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ maxWidth: '500px', margin: '28px auto 0', padding: '0 20px' }}>
        <div style={{ height: '10px', backgroundColor: '#27272a', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progressPercent}%`,
            backgroundColor: '#16a34a', borderRadius: '8px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '13px', marginTop: '10px' }}>
          Step {step} of 6
        </p>
      </div>

      <div style={{
        maxWidth: '500px', margin: '24px auto 0', backgroundColor: '#18181b',
        borderRadius: '16px', border: '1px solid #27272a',
        padding: '28px 24px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
      }}>
        {step === 1 && <FormSectionA onNext={handleNext} t={t} />}
        {step === 2 && <FormSectionB onNext={handleNext} onBack={handleBack} t={t} />}
        {step === 3 && <FormSectionC onNext={handleNext} onBack={handleBack} />}
        {step === 4 && <FormSectionD onNext={handleNext} onBack={handleBack} />}
        {step === 5 && <FormSectionE onNext={handleNext} onBack={handleBack} />}
        {step === 6 && <FormSectionF onSubmit={handleSubmit} onBack={handleBack} />}
      </div>
    </div>
  )
}