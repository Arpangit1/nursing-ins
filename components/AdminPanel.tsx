import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { TabType, Notice, Course, GalleryItem } from '../types';
import { LayoutDashboard, Bell, BookOpen, Image as ImageIcon, Settings, Plus, Trash2, Wand2, Loader2, Save, Stethoscope } from 'lucide-react';
import { generateContent } from '../services/geminiService';

const AdminPanel: React.FC = () => {
  const { 
    isAdminLoggedIn, login, 
    schoolData, updateSchoolData,
    notices, addNotice, deleteNotice,
    courses, addCourse, deleteCourse,
    gallery, addGalleryItem, deleteGalleryItem
  } = useSchool();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // --- Login Screen ---
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="text-teal-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Institute Admin</h2>
            <p className="text-gray-500 mt-2">Secure access for staff and faculty.</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!login(password)) {
              setError('Invalid password. Try "admin123"');
            }
          }}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                placeholder="••••••••"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-teal-800 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200"
            >
              Access Dashboard
            </button>
            <div className="mt-6 text-center text-xs text-gray-400">
              Demo Password: admin123
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- Dashboard Components ---
  
  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Notices</p>
            <h3 className="text-3xl font-bold text-teal-900 mt-1">{notices.length}</h3>
          </div>
          <div className="bg-teal-50 p-3 rounded-lg"><Bell className="text-teal-600" size={24} /></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Programs Offered</p>
            <h3 className="text-3xl font-bold text-blue-900 mt-1">{courses.length}</h3>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg"><BookOpen className="text-blue-600" size={24} /></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Gallery Photos</p>
            <h3 className="text-3xl font-bold text-purple-900 mt-1">{gallery.length}</h3>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg"><ImageIcon className="text-purple-600" size={24} /></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-700">Administration</h3>
            </div>
            <nav className="p-2 space-y-1">
              {[
                { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
                { id: 'notices', label: 'Notice Board', icon: Bell },
                { id: 'courses', label: 'Curriculum', icon: BookOpen },
                { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id 
                      ? 'bg-teal-50 text-teal-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
            <p className="text-gray-500 text-sm">Manage website content and updates.</p>
          </div>

          {activeTab === 'dashboard' && <DashboardStats />}
          {activeTab === 'notices' && <NoticesManager notices={notices} addNotice={addNotice} deleteNotice={deleteNotice} />}
          {activeTab === 'courses' && <CoursesManager courses={courses} addCourse={addCourse} deleteCourse={deleteCourse} />}
          {activeTab === 'gallery' && <GalleryManager gallery={gallery} addGalleryItem={addGalleryItem} deleteGalleryItem={deleteGalleryItem} />}
          {activeTab === 'settings' && <SettingsManager schoolData={schoolData} updateSchoolData={updateSchoolData} />}

        </div>
      </div>
    </div>
  );
};

// --- Sub-components for Admin Sections ---

// 1. Notices Manager with AI
const NoticesManager: React.FC<{ 
  notices: Notice[], 
  addNotice: (n: Notice) => void, 
  deleteNotice: (id: string) => void 
}> = ({ notices, addNotice, deleteNotice }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'General' });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiGenerate = async () => {
    if (!formData.title) return alert("Please enter a title to guide the AI.");
    setIsGenerating(true);
    const content = await generateContent(formData.title, "Write a formal school notice body based on this title for a nursing college notice board.");
    setFormData(prev => ({ ...prev, content }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotice({
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      category: formData.category as any,
      date: new Date().toISOString()
    });
    setFormData({ title: '', content: '', category: 'General' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">All Circulars & Notices</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 flex items-center gap-2"
        >
          <Plus size={16} /> Add Notice
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 animate-in fade-in slide-in-from-top-4">
          <h4 className="font-semibold mb-4 text-teal-900">Create New Notice</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-md" placeholder="e.g. Exam Schedule" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded-md">
                  <option>General</option>
                  <option>Exam</option>
                  <option>Event</option>
                  <option>Admission</option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <button type="button" onClick={handleAiGenerate} disabled={isGenerating} className="text-xs text-teal-600 hover:text-teal-800 flex items-center gap-1 font-medium bg-teal-50 px-2 py-1 rounded">
                  {isGenerating ? <Loader2 className="animate-spin" size={12} /> : <Wand2 size={12} />}
                  AI Auto-Draft
                </button>
              </div>
              <textarea required rows={4} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-2 border rounded-md" placeholder="Enter full details..."></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700">Publish Notice</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {notices.map(notice => (
            <li key={notice.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{notice.title}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{notice.category}</span>
                </div>
                <p className="text-sm text-gray-500 truncate max-w-md">{notice.content}</p>
              </div>
              <button onClick={() => deleteNotice(notice.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
            </li>
          ))}
          {notices.length === 0 && <li className="p-8 text-center text-gray-500">No notices found.</li>}
        </ul>
      </div>
    </div>
  );
};

// 2. Courses Manager
const CoursesManager: React.FC<{
  courses: Course[],
  addCourse: (c: Course) => void,
  deleteCourse: (id: string) => void
}> = ({ courses, addCourse, deleteCourse }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', gradeLevel: '', teacher: '', description: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiGenerate = async () => {
    if (!formData.title) return alert("Please enter a course title first.");
    setIsGenerating(true);
    const description = await generateContent(formData.title, "Write a short, engaging course description (under 40 words) for a nursing course.");
    setFormData(prev => ({ ...prev, description }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse({ id: Date.now().toString(), ...formData });
    setFormData({ title: '', gradeLevel: '', teacher: '', description: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Academic Programs</h3>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Program
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 animate-in fade-in">
           <h4 className="font-semibold mb-4 text-blue-900">Add New Course</h4>
           <form onSubmit={handleSubmit} className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <input required placeholder="Course Name (e.g. B.Sc Nursing)" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="p-2 border rounded-md" />
               <input required placeholder="Duration (e.g. 4 Years)" value={formData.gradeLevel} onChange={e => setFormData({...formData, gradeLevel: e.target.value})} className="p-2 border rounded-md" />
               <input required placeholder="Eligibility (e.g. 10+2 Science)" value={formData.teacher} onChange={e => setFormData({...formData, teacher: e.target.value})} className="p-2 border rounded-md" />
             </div>
             <div className="relative">
               <textarea required placeholder="Course Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-md pr-24" />
               <button type="button" onClick={handleAiGenerate} disabled={isGenerating} className="absolute right-2 top-2 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-100">
                  {isGenerating ? <Loader2 className="animate-spin" size={12} /> : <Wand2 size={12} />} AI Desc
               </button>
             </div>
             <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Save Course</button>
             </div>
           </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm">
            <div>
              <h4 className="font-bold text-gray-900">{course.title}</h4>
              <p className="text-sm text-gray-500">Duration: {course.gradeLevel} • Eligibility: {course.teacher}</p>
              <p className="text-sm text-gray-600 mt-1">{course.description}</p>
            </div>
            <button onClick={() => deleteCourse(course.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Gallery Manager
const GalleryManager: React.FC<{
  gallery: GalleryItem[],
  addGalleryItem: (item: GalleryItem) => void,
  deleteGalleryItem: (id: string) => void
}> = ({ gallery, addGalleryItem, deleteGalleryItem }) => {
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!url) return;
    addGalleryItem({ id: Date.now().toString(), url, caption });
    setUrl('');
    setCaption('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
        <h3 className="text-lg font-medium mb-4">Add New Photo</h3>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input 
            type="url" 
            placeholder="Image URL (e.g. https://example.com/photo.jpg)" 
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="flex-grow p-2 border rounded-md"
            required
          />
          <input 
            type="text" 
            placeholder="Caption" 
            value={caption}
            onChange={e => setCaption(e.target.value)}
            className="flex-grow md:w-1/3 p-2 border rounded-md"
            required
          />
          <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700">Add</button>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map(item => (
          <div key={item.id} className="group relative rounded-lg overflow-hidden bg-gray-100 aspect-square">
            <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
              <p className="text-white text-xs truncate mb-2">{item.caption}</p>
              <button onClick={() => deleteGalleryItem(item.id)} className="bg-red-500 text-white text-xs py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Settings Manager
const SettingsManager: React.FC<{
  schoolData: any,
  updateSchoolData: (data: any) => void
}> = ({ schoolData, updateSchoolData }) => {
  const [data, setData] = useState(schoolData);

  const handleSave = () => {
    updateSchoolData(data);
    alert("Settings saved successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
      <h3 className="text-lg font-medium mb-6">General Institute Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name</label>
          <input type="text" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tagline / Motto</label>
          <input type="text" value={data.tagline} onChange={e => setData({...data, tagline: e.target.value})} className="w-full p-2 border rounded-md" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input type="email" value={data.contactEmail} onChange={e => setData({...data, contactEmail: e.target.value})} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
            <input type="text" value={data.contactPhone} onChange={e => setData({...data, contactPhone: e.target.value})} className="w-full p-2 border rounded-md" />
          </div>
        </div>
        <div className="pt-4">
          <button onClick={handleSave} className="bg-teal-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 flex items-center gap-2">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;