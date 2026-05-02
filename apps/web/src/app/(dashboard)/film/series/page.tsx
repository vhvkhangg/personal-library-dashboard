import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Series"
      description="Series library and episode progress."
      domainColumn="Progress"
      domainValue="Series"
      mediaPreview="movie"
    />
  );
}
