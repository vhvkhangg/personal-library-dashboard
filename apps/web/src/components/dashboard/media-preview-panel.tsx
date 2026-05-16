"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Expand, ImageIcon, Music2, Pause, Play, UserRound, Volume2, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectMenu } from "@/components/ui/select-menu";
import { cn } from "@/lib/utils";

type MediaPreviewVariant = "image" | "picture" | "illustration" | "video" | "music" | "movie" | "album" | "account";

type MediaPreviewPanelProps = {
  variant: MediaPreviewVariant;
};

const copy = {
  image: { title: "Image viewer preview", description: "Sample image inspection area inside the Image module.", current: "Library Cover Mockup", metaA: ["Set progress", "24 / 48"], metaB: ["Resolution", "2400 × 1600"], extra: ["Zoom", "100%"] },
  picture: { title: "Picture viewer preview", description: "Sample picture browsing area inside the Picture module.", current: "Kyoto Street Set", metaA: ["Set progress", "18 / 42"], metaB: ["Resolution", "3024 × 4032"], extra: ["Zoom", "100%"] },
  illustration: { title: "Illustration viewer preview", description: "Sample illustration browsing area inside the Illustration module.", current: "Astra Portrait", metaA: ["Set progress", "7 / 16"], metaB: ["Canvas", "4K"], extra: ["Zoom", "100%"] },
  album: { title: "Album viewer preview", description: "Mixed album viewer for image, picture, and illustration items.", current: "Kyoto Street Album", metaA: ["Album progress", "18 / 42"], metaB: ["Contents", "Images · Pictures · Illustrations"], extra: ["Zoom", "100%"] },
  account: { title: "Account viewer preview", description: "Profile viewer for followed social accounts and creators.", current: "Creator Account", metaA: ["Platform", "YouTube"], metaB: ["Followers note", "Tracked manually"], extra: ["Status", "Following"] },
  video: { title: "Video player preview", description: "Sample video playback area inside the Video module.", current: "Travel Clip 01", metaA: ["Progress", "42%"], metaB: ["Quality", "1080p"], extra: ["Speed", "1×"] },
  music: { title: "Music player preview", description: "Sample music playback area inside the Music module.", current: "Aether Bloom", metaA: ["Progress", "02:14 / 04:02"], metaB: ["Artist", "Aurora Lane"], extra: ["Speed", "1×"] },
  movie: { title: "Watch preview", description: "Sample watch preview area for movies and series.", current: "Dune", metaA: ["Progress", "42%"], metaB: ["Quality", "1080p"], extra: ["Speed", "1×"] },
} satisfies Record<MediaPreviewVariant, { title: string; description: string; current: string; metaA: [string, string]; metaB: [string, string]; extra: [string, string] }>;

const speedOptions = ["0.25x", "0.5x", "1x", "1.25x", "1.5x", "2x", "3x"].map((value) => ({ value, label: value.replace("x", "×") }));
const zoomOptions = ["50%", "75%", "100%", "125%", "150%", "200%"].map((value) => ({ value, label: value }));

function isStillImage(variant: MediaPreviewVariant) {
  return variant === "image" || variant === "picture" || variant === "illustration" || variant === "album";
}

function ViewerHero({ variant, isPlaying, onTogglePlaying }: { variant: MediaPreviewVariant; isPlaying: boolean; onTogglePlaying: () => void }) {
  const still = isStillImage(variant);
  const audio = variant === "music";
  const account = variant === "account";

  return (
    <div className={cn("group relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-8", audio && "min-h-[420px]") }>
      {account ? (
        <div className="text-center">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-[2rem] bg-[image:var(--accent-active)] text-white shadow-lg shadow-indigo-950/30">
            <UserRound className="h-16 w-16" />
          </div>
          <h3 className="mt-6 text-3xl font-semibold">Creator Account</h3>
          <p className="mt-2 text-base text-white/70">Social profile viewer · UI preview</p>
        </div>
      ) : audio ? (
        <div className="text-center">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-[2rem] bg-[image:var(--accent-active)] text-white shadow-lg shadow-indigo-950/30"><Music2 className="h-14 w-14" /></div>
          <h3 className="mt-6 text-3xl font-semibold">Now Playing</h3>
          <p className="mt-2 text-base text-white/70">Sample Artist · Music module preview</p>
        </div>
      ) : still ? <ImageIcon className="h-28 w-28 text-white/80" /> : <Play className="h-28 w-28 text-white/80" />}

      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 opacity-0 transition group-hover:opacity-100"><button className="pointer-events-auto rounded-full border border-white/20 bg-black/35 p-3 text-white backdrop-blur"><ChevronLeft className="h-5 w-5" /></button></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 opacity-0 transition group-hover:opacity-100"><button className="pointer-events-auto rounded-full border border-white/20 bg-black/35 p-3 text-white backdrop-blur"><ChevronRight className="h-5 w-5" /></button></div>
      {!still && !account ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <button type="button" className="pointer-events-auto rounded-full border border-white/20 bg-black/35 p-4 text-white backdrop-blur" onClick={onTogglePlaying}>{isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</button>
        </div>
      ) : null}
    </div>
  );
}

function DetailGrid({ variant, speed, zoom }: { variant: MediaPreviewVariant; speed: string; zoom: string }) {
  const meta = copy[variant];
  const details = [
    ["Current item", meta.current],
    meta.metaA,
    meta.metaB,
    [meta.extra[0], meta.extra[0] === "Speed" ? speed.replace("x", "×") : meta.extra[0] === "Zoom" ? zoom : meta.extra[1]],
  ];

  return (
    <section className="border-t border-[var(--border)] p-5">
      <h3 className="text-lg font-semibold">Item details</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {details.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
            <p className="text-sm text-[var(--muted)]">{label}</p>
            <p className="mt-2 text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FullViewModal({ open, onClose, variant, title }: { open: boolean; onClose: () => void; variant: MediaPreviewVariant; title: string }) {
  const [speed, setSpeed] = React.useState("1x");
  const [zoom, setZoom] = React.useState("100%");
  const [isPlaying, setIsPlaying] = React.useState(false);
  if (!open) return null;

  const still = isStillImage(variant);
  const account = variant === "account";

  return (
    <div className="fixed inset-0 z-[240] flex h-screen w-screen items-center justify-center overflow-hidden bg-slate-950/85 p-4 backdrop-blur-md" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <button className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <div className="modal-scroll max-h-[calc(92vh-73px)] overflow-y-auto">
          <div className="overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">
            <ViewerHero variant={variant} isPlaying={isPlaying} onTogglePlaying={() => setIsPlaying((current) => !current)} />
            <div className="flex flex-wrap items-center gap-3 px-4 py-4">
              {still ? <div className="w-32"><SelectMenu value={zoom} onChange={setZoom} options={zoomOptions} panelClassName="bottom-[calc(100%+8px)] top-auto" /></div> : account ? null : <><Button size="icon" variant="outline" onClick={() => setIsPlaying((current) => !current)}>{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button><Button size="icon" variant="outline"><Zap className="h-4 w-4" /></Button><div className="w-28"><SelectMenu value={speed} onChange={setSpeed} options={speedOptions} panelClassName="bottom-[calc(100%+8px)] top-auto" /></div></>}
              {!account ? <><div className="h-2 min-w-[220px] flex-1 rounded-full bg-[var(--surface-muted)]"><div className="h-2 w-2/5 rounded-full bg-[image:var(--accent-active)]" /></div>{!still ? <Volume2 className="h-4 w-4 text-[var(--muted)]" /> : null}<span className="text-sm text-[var(--muted)]">{variant === "music" ? "02:14 / 04:02" : still ? "12 / 24" : "00:42 / 02:15:00"}</span></> : null}
            </div>
          </div>
          <DetailGrid variant={variant} speed={speed} zoom={zoom} />
        </div>
      </div>
    </div>
  );
}

export function MediaPreviewPanel({ variant }: MediaPreviewPanelProps) {
  const [fullViewOpen, setFullViewOpen] = React.useState(false);
  const [speed, setSpeed] = React.useState("1x");
  const [zoom, setZoom] = React.useState("100%");
  const [isPlaying, setIsPlaying] = React.useState(false);
  const meta = copy[variant];
  const still = isStillImage(variant);
  const account = variant === "account";

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border)] p-5">
          <div><h2 className="text-lg font-semibold">{meta.title}</h2><p className="mt-1 text-sm text-[var(--muted)]">{meta.description}</p></div>
          <Button variant="outline" size="sm" onClick={() => setFullViewOpen(true)}><Expand className="h-4 w-4" />Open full view</Button>
        </div>
        <div className="overflow-hidden bg-[var(--surface)]">
          <ViewerHero variant={variant} isPlaying={isPlaying} onTogglePlaying={() => setIsPlaying((current) => !current)} />
          <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] px-4 py-4">
            {still ? <div className="w-32"><SelectMenu value={zoom} onChange={setZoom} options={zoomOptions} panelClassName="bottom-[calc(100%+8px)] top-auto" /></div> : account ? null : <><Button size="icon" variant="outline" onClick={() => setIsPlaying((current) => !current)}>{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button><div className="w-28"><SelectMenu value={speed} onChange={setSpeed} options={speedOptions} panelClassName="bottom-[calc(100%+8px)] top-auto" /></div></>}
            {!account ? <><div className="h-2 min-w-[220px] flex-1 rounded-full bg-[var(--surface-muted)]"><div className="h-2 w-2/5 rounded-full bg-[image:var(--accent-active)]" /></div>{!still ? <Volume2 className="h-4 w-4 text-[var(--muted)]" /> : null}<span className="text-sm text-[var(--muted)]">{variant === "music" ? "02:14 / 04:02" : still ? (variant === "illustration" ? "7 / 16" : variant === "picture" ? "18 / 42" : variant === "album" ? "18 / 42" : "24 / 48") : "00:42 / 02:15:00"}</span></> : null}
          </div>
        </div>
        <DetailGrid variant={variant} speed={speed} zoom={zoom} />
      </section>
      <FullViewModal open={fullViewOpen} onClose={() => setFullViewOpen(false)} variant={variant} title={meta.current} />
    </>
  );
}
