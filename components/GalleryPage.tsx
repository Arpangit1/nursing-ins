import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { Image as ImageIcon } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const { gallery } = useSchool();

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Campus Gallery</h1>
          <p className="text-teal-200">A glimpse into the vibrant life at our nursing institute.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {gallery.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {gallery.map((item) => (
              <div key={item.id} className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-md">
                <img 
                  src={item.url} 
                  alt={item.caption} 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-medium">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-lg">
            <ImageIcon className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No photos available</h3>
            <p className="text-slate-500">The gallery is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;