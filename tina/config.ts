import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
	process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
	branch,
	build: {
		outputFolder: "admin",
		publicFolder: "public",
	},
	// Get this from tina.io
	clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
	media: {
		tina: {
			mediaRoot: "assets",
			publicFolder: "public",
		},
	},
	// See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
	schema: {
		collections: [
			{
				defaultItem: () => ({
					posted: new Date().toISOString(),
					published: true,
					tags: [],
				}),
				fields: [
					{
						isTitle: true,
						label: "Title",
						name: "title",
						required: true,
						type: "string",
					},
					{
						label: "Description",
						name: "description",
						required: true,
						type: "string",
					},
					{
						label: "Date Posted",
						name: "posted",
						required: true,
						type: "datetime",
					},
					{
						label: "Tags",
						list: true,
						name: "tags",
						type: "string",
					},
					{
						label: "Published",
						name: "published",
						type: "boolean",
					},
					{
						label: "Updated",
						name: "updated",
						type: "datetime",
					},
					{
						isBody: true,
						label: "Body",
						name: "body",
						type: "rich-text",
					},
				],
				format: "mdx",
				label: "Posts",
				name: "post",
				path: "src/content/posts",
			},
		],
	},
	// Get this from tina.io
	token: process.env.TINA_TOKEN,
});
