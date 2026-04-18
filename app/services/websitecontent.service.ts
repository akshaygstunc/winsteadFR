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
  static async servicePage() {
    try {
      const response = await api.get("/content/services-page/singleton");
      return response?.data;
    } catch (error) {
      console.error("Error fetching service page content:", error);
      throw error;
    }
  }
  static async TeamPage() {
    try {
      const response = await api.get("/content/our-team-page/singleton");
      return response?.data;
    } catch (error) {
      console.error("Error fetching team page content:", error);
      throw error;
    }
  }
  static async GalleryPage() {
    try {
      const response = await api.get("/content/gallery-page/singleton");
      return response?.data;
    } catch (error) {
      console.error("Error fetching team page content:", error);
      throw error;
    }
  }

  static async getEvents() {
    try {
      const response = await api.get("/content/events");
      return response?.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }
  static async getContact() {
    try {
      const response = await api.get("/content/contact-page/singleton");
      return response?.data;
    } catch (error) {
      console.error("Error fetching contact page content:", error);
      throw error;
    }
  }
  static async getDeveloperPage() {
    try {
      const response = await api.get("/content/developer-page/singleton");
      return response?.data;
    } catch (error) {
      console.error("Error fetching developer page content:", error);
      throw error;
    }
  }
  static async getHomePageContent1() {
    try {
      const response = await api.get(`/content/home-page/singleton`);
      return response?.data;
    } catch (error) {
      console.error("Error fetching homepage singleton:", error);
      throw error;
    }
  }
  static async getAboutPage() {
    try {
      const response = await api.get(`/content/about-page/singleton`);
      return response?.data;
    } catch (error) {
      console.error("Error fetching about page:", error);
      throw error;
    }
  }
  static async GetCareers() {
    try {
      const response = await api.get(`/content/careers`);
      return response?.data;
    } catch (error) {
      console.error("Error fetching careers page:", error);
      throw error;
    }
  }
  static async GetDeveloperCommunities(slug: string) {
    try {
      const response = await api.get(`/content/communities/developer/${slug}`);
      return response?.data;
    } catch (error) {
      console.error("Error fetching developer communities:", error);
      throw error;
    }
  }

  static async GetPodcasts() {
    try {
      const response = await api.get(`/content/podcast`);
      return response.data;
    } catch (e) {
      throw e;
    }
  }
}