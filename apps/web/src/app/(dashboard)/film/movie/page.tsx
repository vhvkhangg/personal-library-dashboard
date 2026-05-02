import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Movie"
      description="Movie library and watch progress."
      domainColumn="Status"
      domainValue="Watching"
      typeColumnLabel="Progress"
      typeValue="72%"
      mediaPreview="movie"
    />
  );
}
