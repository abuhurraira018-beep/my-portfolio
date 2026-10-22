export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "test-001",
    name: "Marcus Vance",
    role: "Operations Director",
    company: "Vanguard Design Studio (Demo Client)",
    content: "Nexora provided our entire design firm with ergonomic workstations and high-fidelity displays. The ordering process was seamless, and the hardware quality noticeably elevated team productivity.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    id: "test-002",
    name: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "Acuity Logistics (Demo Client)",
    content: "Deploying enterprise accessories across three regional offices was a breeze with Nexora's commercial support team. Transparent pricing, reliable delivery timelines, and genuine premium craftsmanship.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
  {
    id: "test-003",
    name: "Julian Thorne",
    role: "Principal Architect",
    company: "Thorne & Associates (Demo Client)",
    content: "The aesthetic consistency and tactile excellence of Nexora's workspace gear perfectly matches the standard we hold for our architectural studio. A truly dependable business commerce partner.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
];
