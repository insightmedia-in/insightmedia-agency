import React from "react";

interface Client {
  id: number;
  name: string;
  logo?: string;
  isImageBased: boolean;
}

const clients: Client[] = [
  {
    id: 1,
    name: "Flinxx",
    logo: "/newlogofl.png",
    isImageBased: true,
  },
  {
    id: 2,
    name: "Peryris",
    logo: "/Peryris.png",
    isImageBased: true,
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="relative z-10 px-4 xs:px-5 sm:px-6 py-16 sm:py-20 md:px-12 lg:px-20 max-w-7xl mx-auto" data-section="projects">
      {/* Section Header */}
      <div className="mb-10 sm:mb-16" data-purpose="clients-header">
        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 sm:mb-4 leading-tight dark:text-white light:text-gray-900">
          Featured <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">Projects</span>
        </h2>
      </div>

      {/* Clients Grid - Simple clean layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl">
        {clients.map((client) => (
          <div key={client.id}>
            {/* Logo-based client */}
            {client.isImageBased ? (
              <div className="w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[320px] aspect-square rounded-2xl xs:rounded-3xl flex items-center justify-center overflow-hidden cursor-pointer group border transition-smooth dark:border-[rgba(255,115,0,0.22)] light:border-gray-300 dark:bg-gradient-to-br dark:from-[#111111] dark:via-[#1a1a1a] dark:to-[#222222] light:bg-gradient-to-br light:from-white light:via-gray-50 light:to-gray-100" style={{boxShadow: 'var(--light-shadow)'}}>
                {client.logo && (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-[95%] max-h-[95%] object-contain mx-auto filter group-hover:brightness-110 transition-smooth"
                  />
                )}
              </div>
            ) : (
              /* Text-based client with premium styling */
              <div className="w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[320px] aspect-square rounded-2xl xs:rounded-3xl flex items-center justify-center overflow-hidden cursor-pointer group border transition-smooth dark:border-[rgba(255,115,0,0.22)] light:border-gray-300 dark:bg-gradient-to-br dark:from-[#111111] dark:via-[#1a1a1a] dark:to-[#222222] light:bg-gradient-to-br light:from-white light:via-gray-50 light:to-gray-100" style={{boxShadow: 'var(--light-shadow)'}}>
                <div className="text-center px-4 xs:px-5 sm:px-6">
                  <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r dark:from-white dark:via-gray-200 dark:to-white light:from-gray-900 light:via-gray-700 light:to-gray-900 bg-clip-text text-transparent group-hover:dark:from-brand-orange group-hover:dark:via-orange-300 group-hover:dark:to-brand-orange group-hover:light:from-rose-600 group-hover:light:via-rose-500 group-hover:light:to-rose-600 transition-smooth">
                    {client.name}
                  </h3>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
