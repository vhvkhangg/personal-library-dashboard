import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Novel"
      description="Novel collection with chapter tracking and reading preview."
      domainColumn="Progress"
      domainValue="Novel"
      mediaPreview="picture"
    />
  );
}
