import { NextResponse, NextRequest } from "next/server";
import { seedDatabase } from "@/database/seed";

/**
 * GET /api/seed
 * Seeds the MongoDB database with predefined events.
 * Safe to call multiple times — existing items are skipped based on slug.
 */
export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    const result = await seedDatabase();

    const message =
      result.inserted === 0
        ? "Database already seeded — no new events created"
        : `Seeded database with ${result.inserted} new event(s), ${result.skipped} skipped`;

    return NextResponse.json(
      {
        success: true,
        message,
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      // Validation or cast errors from Mongoose
      if (error.name === "ValidationError" || error.name === "CastError") {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid seed data or schema validation failed",
            error: error.message,
          },
          { status: 400 }
        );
      }

      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          {
            success: false,
            message: "Database configuration error",
          },
          { status: 500 }
        );
      }
    }

    // Generic server error
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred during seeding",
      },
      { status: 500 }
    );
  }
}
