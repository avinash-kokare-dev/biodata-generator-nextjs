
export type TemplateID = 
  | 'classic-1' | 'classic-2' | 'classic-3' | 'classic-4' | 'classic-5'
  | 'modern-1' | 'modern-2' | 'modern-3' | 'modern-4' | 'modern-5'
  | 'elegant-1' | 'elegant-2' | 'elegant-3' | 'elegant-4' | 'elegant-5'
  | 'custom-1';

export interface FieldConfig {
  label: string;
  visible: boolean;
  order: number;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
  visible: boolean;
  order: number;
  sectionId: string;
}

export interface CustomTemplateConfig {
  name: string;
  background: string | null;
  textColor: string;
  accentColor: string;
  fontFamily: 'serif' | 'sans' | 'script';
  overlayOpacity: number;
}

export interface Biodata {
  fullName: string;
  maritalStatus: string;
  photo: string | null;
  godPhoto: string | null;
  godName: string;
  // Personal & Birth
  age: string;
  gender: string;
  dob: string;
  tob: string;
  pob: string;
  height: string;
  weight: string;
  complexion: string;
  bloodGroup: string;
  hobbies: string;
  languages: string;
  // Horoscope
  rashi: string;
  nakshatra: string;
  gothram: string;
  manglik: string;
  // Professional
  education: string;
  profession: string;
  income: string;
  location: string;
  // Family
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  nativePlace: string;
  maternalUncle: string;
  familyAssets: string;
  // Partner Expectations
  expectationsAge: string;
  expectationsEdu: string;
  expectationsGeneral: string;
  // Contact & Social
  phone: string;
  email: string;
  aboutMe: string;
  customFields: CustomField[];
  templateId: TemplateID;
  fieldConfigs: Record<string, FieldConfig>;
  customConfig: CustomTemplateConfig;
}

export interface Testimonial {
  id: number;
  name: string;
  review: string;
  rating: number;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}
