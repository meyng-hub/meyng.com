import { Languages, Leaf, BookOpen, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const productKeys = [
  "sangoai",
  "obetrack",
  "endara",
  "connectz",
] as const;

export type ProductKey = (typeof productKeys)[number];

export interface ProductMeta {
  icon: LucideIcon;
  name: string;
  url: string | null;
  demo: string;
  statusKey: string;
}

export const productMeta: ProductMeta[] = [
  {
    icon: Languages,
    name: "SangoAI",
    url: "https://sangoai.sbs",
    demo: "translation",
    statusKey: "live",
  },
  {
    icon: Leaf,
    name: "Ob\u00EAtrack",
    url: null,
    demo: "phone",
    statusKey: "inDevelopment",
  },
  {
    icon: BookOpen,
    name: "eNdara",
    url: "https://e-ndara.org",
    demo: "sms",
    statusKey: "live",
  },
  {
    icon: Users,
    name: "ConnectZ",
    url: null,
    demo: "dashboard",
    statusKey: "inResearch",
  },
];

export const statusColorMap: Record<string, string> = {
  live: "bg-green-500/20 text-green-400 border-green-500/30",
  inDevelopment:
    "bg-meyng-purple/20 text-meyng-purple border-meyng-purple/30",
  comingSoon: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  inResearch: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};
