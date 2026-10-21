import React from 'react';
import { BanquetPackagesSection } from '../components/BanquetPackagesSection.js';

export * from '../components/BanquetPackagesSection.js';

export const Packages: React.FC = () => {
  return (
    <div className="pt-32 pb-28 relative z-10 min-h-screen text-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BanquetPackagesSection
          showHeader={true}
          showCalculator={true}
          showConsultationBanner={true}
          kicker="Royal Emerald Banquet Collection"
          title="Curated Catering Packages"
          subtitle="Transparent per-guest catering rates with complete live counters, uniform service stewards, warming chafing buffet setup, and authentic freshly prepared delicacies."
        />
      </div>
    </div>
  );
};
