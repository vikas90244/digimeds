import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import PushSubscription from '@/models/PushSubscription';

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

    const { subscription }: { subscription: PushSubscriptionJSON } = await req.json();

    await PushSubscription.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      {
        userId: currentUser._id,
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.keys?.p256dh,
          auth: subscription.keys?.auth,
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, message: 'Subscription saved.' }, { status: 201 });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save subscription' }, { status: 500 });
  }
}
