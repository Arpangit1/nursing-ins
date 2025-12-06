import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { Link } from 'react-router-dom';
import { Calendar, Users, Book, ChevronRight, Microscope, Building2, Bus, Bed, Bell, Award } from 'lucide-react';

const PublicView: React.FC = () => {
  const { schoolData, notices, courses, gallery } = useSchool();

  // Get snippets/limits for home page
  const recentNotices = notices.slice(0, 3);
  const featuredCourses = courses.slice(0, 3);
  const galleryPreview = gallery.slice(0, 4);

  return (
    <div className="space-y-0">
      
      {/* Notice Ticker */}
      <div className="bg-teal-800 text-white overflow-hidden py-2 relative z-20">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="bg-red-600 px-4 py-1 text-xs font-bold uppercase tracking-wider z-10 hidden sm:block shadow-md">
            Latest Updates
          </div>
          <div className="flex-grow overflow-hidden relative h-6">
            <div className="animate-marquee whitespace-nowrap absolute top-0 left-0 flex items-center gap-8 h-full">
              {notices.map((notice, idx) => (
                <span key={idx} className="text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block animate-pulse"></span>
                  {notice.title} <span className="text-teal-300 mx-2">|</span>
                </span>
              ))}
              <span className="text-sm">Welcome to {schoolData.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" 
            alt="Nursing Students" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-2xl animate-in slide-in-from-left duration-700">
            <span className="bg-teal-500 text-white px-3 py-1 rounded text-sm font-bold uppercase tracking-widest mb-4 inline-block">
              Excellence in Nursing Education
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Shaping the Future of <span className="text-teal-400">Healthcare</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 font-light">
              Join a premier institution dedicated to cultivating compassionate, competent, and professional nurses for the global healthcare sector.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses" className="bg-teal-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-teal-400 transition-all text-center shadow-lg shadow-teal-900/50">
                Explore Courses
              </Link>
              <Link to="/admission" className="bg-white text-teal-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all text-center shadow-lg">
                Admission Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Summary */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-100 rounded-tl-3xl -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop" 
                alt="Campus Life" 
                className="w-full rounded-lg shadow-xl object-cover h-[400px]"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome to {schoolData.name}</h2>
              <div className="w-20 h-1.5 bg-teal-500 mb-6"></div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We believe that nursing is not just a profession, but a calling. Our institute is committed to providing world-class education with a perfect blend of theoretical knowledge and practical training.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-teal-50 rounded text-teal-600"><Award size={24} /></div>
                   <div>
                     <h4 className="font-bold text-slate-800">Certified</h4>
                     <p className="text-sm text-slate-500">INC & WBNC Approved</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-teal-50 rounded text-teal-600"><Users size={24} /></div>
                   <div>
                     <h4 className="font-bold text-slate-800">Expert Faculty</h4>
                     <p className="text-sm text-slate-500">Industry Leaders</p>
                   </div>
                </div>
              </div>
              
              <Link to="/about" className="inline-flex items-center text-teal-700 font-bold hover:text-teal-900 transition-colors">
                Read More About Us <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">Academic Programs</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">Featured Courses</h2>
            </div>
            <Link to="/courses" className="hidden md:flex items-center text-teal-700 font-semibold hover:text-teal-900">
              View All Courses <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border-t-4 border-teal-500 group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div className="bg-teal-50 p-3 rounded-lg text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                       <Book size={24} />
                     </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                  
                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar className="w-4 h-4 mr-2 text-teal-500" />
                      <span className="font-semibold mr-2">Duration:</span> {course.gradeLevel}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/courses" className="text-teal-700 font-bold">View All Courses →</Link>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-teal-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mt-2">World Class Facilities</h2>
            <p className="text-teal-200 mt-4 max-w-2xl mx-auto">We provide the best infrastructure to support your education.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Microscope, title: "Modern Labs", desc: "Anatomy & Nutrition" },
              { icon: Building2, title: "Hospital", desc: "Own Parent Hospital" },
              { icon: Bed, title: "Hostel", desc: "Secure Housing" },
              { icon: Bus, title: "Transport", desc: "Bus Service" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-teal-800/50 hover:bg-teal-700 transition-colors border border-teal-700">
                <item.icon className="w-12 h-12 mx-auto mb-4 text-teal-300" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-teal-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Notices */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Notice Board</h2>
            <Link to="/notices" className="text-teal-600 font-bold hover:text-teal-800">View Archives →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
             {recentNotices.map((notice) => (
               <div key={notice.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-slate-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      notice.category === 'Exam' ? 'bg-red-100 text-red-700' : 'bg-teal-100 text-teal-700'
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-500">{new Date(notice.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{notice.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4">{notice.content}</p>
                  <Link to="/notices" className="text-sm text-teal-600 font-medium hover:underline">Read details</Link>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Life at Campus</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {galleryPreview.map((item) => (
              <div key={item.id} className="relative group overflow-hidden rounded-lg shadow-sm aspect-square">
                <img 
                  src={item.url} 
                  alt={item.caption} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
          <Link to="/gallery" className="inline-block bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition-colors">
            View All Photos
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PublicView;