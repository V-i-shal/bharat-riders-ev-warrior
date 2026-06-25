import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const password = searchParams.get('password')

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: riders } = await supabaseAdmin
    .from('riders')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: referrals } = await supabaseAdmin
    .from('referrals')
    .select('*')

  const total = riders?.length || 0
  const petrolRiders = riders?.filter(r => r.lead_tag === 'petrol').length || 0
  const evRiders = riders?.filter(r => r.lead_tag === 'ev').length || 0
  const swingRiders = riders?.filter(r => r.lead_tag === 'swing').length || 0
  const insuranceLeads = riders?.filter(r => r.insurance_lead).length || 0

  const cityCount: Record<string, number> = {}
  riders?.forEach(r => {
    if (r.city) cityCount[r.city] = (cityCount[r.city] || 0) + 1
  })

  const topRiders = [...(riders || [])]
    .sort((a, b) => b.points - a.points)
    .slice(0, 10)
    .map(r => ({
      name: r.name,
      city: r.city,
      points: r.points,
      referralCode: r.referral_code,
      leadTag: r.lead_tag
    }))

  // Fraud detection logic
  const suspiciousRiders = new Set<string>()

  // Flag 1 — more than 5 referrals in 1 hour from same code
  const referralsByCode: Record<string, any[]> = {}
  referrals?.forEach(r => {
    if (!referralsByCode[r.referrer_id]) referralsByCode[r.referrer_id] = []
    referralsByCode[r.referrer_id].push(r)
  })

  Object.entries(referralsByCode).forEach(([referrerId, refs]) => {
    const sorted = refs.sort((a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    for (let i = 0; i < sorted.length - 14; i++) {
      const window = sorted.slice(i, i + 15)
      const first = new Date(window[0].created_at).getTime()
      const last = new Date(window[14].created_at).getTime()
      if (last - first < 60 * 60 * 1000) {
        suspiciousRiders.add(referrerId)
      }
    }
  })

  // Flag 2 — sequential phone numbers
  const phones = riders?.map(r => r.whatsapp_number) || []
  phones.forEach((phone, i) => {
    if (i === 0) return
    const prev = parseInt(phones[i - 1])
    const curr = parseInt(phone)
    if (Math.abs(curr - prev) <= 2) {
      const prevRider = riders?.find(r => r.whatsapp_number === phones[i - 1])
      const currRider = riders?.find(r => r.whatsapp_number === phone)
      if (prevRider) suspiciousRiders.add(prevRider.id)
      if (currRider) suspiciousRiders.add(currRider.id)
    }
  })

  // Flag 3 — more than 10 referrals total from one person
  Object.entries(referralsByCode).forEach(([referrerId, refs]) => {
    if (refs.length > 50) suspiciousRiders.add(referrerId)
  })

  const allRidersWithFlags = riders?.map(r => ({
    ...r,
    suspicious: suspiciousRiders.has(r.id)
  }))

  return Response.json({
    total,
    petrolRiders,
    evRiders,
    swingRiders,
    insuranceLeads,
    cityCount,
    topRiders,
    allRiders: allRidersWithFlags,
    suspiciousCount: suspiciousRiders.size
  })
}