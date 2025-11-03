import React, { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Optional: Replace this URL with your real API endpoint or remove this block if not needed
    axios.get('/api/blue-carbon-info')
      .then(response => setInfo(response.data))
      .catch(() => setError('Failed to load additional info.'));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-10 mt-16 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl shadow-lg border border-blue-200">
      <h1 className="text-5xl font-extrabold text-blue-900 mb-8 text-center">
        About Blue Carbon Registry
      </h1>

      <p className="text-lg text-gray-800 leading-relaxed mb-6">
        The <span className="font-semibold text-blue-700">Blue Carbon Registry</span> is a web-based platform designed to support the conservation and restoration of coastal and marine ecosystems by tracking and managing blue carbon credits. It helps organizations and individuals transparently monitor their contributions toward reducing carbon emissions through activities like protecting mangroves, seagrasses, and salt marshes. By simplifying blue carbon credit management, this project promotes environmental sustainability and combats climate change.
      </p>

      <p className="text-lg text-gray-800 leading-relaxed mb-10">
        This project is built using modern technologies such as <span className="font-semibold text-blue-700">React</span> with <span className="font-semibold text-blue-700">React Router DOM</span> for smooth navigation, <span className="font-semibold text-blue-700">Axios</span> for reliable data fetching, and <span className="font-semibold text-blue-700">Tailwind CSS</span> for a beautiful, responsive design.
      </p>

      {/* Optional dynamic info */}
      <div className="bg-blue-100 border border-blue-300 rounded-md p-6 shadow-sm">
        {error && <p className="text-red-600 font-semibold">{error}</p>}

        {info ? (
          <>
            <h2 className="text-3xl font-semibold text-blue-800 mb-3">Latest Update</h2>
            <p className="text-gray-700">{info.description}</p>
          </>
        ) : !error ? (
          <p className="text-gray-600 italic">Loading latest update...</p>
        ) : null}
      </div>
    </div>
  );
};

export default About;