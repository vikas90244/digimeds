import { NextResponse } from 'next/server';
import * as webpush from 'web-push';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import PushSubscription from '@/models/PushSubscription';

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT as string,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
  process.env.VAPID_PRIVATE_KEY as string
);

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const payload = JSON.stringify(body);

    const subscriptions = await PushSubscription.find({ userId: currentUser._id });
    if (subscriptions.length === 0) {
      return NextResponse.json({ success: false, error: 'No subscriptions found' }, { status: 404 });
    }

    const results = await Promise.allSettled(
      subscriptions.map((sub) =>
        webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth } },
          payload
        )
      )
    );

    // Clean up expired subscriptions (410 Gone)
    const expired = results
      .map((r, i) =>
        r.status === 'rejected' && (r.reason as any)?.statusCode === 410
          ? subscriptions[i].endpoint
          : null
      )
      .filter(Boolean);

    if (expired.length > 0) {
      await PushSubscription.deleteMany({ endpoint: { $in: expired } });
    }

    return NextResponse.json({ success: true, message: 'Push sent.' });
  } catch (error: any) {
    console.error('Send push error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send push' }, { status: 500 });
  }
}
