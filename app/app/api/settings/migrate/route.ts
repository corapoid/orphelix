import { NextResponse } from 'next/server'
import { migrateFromLocalStorage } from '@/lib/db/database'

export async function POST(request: Request) {
  try {
    const localStorageData = await request.json()
    migrateFromLocalStorage(localStorageData)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to migrate from localStorage:', error)
    return NextResponse.json({ error: 'Failed to migrate from localStorage' }, { status: 500 })
  }
}
