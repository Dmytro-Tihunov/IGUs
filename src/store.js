import { create } from "zustand";
import { supabase } from "./lib/api";

const useStore = create((set) => ({
  categories: [],
  subcategories: [],
  usersScores: [],
  isCategoriesLoading: false,
  tools: [],
  isToolsLoading: false,
  getCategories: async () => {
    set({ isCategoriesLoading: true });
    const { data, error } = await supabase.from("Tools").select("Category");
    const uniqueCategories = [...new Set(data.map((item) => item.Category))];
    const categoriesWithSubcategories = uniqueCategories.map((category) => ({
      name: category,
      subcategories: [],
    }));
    for (const category of categoriesWithSubcategories) {
      const { data } = await supabase
        .from("Tools")
        .select("Subcategory")
        .eq("Category", category.name);
      category.subcategories = [...new Set(data.map((item) => item.Subcategory))];
    }
    set({ subcategories: categoriesWithSubcategories });
    set({ isCategoriesLoading: false });
  },
  getTools: async () => {
    set({ isToolsLoading: true });
    const { data } = await supabase.from("Tools").select(`*, Scores(*))`);
    set({ isToolsLoading: false });
    set({ tools: data });
  },
  getUsersScores: async (id) => {
    const { data} = await supabase
    .from("Scores")
    .select("tool_id, points")
    .eq("user_id", id);
    set({ usersScores: data });
  }
}));

export default useStore;
