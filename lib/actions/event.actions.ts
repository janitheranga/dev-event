"use server";

import connectDB from "@/lib/mongodb";
import { Event } from "@/database";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug }).lean();

    // Return empty array if event not found
    if (!event) {
      return [];
    }

    // Return empty array if event has no tags or tags array is empty
    if (!event.tags || !Array.isArray(event.tags) || event.tags.length === 0) {
      return [];
    }

    // Find similar events with matching tags
    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
  } catch (e) {
    // Return empty array on database errors
    return [];
  }
};
