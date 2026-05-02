"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Expand, ImageIcon, Music2, Pause, Play, Volume2, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectMenu } from "@/components/ui/select-menu";
import { cn } from "@/lib/utils";

type MediaPreviewPanelProps = {
  variant: "image" | "picture" | "illustration" | "video" | "music" | "movie" | "album";
};

const copy = {
  image: { title: "Image viewer preview", description: "Sample image inspection area inside the Image module.", current: "Library Cover Mockup", metaA: ["Set progress", "24 / 48"], metaB: ["Resolution", "2400 × 1600"], extra: ["Zoom", "100%"] },
  picture: { title: "Picture viewer preview", description: "Sample picture browsing area inside the Picture module.", current: "Kyoto Street Set", metaA: ["Set progress", "18 / 42"], metaB: ["Resolution", "3024 × 4032"], extra: ["Zoom", "100%"] },
  illustration: { title: "Illustration viewer preview", description: "Sample illustration browsing area inside the Illustration module.", current: "Astra Portrait", metaA: ["Set progress", "7 / 16"], metaB: ["Canvas", "4K"], extra: ["Zoom", "100%"] },
  album: { title: "Album viewer preview", description: "Sample mixed album viewer for image, picture, and illustration items.", current: "Kyoto Street Album", metaA: ["Album progress", "18 / 42"], metaB: ["Contents", "Images · Pictures · Illustrations"], extra: ["Zoom", "100%"] },
  video: { title: "Video player preview", description: "Sample video playback area inside the Video module.", current: "Travel Clip 01", metaA: ["Progress", "42%"], metaB: ["Quality", "1080p"], extra: ["Speed", "1×"] },
  music: { title: "Music player preview", description: "Sample music playback area inside the Music module.", current: "Aether Bloom", metaA: ["Progress", "02:14 / 04:02"], metaB: ["Artist", "Aurora Lane"], extra: ["Speed", "1×"] },
  movie: { title: "Watch preview", description: "Sample watch preview area for movies and series.", current: "Dune", metaA: ["Progress", "42%"], metaB: ["Quality", "1080p"], extra: ["Speed", "1×"] },
} satisfies Record<MediaPreviewPanelProps["variant"], { title: string; description: string; current: string; metaA: [string, string]; metaB: [string, string]; extra: [string, string] }>;

const speedOptions = ["0.25x", "0.5x", "1x", "1.25x", "1.5x", "2x", "3x"].map((value) => ({ value, label: value.replace("x", "×") }));
const zoomOptions = ["50%", "75%", "100%", "125%", "150%", "200%"].map((value) => ({ value, label: value }));

function FullViewModal({ open, onClose, variant, title }: { open: boolean; onClose: () => void; variant: MediaPreviewPanelProps["variant"]; title: string }) {
  const [speed, setSpeed] = React.useState("1x");
  const [zoom, setZoom] = React.useState("100%");
  const [isPlaying, setIsPlaying] = React.useState(false);

  if (!open) return null;
  const stillImage = variant === "image" || variant === "picture" || variant === "illustration" || variant === "album";
  const audio = variant === "music";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-6xl rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <div><p className="text-sm text-[var(--muted)]">Open full view</p><h3 className="mt-1 text-2xl font-semibold">{title}</h3></div>
          <button className="focus-ring rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]" onClick={onClose}><X className="h-5 w-5" /></button>
        </div>

        <div className="grid gap-5 p-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="relative flex min-h-[520px] items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-8">
              {audio ? (
                <div className="text-center"><div className="mx-auto flex h-36 w-36 items-center justify-center rounded-[2rem] bg-[image:var(--accent-active)] text-white shadow-lg shadow-indigo-950/30"><Music2 className="h-16 w-16" /></div><h4 className="mt-6 text-3xl font-semibold">Now playing</h4><p className="mt-2 text-base text-white/70">Sample Artist · Full view preview</p></div>
              ) : stillImage ? <ImageIcon className="h-28 w-28 text-white/80" /> : <Play className="h-28 w-28 text-white/80" />}
              <div className="absolute inset-y-0 left-0 hidden items-center pl-4 md:flex"><button type="button" className="rounded-full border border-white/20 bg-black/35 p-3 text-white backdrop-blur"><ChevronLeft className="h-5 w-5" /></button></div>
              <div className="absolute inset-y-0 right-0 hidden items-center pr-4 md:flex"><button type="button" className="rounded-full border border-white/20 bg-black/35 p-3 text-white backdrop-blur"><ChevronRight className="h-5 w-5" /></button></div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] px-4 py-4">
              {stillImage ? (
                <div className="w-32"><SelectMenu value={zoom} onChange={setZoom} options={zoomOptions} panelClassName="bottom-[calc(100%+8px)] top-auto" /></div>
              ) : (
                <>
                  <Button size="icon" variant="outline" onClick={() => setIsPlaying((current) => !current)}>{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button>
                  <Button size="icon" variant="outline"><Zap className="h-4 w-4" /></Button>
                  <div className="w-28"><SelectMenu value={speed} onChange={setSpeed} options={speedOptions} panelClassName="bottom-[calc(100%+8px)] top-auto" /></div>
                </>
              )}
              <div className="h-2 min-w-[200px] flex-1 rounded-full bg-[var(--surface-muted)]"><div className="h-2 w-2/5 rounded-full bg-[image:var(--accent-active)]" /></div>
              <span className="text-sm text-[var(--muted)]">{audio ? "02:14 / 04:02" : stillImage ? "12 / 24" : "00:42 / 02:15:00"}</span>
            </div>
          </div>

          <div className="space-y-3">
            {[ ["Current item", title], [copy[variant].metaA[0], copy[variant].metaA[1]], [copy[variant].metaB[0], copy[variant].metaB[1]], [copy[variant].extra[0], stillImage ? zoom : speed.replace("x", "×")] ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4"><p className="text-sm text-[var(--muted)]">{label}</p><p className="mt-2 text-xl font-semibold">{value}</p></div>
            ))}
          </div>
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
  const isAudio = variant === "music";
  const isStillImage = variant === "image" || variant === "picture" || variant === "illustration" || variant === "album";

  return (
    <>
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><h2 className="text-lg font-semibold">{meta.title}</h2><p className="mt-1 text-sm text-[var(--muted)]">{meta.description}</p></div>
          <Button variant="outline" size="sm" onClick={() => setFullViewOpen(true)}><Expand className="h-4 w-4" />Open full view</Button>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_0.55fr]">
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <div className={cn("group relative flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-8", isAudio ? "min-h-[430px]" : "min-h-[480px]") }>
              {isAudio ? (
                <div className="text-center"><div className="mx-auto flex h-32 w-32 items-center justify-center rounded-[2rem] bg-[image:var(--accent-active)] text-white shadow-lg shadow-indigo-950/30"><Music2 className="h-14 w-14" /></div><h3 className="mt-6 text-3xl font-semibold">Now Playing</h3><p className="mt-2 text-base text-white/70">Sample Artist · Music module preview</p></div>
              ) : isStillImage ? <ImageIcon className="h-28 w-28 text-white/80" /> : <Play className="h-28 w-28 text-white/80" />}

              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 opacity-0 transition group-hover:opacity-100"><button className="pointer-events-auto rounded-full border border-white/20 bg-black/35 p-3 text-white backdrop-blur"><ChevronLeft className="h-5 w-5" /></button></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 opacity-0 transition group-hover:opacity-100"><button className="pointer-events-auto rounded-full border border-white/20 bg-black/35 p-3 text-white backdrop-blur"><ChevronRight className="h-5 w-5" /></button></div>
              {!isStillImage ? (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition group-hover:opacity-100">
                  <button type="button" className="pointer-events-auto rounded-full border border-white/20 bg-black/35 p-4 text-white backdrop-blur" onClick={() => setIsPlaying((current) => !current)}>{isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</button>
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] px-4 py-4">
              {isStillImage ? (
                <div className="w-32"><SelectMenu value={zoom} onChange={setZoom} options={zoomOptions} panelClassName="bottom-[calc(100%+8px)] top-auto" /></div>
              ) : (
                <><Button size="icon" variant="outline" onClick={() => setIsPlaying((current) => !current)}>{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button><div className="w-28"><SelectMenu value={speed} onChange={setSpeed} options={speedOptions} panelClassName="bottom-[calc(100%+8px)] top-auto" /></div></>
              )}
              <div className="h-2 min-w-[220px] flex-1 rounded-full bg-[var(--surface-muted)]"><div className="h-2 w-2/5 rounded-full bg-[image:var(--accent-active)]" /></div>
              {!isStillImage ? <Volume2 className="h-4 w-4 text-[var(--muted)]" /> : null}
              <span className="text-sm text-[var(--muted)]">{isAudio ? "02:14 / 04:02" : isStillImage ? (variant === "illustration" ? "7 / 16" : variant === "picture" ? "18 / 42" : variant === "album" ? "18 / 42" : "24 / 48") : "00:42 / 02:15:00"}</span>
            </div>
          </div>

          <div className="space-y-3">
            {[ ["Current item", meta.current], meta.metaA, meta.metaB, meta.extra ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4"><p className="text-sm text-[var(--muted)]">{label}</p><p className="mt-2 text-xl font-semibold">{label === "Speed" ? speed.replace("x", "×") : label === "Zoom" ? zoom : value}</p></div>
            ))}
          </div>
        </div>
      </section>

      <FullViewModal open={fullViewOpen} onClose={() => setFullViewOpen(false)} variant={variant} title={meta.current} />
    </>
  );
}
