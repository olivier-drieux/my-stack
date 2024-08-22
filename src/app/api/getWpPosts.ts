"use server";

import { db } from "@/lib/drizzle/drizzle";
import { type Post, posts } from "@/lib/drizzle/schema/post";
import wordpress from "@/lib/wordpress";
import { inArray } from "drizzle-orm";

interface WpPost {
	id: number;
	title: { rendered: string };
	content: { rendered: string };
	status: "publish" | "draft" | "future";
	link: string;
}

export interface WpPostWithPost extends WpPost {
	post?: Post;
}

export default async function getWpPosts() {
	try {
		const wpPosts: Array<WpPost> = await wordpress.posts().get();

		const dbPosts = await db
			.select()
			.from(posts)
			.where(
				inArray(
					posts.wordPressId,
					wpPosts.map((wpPost) => wpPost.id),
				),
			);

		const mappedPosts = wpPosts.map((wpPost) => {
			const dbPost = dbPosts.find((dbPost) => dbPost.wordPressId === wpPost.id);
			return {
				...wpPost,
				post: dbPost ?? null,
			};
		});

		return mappedPosts as WpPostWithPost[];
	} catch (error) {
		console.error(error);
		return [];
	}
}
