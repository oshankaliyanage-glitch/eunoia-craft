import { Product } from '../types.ts';
import toteImg from '../assets/images/craft_woven_tote_1790238596387.jpg';
import candleImg from '../assets/images/craft_ceramic_candle_1790238612360.jpg';
import pouchImg from '../assets/images/craft_linen_pouch_1790238626948.jpg';
import mugImg from '../assets/images/craft_ceramic_mug_1790238640738.jpg';
import soapImg from '../assets/images/craft_botanical_soap_1790238659521.jpg';
import basketImg from '../assets/images/craft_wicker_basket_1790238685307.jpg';
import logoImg from '../assets/images/eunoia_logo.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'macrame-tote',
    name: 'Artisan Handwoven Macramé Tote',
    tagline: 'Spacious daily companion crafted with organic unbleached cotton',
    category: 'Woven & Textiles',
    priceLKR: 4800,
    image: toteImg,
    description: 'Each tote is meticulously knotted by hand over eight hours. Crafted with durable natural cotton rope and unbleached inner lining, accented with supple vegetable-tanned handles for effortless Colombo city strolls or coastal weekend escapes.',
    materials: ['100% natural organic cotton cord', 'Reinforced canvas lining', 'Genuine hand-stitched leather straps'],
    dimensions: '38 cm (W) × 34 cm (H) × 10 cm (D)',
    careInstructions: 'Spot clean gently with cold water and mild eco-friendly detergent. Air dry in shade.',
    badge: 'Artisan Best Seller',
    inStock: true
  },
  {
    id: 'botanical-candle',
    name: 'Hand-Poured Ceramic Soy Candle',
    tagline: 'Ceylon cinnamon & wild mountain jasmine with organic wood wick',
    category: 'Ceramics & Aromatics' as any,
    priceLKR: 3200,
    image: candleImg,
    description: 'Poured in handcrafted speckled stoneware bowls thrown on a pottery wheel in suburban Colombo. Scented with indigenous cinnamon bark oil, delicate wild jasmine, and pure golden soy wax. The crackling wooden wick fills your living space with warmth.',
    materials: ['Pure non-GMO soy wax', 'Natural FSC wooden crackling wick', 'Hand-thrown stoneware ceramic bowl', 'Cold-pressed botanical oils'],
    dimensions: '9.5 cm diameter × 7.5 cm height (280g / 55 hours burn time)',
    careInstructions: 'Trim wick to 5mm before every light. Once melted, reuse the ceramic vessel as a planter or jewelry dish.',
    badge: 'Limited Batch',
    inStock: true
  },
  {
    id: 'flora-pouch',
    name: 'Flora Hand-Embroidered Linen Pouch',
    tagline: 'Fine botanical needlework on raw unbleached Sri Lankan linen',
    category: 'Woven & Textiles',
    priceLKR: 2650,
    image: pouchImg,
    description: 'An intimate pocket for your travel essentials, jewelry, or makeup. Featuring dainty wildflower stems and blue botanical leaves individually hand-embroidered by local artisans. Finished with a sturdy antique brass zipper and soft linen lining.',
    materials: ['100% raw Sri Lankan linen', 'Cotton embroidery threads', 'Solid antique brass zipper pull'],
    dimensions: '22 cm (W) × 16 cm (H) × 5 cm (Base)',
    careInstructions: 'Hand wash cold inside out, iron on reverse while slightly damp.',
    badge: 'Hand-Stitched',
    inStock: true
  },
  {
    id: 'ceramic-mug',
    name: 'Artisan Glazed Ceramic Coffee Mug',
    tagline: 'Hand-thrown Colombo clay with soft ocean indigo rim drips',
    category: 'Ceramics & Tableware',
    priceLKR: 2400,
    image: mugImg,
    description: 'A tactile morning ritual piece shaped on the potter’s wheel from local terracotta and stoneware. Dipped in an oceanic blue and cream dip glaze that pools uniquely on every piece. Designed with an ergonomic thumb groove for the coziest grip.',
    materials: ['Colombo high-fire stoneware clay', 'Lead-free food-safe gloss glaze', 'Microwave & dishwasher safe'],
    dimensions: '350 ml capacity · 8.5 cm rim × 9.5 cm height',
    careInstructions: 'Dishwasher safe, though hand-washing preserves glaze luster longest.',
    badge: 'Unique Drip Glaze',
    inStock: true
  },
  {
    id: 'botanical-soap',
    name: 'Botanical Cold-Process Soap Set',
    tagline: 'Duo bar set with Kurunegala virgin coconut oil & blue lotus',
    category: 'Natural Wellness',
    priceLKR: 1950,
    image: soapImg,
    description: 'Traditional slow-cured 6-week artisan cold process soap. Enriched with cold-pressed virgin coconut oil, nourishing unrefined shea butter, and dried blue petals. Cleanses gently without stripping moisture, delivering a serene herbal lather.',
    materials: ['Pure Kurunegala virgin coconut oil', 'Unrefined African shea butter', 'Sri Lankan blue lotus & lemongrass essential oils', 'Natural dried botanicals'],
    dimensions: 'Set of 2 bars (approx. 110g each, packed in recycled seed paper)',
    careInstructions: 'Store on a self-draining wooden soap dish to extend bar life.',
    badge: '100% Organic & Vegan',
    inStock: true
  },
  {
    id: 'wicker-planter-basket',
    name: 'Handcrafted Cane & Wicker Basket',
    tagline: 'Heritage cane weaving for indoor botanicals and table storage',
    category: 'Home Decor',
    priceLKR: 3900,
    image: basketImg,
    description: 'Woven using age-old Sri Lankan cane craftsmanship from sustainably harvested riverbed rattan. Built with reinforced double-loop side handles, this versatile piece adds natural warmth to your houseplant arrangements or tabletop storage.',
    materials: ['Natural Sri Lankan rattan cane', 'Natural vegetable dye seal', 'Reinforced base construction'],
    dimensions: '26 cm (Diameter) × 24 cm (Height)',
    careInstructions: 'Dust with a dry soft brush or wipe with a lightly damp cloth. Keep away from standing water.',
    badge: 'Heritage Craft',
    inStock: true
  }
];

export const BUSINESS_INFO = {
  name: 'Eunoia',
  tagline: 'Thoughtfully made for you.',
  logo: logoImg,
  category: 'Artisanal Handmade Crafts & Homeware',
  city: 'Colombo',
  country: 'Sri Lanka',
  address: '42 Ward Place, Cinnamon Gardens, Colombo 07, Sri Lanka',
  phone: '+94 77 123 4567',
  phoneRaw: '+94771234567',
  whatsappNumber: '94771234567',
  email: 'hello@eunoiacrafts.lk',
  hours: 'Monday – Saturday: 9:30 AM – 6:30 PM (Closed Sundays)',
  deliveryNotice: 'Island-wide delivery within 2–4 business days · Same-day pickup available in Colombo'
};
