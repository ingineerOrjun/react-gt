// Shared blog content. Single source of truth for the blog list page and the
// individual post pages. (Will be replaced by Supabase queries in a later phase.)

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  featured?: boolean;
  /** Article body as an ordered list of paragraphs. */
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Sustainable Chemistry: Innovations for a Green Future',
    excerpt:
      'Discover the latest innovations in eco-friendly chemical solutions that are transforming industries while protecting our planet.',
    category: 'sustainability',
    date: 'May 15, 2023',
    readTime: '5 min read',
    author: 'Dr. Ananya Sharma',
    image:
      'https://images.unsplash.com/photo-1616069954520-c883645aeec9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    featured: true,
    content: [
      'Sustainable chemistry is no longer a niche pursuit — it is rapidly becoming the foundation of modern manufacturing. As industries face mounting pressure to reduce their environmental footprint, green chemical solutions offer a path to growth that does not come at the planet’s expense.',
      'At GreenTouch, our research focuses on replacing hazardous reagents with biodegradable alternatives, designing closed-loop processes that minimise waste, and developing water-based formulations that eliminate harmful solvents entirely.',
      'The results speak for themselves: cleaner production lines, safer workplaces, and end products that meet the highest international sustainability standards without compromising on performance. The future of chemistry is green, and it is already here.',
    ],
  },
  {
    id: 2,
    title: 'How Natural Compounds are Revolutionizing Industrial Cleaning',
    excerpt:
      'Learn how plant-based chemical compounds are providing safer alternatives to traditional industrial cleaning products.',
    category: 'innovation',
    date: 'June 2, 2023',
    readTime: '4 min read',
    author: 'Dr. Raj Patel',
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: [
      'Traditional industrial cleaners often rely on aggressive solvents that pose risks to both workers and the environment. Plant-derived surfactants are changing that equation.',
      'Derived from renewable sources such as coconut and corn, these compounds break down grease and grime just as effectively as their petrochemical counterparts — while remaining fully biodegradable.',
      'Our laboratory trials show plant-based formulations matching, and in several cases exceeding, the cleaning power of conventional products, all while reducing aquatic toxicity by an order of magnitude.',
    ],
  },
  {
    id: 3,
    title: 'The Environmental Impact of Chemical Manufacturing: Our Commitment',
    excerpt:
      'Read about our commitment to reducing our carbon footprint and implementing sustainable practices in our manufacturing processes.',
    category: 'environment',
    date: 'June 18, 2023',
    readTime: '7 min read',
    author: 'Meera Krishnan',
    image:
      'https://images.unsplash.com/photo-1507668339897-8a035aa9527d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: [
      'Manufacturing chemicals responsibly means accounting for every stage of the product lifecycle — from raw material sourcing to end-of-life disposal.',
      'GreenTouch has invested heavily in carbon-neutral production, optimising energy use across our facilities and offsetting unavoidable emissions through verified reforestation programmes.',
      'Transparency is central to our approach. We publish our environmental metrics annually and continuously set more ambitious targets for waste reduction, water conservation, and renewable energy adoption.',
    ],
  },
  {
    id: 4,
    title: 'Green Certification: What It Means for Chemical Products',
    excerpt:
      'Understand the importance of green certification for chemical products and how it ensures environmental compliance.',
    category: 'certification',
    date: 'July 5, 2023',
    readTime: '6 min read',
    author: 'Dr. Ananya Sharma',
    image:
      'https://images.unsplash.com/photo-1617840517959-4530d92e525e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: [
      'Green certifications give buyers confidence that a product genuinely meets rigorous environmental and safety criteria — cutting through marketing claims with independent verification.',
      'Standards such as ISO 14001 assess everything from ingredient sourcing to manufacturing emissions and packaging recyclability.',
      'Every GreenTouch product is developed with certification in mind from day one, ensuring our customers can trust the sustainability credentials printed on the label.',
    ],
  },
  {
    id: 5,
    title: 'Biodegradable Formulations: The Future of Industrial Chemicals',
    excerpt:
      'Explore how biodegradable formulations are setting new standards in the industrial chemical sector.',
    category: 'innovation',
    date: 'July 28, 2023',
    readTime: '4 min read',
    author: 'Dr. Raj Patel',
    image:
      'https://images.unsplash.com/photo-1566221880967-2d471ca5aef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: [
      'Biodegradability is fast becoming a baseline expectation rather than a premium feature. Regulators and consumers alike are demanding products that return safely to nature.',
      'Formulating for biodegradability requires careful molecular design — ensuring compounds break down completely without leaving persistent or toxic residues behind.',
      'Our biodegradable product line demonstrates that environmental responsibility and industrial-grade performance are not mutually exclusive; they are the new standard.',
    ],
  },
  {
    id: 6,
    title: 'Chemical Safety: Best Practices for Handling and Storage',
    excerpt:
      'Essential guidelines for safely handling and storing chemical products to protect both people and the environment.',
    category: 'safety',
    date: 'August 12, 2023',
    readTime: '5 min read',
    author: 'Meera Krishnan',
    image:
      'https://images.unsplash.com/photo-1564889990214-28bae904cc9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: [
      'Even the greenest chemicals must be handled and stored correctly to ensure the safety of people and the surrounding environment.',
      'Key practices include proper labelling, temperature-controlled storage, adequate ventilation, and readily available safety data sheets for every product on site.',
      'Training staff to follow consistent handling protocols dramatically reduces the risk of spills and exposure, reinforcing a culture of safety throughout the organisation.',
    ],
  },
];

export function getAllPostIds(): number[] {
  return blogPosts.map((post) => post.id);
}

export function getPostById(id: number): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getRelatedPosts(id: number, limit = 3): BlogPost[] {
  const current = getPostById(id);
  if (!current) return blogPosts.slice(0, limit);
  return blogPosts
    .filter((post) => post.id !== id && post.category === current.category)
    .concat(blogPosts.filter((post) => post.id !== id && post.category !== current.category))
    .slice(0, limit);
}
