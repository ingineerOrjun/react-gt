-- 0010 | Seed data
-- Idempotent: re-running is safe (ON CONFLICT DO NOTHING on unique keys).
-- Image binaries are uploaded separately by supabase/seed/upload-images.mjs to
-- the object keys referenced in image_path below. Run that script before/after
-- this migration (order does not matter; rows simply point at the keys).

-- ---------- site_settings singleton ----------
insert into public.site_settings
  (singleton, site_title, contact_email, contact_phone, address,
   facebook_url, twitter_url, instagram_url, linkedin_url)
values
  (true,
   'GreenTouch Chemicals Pvt. Ltd.',
   'greentouchgrouppvtltd.1@gmail.com',
   '9801603296',
   'Kushwaha Chock Dhalkebar, Dhanusa district',
   'https://facebook.com/greentouchchemicalsindustries',
   'https://twitter.com/greentouchchem',
   'https://instagram.com/greentouchchemicalsindustries',
   'https://linkedin.com/company/greentouch-chemical-industries')
on conflict (singleton) do nothing;

-- ---------- products ----------
insert into public.products (slug, name, description, image_path, published, published_at, display_order)
values
  ('prithvi-phenyl', 'Prithvi Phenyl',
   'Keep your home fresh and germ-free with Prithvi Phenyl, a powerful disinfectant that removes stains and odors for a spotless clean.',
   'seed/prithvi-phenyl.jpeg', true, now(), 1),
  ('prithvi-liquid-blue', 'Prithvi Liquid Blue',
   'Enhance your whites with Prithvi Liquid Blue, delivering a bright, long-lasting shine to your fabrics with every wash.',
   'seed/prithvi-liquid-blue.jpeg', true, now(), 2),
  ('prithvi-tiles-cleaner', 'Prithvi Tiles Cleaner',
   'Restore the sparkle of your floors with Prithvi Tiles Cleaner, an effective formula that removes tough stains, grime, and watermarks effortlessly.',
   'seed/prithvi-tiles-cleaner.jpeg', true, now(), 3),
  ('prithvi-glass-cleaner', 'Prithvi Glass Cleaner',
   'Get crystal clear windows and mirrors with Prithvi Glass Cleaner, leaving no streaks or residue behind for perfect clarity.',
   'seed/prithvi-glass-cleaner.jpeg', true, now(), 4),
  ('prithvi-dishwash-liquid', 'Prithvi Dishwash Liquid',
   'Our powerful yet gentle dishwashing liquid cuts through grease while being kind to your hands and the environment.',
   'seed/prithvi-dishwash-liquid.jpeg', true, now(), 5),
  ('prithvi-all-purpose-cleaner', 'Prithvi All-Purpose Cleaner',
   'A versatile cleaning solution that works on multiple surfaces, making it perfect for all your household cleaning needs.',
   'seed/prithvi-all-purpose-cleaner.jpeg', true, now(), 6)
on conflict (slug) do nothing;

-- ---------- blogs ----------
insert into public.blogs (slug, title, excerpt, content, image_path, published, published_at, display_order)
values
  ('sustainable-chemistry-innovations-for-a-green-future',
   'Sustainable Chemistry: Innovations for a Green Future',
   'Discover the latest innovations in eco-friendly chemical solutions that are transforming industries while protecting our planet.',
   'Sustainable chemistry is no longer a niche pursuit — it is rapidly becoming the foundation of modern manufacturing. As industries face mounting pressure to reduce their environmental footprint, green chemical solutions offer a path to growth that does not come at the planet''s expense.

At GreenTouch, our research focuses on replacing hazardous reagents with biodegradable alternatives, designing closed-loop processes that minimise waste, and developing water-based formulations that eliminate harmful solvents entirely.

The results speak for themselves: cleaner production lines, safer workplaces, and end products that meet the highest international sustainability standards without compromising on performance.',
   'seed/sustainable-chemistry-innovations-for-a-green-future.jpg', true, now(), 1),

  ('natural-compounds-revolutionizing-industrial-cleaning',
   'How Natural Compounds are Revolutionizing Industrial Cleaning',
   'Learn how plant-based chemical compounds are providing safer alternatives to traditional industrial cleaning products.',
   'Traditional industrial cleaners often rely on aggressive solvents that pose risks to both workers and the environment. Plant-derived surfactants are changing that equation.

Derived from renewable sources such as coconut and corn, these compounds break down grease and grime just as effectively as their petrochemical counterparts — while remaining fully biodegradable.

Our laboratory trials show plant-based formulations matching, and in several cases exceeding, the cleaning power of conventional products.',
   'seed/natural-compounds-revolutionizing-industrial-cleaning.jpg', true, now(), 2),

  ('environmental-impact-of-chemical-manufacturing',
   'The Environmental Impact of Chemical Manufacturing: Our Commitment',
   'Read about our commitment to reducing our carbon footprint and implementing sustainable practices in our manufacturing processes.',
   'Manufacturing chemicals responsibly means accounting for every stage of the product lifecycle — from raw material sourcing to end-of-life disposal.

GreenTouch has invested heavily in carbon-neutral production, optimising energy use across our facilities and offsetting unavoidable emissions through verified reforestation programmes.

Transparency is central to our approach. We publish our environmental metrics annually and continuously set more ambitious targets.',
   'seed/environmental-impact-of-chemical-manufacturing.jpg', true, now(), 3),

  ('green-certification-for-chemical-products',
   'Green Certification: What It Means for Chemical Products',
   'Understand the importance of green certification for chemical products and how it ensures environmental compliance.',
   'Green certifications give buyers confidence that a product genuinely meets rigorous environmental and safety criteria — cutting through marketing claims with independent verification.

Standards such as ISO 14001 assess everything from ingredient sourcing to manufacturing emissions and packaging recyclability.

Every GreenTouch product is developed with certification in mind from day one.',
   'seed/green-certification-for-chemical-products.jpg', true, now(), 4),

  ('biodegradable-formulations-future-of-industrial-chemicals',
   'Biodegradable Formulations: The Future of Industrial Chemicals',
   'Explore how biodegradable formulations are setting new standards in the industrial chemical sector.',
   'Biodegradability is fast becoming a baseline expectation rather than a premium feature. Regulators and consumers alike are demanding products that return safely to nature.

Formulating for biodegradability requires careful molecular design — ensuring compounds break down completely without leaving persistent or toxic residues behind.

Our biodegradable product line demonstrates that environmental responsibility and industrial-grade performance are not mutually exclusive.',
   'seed/biodegradable-formulations-future-of-industrial-chemicals.jpg', true, now(), 5),

  ('chemical-safety-best-practices',
   'Chemical Safety: Best Practices for Handling and Storage',
   'Essential guidelines for safely handling and storing chemical products to protect both people and the environment.',
   'Even the greenest chemicals must be handled and stored correctly to ensure the safety of people and the surrounding environment.

Key practices include proper labelling, temperature-controlled storage, adequate ventilation, and readily available safety data sheets for every product on site.

Training staff to follow consistent handling protocols dramatically reduces the risk of spills and exposure.',
   'seed/chemical-safety-best-practices.jpg', true, now(), 6)
on conflict (slug) do nothing;
