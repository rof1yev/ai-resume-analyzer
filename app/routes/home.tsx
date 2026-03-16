import { useNavigate } from "react-router";
import type { Route } from "./+types/home";
import Navbar from "~/components/navbar";
import ResumeCard from "~/components/resume-card";
import { resumes } from "~/constants";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, puterReady } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!puterReady) return;
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated, puterReady]);

  console.log("auth.user", auth);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-12">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume: Resume) => (
              <ResumeCard key={resume.id} {...resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
