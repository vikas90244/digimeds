function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer as ArrayBuffer;
}

export function notificationUnsupported(): boolean {
  return (
    !('serviceWorker' in navigator) ||
    !('PushManager' in window) ||
    !('showNotification' in ServiceWorkerRegistration.prototype)
  );
}

const SERVICE_WORKER_FILE_PATH = '/sw.js';

async function registerAndSubscribe(
  onSubscribe: (subs: PushSubscription | null) => void,
): Promise<void> {
  try {
    await navigator.serviceWorker.register(SERVICE_WORKER_FILE_PATH, {
      scope: '/',
      updateViaCache: 'none',
    });
    await subscribe(onSubscribe);
  } catch (e) {
    console.error('Failed to register service worker: ', e);
  }
}

async function subscribe(onSubscribe: (subs: PushSubscription | null) => void): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    console.info('Created subscription:', subscription.toJSON());
    await submitSubscription(subscription);
    onSubscribe(subscription);
  } catch (e) {
    console.error('Failed to subscribe: ', e);
    onSubscribe(null);
  }
}

async function submitSubscription(subscription: PushSubscription): Promise<void> {
  const res = await fetch('/api/web-push/subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription }),
  });
  const result = await res.json();
  console.log('Subscription saved:', result);
}

export function checkPermissionStateAndAct(
  onSubscribe: (subs: PushSubscription | null) => void,
): void {
  const state: NotificationPermission = Notification.permission;
  switch (state) {
    case 'denied':
      console.warn('Notification permission denied.');
      break;
    case 'granted':
      registerAndSubscribe(onSubscribe);
      break;
    case 'default':
      // Permission not yet asked — caller should request it first
      break;
  }
}

export async function requestPermissionAndSubscribe(
  onSubscribe: (subs: PushSubscription | null) => void,
): Promise<void> {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    await registerAndSubscribe(onSubscribe);
  } else {
    onSubscribe(null);
  }
}
