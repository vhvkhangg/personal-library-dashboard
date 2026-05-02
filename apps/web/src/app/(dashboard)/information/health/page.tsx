import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Health"
      description="Health information and notes."
      showDomainColumn={false}
    />
  );
}
