import type { MDXPost } from "@/types";
import type { APIContext, InferGetStaticPropsType } from "astro";

import RobotoMonoBold from "@/assets/roboto-mono-700.ttf";
import RobotoMono from "@/assets/roboto-mono-regular.ttf";
import { siteConfig } from "@/site-config";
import { getFormattedDate } from "@/utils";
import { ImageResponse } from "@vercel/og";

const posts: MDXPost[] = Object.values(
	import.meta.glob("../../content/posts/*.mdx", { eager: true }),
);

const html = (title: string, pubDate: string) => ({
	props: {
		children: [
			{
				props: {
					children: [
						{
							props: {
								children: pubDate,
								tw: "text-2xl mb-6",
							},
							type: "p",
						},
						{
							props: {
								children: title,
								tw: "text-6xl font-bold leading-snug text-white",
							},
							type: "h1",
						},
					],
					tw: "flex flex-col flex-1 w-full p-10 justify-center",
				},
				type: "div",
			},
			{
				props: {
					children: [
						{
							props: {
								children: [
									{
										props: {
											children: [
												{
													props: {
														d: "M181.334 93.333v-40L226.667 80v40l-45.333-26.667ZM136.001 53.333 90.667 26.667v426.666L136.001 480V53.333Z",
														fill: "#B04304",
													},
													type: "path",
												},
												{
													props: {
														d: "m136.001 119.944 45.333-26.667 45.333 26.667-45.333 26.667-45.333-26.667ZM90.667 26.667 136.001 0l45.333 26.667-45.333 26.666-45.334-26.666ZM181.334 53.277l45.333-26.666L272 53.277l-45.333 26.667-45.333-26.667ZM0 213.277l45.333-26.667 45.334 26.667-45.334 26.667L0 213.277ZM136 239.944l-45.333-26.667v53.333L136 239.944Z",
														fill: "#FF5D01",
													},
													type: "path",
												},
												{
													props: {
														d: "m136 53.333 45.333-26.666v120L226.667 120V80L272 53.333V160l-90.667 53.333v240L136 480V306.667L45.334 360V240l45.333-26.667v53.334L136 240V53.333Z",
														fill: "#53C68C",
													},
													type: "path",
												},
												{
													props: {
														d: "M45.334 240 0 213.334v120L45.334 360V240Z",
														fill: "#B04304",
													},
													type: "path",
												},
											],
											fill: "none",
											height: 60,
											viewBox: "0 0 272 480",
											xmlns: "http://www.w3.org/2000/svg",
										},
										type: "svg",
									},
									{
										props: {
											children: siteConfig.title,
											tw: "ml-3 font-semibold",
										},
										type: "p",
									},
								],
								tw: "flex items-center",
							},
							type: "div",
						},
						{
							props: {
								children: siteConfig.author,
							},
							type: "p",
						},
					],
					tw: "flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl",
				},
				type: "div",
			},
		],
		tw: "flex flex-col w-full h-full bg-[#1d1f21] text-[#c9cacc]",
	},
	type: "div",
});

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export function GET(context: APIContext) {
	const { pubDate, title } = context.props as Props;

	const postDate = getFormattedDate(pubDate, {
		month: "long",
		weekday: "long",
	});
	// @ts-expect-error next-line missing key
	return new ImageResponse(html(title, postDate), {
		// debug: true,
		fonts: [
			{
				data: Buffer.from(RobotoMono),
				name: "Roboto Mono",
				style: "normal",
				weight: 400,
			},
			{
				data: Buffer.from(RobotoMonoBold),
				name: "Roboto Mono",
				style: "normal",
				weight: 700,
			},
		],
		height: 630,
		width: 1200,
	});
}

export function getStaticPaths() {
	return posts.map((post) => ({
		params: { slug: post.frontmatter.slug },
		props: {
			pubDate: post.frontmatter.updatedDate ?? post.frontmatter.publishedDate,
			title: post.frontmatter.title,
		},
	}));
}
