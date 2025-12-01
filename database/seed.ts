import connectDB from "@/lib/mongodb";
import { Event } from "@/database";
import type { IEvent } from "@/database/event.model";

// Shape for creating new events (slug/timestamps are auto-generated)
export type NewEvent = Pick<
  IEvent,
  | "title"
  | "description"
  | "overview"
  | "image"
  | "venue"
  | "location"
  | "date"
  | "time"
  | "mode"
  | "audience"
  | "agenda"
  | "organizer"
  | "tags"
>;

// Seed data: 7 realistic developer events
export const seedEvents: ReadonlyArray<NewEvent> = [
  {
    title: "Cloud Next 2026",
    description:
      "Google’s premier cloud computing event, showcasing innovations in AI, infrastructure, and enterprise solutions.",
    overview:
      "Cloud Next 2026 highlights the latest in cloud-native development, Kubernetes, AI, and enterprise scalability. Developers, architects, and executives gather to learn about new Google Cloud services, best practices, and success stories.",
    image:
      "https://res.cloudinary.com/dfbuk6aoa/image/upload/v1764553805/DevEvent/event1_bvdane.png",
    venue: "Moscone Center",
    location: "San Francisco, CA",
    date: "2026-04-10",
    time: "08:30",
    mode: "hybrid",
    audience: "Cloud engineers, DevOps, enterprise leaders, AI researchers",
    agenda: [
      "08:30 - 09:30 | Keynote: AI-Driven Cloud Infrastructure",
      "09:45 - 11:00 | Deep Dives: Kubernetes, Data Analytics, Security",
      "11:15 - 12:30 | Product Demos & Networking",
      "12:30 - 13:30 | Lunch",
      "13:30 - 15:00 | Workshops: Scaling with GCP",
      "15:15 - 16:30 | Fireside Chat: The Future of Enterprise Cloud",
    ],
    organizer:
      "Google Cloud organizes Cloud Next to connect global businesses, developers, and innovators with the latest technologies and best practices in cloud computing.",
    tags: ["Cloud", "DevOps", "Kubernetes", "AI"],
  },
  {
    title: "React Summit 2026",
    description:
      "The largest React conference gathering the React community, core team members, and industry leaders.",
    overview:
      "React Summit features talks and workshops on React, React Native, performance, state management, and modern tooling.",
    image:
      "https://res.cloudinary.com/dfbuk6aoa/image/upload/v1764553806/DevEvent/event2_smfelv.png",
    venue: "RAI Amsterdam",
    location: "Amsterdam, Netherlands",
    date: "2026-06-12",
    time: "09:00",
    mode: "offline",
    audience: "Frontend engineers, React developers, engineering managers",
    agenda: [
      "09:00 - 10:00 | Opening Keynote",
      "10:15 - 12:00 | React Concurrent Features",
      "12:00 - 13:00 | Lunch",
      "13:00 - 15:00 | Workshops & Labs",
      "15:15 - 17:00 | Community Lightning Talks",
    ],
    organizer: "GitNation",
    tags: ["React", "Frontend", "Performance"],
  },
  {
    title: "KubeCon + CloudNativeCon Europe 2026",
    description:
      "The flagship conference of the Cloud Native Computing Foundation, focusing on Kubernetes and cloud-native technologies.",
    overview:
      "KubeCon brings together adopters and technologists from leading open-source and cloud-native communities.",
    image:
      "https://res.cloudinary.com/dfbuk6aoa/image/upload/v1764553805/DevEvent/event3_bd1f3r.png",
    venue: "Fira Barcelona",
    location: "Barcelona, Spain",
    date: "2026-05-18",
    time: "09:00",
    mode: "offline",
    audience: "Platform engineers, SREs, architects, open-source maintainers",
    agenda: [
      "09:00 - 10:00 | CNCF Keynote",
      "10:15 - 12:00 | Kubernetes Deep Dive",
      "12:00 - 13:00 | Lunch & Expo",
      "13:00 - 15:30 | Tracks: Security, Observability, Networking",
      "15:45 - 17:00 | OSS Showcase",
    ],
    organizer: "CNCF",
    tags: ["Kubernetes", "Cloud Native", "Containers", "Security"],
  },
  {
    title: "PyCon US 2026",
    description:
      "The largest annual gathering for the Python community in the United States.",
    overview:
      "Talks, tutorials, and sprints covering data science, web development, tooling, and Python internals.",
    image:
      "https://res.cloudinary.com/dfbuk6aoa/image/upload/v1764553805/DevEvent/event4_nbphgj.png",
    venue: "Oregon Convention Center",
    location: "Portland, OR",
    date: "2026-05-01",
    time: "09:00",
    mode: "offline",
    audience: "Python developers, educators, data scientists",
    agenda: [
      "09:00 - 10:00 | Keynote",
      "10:15 - 12:00 | Tutorials",
      "12:00 - 13:00 | Lunch",
      "13:00 - 17:00 | Talks & Sprints",
    ],
    organizer: "Python Software Foundation",
    tags: ["Python", "Data", "Web", "Education"],
  },
  {
    title: "AWS re:Invent 2026",
    description:
      "Amazon Web Services' annual learning conference for the global cloud computing community.",
    overview:
      "Keynotes, training, and certification opportunities focused on AWS services and best practices.",
    image:
      "https://res.cloudinary.com/dfbuk6aoa/image/upload/v1764553806/DevEvent/event5_blk6b9.png",
    venue: "The Venetian",
    location: "Las Vegas, NV",
    date: "2026-12-01",
    time: "08:00",
    mode: "offline",
    audience: "Cloud architects, developers, IT leaders",
    agenda: [
      "08:00 - 09:30 | Keynote",
      "09:45 - 12:00 | Breakout Sessions",
      "12:00 - 13:30 | Expo & Lunch",
      "13:30 - 17:00 | Hands-on Labs",
    ],
    organizer: "Amazon Web Services",
    tags: ["AWS", "Cloud", "Serverless", "AI"],
  },
  {
    title: "JSConf Asia 2026",
    description:
      "A community-driven JavaScript conference covering the modern web ecosystem.",
    overview:
      "Sessions on JavaScript, web performance, frameworks, and developer experience.",
    image:
      "https://res.cloudinary.com/dfbuk6aoa/image/upload/v1764553805/DevEvent/event6_nur0j6.png",
    venue: "Suntec Convention Centre",
    location: "Singapore",
    date: "2026-07-22",
    time: "09:30",
    mode: "offline",
    audience: "Web developers, JS enthusiasts, DX engineers",
    agenda: [
      "09:30 - 10:30 | Opening Keynote",
      "10:45 - 12:15 | Web Performance Track",
      "12:15 - 13:30 | Lunch",
      "13:30 - 16:30 | Frameworks & Tooling",
    ],
    organizer: "JSConf Asia",
    tags: ["JavaScript", "Web", "DX"],
  },
  {
    title: "Open Source Summit 2026",
    description:
      "A conference for developers, architects, and community leaders shaping the future of open source.",
    overview:
      "Talks and panels on licensing, community health, security, and sustainable OSS governance.",
    image:
      "https://res.cloudinary.com/dfbuk6aoa/image/upload/v1764553806/DevEvent/event-full_tkx7sg.png",
    venue: "Vancouver Convention Centre",
    location: "Vancouver, Canada",
    date: "2026-09-14",
    time: "09:00",
    mode: "hybrid",
    audience: "OSS maintainers, contributors, enterprise adopters",
    agenda: [
      "09:00 - 10:00 | Keynote: The State of Open Source",
      "10:15 - 12:00 | Security & Supply Chain",
      "12:00 - 13:00 | Lunch",
      "13:00 - 16:00 | Community & Governance",
    ],
    organizer: "The Linux Foundation",
    tags: ["Open Source", "Security", "Community"],
  },
];

export interface SeedResult {
  inserted: number;
  skipped: number;
  total: number;
  ids: string[];
}

/**
 * Seeds the database with initial Event data.
 * - Connects to MongoDB
 * - Inserts events if they do not already exist (by slug)
 * - Returns a summary of the operation
 */
export async function seedDatabase(): Promise<SeedResult> {
  await connectDB();

  let inserted = 0;
  let skipped = 0;
  const ids: string[] = [];

  for (const evt of seedEvents) {
    // Check existence by slug-equivalent (generated from title)
    const slug = generateSlug(evt.title);
    const existing = await Event.findOne({ slug }).select("_id").lean();

    if (existing) {
      skipped += 1;
      continue;
    }

    const created = await Event.create(evt);
    ids.push(created._id.toString());
    inserted += 1;
  }

  return {
    inserted,
    skipped,
    total: inserted + skipped,
    ids,
  };
}

// Local util mirrors slug generation in model to check duplicates pre-insert
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
