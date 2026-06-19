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

  return Response.json({
    total,
    petrolRiders,
    evRiders,
    swingRiders,
    insuranceLeads,
    cityCount,
    topRiders,
    allRiders: riders
  })
}