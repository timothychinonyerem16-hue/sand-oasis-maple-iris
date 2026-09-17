import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, BookOpen, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { OqivioMark } from "@/components/logo";
import { useUserStore } from "@/store/user-store";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const slides: { title: string; subtitle: string; body: string; icon: ReactNode }[] = [
  {
    title: "Welcome to OQIVIO",
    subtitle: "Your campus, simplified.",
    body: "Navigation, food, water, academics and announcements — in one place.",
    icon: <OqivioMark className="size-14 text-accent" />,
  },
  {
    title: "Find your way",
    subtitle: "Navigate campus with ease",
    body: "Locate lecture theatres, hostels, faculties, food spots and water points.",
    icon: <MapPin className="size-12 text-accent" />,
  },
  {
    title: "Stay organized",
    subtitle: "Academics made simple",
    body: "Manage your timetable, assignments and courses without juggling apps.",
    icon: <BookOpen className="size-12 text-ok" />,
  },
  {
    title: "Stay connected",
    subtitle: "Never miss what matters",
    body: "Get campus announcements, events and opportunities from your faculty.",
    icon: <Bell className="size-12 text-warn" />,
  },
];

function Onboarding() {
  const navigate = useNavigate();
  const setProfile = useUserStore((s) => s.setProfile);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("Medical Sciences");
  const [department, setDepartment] = useState("Medicine and Surgery");
  const [level, setLevel] = useState("200");

  const isProfile = step === slides.length;

  const finish = () => {
    setProfile({
      name: name.trim() || "Student",
      university: "University of Nigeria, Nsukka",
      faculty,
      department,
      level,
      onboardingComplete: true,
    });
    void navigate({ to: "/" });
  };

  if (isProfile) {
    return (
      <div className="mx-auto flex min-h-svh max-w-lg flex-col bg-bg px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">Almost there</h1>
        <p className="mt-1 text-sm text-muted">
          A few details so OQIVIO can personalize campus life for you.
        </p>
        <div className="mt-8 space-y-4">
          <Field label="Your name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Timothy Okeke"
              className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 text-sm outline-none focus:border-accent"
            />
          </Field>
          <Field label="University">
            <input
              value="University of Nigeria, Nsukka"
              disabled
              className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-bg px-3 text-sm text-muted"
            />
          </Field>
          <Field label="Faculty">
            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 text-sm outline-none focus:border-accent"
            >
              {[
                "Medical Sciences",
                "Arts",
                "Biological Sciences",
                "Engineering",
                "Education",
                "Physical Sciences",
                "Social Sciences",
                "Pharmaceutical Sciences",
                "Agriculture",
                "Veterinary Medicine",
              ].map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </Field>
          <Field label="Department">
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 text-sm outline-none focus:border-accent"
            />
          </Field>
          <Field label="Level">
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 text-sm outline-none focus:border-accent"
            >
              {["100", "200", "300", "400", "500", "600"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </Field>
        </div>
        <Button className="mt-10 w-full" size="lg" onClick={finish}>
          Get started
        </Button>
      </div>
    );
  }

  const slide = slides[step];
  return (
    <div className="mx-auto flex min-h-svh max-w-lg flex-col bg-bg">
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-8 flex size-24 items-center justify-center rounded-[var(--radius-xl)] bg-surface shadow-card">
          {slide.icon}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{slide.title}</h1>
        <p className="mt-2 text-base font-medium text-accent">{slide.subtitle}</p>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{slide.body}</p>
      </div>
      <div className="flex justify-center gap-2 pb-4">
        {slides.map((_, i) => (
          <div
            key={i}
            className={i === step ? "h-2 w-6 rounded-full bg-accent" : "size-2 rounded-full bg-border"}
          />
        ))}
      </div>
      <div className="flex items-center justify-between px-6 pb-10">
        {step > 0 ? (
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
            <ChevronLeft size={16} /> Back
          </Button>
        ) : (
          <span />
        )}
        <Button onClick={() => setStep((s) => s + 1)}>
          {step === slides.length - 1 ? "Continue" : "Next"}
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
