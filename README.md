# Dev Event 🎯

A modern event management platform built with Next.js 16, TypeScript, and MongoDB. Discover, browse, and book developer conferences, hackathons, and tech meetups all in one place.

## ✨ Features

- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🔍 **Event Discovery** - Browse featured developer events with detailed information
- 📝 **Event Management** - Full CRUD operations for event creation and management
- 🎫 **Event Booking** - Register for events with email notifications
- 🏷️ **Smart Recommendations** - Find similar events based on tags
- 📊 **Database Seeding** - Pre-populated with real developer events
- 🔒 **Type-Safe** - Built with TypeScript for enhanced code quality
- ⚡ **Performance** - Server-side rendering with caching for optimal speed
- 🌐 **API Routes** - RESTful API endpoints for event and booking management

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Image Management**: [Cloudinary](https://cloudinary.com/)
- **Analytics**: [PostHog](https://posthog.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📁 Project Structure

```
dev-event/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   │   ├── events/           # Event CRUD endpoints
│   │   │   ├── [slug]/       # Single event by slug
│   │   │   └── route.ts      # List/create events
│   │   └── seed/             # Database seeding endpoint
│   ├── events/[slug]/        # Event detail pages
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── BookEvent.tsx         # Event booking form
│   ├── EventCard.tsx         # Event card display
│   ├── ExploreBtn.tsx        # Explore button
│   ├── LightRays.tsx         # Visual effects
│   └── Navbar.tsx            # Navigation bar
├── database/                 # Database models & utilities
│   ├── event.model.ts        # Event schema
│   ├── booking.model.ts      # Booking schema
│   ├── seed.ts               # Seed data & function
│   └── index.ts              # Model exports
├── lib/                      # Utility functions
│   ├── actions/              # Server actions
│   │   └── event.actions.ts  # Event-related actions
│   ├── constants.ts          # Static event data
│   ├── mongodb.ts            # MongoDB connection
│   └── utils.ts              # Utility helpers
└── public/                   # Static assets
    ├── icons/                # Icon assets
    └── images/               # Image assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- MongoDB database (local or cloud)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/janitheranga/dev-event.git
   cd dev-event
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/dev-event
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dev-event

   # Base URL (for production)
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # PostHog (optional, for analytics)
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

4. **Seed the database**

   Start the dev server and hit the seed endpoint:

   ```bash
   pnpm dev

   # In another terminal:
   curl http://localhost:3000/api/seed
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

### Events

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| `GET`  | `/api/events`        | Fetch all events   |
| `POST` | `/api/events`        | Create a new event |
| `GET`  | `/api/events/[slug]` | Get event by slug  |

### Seed

| Method | Endpoint    | Description                      |
| ------ | ----------- | -------------------------------- |
| `GET`  | `/api/seed` | Seed database with sample events |

### API Response Format

**Success Response:**

```json
{
  "success": true,
  "message": "Events fetched successfully",
  "events": [...]
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error description"
}
```

## 🗄️ Database Models

### Event Model

```typescript
{
  title: string;
  slug: string;              // Auto-generated from title
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;              // ISO format (YYYY-MM-DD)
  time: string;              // 24-hour format (HH:MM)
  mode: "online" | "offline" | "hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Booking Model

```typescript
{
  eventId: ObjectId; // Reference to Event
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🧪 Development Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## 🔧 Key Features Implementation

### Connection Caching

MongoDB connections are cached to prevent multiple connections in serverless environments:

```typescript
// lib/mongodb.ts
let cached: MongooseConnection = global.mongooseCache || {
  conn: null,
  promise: null,
};
```

### Slug Generation

Event slugs are auto-generated from titles using a pre-save hook:

```typescript
// database/event.model.ts
EventSchema.pre("save", function () {
  if (this.isModified("title") || this.isNew) {
    this.slug = generateSlug(this.title);
  }
});
```

### Smart Caching

Pages use Next.js caching for optimal performance:

```typescript
"use cache";
cacheLife("hours"); // Cache for 1 hour
```

### Error Handling

Robust error handling with proper HTTP status codes:

```typescript
if (!res.ok) {
  if (res.status === 404) {
    return notFound();
  }
  throw new Error(`Failed to fetch: ${res.status}`);
}
```

## 🌐 Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:

- `MONGODB_URI`
- `NEXT_PUBLIC_BASE_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Janith Eranga**

- GitHub: [@janitheranga](https://github.com/janitheranga)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database
- Cloudinary for image management
- All contributors and supporters

---

Made with ❤️ by Janith Eranga
