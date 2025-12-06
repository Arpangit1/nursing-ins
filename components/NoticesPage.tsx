import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { Bell, Calendar } from 'lucide-react';

const NoticesPage: React.FC = () => {
  const { notices } = useSchool();

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Notifications & Circulars</h1>
          <p className="text-teal-200">Stay updated with the latest news, events, and exam schedules.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
          <div className="bg-teal-600 px-6 py-4 flex items-center gap-2">
            <Bell className="text-white" />
            <span className="font-bold text-white text-lg">All Announcements</span>
          </div>
          <div className="divide-y divide-gray-100">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div key={notice.id} className="p-6 md:p-8 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                     <div className="flex-shrink-0 bg-slate-100 rounded-lg p-4 text-center min-w-[100px] border border-slate-200">
                        <span className="block text-3xl font-bold text-teal-600">{new Date(notice.date).getDate()}</span>
                        <span className="block text-sm font-bold text-slate-500 uppercase">{new Date(notice.date).toLocaleString('default', { month: 'short', year: 'numeric' })}</span>
                     </div>
                     <div className="flex-grow">
                       <div className="flex items-center gap-2 mb-2">
                         <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            notice.category === 'Exam' ? 'bg-red-100 text-red-700' : 'bg-teal-100 text-teal-700'
                          }`}>
                            {notice.category}
                          </span>
                       </div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2">{notice.title}</h3>
                       <p className="text-slate-600 leading-relaxed">{notice.content}</p>
                     </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-500">
                No active notices at this moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticesPage;