import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { Award, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  const { schoolData } = useSchool();

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-900/50 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">Building the foundation of healthcare with compassion and excellence.</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
             <div className="bg-teal-50 p-8 rounded-xl text-center border border-teal-100">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-teal-600">
                 <Target size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-4">Our Mission</h3>
               <p className="text-slate-600">To create a world-class nursing educational environment that fosters academic excellence, clinical competence, and community service.</p>
             </div>
             <div className="bg-teal-50 p-8 rounded-xl text-center border border-teal-100">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-teal-600">
                 <Heart size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-4">Our Vision</h3>
               <p className="text-slate-600">To be a globally recognized centre of excellence in nursing education, preparing leaders who will shape the future of healthcare.</p>
             </div>
             <div className="bg-teal-50 p-8 rounded-xl text-center border border-teal-100">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-teal-600">
                 <Award size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-4">Core Values</h3>
               <p className="text-slate-600">Integrity, Compassion, Professionalism, Innovation, and Respect for Human Dignity form the pillars of our institution.</p>
             </div>
          </div>

          {/* Principal Message */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop" alt="Principal" className="w-full h-full object-cover" />
            </div>
            <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
              <h4 className="text-teal-600 font-bold uppercase tracking-widest mb-2">From the Principal's Desk</h4>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Dr. S. Chatterjee</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                "Welcome to {schoolData.name}. Nursing is a noble profession that requires a unique blend of scientific knowledge, technical skills, and human understanding. 
                Our curriculum is designed to not only meet the highest academic standards but also to instill ethical values and leadership qualities in our students."
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                "We are equipped with modern laboratories, a comprehensive library, and excellent clinical training facilities at our parent hospital to ensure our students get the best learning experience."
              </p>
              <div className="font-signature text-2xl text-teal-800">S. Chatterjee</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;