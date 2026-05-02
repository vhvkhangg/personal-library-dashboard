import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="NSFW Video"
      description="Protected video browsing and watch progress."
      domainColumn="Progress"
      domainValue="Video"
      mediaPreview="video"
    />
  );
}
