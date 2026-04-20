/* eslint-disable @typescript-eslint/no-explicit-any */
export function normalizeData(type: string, data: any) {
  console.log(data);
  switch (type) {
    case "developer":
      return {
        name: data.developer?.title,
        description: data.developer?.description,
        logo: data.developer?.image,
        slug: data.developer?.slug,

        url: `https://winsteadglobal.com/developer/${data.developer?.slug}`,

        communities: data.communities || [],
      };

    case "project":
      console.log(data);
      return {
        title: data.title,
        description: data.metaDescription,
        images: data.gallery,
        price: data.price,
        developerName: data.developer?.title,
      };

    case "community":
      return {
        name: data.title,
        description: data.description,
        image: data.image,
        slug: data.slug,

        city: data?.data?.city,
        country: "UAE",

        url: `https://winsteadglobal.com/community/${data.slug}`,

        developer: {
          name: data.developer?.title,
          slug: data.developer?.slug,
          logo: data.developer?.image,
        },

        projects: data.projects || [],
      };

    case "blog":
      return {
        title: data.metaTitle || data.title,
        description: data.metaDescription || data.description,

        // ⚠️ IMPORTANT: avoid base64 if possible
        image: data.image?.startsWith("data:") ? null : data.image,

        datePublished: data.createdAt,
        dateModified: data.updatedAt,

        slug: data.slug,
        url: `https://winsteadglobal.com/blog/${data.slug}`,

        category: data?.data?.category,

        author: "Winstead Global",
      };

    default:
      return data;
  }
}
