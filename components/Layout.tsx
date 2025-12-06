import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Stethoscope, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { schoolData, isAdminLoggedIn, logout } = useSchool();
  const location = useLocation();
  const isPublic = !location.pathname.startsWith('/admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Top Bar */}
      <div className="bg-teal-900 text-teal-50 py-2 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2"><Phone size={14} className="text-teal-400"/> {schoolData.contactPhone}</span>
            <span className="flex items-center gap-2"><Mail size={14} className="text-teal-400"/> {schoolData.contactEmail}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Affiliated with INC & WBNC</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-t-4 border-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Area */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-teal-600 p-2 rounded-lg text-white">
                  <Stethoscope className="h-8 w-8" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl md:text-2xl text-slate-800 leading-tight tracking-tight uppercase">{schoolData.name}</span>
                  <span className="text-xs text-teal-600 font-semibold tracking-widest uppercase">{schoolData.tagline}</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {isPublic ? (
                <>
                  <Link to="/" className="px-4 py-2 text-slate-600 hover:text-teal-700 font-medium hover:bg-teal-50 rounded-md transition-colors">Home</Link>
                  <Link to="/about" className="px-4 py-2 text-slate-600 hover:text-teal-700 font-medium hover:bg-teal-50 rounded-md transition-colors">About</Link>
                  <Link to="/courses" className="px-4 py-2 text-slate-600 hover:text-teal-700 font-medium hover:bg-teal-50 rounded-md transition-colors">Courses</Link>
                  <Link to="/gallery" className="px-4 py-2 text-slate-600 hover:text-teal-700 font-medium hover:bg-teal-50 rounded-md transition-colors">Gallery</Link>
                  <Link to="/notices" className="px-4 py-2 text-slate-600 hover:text-teal-700 font-medium hover:bg-teal-50 rounded-md transition-colors">Notifications</Link>
                  <Link to="/admission" className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                    Admission Inquiry
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Admin Panel</span>
                  <Link to="/" className="text-slate-600 hover:text-teal-600 text-sm font-medium">View Website</Link>
                  {isAdminLoggedIn && (
                    <button 
                      onClick={logout}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-red-200"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-teal-600 p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && isPublic && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-md">Home</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-md">About</Link>
              <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-md">Courses</Link>
              <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-md">Gallery</Link>
              <Link to="/notices" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-md">Notifications</Link>
              <Link to="/admission" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-teal-700 hover:bg-teal-50 rounded-md">Admission Inquiry</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t-4 border-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 text-white">
                <Stethoscope className="text-teal-400" />
                <span className="font-bold text-xl">{schoolData.name}</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm mb-6 text-slate-400">
                Dedicated to excellence in nursing education. We prepare compassionate and competent healthcare professionals to serve humanity with dedication.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer">F</div>
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer">T</div>
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer">I</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4 border-b border-slate-700 pb-2 inline-block">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
                <li><Link to="/courses" className="hover:text-teal-400 transition-colors">Courses</Link></li>
                <li><Link to="/gallery" className="hover:text-teal-400 transition-colors">Gallery</Link></li>
                <li><Link to="/admission" className="hover:text-teal-400 transition-colors">Admissions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4 border-b border-slate-700 pb-2 inline-block">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <p className="flex items-start gap-3">
                  <MapPin size={16} className="text-teal-500 mt-1" />
                  <span>123 Medical Campus Road,<br/>Health City, West Bengal - 700001</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={16} className="text-teal-500" />
                  <span>{schoolData.contactPhone}</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail size={16} className="text-teal-500" />
                  <span>{schoolData.contactEmail}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {schoolData.name}. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
               <Link to="/admin" className="hover:text-teal-400 transition-colors">Admin Login</Link>
               <span className="text-slate-700">|</span>
               <button className="hover:text-teal-400" onClick={(e) => e.preventDefault()}>Privacy Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;