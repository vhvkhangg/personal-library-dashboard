import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Beverage"
      description="Beverages, notes, and ratings."
      domainColumn="Type"
      domainValue="Unknown"
    />
  );
}
