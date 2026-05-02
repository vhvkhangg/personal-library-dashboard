import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="NSFW Author"
      description="Protected author/platform entries."
      domainColumn="Platform"
      domainValue="Author"
    />
  );
}
