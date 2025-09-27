import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const driveUrl = searchParams.get("url")

  if (!driveUrl) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 })
  }

  try {
    console.log("[v0] Processing Google Drive URL:", driveUrl)

    const fileId = extractDriveFileId(driveUrl)

    if (!fileId) {
      console.log("[v0] Failed to extract file ID from:", driveUrl)
      return NextResponse.json({ error: "Invalid Google Drive URL" }, { status: 400 })
    }

    console.log("[v0] Extracted file ID:", fileId)

    const directStreamUrl = `https://drive.google.com/uc?export=download&id=${fileId}`
    const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`

    console.log("[v0] Created streaming URLs:", { directStreamUrl, embedUrl })

    // Return both direct and embed URLs for the video player to use
    return NextResponse.json({
      success: true,
      directUrl: directStreamUrl,
      embedUrl: embedUrl,
      fileId: fileId,
    })
  } catch (error) {
    console.error("[v0] Streaming error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function extractDriveFileId(driveUrl: string): string | null {
  console.log("[v0] Extracting file ID from Google Drive URL:", driveUrl)

  const patterns = [
    /\/file\/d\/([a-zA-Z0-9-_]+)/, // Standard format: https://drive.google.com/file/d/FILE_ID/view
    /id=([a-zA-Z0-9-_]+)/, // Query parameter format: https://drive.google.com/open?id=FILE_ID
    /\/d\/([a-zA-Z0-9-_]+)/, // Short format: https://drive.google.com/d/FILE_ID
  ]

  for (const pattern of patterns) {
    const match = driveUrl.match(pattern)
    if (match) {
      console.log("[v0] File ID extracted:", match[1])
      return match[1]
    }
  }

  console.log("[v0] No file ID found in URL")
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
