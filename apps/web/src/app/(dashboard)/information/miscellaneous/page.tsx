import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Miscellaneous"
      description="Unsorted information and notes."
      showDomainColumn={false}
    />
  );
}
