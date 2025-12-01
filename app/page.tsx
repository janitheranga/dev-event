import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  "use cache";
  cacheLife("hours"); // Cache this page for 1 hour

  // Use relative path as fallback if BASE_URL is not defined
  const apiUrl = BASE_URL ? `${BASE_URL}/api/events` : "/api/events";

  const response = await fetch(apiUrl);

  let events: IEvent[] = [];

  // Handle non-OK responses gracefully
  if (!response.ok) {
    console.error(
      `Failed to fetch events: ${response.status} ${response.statusText}`
    );
    // Return empty events array on error
  } else {
    const data = (await response.json()) as {
      message: string;
      events: IEvent[];
    };
    events = data.events || [];
  }

  return (
    <section>
      <h1 className="text-center">
        The hub for every dev <br /> Event you can't miss
      </h1>
      <p className="text-center mt-5">
        Hackthoons, conferences, and meetups, All in one place.
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured events</h3>
        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event._id.toString()} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
