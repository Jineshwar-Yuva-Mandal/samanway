import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui";

export default function AttendancePage() {
  return (
    <>
      <PageHeader title="Attendance" subtitle="Attendance" />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Card>
          <p className="text-sm text-slate-400 text-center py-8">Attendance tracking coming soon.</p>
        </Card>
      </div>
    </>
  );
}
