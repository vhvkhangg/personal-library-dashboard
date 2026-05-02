import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="NSFW Character"
      description="Protected character entries."
      domainColumn="Source"
      domainValue="Character"
    />
  );
}
