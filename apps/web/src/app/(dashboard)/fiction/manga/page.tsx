import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Manga"
      description="Manga collection with reading progress and preview."
      domainColumn="Progress"
      domainValue="Manga"
      mediaPreview="picture"
    />
  );
}
