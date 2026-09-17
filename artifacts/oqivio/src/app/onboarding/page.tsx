"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { MapPin, BookOpen, Bell, ChevronRight, ChevronLeft } from "lucide-react";

const slides = [
  {
    title: "Welcome to OQIVIO",
    subtitle: "Your campus, simplified.",
    description:
      "Everything you need for university life — navigation, food, water, academics and announcements — in one place.",
    icon: "🦁",
  },
  {
    title: "Find your way",
    subtitle: "Navigate campus with ease",
    description:
      "Locate lecture theatres, hostels, faculties, food spots, water points and other important places.",
    icon: <MapPin size={48} className="text-electric-500" />,
  },
  {
    title: "Stay organized",
    subtitle: "Academics made simple",
    description:
      "Manage your timetable, assignments, exams and courses without juggling multiple apps.",
    icon: <BookOpen size={48} className="text-emerald-500" />,
  },
  {
    title: "Stay connected",
    subtitle: "Never miss what matters",
    description:
      "Get useful campus announcements, events and opportunities from your faculty and student groups.",
    icon: <Bell size={48} className="text-amber-500" />,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const setProfile = useUserStore((s) => s.setProfile);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("Medical Sciences");
  const [department, setDepartment] = useState("Medicine and Surgery");
  const [level, setLevel] = useState("200");

  const isLastSlide = step === slides.length - 1;
  const isProfileStep = step === slides.length;

  const finish = () => {
    setProfile({
      name: name || "Student",
      email: "",
      university: "University of Nigeria, Nsukka",
      faculty,
      department,
      level,
      onboardingComplete: true,
    });
    router.replace("/");
  };

  if (isProfileStep) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-white px-6 py-10">
        <h1 className="text-2xl font-bold text-navy-900">Almost there</h1>
        <p className="mt-1 text-slate-500">
          Tell us a bit about yourself so we can personalize OQIVIO.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-800">
              Your name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Timothy Okeke"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-electric-400 focus:ring-2 focus:ring-electric-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-800">
              University
            </label>
            <input
              value="University of Nigeria, Nsukka"
              disabled
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-800">
              Faculty
            </label>
            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-electric-400"
            >
              <option>Medical Sciences</option>
              <option>Arts</option>
              <option>Biological Sciences</option>
              <option>Engineering</option>
              <option>Education</option>
              <option>Physical Sciences</option>
              <option>Social Sciences</option>
              <option>Pharmaceutical Sciences</option>
              <option>Agriculture</option>
              <option>Veterinary Medicine</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-800">
              Department
            </label>
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-electric-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-800">
              Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-electric-400"
            >
              <option>100</option>
              <option>200</option>
              <option>300</option>
              <option>400</option>
              <option>500</option>
              <option>600</option>
            </select>
          </div>
        </div>

        <button
          onClick={finish}
          className="mt-10 w-full rounded-2xl bg-electric-600 py-4 text-center font-semibold text-white shadow-lg shadow-electric-200 transition active:scale-[0.98]"
        >
          Get Started
        </button>
      </div>
    );
  }

  const slide = slides[step];

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-white">
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-50 text-5xl">
          {typeof slide.icon === "string" ? slide.icon : slide.icon}
        </div>
        <h1 className="text-2xl font-bold text-navy-900">{slide.title}</h1>
        <p className="mt-2 text-lg font-medium text-electric-600">
          {slide.subtitle}
        </p>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
          {slide.description}
        </p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-4">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === step ? "w-6 bg-electric-600" : "w-2 bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-6 pb-10">
        {step > 0 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium text-slate-500"
          >
            <ChevronLeft size={18} /> Back
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={() =>
            isLastSlide ? setStep(slides.length) : setStep((s) => s + 1)
          }
          className="flex items-center gap-1 rounded-2xl bg-electric-600 px-6 py-3 text-sm font-semibold text-white shadow-md"
        >
          {isLastSlide ? "Continue" : "Next"} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
