'use client';

import { useFetchUserMedDetails } from '@/hooks/user-meds';
import { useSession } from 'next-auth/react';
import { AlertCircle, CheckCircle2, PillBottle, CalendarClock } from 'lucide-react';
import StatCard from './StatCard';
import ExpiryAlert from './ExpiryAlert';
import RecentMedicines from './RecentMedicines';
import QuickActions from './QuickActions';
import Loader from '../ui-common/Loader';
import PushNotificationManager from '../PushNotificationManager';

function getDaysUntilExpiry(dateString?: string | Date): number | null {
  if (!dateString) return null;
  const expiry = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DashboardMain() {
  const { data: session } = useSession();
  const { data: medicines, isLoading } = useFetchUserMedDetails();

  const firstName = session?.user?.name?.split(' ')[0] ?? 'there';

  const total = medicines?.length ?? 0;
  const scheduled = medicines?.filter((m) => m.type === 'scheduled').length ?? 0;
  const stored = medicines?.filter((m) => m.type === 'stored').length ?? 0;
  const expiringSoon = medicines?.filter((m) => {
    const days = getDaysUntilExpiry(m.expiryDate);
    return days !== null && days <= 30;
  }).length ?? 0;

  if (isLoading) return <Loader fullPage />;

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-8 flex flex-col gap-7">

        {/* Greeting */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-main font-heading">
            Good day, {firstName} 👋
          </h1>
          <p className="text-sm text-main/50 font-medium mt-1">
            Here's a snapshot of your medicine inventory.
          </p>
        </div>

        {/* Notification prompt */}
        <PushNotificationManager />

        {/* stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="Total Medicines"
            value={total}
            icon={PillBottle}
            iconBg="bg-theme/20"
            iconColor="text-theme-bold"
            sub={total === 0 ? 'Add your first one' : `${scheduled} scheduled · ${stored} stored`}
          />
          <StatCard
            label="Scheduled"
            value={scheduled}
            icon={CalendarClock}
            iconBg="bg-theme/20"
            iconColor="text-theme-bold"
            sub="Active prescriptions"
          />
          <StatCard
            label="Stored"
            value={stored}
            icon={CheckCircle2}
            iconBg="bg-health/10"
            iconColor="text-health"
            sub="In your cabinet"
          />
          <StatCard
            label="Expiry Alerts"
            value={expiringSoon}
            icon={AlertCircle}
            iconBg={expiringSoon > 0 ? 'bg-orange-100' : 'bg-main/5'}
            iconColor={expiringSoon > 0 ? 'text-orange-500' : 'text-main/40'}
            sub={expiringSoon > 0 ? 'Need attention' : 'All good'}
            subColor={expiringSoon > 0 ? 'text-orange-500' : 'text-health'}
          />
        </div>

        {/* expiry alerts banner */}
        {medicines && expiringSoon > 0 && (
          <ExpiryAlert medicines={medicines} />
        )}

        {/* main content grid*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* recent medicines */}
          <div className="lg:col-span-2">
            <RecentMedicines medicines={medicines ?? []} />
          </div>

          {/* quick actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

      </div>
    </div>
  );
}
