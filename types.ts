export interface Notice {
  id: string;
  title: string;
  date: string;
  content: string;
  category: 'General' | 'Exam' | 'Event' | 'Holiday';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  gradeLevel: string;
  teacher: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
}

export interface SchoolData {
  name: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
}

export type TabType = 'dashboard' | 'notices' | 'courses' | 'gallery' | 'settings';
