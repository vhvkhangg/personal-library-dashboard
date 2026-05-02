import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Food"
      description="Food items, notes, and ratings."
      domainColumn="Cuisine"
      domainValue="Unknown"
    />
  );
}
