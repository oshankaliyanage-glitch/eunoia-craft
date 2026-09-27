import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK with server-side API key and User-Agent telemetry
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const EUNOIA_SYSTEM_INSTRUCTION = `
You are "Ask Eunoia", the warm, thoughtful, 24/7 AI artisan concierge for Eunoia — an artisanal handmade craft and homeware studio based in Colombo, Sri Lanka.
Tagline: "Thoughtfully made for you."
Studio Address: 42 Ward Place, Cinnamon Gardens, Colombo 07, Sri Lanka.
Contact: Phone +94 77 123 4567 | WhatsApp: +94 77 123 4567 | Email: hello@eunoiacrafts.lk
Hours: Monday – Saturday: 9:30 AM – 6:30 PM (Closed Sundays). Online store & delivery open 24/7.

Catalog & Prices (All in Sri Lankan Rupees LKR):
1. Artisan Handwoven Macramé Tote — Rs. 4,800 LKR (100% natural organic cotton cord, unbleached inner lining, hand-stitched leather straps, 38×34×10cm).
2. Hand-Poured Ceramic Soy Candle — Rs. 3,200 LKR (Ceylon cinnamon & wild mountain jasmine, non-GMO soy wax, crackling FSC wood wick, speckled stoneware bowl, 55h burn time).
3. Flora Hand-Embroidered Linen Pouch — Rs. 2,650 LKR (Raw Sri Lankan unbleached linen, wildflower needlework, antique brass zipper, 22×16×5cm).
4. Artisan Glazed Ceramic Coffee Mug — Rs. 2,400 LKR (High-fire Colombo stoneware clay, ocean indigo dip glaze, ergonomic thumb groove, 350ml, microwave & dishwasher safe).
5. Botanical Cold-Process Soap Set — Rs. 1,950 LKR (Duo bar set, Kurunegala virgin coconut oil, blue lotus & lemongrass essential oils, unrefined shea butter, 100% vegan).
6. Handcrafted Cane & Wicker Basket — Rs. 3,900 LKR (Heritage Sri Lankan rattan cane weaving, double-loop handles, indoor botanicals & storage, 26×24cm).

Key Features & Services:
- "Make It Mine" Customization: Customers can personalize any item with custom initials, monogram, or name tags for free. Includes complimentary handwritten botanical gift card note and artisanal gift packaging.
- Island-Wide Sri Lanka Delivery: Fast 2–4 business days across Sri Lanka. Flat rate Rs. 350 for Colombo & suburbs. FREE island-wide delivery on orders over Rs. 6,000 LKR! Same-day studio pickup available in Colombo 07.
- Payment Options: Cash on Delivery (COD) and direct Bank Transfer.
- Custom Commissions & Corporate Gifts: We make bespoke wedding favours, custom macramé wall hangings, and corporate gifting batches.
- Human Connection: Customers can always message directly on WhatsApp (+94 77 123 4567) for custom orders or photo proofs.

Tone and Persona:
- Warm, polite, hospitable Sri Lankan tone (you may use a gentle "Ayubowan! 🙏" when appropriate).
- Concise, helpful, aesthetic responses. Keep answers easy to read (use short bullet points when listing items or delivery details).
- Always quote prices in Sri Lankan Rupees (Rs. ... LKR).
- If the customer wants to buy, guide them to click "Make It Mine" on the website or message on WhatsApp.
`;

function getKnowledgeFallback(latestMessage: string): string {
  const q = latestMessage.toLowerCase();
  let reply = "Ayubowan! 🙏 Welcome to Eunoia. ";

  if (q.includes('make it mine') || q.includes('custom') || q.includes('personal') || q.includes('engrav')) {
    reply += "Our 'Make It Mine' service lets you personalize any handcrafted piece! You can add custom initials or names, request a complimentary handwritten botanical gift card, and enjoy free artisanal gift wrap. Just click 'Make It Mine' on any product to customize.";
  } else if (q.includes('delivery') || q.includes('shipping') || q.includes('cost') || q.includes('island')) {
    reply += "We deliver island-wide across Sri Lanka within 2–4 business days. Delivery is a flat Rs. 350 LKR for Colombo and suburbs, and FREE for orders over Rs. 6,000 LKR! Same-day studio pickup is also available at 42 Ward Place, Colombo 07.";
  } else if (q.includes('candle') || q.includes('tote') || q.includes('mug') || q.includes('soap') || q.includes('pouch') || q.includes('basket') || q.includes('price')) {
    reply += "Here are our signature handcrafted pieces:\n• Handwoven Macramé Tote: Rs. 4,800 LKR\n• Ceramic Soy Candle: Rs. 3,200 LKR\n• Flora Embroidered Linen Pouch: Rs. 2,650 LKR\n• Glazed Ceramic Coffee Mug: Rs. 2,400 LKR\n• Botanical Cold-Process Soap Set: Rs. 1,950 LKR\n• Cane & Wicker Basket: Rs. 3,900 LKR\nAll made with natural Sri Lankan materials!";
  } else if (q.includes('contact') || q.includes('whatsapp') || q.includes('phone') || q.includes('where') || q.includes('location')) {
    reply += "Our studio is located at 42 Ward Place, Cinnamon Gardens, Colombo 07. You can call or chat with us on WhatsApp at +94 77 123 4567, or email hello@eunoiacrafts.lk. We'd love to welcome you!";
  } else {
    reply += "I'm your 24/7 artisan concierge. I can help you explore our handcrafted tote bags, ceramics, soy candles, natural soaps, and cane baskets, or assist with 'Make It Mine' custom orders and Sri Lankan island-wide delivery!";
  }
  return reply;
}

// 24/7 AI Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const latestMessage = messages[messages.length - 1]?.content || '';

    if (ai) {
      try {
        // Build conversation contents for Gemini
        const contents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: EUNOIA_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        const reply = response.text;
        if (reply) {
          return res.json({ reply });
        }
      } catch (geminiError) {
        console.warn('Gemini API call returned error, using fallback:', geminiError);
      }
    }

    return res.json({ reply: getKnowledgeFallback(latestMessage) });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.json({
      reply: "Ayubowan! We are always here to help. You can also chat directly with our Colombo workshop team on WhatsApp at +94 77 123 4567."
    });
  }
});

// Setup dev server with Vite middlewares, or static serving in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
