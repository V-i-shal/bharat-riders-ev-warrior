export function generateReferralCode(): string {
  const number = Math.floor(1000 + Math.random() * 9000)
  return `RW-${number}`
}

export function calculatePoints(referralCount: number): number {
  let points = 10
  points += referralCount * 5
  return points
}