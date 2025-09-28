import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ success: false, error: "URL parameter is required" }, { status: 400 })
  }

  try {
    if (url.includes("drive.google.com")) {
      // Extract file ID from various Google Drive URL formats
      let fileId = ""

      // Handle different Google Drive URL formats
      const patterns = [/\/file\/d\/([a-zA-Z0-9_-]+)/, /id=([a-zA-Z0-9_-]+)/, /\/d\/([a-zA-Z0-9_-]+)/]

      for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match) {
          fileId = match[1]
          break
        }
      }

      if (!fileId) {
        return NextResponse.json(
          {
            success: false,
            error: "Could not extract file ID from Google Drive URL",
          },
          { status: 400 },
        )
      }

      // Create multiple fallback URLs for better compatibility
      const embedUrls = [
        `https://drive.google.com/file/d/${fileId}/preview`,
        `https://drive.google.com/uc?export=download&id=${fileId}`,
        `https://drive.google.com/uc?id=${fileId}&export=stream`,
      ]

      // Try to verify the file is accessible
      try {
        const testResponse = await fetch(`https://drive.google.com/file/d/${fileId}/view`, {
          method: "HEAD",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        })

        if (testResponse.ok || testResponse.status === 302) {
          return NextResponse.json({
            success: true,
            embedUrl: embedUrls[0],
            fallbackUrls: embedUrls.slice(1),
            fileId: fileId,
          })
        }
      } catch (error) {
        console.log("File accessibility check failed, proceeding with embed URL")
      }

      // Return the embed URL even if verification fails
      return NextResponse.json({
        success: true,
        embedUrl: embedUrls[0],
        fallbackUrls: embedUrls.slice(1),
        fileId: fileId,
        warning: "File accessibility could not be verified",
      })
    }

    // For non-Google Drive URLs, return as-is
    return NextResponse.json({
      success: true,
      embedUrl: url,
    })
  } catch (error) {
    console.error("Error processing video URL:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process video URL",
      },
      { status: 500 },
    )
  }
}
