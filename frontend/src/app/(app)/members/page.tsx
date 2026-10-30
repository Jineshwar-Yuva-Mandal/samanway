import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui";

export default function MembersPage() {
  return (
    <>
      <PageHeader title="Members" subtitle="Membership" />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Card>
          <p className="text-sm text-slate-400 text-center py-8">Members list coming soon.</p>
        </Card>
      </div>
    </>
  );
}
