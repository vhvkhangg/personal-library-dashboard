"use client";

import * as React from "react";
import { Bell, Database, Download, HardDrive, MonitorCog, ShieldCheck, UserCog, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectMenu } from "@/components/ui/select-menu";

function ToggleControl({ label, description, defaultChecked = false }: { label: string; description: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(defaultChecked);
  return (
    <button type="button" className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left" onClick={() => setChecked((value) => !value)}>
      <div><p className="font-medium">{label}</p><p className="mt-1 text-sm text-[var(--muted)]">{description}</p></div>
      <span className={checked ? "inline-flex h-7 w-12 items-center rounded-full bg-[image:var(--accent-active)] p-1" : "inline-flex h-7 w-12 items-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] p-1"}><span className={checked ? "h-5 w-5 translate-x-5 rounded-full bg-white transition" : "h-5 w-5 translate-x-0 rounded-full bg-white transition"} /></span>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="space-y-2"><span className="text-sm font-medium text-[var(--muted)]">{label}</span>{children}</label>;
}

function SettingsSection({ title, description, icon: Icon, children }: { title: string; description: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; }) {
  return <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm"><div className="flex items-center gap-3"><div className="rounded-xl bg-[var(--accent-soft)] p-2 text-[var(--accent)]"><Icon className="h-4 w-4" /></div><div><h2 className="text-lg font-semibold">{title}</h2><p className="text-sm text-[var(--muted)]">{description}</p></div></div><div className="mt-5 space-y-4">{children}</div></section>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="focus-ring h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]" />;
}

export function SettingsWorkspacePage() {
  const [theme, setTheme] = React.useState("dark");
  const [startPage, setStartPage] = React.useState("dashboard");
  const [rowsPerPage, setRowsPerPage] = React.useState("10");
  const [dateFormat, setDateFormat] = React.useState("ddmmyyyy");
  const [authMode, setAuthMode] = React.useState("jwt");
  const [backupStrategy, setBackupStrategy] = React.useState("manual");
  const [exportFormat, setExportFormat] = React.useState("json");
  const [archivePolicy, setArchivePolicy] = React.useState("manual");
  const [cleanupRule, setCleanupRule] = React.useState("ask");

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-3xl font-semibold tracking-tight">Settings</h1><p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">UI-only settings workspace for future app configuration. RAG-specific controls live in RAG Workspace.</p></div><div className="flex gap-3"><Button variant="outline">Reset defaults</Button><Button>Save changes</Button></div></header>

      <section className="grid gap-6 xl:grid-cols-2">
        <SettingsSection title="Appearance & UX" description="Theme, navigation, and dashboard behavior." icon={MonitorCog}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Default theme"><SelectMenu value={theme} onChange={setTheme} options={[{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }, { value: "system-later", label: "System later" }]} /></Field>
            <Field label="Start page"><SelectMenu value={startPage} onChange={setStartPage} options={[{ value: "dashboard", label: "Dashboard" }, { value: "last-opened", label: "Last opened module" }, { value: "settings", label: "Settings" }]} /></Field>
            <Field label="Rows per page"><SelectMenu value={rowsPerPage} onChange={setRowsPerPage} options={[{ value: "10", label: "10" }, { value: "20", label: "20" }, { value: "30", label: "30" }, { value: "50", label: "50" }]} /></Field>
            <Field label="Date format"><SelectMenu value={dateFormat} onChange={setDateFormat} options={[{ value: "ddmmyyyy", label: "DD/MM/YYYY" }, { value: "mmddyyyy", label: "MM/DD/YYYY" }, { value: "yyyymmdd", label: "YYYY-MM-DD" }]} /></Field>
          </div>
          <ToggleControl label="Collapse secondary sidebar for single-screen pages" description="Useful for pages like Settings or RAG." defaultChecked />
          <ToggleControl label="Show module dashboard charts by default" description="Keep module insights visible above the tables." defaultChecked />
        </SettingsSection>

        <SettingsSection title="Security & Access" description="Single-user protection, session rules, and protected zones." icon={ShieldCheck}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Auth mode"><SelectMenu value={authMode} onChange={setAuthMode} options={[{ value: "jwt", label: "Single-user JWT" }, { value: "login-only", label: "Login only" }]} /></Field>
            <Field label="Session timeout"><Input defaultValue="12 hours" /></Field>
            <Field label="NSFW auto-lock"><Input defaultValue="30 minutes" /></Field>
            <Field label="Protected zones"><Input defaultValue="NSFW + Settings" /></Field>
          </div>
          <ToggleControl label="Require re-authentication when NSFW auto-lock triggers" description="Force unlock after inactivity." defaultChecked />
          <ToggleControl label="Log security events" description="Prepare audit trail support for future phases." />
        </SettingsSection>

        <SettingsSection title="Storage & Library Paths" description="Local paths, backups, and mounted content roots." icon={HardDrive}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Obsidian vault path"><Input defaultValue="C:\\Users\\...\\IDEAVERSE" /></Field>
            <Field label="Local media root"><Input defaultValue="D:\\LibraryMedia" /></Field>
            <Field label="Google Drive root"><Input defaultValue="Connected later" /></Field>
            <Field label="Backup strategy"><SelectMenu value={backupStrategy} onChange={setBackupStrategy} options={[{ value: "manual", label: "Manual" }, { value: "daily", label: "Daily" }, { value: "weekly", label: "Weekly" }]} /></Field>
          </div>
          <ToggleControl label="Prefer local metadata index" description="Use database metadata while keeping files in their original location." defaultChecked />
          <ToggleControl label="Verify paths at startup" description="Warn if any watched folder is unavailable." defaultChecked />
        </SettingsSection>

        <SettingsSection title="Data & Export" description="Future export, archive, and portability controls." icon={Download}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Default export format"><SelectMenu value={exportFormat} onChange={setExportFormat} options={[{ value: "json", label: "JSON" }, { value: "csv", label: "CSV" }, { value: "markdown", label: "Markdown" }]} /></Field>
            <Field label="Archive policy"><SelectMenu value={archivePolicy} onChange={setArchivePolicy} options={[{ value: "manual", label: "Manual" }, { value: "auto-old", label: "Auto archive old drafts" }]} /></Field>
            <Field label="Cleanup duplicate rule"><SelectMenu value={cleanupRule} onChange={setCleanupRule} options={[{ value: "ask", label: "Ask every time" }, { value: "keep-newest", label: "Keep newest" }, { value: "keep-both", label: "Keep both" }]} /></Field>
            <Field label="Export folder"><Input defaultValue="D:\\LibraryExports" /></Field>
          </div>
          <ToggleControl label="Include attachments in exports" description="Bundle linked local files when exporting data." />
          <ToggleControl label="Generate export manifest" description="Create a checksum-like file list for backups." defaultChecked />
        </SettingsSection>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SettingsSection title="App Maintenance" description="General maintenance settings not tied to RAG." icon={Wrench}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Cache cleanup interval"><Input defaultValue="7 days" /></Field>
            <Field label="Thumbnail cache size"><Input defaultValue="2 GB" /></Field>
            <Field label="Log retention"><Input defaultValue="30 days" /></Field>
            <Field label="Database vacuum reminder"><Input defaultValue="Monthly" /></Field>
          </div>
          <ToggleControl label="Show maintenance banner" description="Display warning if cleanup or backup is overdue." defaultChecked />
          <ToggleControl label="Preload dashboard summaries" description="Warm up dashboard cards after app startup." />
        </SettingsSection>

        <div className="space-y-6">
          <SettingsSection title="Notifications & reminders" description="Future notifications and maintenance reminders." icon={Bell}>
            <ToggleControl label="Show import completion notifications" description="Display toast when file imports finish." defaultChecked />
            <ToggleControl label="Warn on low local storage" description="Show reminder if the local media drive is nearly full." defaultChecked />
            <ToggleControl label="Weekly maintenance reminder" description="Future reminder for cleanup, metadata review, and backups." />
          </SettingsSection>

          <SettingsSection title="Owner profile" description="Single-user owner account details." icon={UserCog}>
            <div className="grid gap-4">
              <Field label="Display name"><Input defaultValue="VHVKhangg" /></Field>
              <Field label="Library mode"><Input defaultValue="Private" /></Field>
              <Field label="Primary database"><div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm"><div className="flex items-center gap-2 font-medium"><Database className="h-4 w-4 text-[var(--accent)]" /> PostgreSQL + pgvector</div><p className="mt-2 text-[var(--muted)]">Current planned data backend.</p></div></Field>
            </div>
          </SettingsSection>
        </div>
      </section>
    </div>
  );
}
