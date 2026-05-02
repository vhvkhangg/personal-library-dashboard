import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return <ModuleLandingPage title="Actor" description="Actors and related works." domainColumn="Country" domainValue="United States" typeColumnLabel="Gender" typeValue="Male" />;
}
