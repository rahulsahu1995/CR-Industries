import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, MapPin, Phone, Mail } from "lucide-react";

/* Limits mirror the server-side zod schema so the form never lets
   through values that the API will reject with a 400. */
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(120, "Name is too long"),
  email: z.string().email("Please enter a valid email").max(254, "Email is too long"),
  phone: z.string().max(40, "Phone number is too long").optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long (max 5000 characters)"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to send message");
      }
      setSubmitted(true);
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">Contact Us</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
            Ready to find the right sealing solution? Our team is here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                icon: MapPin,
                label: "Address",
                lines: ["102, Badi Bhamori, Indore,", "Madhya Pradesh, India"],
                href: "https://maps.google.com/?q=102+Badi+Bhamori+Indore+Madhya+Pradesh",
                external: true,
              },
              {
                icon: Phone,
                label: "Phone",
                lines: [
                  { text: "+91 95222 22196", href: "tel:+919522222196" },
                  { text: "+91 91652 12323", href: "tel:+919165212323" },
                ],
              },
              {
                icon: Mail,
                label: "Email",
                lines: [
                  { text: "crindustries21@gmail.com", href: "mailto:crindustries21@gmail.com" },
                ],
              },
            ].map(({ icon: Icon, label, lines, href, external }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl brand-gradient flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                    {label}
                  </p>
                  <div className="text-foreground text-sm font-medium space-y-0.5">
                    {href ? (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="hover:text-primary transition-colors break-words"
                      >
                        {(lines as string[]).map((line, i) => (
                          <span key={i} className="block">{line}</span>
                        ))}
                      </a>
                    ) : (
                      (lines as { text: string; href: string }[]).map((l, i) => (
                        <a
                          key={i}
                          href={l.href}
                          className="block hover:text-primary transition-colors break-all"
                        >
                          {l.text}
                        </a>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 p-5 bg-card border border-border rounded-2xl">
              <h4 className="font-bold text-foreground mb-2">Business Hours</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span className="text-foreground font-medium">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-foreground font-medium">9:00 AM – 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-red-500 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-card border border-border rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-card border border-border rounded-2xl p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name")}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("subject")}
                      placeholder="Product Inquiry"
                      className="w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about your requirement..."
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 brand-gradient text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-60 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
