
import { Testimonial, Biodata, BlogPost, TemplateID } from './types';

export const GOD_ICONS = [
  { id: 'ganesha', name: '', url: '/god-1.png' },
  { id: 'om', name: '', url: '/god-2.png' },
  { id: 'swastika', name: '', url: '/god-3.png' },
  { id: 'krishna', name: '', url: '/god-4.png' },
  { id: 'shiva', name: '', url: '/god-5.png' },
  { id: 'cross', name: '', url: '/god-6.png' },
  { id: 'islam', name: '', url: '/god-7.png' },
  { id: 'khanda', name: '', url: '/god-8.png' },
  { id: 'buddha', name: 'choose_photo', url: '/god-photo-upload.jpg' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    review: "Created my brother's biodata in minutes. The Elegant template is absolutely beautiful!",
    rating: 5,
    image: "https://picsum.photos/seed/priya/100/100"
  },
  {
    id: 2,
    name: "Arjun Mehta",
    review: "The custom fields helped me add specific community details easily. Very user-friendly.",
    rating: 5,
    image: "https://picsum.photos/seed/arjun/100/100"
  },
  {
    id: 3,
    name: "Sarah Fernandes",
    review: "I love how the live preview works. I could see exactly how it would look while printing.",
    rating: 4,
    image: "https://picsum.photos/seed/sarah/100/100"
  }
];

export const TEMPLATE_SHOWCASE: { id: TemplateID; name: string; category: string }[] = [
  { id: 'elegant-1', name: 'Royal Grace', category: 'Elegant' },
  { id: 'elegant-2', name: 'Floral Serenity', category: 'Elegant' },
  { id: 'elegant-3', name: 'Amber Glow', category: 'Elegant' },
  { id: 'elegant-4', name: 'Teal Whisper', category: 'Elegant' },
  { id: 'elegant-5', name: 'Indigo Night', category: 'Elegant' },
  
  { id: 'modern-1', name: 'Minimalist Chic', category: 'Modern' },
  { id: 'modern-2', name: 'Azure Professional', category: 'Modern' },
  { id: 'modern-3', name: 'Emerald Peak', category: 'Modern' },
  { id: 'modern-4', name: 'Sunset Horizon', category: 'Modern' },
  { id: 'modern-5', name: 'Violet Dream', category: 'Modern' },
  
  { id: 'classic-1', name: 'Traditional Heritage', category: 'Classic' },
  { id: 'classic-2', name: 'Stone Arch', category: 'Classic' },
  { id: 'classic-3', name: 'Timeless Parchment', category: 'Classic' },
  { id: 'classic-4', name: 'Ocean Mist', category: 'Classic' },
  { id: 'classic-5', name: 'Golden Aura', category: 'Classic' },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "How to Choose the Perfect Biodata Template",
    excerpt: "Your biodata is your first introduction. Learn how to pick a design that reflects your personality.",
    date: "June 20, 2024",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    content: "When it comes to matchmaking, the first impression is crucial. A well-designed biodata can set you apart. Consider your audience: if you are from a traditional family, a 'Classic' template with religious symbols might be best. For a professional outlook, a 'Modern' minimalist design works wonders."
  },
  {
    id: '2',
    title: "विवाह बायोडाटा में फोटो का महत्व",
    excerpt: "एक अच्छी फोटो आपके बायोडाटा में जान फूँक सकती है। जानिए सही फोटो चुनने के टिप्स।",
    date: "June 22, 2024",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    content: "शादी के बायोडाटा में फोटो सबसे महत्वपूर्ण हिस्सा होती है। हमेशा साफ और हाल ही में खींची गई फोटो का उपयोग करें। बैकग्राउंड सादा रखें और चेहरे पर एक प्यारी मुस्कान रखें। पारंपरिक पहनावा अक्सर भारतीय विवाह विज्ञापनों में बेहतर प्रभाव डालता है।"
  },
  {
    id: '3',
    title: "लग्नासाठी बायोडाटा तयार करताना या ५ गोष्टी लक्षात ठेवा",
    excerpt: "तुमचा बायोडाटा प्रभावी कसा बनवायचा? या महत्त्वाच्या टिप्स नक्की वाचा.",
    date: "June 25, 2024",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    content: "१. माहिती स्पष्ट आणि अचूक असावी. २. कौटुंबिक पार्श्वभूमी थोडक्यात पण प्रभावीपणे मांडा. ३. शिक्षणाची आणि నోकरीची माहिती సविस्तर द्या. ४. तुमच्या आवडीनिवडींचा उल्लेख करा. ५. एक चांगला फोटो जोडा."
  }
];

export const INITIAL_BIODATA: Biodata = {
  fullName: 'Aarav Malhotra',
  maritalStatus: 'Never Married',
  photo: 'https://picsum.photos/seed/placeholder/200/200',
  godPhoto: 'https://img.icons8.com/color/96/ganesh.png',
  godName: '|| Shri Ganeshaya Namah ||',
  age: '28',
  gender: 'Male',
  dob: '1996-05-15',
  tob: '14:30',
  pob: 'Mumbai, Maharashtra',
  height: '5 ft 11 in',
  weight: '75 kg',
  complexion: 'Fair',
  bloodGroup: 'B+',
  hobbies: 'Chess, Photography, Travel',
  languages: 'English, Hindi, Marathi',
  rashi: 'Leo (Simha)',
  nakshatra: 'Magha',
  gothram: 'Bhardwaj',
  manglik: 'No',
  education: 'Masters in Computer Science, Stanford University',
  profession: 'Senior Software Architect at Tech Giant',
  income: '35 LPA',
  location: 'Mumbai, Maharashtra',
  fatherName: 'Mr. Rajesh Malhotra',
  fatherOccupation: 'Businessman (Real Estate)',
  motherName: 'Mrs. Sunita Malhotra',
  motherOccupation: 'Home Maker',
  siblings: '1 Younger Brother (Studying)',
  nativePlace: 'Pune, Maharashtra',
  maternalUncle: 'Mr. Suresh Deshmukh',
  familyAssets: 'Self-owned flat in Mumbai, Family Bungalow in Pune',
  expectationsAge: '24 - 27 Years',
  expectationsEdu: 'Graduate or Post Graduate',
  expectationsGeneral: 'Seeking a family-oriented partner with a professional career and similar cultural values.',
  phone: '+91 98765 43210',
  email: 'aarav.malhotra@example.com',
  aboutMe: 'A goal-oriented professional with a passion for innovation and a balanced outlook towards life. Values family traditions while embracing modern perspectives.',
  customFields: [],
  templateId: 'elegant-1',
  fieldConfigs: {
    fullName: { label: 'Full Name', visible: true, order: 1 },
    maritalStatus: { label: 'Marital Status', visible: true, order: 1.5 },
    dob: { label: 'Date of Birth', visible: true, order: 2 },
    tob: { label: 'Time of Birth', visible: true, order: 3 },
    pob: { label: 'Place of Birth', visible: true, order: 4 },
    height: { label: 'Height', visible: true, order: 5 },
    weight: { label: 'Weight', visible: true, order: 6 },
    complexion: { label: 'Complexion', visible: true, order: 7 },
    bloodGroup: { label: 'Blood Group', visible: true, order: 8 },
    hobbies: { label: 'Hobbies', visible: true, order: 9 },
    languages: { label: 'Languages Known', visible: true, order: 10 },
    rashi: { label: 'Rashi', visible: true, order: 11 },
    nakshatra: { label: 'Nakshatra', visible: true, order: 12 },
    gothram: { label: 'Gothram', visible: true, order: 13 },
    manglik: { label: 'Manglik?', visible: true, order: 14 },
    education: { label: 'Education', visible: true, order: 15 },
    profession: { label: 'Profession', visible: true, order: 16 },
    income: { label: 'Annual Income', visible: true, order: 17 },
    location: { label: 'Current Location', visible: true, order: 18 },
    fatherName: { label: 'Father\'s Name', visible: true, order: 19 },
    fatherOccupation: { label: 'Father\'s Occupation', visible: true, order: 20 },
    motherName: { label: 'Mother\'s Name', visible: true, order: 21 },
    motherOccupation: { label: 'Mother\'s Occupation', visible: true, order: 22 },
    siblings: { label: 'Siblings', visible: true, order: 23 },
    nativePlace: { label: 'Native Place', visible: true, order: 24 },
    maternalUncle: { label: 'Maternal Uncle', visible: true, order: 25 },
    familyAssets: { label: 'Family Assets', visible: true, order: 26 },
    expectationsAge: { label: 'Partner Age Range', visible: true, order: 27 },
    expectationsEdu: { label: 'Partner Education', visible: true, order: 28 },
    expectationsGeneral: { label: 'General Expectations', visible: true, order: 29 },
    phone: { label: 'Phone', visible: true, order: 30 },
    email: { label: 'Email', visible: true, order: 31 },
    aboutMe: { label: 'About Me', visible: true, order: 32 },
    godName: { label: 'God Name', visible: true, order: 0 }
  },
  customConfig: {
    name: 'My Custom Template',
    background: null,
    textColor: '#1c1917',
    accentColor: '#e11d48',
    fontFamily: 'serif',
    overlayOpacity: 0
  }
};

export type Page = 'home' | 'editor' | 'blog' | 'privacy' | 'contact' | 'blog-post' | 'about' | 'templates';
