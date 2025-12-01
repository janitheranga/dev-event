import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Type definition for route parameters
interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Connect to database
    await connectDB();

    // Extract slug from route params
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or missing slug parameter",
        },
        { status: 400 }
      );
    }

    // Sanitize slug (remove any potentially harmful characters)
    const sanitizedSlug = slug.trim().toLowerCase();

    // Query the database for the event
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // Handle case where event is not found
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: `Event with slug '${sanitizedSlug}' not found`,
        },
        { status: 404 }
      );
    }

    // Return the event data
    return NextResponse.json(
      {
        success: true,
        event: event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error("Error fetching event by slug:", error);

    // Handle specific error types
    if (error instanceof Error) {
      // Database connection errors
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          {
            success: false,
            message: "Database configuration error",
          },
          { status: 500 }
        );
      }

      // Mongoose validation or cast errors
      if (error.name === "CastError" || error.name === "ValidationError") {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid request parameters",
          },
          { status: 400 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while fetching the event",
      },
      { status: 500 }
    );
  }
}
