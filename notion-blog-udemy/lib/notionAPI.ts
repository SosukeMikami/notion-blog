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

    console.log(allPosts);
    
    return allPosts.map((post) => {
        return getPageMetadata(post);
    });

    return allPosts;
};

const getPageMetadata = (post: any) => {
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
        sulg: post.properties.Sulg.rich_text[0].plain_text,
        sags: getTags(post.properties.Tags.multi_select)
    };
};