import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const driveUrl = searchParams.get("url")

  if (!driveUrl) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 })
  }

  try {
    const fileId = extractDriveFileId(driveUrl)

    if (!fileId) {
      return NextResponse.json({ error: "Invalid Google Drive URL" }, { status: 400 })
    }

    // Use Google Drive's embed URL which works reliably
    const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`

    return NextResponse.json({
      success: true,
      embedUrl: embedUrl,
      fileId: fileId,
    })
  } catch (error) {
    console.error("Streaming error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function extractDriveFileId(driveUrl: string): string | null {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9-_]+)/, // Standard format: https://drive.google.com/file/d/FILE_ID/view
    /id=([a-zA-Z0-9-_]+)/, // Query parameter format: https://drive.google.com/open?id=FILE_ID
    /\/d\/([a-zA-Z0-9-_]+)/, // Short format: https://drive.google.com/d/FILE_ID
  ]

  for (const pattern of patterns) {
    const match = driveUrl.match(pattern)
    if (match) {
      return match[1]
    }
  }

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
