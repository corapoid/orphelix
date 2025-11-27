import { NextResponse } from 'next/server'
import { GitHubSettingsService } from '@/lib/db/services'

export async function GET() {
  try {
    const basket = GitHubSettingsService.getEditBasket()
    return NextResponse.json(basket)
  } catch (error) {
    console.error('Failed to get edit basket:', error)
    return NextResponse.json({ error: 'Failed to get edit basket' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const edit = await request.json()
    GitHubSettingsService.addToBasket(edit)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to add to basket:', error)
    return NextResponse.json({ error: 'Failed to add to basket' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get('filePath')

    if (!filePath) {
      // Clear entire basket
      GitHubSettingsService.clearBasket()
    } else {
      // Remove specific file
      GitHubSettingsService.removeFromBasket(filePath)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to remove from basket:', error)
    return NextResponse.json({ error: 'Failed to remove from basket' }, { status: 500 })
  }
}
