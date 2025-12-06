import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { Book, Clock, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoursesPage: React.FC = () => {
  const { courses } = useSchool();

  return (
    <div className="bg-slate-50 min-h-screen">
       <div className="bg-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Academic Programs</h1>
          <p className="text-teal-200">Our courses are designed to meet the evolving needs of the healthcare sector.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-teal-50 p-8 flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-teal-600 shadow-sm">
                  <GraduationCap size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{course.title}</h3>
                <span className="inline-block bg-teal-600 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">Full Time</span>
              </div>
              <div className="md:w-2/3 p-8">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Course Overview</h4>
                <p className="text-slate-600 mb-6">{course.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Clock className="text-teal-500 mt-1" size={20} />
                    <div>
                      <span className="block font-bold text-slate-800">Duration</span>
                      <span className="text-slate-600">{course.gradeLevel}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-500 mt-1" size={20} />
                    <div>
                      <span className="block font-bold text-slate-800">Eligibility</span>
                      <span className="text-slate-600">{course.teacher}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link to="/admission" className="inline-block bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;