export async function sendWhatsAppMessage(name: string, referralCode: string, language: string) {
  const messages: Record<string, string> = {
    en: `Namaste ${name}! Welcome to Road Warrior. Your referral code is: ${referralCode}. Share it with other riders to earn 5 points each!`,
    hi: `Namaste ${name} bhai! Road Warrior mein aapka swagat hai. Aapka referral code hai: ${referralCode}. Share karein aur points kamayein!`,
    kn: `Namaskara ${name}! Road Warrior ge swagata. Nimma referral code: ${referralCode}.`
  }

  const message = messages[language] || messages['en']

  // MOCK MODE: simulating WhatsApp send for hackathon demo
  // In production, this would call a real provider like 360dialog or Twilio WhatsApp API
  console.log('📱 [MOCK WHATSAPP] Sending to rider:')
  console.log(message)

  return { sent: true, mock: true, message }
}