/* eslint-disable @typescript-eslint/no-explicit-any */
export const base = { "@context": "https://schema.org" };

// 🏗️ Developer
export const buildDeveloperSchemas = (d: any) => {
  console.log(d, "dadad");
  const schemas: any[] = [];

  // 🏢 1. Developer Organization
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: d?.name,
    description: d.description,
    logo: d.logo,
    url: d.url,
  });

  // 🌆 2. Communities List (VERY IMPORTANT)
  if (d.communities?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${d.name} Communities`,
      itemListElement: d.communities.map((c: any, i: number) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.title,
        url: `https://winsteadglobal.com/community/${c.slug}`,
      })),
    });
  }

  // 🏢 3. Projects List (flattened from communities)
  const allProjects =
    d.communities?.flatMap((c: any) => c.projects || []) || [];

  if (allProjects.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${d.name} Projects`,
      itemListElement: allProjects.map((p: any, i: number) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: `https://winsteadglobal.com/project/${p.slug}`,
      })),
    });
  }

  return schemas;
};

// 🏢 Project
export const buildProject = (d: any) => ({
  ...base,
  "@type": "Product",
  name: d.title,
  description: d.description,
  image: d.images,
  brand: {
    "@type": "Organization",
    name: d.developerName,
  },
  offers: {
    "@type": "Offer",
    price: d.price,
    priceCurrency: d.currency || "AED",
    availability: "https://schema.org/InStock",
  },
});

// 🌆 Community
export const buildCommunitySchemas = (d: any) => {
  const schemas: any[] = [];

  // 🌆 1. Community as Place
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Place",
    name: d.name,
    description: d.description,
    image: d.image,
    url: d.url,

    address: {
      "@type": "PostalAddress",
      addressLocality: d.city,
      addressCountry: d.country,
    },

    // 🔗 Link developer
    containsPlace: {
      "@type": "Organization",
      name: d.developer?.name,
    },
  });

  // 🏢 2. Projects List (IMPORTANT)
  if (d.projects?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${d.name} Projects`,
      itemListElement: d.projects.map((p: any, i: number) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: `https://winsteadglobal.com/project/${p.slug}`,
      })),
    });
  }

  // 💰 3. Individual Project (Product schema)
  d.projects?.forEach((p: any) => {
    if (!p.price || p.price === 0) return;

    schemas.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.title,
      image: p.thumbnail,
      url: `https://winsteadglobal.com/project/${p.slug}`,

      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
      },
    });
  });

  return schemas;
};

// 📰 Blog
export const buildArticle = (d: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",

  headline: d.title,
  description: d.description,

  image: d.image ? [d.image] : undefined,

  datePublished: d.datePublished,
  dateModified: d.dateModified,

  mainEntityOfPage: d.url,

  author: {
    "@type": "Organization",
    name: d.author,
  },

  publisher: {
    "@type": "Organization",
    name: "Winstead Global",
    logo: {
      "@type": "ImageObject",
      url: "https://winsteadglobal.com/logo.png",
    },
  },
});
