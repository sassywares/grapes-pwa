import { PageWithSearch } from "@/components";
import { PrivacyPolicy } from "./PrivacyPolicy";

export function PrivacyPolicyPage() {
  return (
    <PageWithSearch>
      <div className="prose prose-purple dark:prose-invert mx-auto p-content">
        <PrivacyPolicy />
      </div>
    </PageWithSearch>
  );
}
