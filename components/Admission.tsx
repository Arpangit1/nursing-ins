import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { Send, CheckCircle } from 'lucide-react';

const Admission: React.FC = () => {
  const { courses, schoolData } = useSchool();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Admission Inquiry</h1>
          <p className="text-teal-200">Take the first step towards a rewarding career in nursing.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Information Side */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Admission Process</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Check Eligibility</h3>
                  <p className="text-slate-600 text-sm">Ensure you meet the academic criteria for GNM or B.Sc Nursing as prescribed by INC.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Submit Application</h3>
                  <p className="text-slate-600 text-sm">Fill out the inquiry form or visit our campus to collect the prospectus and application form.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Counseling & Interview</h3>
                  <p className="text-slate-600 text-sm">Qualified candidates will be called for a counseling session and document verification.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-teal-50 p-6 rounded-xl border border-teal-100">
               <h3 className="font-bold text-teal-900 mb-2">Need Help?</h3>
               <p className="text-slate-600 text-sm mb-4">Contact our admission cell directly.</p>
               <p className="font-bold text-teal-700 text-lg">{schoolData.contactPhone}</p>
               <p className="text-slate-600 text-sm">{schoolData.contactEmail}</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                <p className="text-slate-600 mb-6">Your inquiry has been sent successfully. Our admission counselor will contact you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="text-teal-600 font-bold hover:underline">Submit another inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Inquiry Form</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input type="text" required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input type="text" required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input type="email" required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="tel" required className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="+91 9876543210" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Course Interested In</label>
                  <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
                    <option value="">Select a course...</option>
                    {courses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message (Optional)</label>
                  <textarea rows={4} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="I have a question regarding..."></textarea>
                </div>

                <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                  <Send size={18} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admission;