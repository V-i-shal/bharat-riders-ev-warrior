import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const phone = searchParams.get('phone')

  if (!phone) {
    return Response.json({ error: 'Phone number required' }, { status: 400 })
  }

  const { data: rider, error } = await supabaseAdmin
    .from('riders')
    .select('*')
    .eq('whatsapp_number', phone)
    .single()

  if (error || !rider) {
    return Response.json({ error: 'Rider not found' }, { status: 404 })
  }

  const { data: referrals } = await supabaseAdmin
    .from('referrals')
    .select('*')
    .eq('referrer_id', rider.id)

  return Response.json({
    name: rider.name,
    referralCode: rider.referral_code,
    points: rider.points,
    totalReferrals: referrals?.length || 0,
    nextMilestone: rider.points < 100 ? 10 : rider.points < 300 ? 25 : 50
  })
}