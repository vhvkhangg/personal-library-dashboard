import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="NSFW Comic"
      description="Protected comics and reading progress."
      domainColumn="Progress"
      domainValue="Comic"
      mediaPreview="picture"
    />
  );
}
