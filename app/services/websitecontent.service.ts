import { api } from "./api";

export default class WebsiteContentService {
  static async getHomePageContent({ slug }: { slug: string }) {
    try {
      const response = await api.get(`/content/pages`);
      const data = response?.data?.filter((item) => item.slug == slug);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching homepage content:", error);
      throw error;
    }
  }

  static async getProperties() {
    try {
      const response = await api.get(`/properties`);
      return response?.data;
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw error;
    }
  }

  static async getTestimonials() {
    try {
      const response = await api.get("/content/testimonials");
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  static async getBlogs() {
    try {
      const response = await api.get("/content/blogs");
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  static async getCategory() {
    try {
      const response = await api.get("/content/property-types");
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  static async getDevelopers() {
    try {
      const response = await api.get("/content/developer-community");
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  static async getPropertyBySlug(slug: string) {
    try {
      const response = await api.get(`/properties/slug/${slug}`);
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  static async getBlogBySlug(slug: string) {
    try {
      const response = await api.get(`/content/blogs/slug/${slug}`);

      return response?.data;
    } catch (e) {
      throw error;
    }
  }

  static async createContactQuery(data: {
    name: string;
    email: string;
    message: string;
    intent: any;
    projectTitle?: string;
  }) {
    try {
      const response = await api.post("/contact-query", data);
      return response?.data;
    } catch (error) {
      console.error("Error sending contact form:", error);
      throw error;
    }
  }


  static async getHomePageContent1() {
  try {
    const response = await api.get(`/content/home-page/singleton`);
    return response?.data;   // ✅ direct object return
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    throw error;
  }
  }
  
  static async getAboutPage() {
  const response = await api.get("/content/about-page/singleton");
  return response?.data;
}
}
