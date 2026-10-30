import PageHeader from "@/components/shared/PageHeader";
import { Card, Badge } from "@/components/ui";
import { Users, Calendar, ClipboardList, Wallet } from "lucide-react";

const stats = [
  { label: "Members",       value: "—", icon: Users,         badge: "active" },
  { label: "Events",        value: "—", icon: Calendar,      badge: "this month" },
  { label: "Attendance",    value: "—", icon: ClipboardList, badge: "last event" },
  { label: "Pending Fines", value: "—", icon: Wallet,        badge: "unpaid" },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview" />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <Card key={s.label} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-[#D4AF37]">
                  <s.icon size={18} />
                </div>
                <Badge variant="gold">{s.badge}</Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {s.value}
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            </Card>
          ))}
        </div>
        <Card>
          <p className="text-sm text-slate-400 text-center py-8">
            Connect your Supabase project to see live data here.
          </p>
        </Card>
      </div>
    </>
  );
}
