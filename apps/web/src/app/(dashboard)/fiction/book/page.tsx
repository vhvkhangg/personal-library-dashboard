import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Book"
      description="Book collection with chapter tracking and reading preview."
      domainColumn="Progress"
      domainValue="Book"
      mediaPreview="picture"
    />
  );
}
