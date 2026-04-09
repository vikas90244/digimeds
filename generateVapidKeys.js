import * as webPush from 'web-push';
import * as fs from 'fs';

const vapidKeys=webPush.generateVAPIDKeys();

const envData=`
NEXT_PUBLIC_VAPID_PUBLIC_KEY=${vapidKeys.publicKey}
VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`;

fs.writeFileSync('.env', envData, {flag:'a'});