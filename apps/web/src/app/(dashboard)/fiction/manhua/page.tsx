import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="Manhua"
      description="Manhua collection with reading progress and preview."
      domainColumn="Progress"
      domainValue="Manhua"
      mediaPreview="picture"
    />
  );
}
