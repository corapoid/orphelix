import { NextResponse } from 'next/server'
import { SidebarPinsService } from '@/lib/db/services'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')

    if (path) {
      const pinned = SidebarPinsService.isPinned(path)
      return NextResponse.json({ pinned })
    }

    const pinned = SidebarPinsService.getPinned()
    return NextResponse.json(Array.from(pinned))
  } catch (error) {
    console.error('Failed to get sidebar pins:', error)
    return NextResponse.json({ error: 'Failed to get sidebar pins' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { path, pinned } = await request.json()
    SidebarPinsService.setPinned(path, pinned)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update sidebar pin:', error)
    return NextResponse.json({ error: 'Failed to update sidebar pin' }, { status: 500 })
  }
}
