import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const telegramUrl = searchParams.get("url")

  if (!telegramUrl) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 })
  }

  try {
    console.log("[v0] Processing Telegram URL:", telegramUrl)

    // Extract message ID from URL
    const messageId = extractMessageId(telegramUrl)

    if (!messageId) {
      console.log("[v0] Failed to extract message ID from:", telegramUrl)
      return NextResponse.json({ error: "Invalid Telegram URL" }, { status: 400 })
    }

    console.log("[v0] Extracted message ID:", messageId)

    // Create Telegram embed URL for direct video access
    const embedUrl = `https://t.me/MVBDN/${messageId}?embed=1`

    console.log("[v0] Created embed URL:", embedUrl)

    // Return the embed URL for the video player to use
    return NextResponse.json({
      success: true,
      embedUrl: embedUrl,
      directUrl: telegramUrl,
      messageId: messageId,
    })
  } catch (error) {
    console.error("[v0] Streaming error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function extractMessageId(telegramUrl: string): string | null {
  console.log("[v0] Extracting message ID from URL:", telegramUrl)

  const patterns = [
    /\/(\d+)$/, // Standard format: https://t.me/MVBDN/1760
    /\/c\/\d+\/(\d+)/, // Private channel format
    /message_id=(\d+)/, // Query parameter format
  ]

  for (const pattern of patterns) {
    const match = telegramUrl.match(pattern)
    if (match) {
      console.log("[v0] Message ID extracted:", match[1])
      return match[1]
    }
  }

  console.log("[v0] No message ID found in URL")
  return null
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Range, Content-Range",
    },
  })
}
