import { NextResponse } from 'next/server';

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

/**
 * WhatsApp Cloud API Webhook
 * Handles incoming messages from the Meta Cloud API.
 */

// GET: Webhook verification
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode && token) {
    if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    } else {
      return new Response('Forbidden', { status: 403 });
    }
  }
}

// POST: Handle incoming messages
export async function POST(request) {
  const body = await request.json();

  try {
    // 1. Parse message from body
    // 2. Determine user intent (Booking query, Service info, Order status)
    // 3. Generate response using AI (or fixed logic)
    // 4. Send back using Meta Cloud API Send Message endpoint
    
    // Example Logic:
    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (message) {
      console.log('Incoming WhatsApp message:', message.text?.body);
      
      // TODO: Implement AI logic here
      // const responseText = await getAIResponse(message.text?.body);
      // await sendWhatsAppMessage(message.from, responseText);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * HELPER: Send WhatsApp message via Meta API
 */
async function sendWhatsAppMessage(to, text) {
  const url = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  
  await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: { body: text },
    }),
  });
}
