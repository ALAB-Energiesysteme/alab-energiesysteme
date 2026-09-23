"use client";
import { ArrowUpRight } from "lucide-react";
import s from "./landing.module.css";

export default function LandingProjectChoice({ choice, label }: { choice: string; label: string }) {
  return <a href="#anfrage" className={s.textLink} data-lp-cta="project-choice" onClick={() => window.dispatchEvent(new CustomEvent("alab-project-choice", { detail: choice }))}>{label}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}
