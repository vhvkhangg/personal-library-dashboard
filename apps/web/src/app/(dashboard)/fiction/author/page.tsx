import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Author"
      description="Fiction authors and their platforms."
      domainColumn="Platform"
      domainValue="Author"
    />
  );
}
