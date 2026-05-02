import { ModuleLandingPage } from "@/components/dashboard/module-landing-page";

export default function Page() {
  return (
    <ModuleLandingPage
      title="NSFW Image"
      description="Protected image browsing and visual preview."
      domainColumn="Collection"
      domainValue="Protected"
      mediaPreview="image"
    />
  );
}
