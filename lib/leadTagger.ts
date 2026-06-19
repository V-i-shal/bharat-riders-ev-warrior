export function assignLeadTag(vehicleType: string, openToEV: boolean): string {
  if (vehicleType === 'ev') return 'ev'
  if (openToEV) return 'swing'
  return 'petrol'
}