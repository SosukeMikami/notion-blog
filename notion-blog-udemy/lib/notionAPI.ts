import {Client} from "@notionhq/client"

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export const getAllPosts = async () => {
    const posts = await notion.databases.query({
        database_id: String(process.env.NOTION_DATABASE_ID),
        page_size: 100,
    });

    const allPosts = posts.results;

    return allPosts.map((post) => {
        return getPageMetadata(post);
    });
};

const getPageMetadata = (post: any) => {
    return {
        id: post.id,
        title: post.properties.Name.title[0].plain_text,
        Description: post.properties.Description.rich_text[0].plain_text,
        date: post.properties.Date.date.start,
        Sulg: post.properties.Sulg.rich_text[0].plain_text,
    }
};