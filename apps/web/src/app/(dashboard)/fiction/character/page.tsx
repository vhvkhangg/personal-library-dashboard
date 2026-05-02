import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Fiction Character"
      description="Characters from fiction entries."
      domainColumn="World Setting"
      domainValue="Character"
    />
  );
}
