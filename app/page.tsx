import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data, error } = await supabase.from('riders').select('*')

  if (error) {
    return <div style={{color: 'red'}}>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>EV Warrior — Connected!</h1>
      <p>Riders in database: {data.length}</p>
    </div>
  )
}