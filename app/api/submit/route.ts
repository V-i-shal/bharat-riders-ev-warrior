import { supabaseAdmin } from '@/lib/supabase'
import { generateReferralCode, calculatePoints } from '@/lib/referral'
import { assignLeadTag } from '@/lib/leadTagger'
import { sendWhatsAppMessage } from '@/lib/whatsapp'
export async function POST(request: Request) {
  const body = await request.json()

  // Check if phone number already exists
  const { data: existing } = await supabaseAdmin
    .from('riders')
    .select('id')
    .eq('whatsapp_number', body.phone)
    .single()

  if (existing) {
    return Response.json({ error: 'This phone number is already registered' }, { status: 400 })
  }

  // Generate referral code
  const referralCode = generateReferralCode()

  // Assign lead tag
  const leadTag = assignLeadTag(body.vehicleType, body.open_to_ev)

  // Check if insurance lead
  const insuranceLead = !body.insurance_accidental || !body.insurance_health

  // Build the rider object
  const rider = {
    name: body.name,
    whatsapp_number: body.phone,
    city: body.city,
    delivery_platform: body.platform,
    years_experience: parseInt(body.experience),
    vehicle_type: body.vehicleType,
    vehicle_brand: body.vehicleBrand,
    vehicle_model: body.vehicleModel,
    fueling_method: body.fuelingMethod,
    weekly_fuel_spend: parseInt(body.weeklyFuel) || 0,
    monthly_maintenance_spend: parseInt(body.monthlyMaintenance) || 0,
    challenges: body.challenges,
    insurance_accidental: body.insurance_accidental,
    insurance_health: body.insurance_health,
    paid_out_of_pocket: body.paid_out_of_pocket,
    open_to_ev: body.open_to_ev,
    ev_switch_reason: body.ev_switch_reason,
    interested_in: body.interested_in,
    referred_by_code: body.referred_by_code,
    referral_code: referralCode,
    points: 10,
    lead_tag: leadTag,
    insurance_lead: insuranceLead,
    language: 'en'
  }

  // Insert into database
  const { data, error } = await supabaseAdmin
    .from('riders')
    .insert(rider)
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  // If referred by someone, give them 5 points
  if (body.referred_by_code) {
    const { data: referrer } = await supabaseAdmin
      .from('riders')
      .select('id, points')
      .eq('referral_code', body.referred_by_code)
      .single()

    if (referrer) {
      await supabaseAdmin
        .from('riders')
        .update({ points: referrer.points + 5 })
        .eq('id', referrer.id)

      await supabaseAdmin
        .from('referrals')
        .insert({
          referrer_id: referrer.id,
          referee_id: data.id,
          points_awarded: 5
        })
    }
  }
  const waResult = await sendWhatsAppMessage(body.name, referralCode, 'en')
  return Response.json({
    success: true,
    referralCode: referralCode,
    points: 10,
    name: body.name,
    whatsappMessage: waResult.message
  })
}