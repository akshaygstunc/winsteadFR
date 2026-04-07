import { api } from "./api";

export default class WebsiteContentService {
  static async getHomePageContent({ slug }: { slug: string }) {
    try {
      const response = await api.get(`/content/pages`);
      const data = response?.data?.filter((item) => item.slug == slug);
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching homepage content:", error);
      throw error;
    }
  }
}
