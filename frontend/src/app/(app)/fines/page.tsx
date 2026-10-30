import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui";

export default function FinesPage() {
  return (
    <>
      <PageHeader title="Fines" subtitle="Fines" />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Card>
          <p className="text-sm text-slate-400 text-center py-8">Fines management coming soon.</p>
        </Card>
      </div>
    </>
  );
}
