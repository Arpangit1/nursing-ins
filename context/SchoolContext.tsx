import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notice, Course, GalleryItem, SchoolData } from '../types';

interface SchoolContextType {
  schoolData: SchoolData;
  updateSchoolData: (data: SchoolData) => void;
  notices: Notice[];
  addNotice: (notice: Notice) => void;
  deleteNotice: (id: string) => void;
  courses: Course[];
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  gallery: GalleryItem[];
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  isAdminLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

// Initial Mock Data for Nursing College
const INITIAL_NOTICES: Notice[] = [
  { id: '1', title: 'Admissions Open 2024-25', date: '2024-05-15', content: 'Admission forms for GNM and B.Sc Nursing batch 2024-25 are now available at the administrative office. Last date of submission is 30th June.', category: 'Event' },
  { id: '2', title: 'Capping Ceremony', date: '2024-04-10', content: 'The Lamp Lighting and Capping Ceremony for the 1st Year GNM students will be held on 20th April at the Main Auditorium.', category: 'Event' },
  { id: '3', title: 'Final Semester Exams', date: '2024-06-01', content: 'The final theory examinations for B.Sc Nursing will commence from July 10th. Practical schedules will be posted shortly.', category: 'Exam' },
  { id: '4', title: 'Blood Donation Camp', date: '2024-03-22', content: 'A voluntary blood donation camp is organized in collaboration with City Hospital on World Health Day.', category: 'Event' },
];

const INITIAL_COURSES: Course[] = [
  { id: '1', title: 'G.N.M. (General Nursing & Midwifery)', description: 'A diploma course aimed to prepare nurses who function as members of the health team in providing competent care.', gradeLevel: '3 Years + 6 Months Internship', teacher: '10+2 with 40% Marks' },
  { id: '2', title: 'B.Sc. Nursing', description: 'An undergraduate degree program that prepares students for a career in professional nursing and healthcare.', gradeLevel: '4 Years', teacher: '10+2 (Science) with 45%' },
  { id: '3', title: 'Post Basic B.Sc. Nursing', description: 'For those who have already completed GNM and want to upgrade their qualification to a degree level.', gradeLevel: '2 Years', teacher: 'GNM Pass' },
];

const INITIAL_GALLERY: GalleryItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1576091160550-217358c7db81?q=80&w=800&auto=format&fit=crop', caption: 'Advanced Skills Lab' },
  { id: '2', url: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=800&auto=format&fit=crop', caption: 'Capping Ceremony 2023' },
  { id: '3', url: 'https://images.unsplash.com/photo-1581056771107-24ca5f04385d?q=80&w=800&auto=format&fit=crop', caption: 'Clinical Training' },
  { id: '4', url: 'https://images.unsplash.com/photo-1571772996211-2a02a88b3824?q=80&w=800&auto=format&fit=crop', caption: 'Campus Library' },
  { id: '5', url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800&auto=format&fit=crop', caption: 'Hospital Visit' },
  { id: '6', url: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=800&auto=format&fit=crop', caption: 'Student Nurses' },
];

const INITIAL_SCHOOL_DATA: SchoolData = {
  name: "Royal Care Nursing Institute",
  tagline: "Dedication . Compassion . Excellence",
  contactEmail: "admissions@royalcare.edu",
  contactPhone: "+91 98765 43210"
};

export const SchoolProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load from local storage or use initial
  const [schoolData, setSchoolData] = useState<SchoolData>(() => {
    const saved = localStorage.getItem('schoolData');
    return saved ? JSON.parse(saved) : INITIAL_SCHOOL_DATA;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Persistence Effects
  useEffect(() => localStorage.setItem('schoolData', JSON.stringify(schoolData)), [schoolData]);
  useEffect(() => localStorage.setItem('notices', JSON.stringify(notices)), [notices]);
  useEffect(() => localStorage.setItem('courses', JSON.stringify(courses)), [courses]);
  useEffect(() => localStorage.setItem('gallery', JSON.stringify(gallery)), [gallery]);

  // Actions
  const updateSchoolData = (data: SchoolData) => setSchoolData(data);
  
  const addNotice = (notice: Notice) => setNotices(prev => [notice, ...prev]);
  const deleteNotice = (id: string) => setNotices(prev => prev.filter(n => n.id !== id));

  const addCourse = (course: Course) => setCourses(prev => [...prev, course]);
  const deleteCourse = (id: string) => setCourses(prev => prev.filter(c => c.id !== id));

  const addGalleryItem = (item: GalleryItem) => setGallery(prev => [item, ...prev]);
  const deleteGalleryItem = (id: string) => setGallery(prev => prev.filter(g => g.id !== id));

  const login = (password: string) => {
    // Hardcoded for demo purposes
    if (password === 'admin123') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdminLoggedIn(false);

  return (
    <SchoolContext.Provider value={{
      schoolData, updateSchoolData,
      notices, addNotice, deleteNotice,
      courses, addCourse, deleteCourse,
      gallery, addGalleryItem, deleteGalleryItem,
      isAdminLoggedIn, login, logout
    }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) throw new Error("useSchool must be used within a SchoolProvider");
  return context;
};