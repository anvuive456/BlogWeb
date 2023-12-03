'use server'

import {baseApiUrl} from "../../../../lib/api";
import {CategoryWithPosts} from "@an/types/types";
import PortraitArticleCard from "@an/components/PortraitArticleCard";

export const getCategoryPosts = async ({slug, page, limit = 10}: { slug: string, page: number, limit?: number }) => {
  const posts = await fetch(baseApiUrl + `/categories/${slug}?page=${page}&limit=${limit}`).then(res => res.json());
  const data = posts as CategoryWithPosts;
  return data.posts.map((post, index) =>
      <PortraitArticleCard post={post} index={index}/>
  );
}
