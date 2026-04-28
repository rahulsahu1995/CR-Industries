import { useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import { useLocation } from "wouter";
import { MapPin, Calendar, Users, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";

const HERO_IMG =
  "https://images.unsplash.com/photo-1632383380175-812d44ec112b?fm=jpg&q=80&w=2400&auto=format&fit=crop";

interface Event {
  id: string;
  status: "upcoming" | "past";
  date: string;
  monthYear: string;
  name: string;
  city: string;
  country: string;
  description: string;
  attendees?: string;
  image: string;
}

const EVENTS: Event[] = [
  {
    id: "e1",
    status: "upcoming",
    date: "12-15 Jun",
    monthYear: "June 2026",
    name: "AdhesiveTech Asia 2026",
    city: "Singapore",
    country: "Singapore",
    description:
      "Showcasing our new Gum Hydra-X underwater adhesive line at booth A-204. Live demos every hour.",
    attendees: "8,000+ visitors",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "e2",
    status: "upcoming",
    date: "22-24 May",
    monthYear: "May 2026",
    name: "Industrial Sealants Expo",
    city: "Mumbai",
    country: "India",
    description:
      "Two-day technical conference featuring our chief chemist on the panel for next-gen elastomer chemistry.",
    attendees: "5,000+ visitors",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "e3",
    status: "past",
    date: "08-10 Mar",
    monthYear: "March 2026",
    name: "Coatings World Congress",
    city: "Frankfurt",
    country: "Germany",
    description:
      "Unveiled our marine-grade Protective Coating series. Won the 'Innovation in Sustainability' award.",
    attendees: "12,000+ visitors",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "e4",
    status: "past",
    date: "15-17 Jan",
    monthYear: "January 2026",
    name: "Automation & Manufacturing Summit",
    city: "Dubai",
    country: "UAE",
    description:
      "Live robotic-coating demo drew over 3,000 attendees to our booth. Signed 14 enterprise pilots.",
    attendees: "9,500+ visitors",
    image:
      "https://images.unsplash.com/photo-1647427060118-4911c9821b82?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "e5",
    status: "past",
    date: "09-11 Nov",
    monthYear: "November 2025",
    name: "Bonded! North America",
    city: "Chicago, IL",
    country: "USA",
    description:
      "First North-American showcase. Demonstrated specialty compound performance under -40°C cryogenic conditions.",
    attendees: "6,200+ visitors",
    image:
      "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "e6",
    status: "past",
    date: "04-07 Sep",
    monthYear: "September 2025",
    name: "Foam & Insulation World",
    city: "Tokyo",
    country: "Japan",
    description:
      "Premiered our closed-cell foam line for high-rise insulation. Featured keynote from Eng. Krishnan.",
    attendees: "7,800+ visitors",
    image:
      "https://images.unsplash.com/photo-1610891015188-5369212db097?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
];

export default function EventsPage() {
  const [, navigate] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const goContact = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative bg-background overflow-hidden">
        <PageHero
          imageUrl={HERO_IMG}
          eyebrow="C R Industries on the Move"
          title={
            <>
              Where Innovation Meets{" "}
              <span className="bg-gradient-to-r from-[#48CAE4] to-[#90E0EF] bg-clip-text text-transparent">
                Industry.
              </span>
            </>
          }
          subtitle={
            <>
              From Singapore to Frankfurt, follow C R Industries across the
              world's leading trade shows, expos, and technical conferences.
            </>
          }
          pills={["18 Countries", "30+ Events / Year", "Live Demos"]}
        />

        {/* Timeline */}
        <section
          aria-labelledby="events-timeline-title"
          className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <span className="text-primary text-xs font-bold tracking-[0.35em] uppercase">
                Event Timeline
              </span>
              <h2
                id="events-timeline-title"
                className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-foreground"
              >
                Past, present &{" "}
                <span className="brand-gradient-text">upcoming</span>.
              </h2>
            </motion.div>

            <div className="relative">
              {/* Center vertical line */}
              <div
                aria-hidden
                className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent lg:-translate-x-1/2"
              />

              <div className="space-y-12 lg:space-y-16">
                {EVENTS.map((ev, i) => {
                  const left = i % 2 === 0;
                  return (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.75,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative pl-12 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center"
                    >
                      {/* Node */}
                      <div
                        aria-hidden
                        className="absolute left-4 lg:left-1/2 top-3 w-3 h-3 rounded-full bg-primary ring-4 ring-background -translate-x-1/2 z-10"
                      />
                      {/* Pulsing ring on upcoming */}
                      {ev.status === "upcoming" && (
                        <span
                          aria-hidden
                          className="absolute left-4 lg:left-1/2 top-3 w-3 h-3 rounded-full bg-primary/40 -translate-x-1/2 animate-ping"
                        />
                      )}

                      {/* Card */}
                      <motion.article
                        whileHover={{ y: -6 }}
                        className={`group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-400 ${
                          left ? "lg:col-start-1" : "lg:col-start-2"
                        }`}
                      >
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <motion.img
                            src={ev.image}
                            alt={ev.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.07 }}
                            transition={{ duration: 0.7 }}
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-t from-[#03045E]/70 via-transparent to-transparent"
                          />
                          <span
                            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase backdrop-blur ${
                              ev.status === "upcoming"
                                ? "bg-[#48CAE4] text-[#03045E]"
                                : "bg-white/95 text-primary"
                            }`}
                          >
                            {ev.status === "upcoming" ? "Upcoming" : "Past"}
                          </span>
                          <div className="absolute bottom-4 left-4 text-white">
                            <div className="text-[10px] font-bold tracking-widest uppercase opacity-80">
                              {ev.monthYear}
                            </div>
                            <div className="text-2xl font-black leading-none">
                              {ev.date}
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-foreground text-xl font-black leading-tight mb-2 group-hover:text-primary transition-colors">
                            {ev.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground text-xs font-semibold mb-3">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-primary" />
                              {ev.city}, {ev.country}
                            </span>
                            {ev.attendees && (
                              <span className="inline-flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-primary" />
                                {ev.attendees}
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {ev.description}
                          </p>
                          <span className="inline-flex items-center gap-1 text-primary text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                            {ev.status === "upcoming"
                              ? "Visit our booth"
                              : "Read recap"}
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </motion.article>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CTA strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="mt-16 p-7 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#03045E] flex items-center justify-center text-white">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-black">
                    Want to meet us at the next show?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Book a 1:1 slot with our application engineers.
                  </p>
                </div>
              </div>
              <button
                onClick={goContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-black text-sm hover:bg-[#03045E] transition-colors"
              >
                Schedule a Meeting
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
