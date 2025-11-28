export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Summit 2025",
    image: "/images/event1.png",
    slug: "react-summit-2025",
    location: "Amsterdam, Netherlands",
    date: "June 13-17, 2025",
    time: "9:00 AM - 6:00 PM CEST",
  },
  {
    title: "AI DevWorld 2025",
    image: "/images/event2.png",
    slug: "ai-devworld-2025",
    location: "San Francisco, CA",
    date: "July 22-24, 2025",
    time: "10:00 AM - 5:00 PM PST",
  },
  {
    title: "HackTheNorth",
    image: "/images/event3.png",
    slug: "hack-the-north-2025",
    location: "Waterloo, ON, Canada",
    date: "September 12-14, 2025",
    time: "48-hour Hackathon",
  },
  {
    title: "Web3 Summit",
    image: "/images/event4.png",
    slug: "web3-summit-2025",
    location: "Berlin, Germany",
    date: "August 18-20, 2025",
    time: "9:00 AM - 7:00 PM CEST",
  },
  {
    title: "DevOps Days",
    image: "/images/event5.png",
    slug: "devops-days-2025",
    location: "Austin, TX",
    date: "October 5-7, 2025",
    time: "8:30 AM - 6:00 PM CST",
  },
  {
    title: "Mobile Dev Meetup",
    image: "/images/event6.png",
    slug: "mobile-dev-meetup-dec",
    location: "Seattle, WA",
    date: "December 10, 2025",
    time: "6:00 PM - 9:00 PM PST",
  },
  {
    title: "Cloud Native Con",
    image: "/images/event-full.png",
    slug: "cloud-native-con-2025",
    location: "Chicago, IL",
    date: "November 3-6, 2025",
    time: "9:00 AM - 5:00 PM CST",
  }
];
