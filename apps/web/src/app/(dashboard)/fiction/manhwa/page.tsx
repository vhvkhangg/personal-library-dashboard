import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Manhwa"
      description="Manhwa collection with reading progress and preview."
      domainColumn="Progress"
      domainValue="Manhwa"
      mediaPreview="picture"
    />
  );
}
