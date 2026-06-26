import Reveal from '../ui/Reveal';
import FeatureCard from '../ui/FeatureCard';
import { PRODUCT_CATEGORY_CARDS } from './productsData';

// Product category cards — orientation for the catalog. Each links to the
// catalogue with a premium action cue.
export default function ProductCategories() {
  return (
    <section className="bg-white py-16 dark:bg-slate-950 md:py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
              Explore Product Categories
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              A focused range covering everyday hygiene through to industrial requirements.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORY_CARDS.map(({ icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.05} className="h-full">
              <FeatureCard
                icon={icon}
                title={title}
                description={description}
                href="/products"
                cue="View products"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
