import { buffer } from 'micro';
import * as admin from 'firebase-admin';

//connection to firebase
const serviceAccount = require('../../../permission.json');

const app =!admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();
//if the app already exist use that one otherwise create one


//stripe connection
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
// run command to generate this key
// sudo stripe listen --forward-to localhost:3000/api/webhook


const fulfillOrder = async (session) => {
    //console.log('fulfilling order', session);
    return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection("orders").doc(session.id).set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
        console.log(`SUCCESS: Order ${session.id} had been added to the database`);
    });
}

export default async (req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];
        //creating a signature

        let event;

        //verify that the event came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        }
        catch (err) {
            console.log('ERROR', err.message)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        //Handle the checkout.session.completed event

        if(event.type === 'checkout.session.completed') {
            const session = event.data.object;

            //fulfill the order in this case
            return fulfillOrder(session)
            .then(() => res.status(200))
            .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
        //handled by stripe
    }
}