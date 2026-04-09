'use client';

import { useEffect, useState } from 'react';
import { Bell, CheckCircle2, Loader2, BellOff } from 'lucide-react';
import {
  notificationUnsupported,
  requestPermissionAndSubscribe,
} from '@/utils/Push';

export default function PushNotificationManager() {
  const [unsupported, setUnsupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (notificationUnsupported()) {
      setUnsupported(true);
      return;
    }
    setPermission(Notification.permission);
    // Only check for existing subscription, don't auto-subscribe
    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then((sub) => {
        setSubscription(sub);
      });
    }).catch(() => {});
  }, []);

  const handleEnable = async () => {
    setLoading(true);
    setError(null);
    try {
      await requestPermissionAndSubscribe((sub) => {
        setSubscription(sub);
        setPermission(Notification.permission);
        if (!sub && Notification.permission !== 'denied') {
          setError('Could not enable notifications. Please try again.');
        }
      });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Not supported — render nothing
  if (unsupported) return null;

  // Already subscribed
  if (subscription) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 bg-health/10 border border-health/20 rounded-2xl w-fit">
        <CheckCircle2 className="w-3.5 h-3.5 text-health shrink-0" />
        <span className="text-xs font-semibold text-health">Notifications enabled</span>
      </div>
    );
  }

  // Permission explicitly denied
  if (permission === 'denied') {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 bg-main/5 border border-main/10 rounded-2xl w-fit">
        <BellOff className="w-3.5 h-3.5 text-main/40 shrink-0" />
        <span className="text-xs font-medium text-main/40">Notifications blocked — enable in browser settings</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gray-100 border border-main/10 rounded-2xl px-5 py-4">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-9 h-9 rounded-xl bg-theme/20 flex items-center justify-center shrink-0">
          <Bell className="w-4 h-4 text-theme-bold" />
        </div>
        <div>
          <p className="text-xs font-bold text-main">Enable Notifications</p>
          <p className="text-[0.65rem] text-main/50 font-medium">
            Get reminders when medicines are due or expiring.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start sm:items-end gap-1">
        <button
          onClick={handleEnable}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-main text-white text-xs font-semibold hover:bg-main/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bell className="w-3.5 h-3.5" />}
          {loading ? 'Enabling...' : 'Enable'}
        </button>
        {error && <p className="text-[0.60rem] text-red-400 font-medium">{error}</p>}
      </div>
    </div>
  );
}
