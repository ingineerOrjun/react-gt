import React from 'react';

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalPage({ title, lastUpdated, intro, sections }: LegalPageProps) {
  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen">
      <section className="bg-gradient-to-r from-green-700 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">{title}</h1>
          <p className="text-green-100">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 md:p-10">
          <p className="text-lg text-gray-700 dark:text-slate-300 leading-relaxed mb-8">{intro}</p>
          <div className="space-y-8">
            {sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-400 mb-3">
                  {section.heading}
                </h2>
                <div className="space-y-3 text-gray-600 dark:text-slate-300 leading-relaxed">
                  {section.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
