import {Client} from "@notionhq/client";
import { postType } from "@/pages/types";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export const getAllPosts = async () => {
    const posts = await notion.databases.query({
        database_id: String(process.env.NOTION_DATABASE_ID),
        page_size: 100,
    });

    const allPosts = posts.results;

    console.log(allPosts);
    
    return allPosts.map((post) => {
        return getPageMetadata(post);
    });
};

const getPageMetadata = (post: any): postType => {
    const getTags = (tags: any) => {
        const allTags = tags.map((tag: any) => {
            return tag.name;
        })
        return allTags
    };

    return {
        id: post.id,
        title: post.properties.Name.title[0].plain_text,
        description: post.properties.Description.rich_text[0].plain_text,
        date: post.properties.Date.date.start,
        slug: post.properties.Slug.rich_text[0].plain_text,
        tags: getTags(post.properties.Tags.multi_select)
    };
};

export const getSinglePost = async (slug: any) => {
    const respoces = await notion.databases.query({
        database_id: String(process.env.NOTION_DATABASE_ID),
        filter: {
            property: "Slug",
            formula: {
                string: {
                    equals: slug
                }
            }
        }
    });

    const page = respoces.results[0];

    const metadata = getPageMetadata(page);
    console.log(metadata);

    return metadata;
}