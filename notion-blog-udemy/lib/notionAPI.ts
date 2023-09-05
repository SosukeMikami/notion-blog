import {Client} from "@notionhq/client";
import { postType } from "@/pages/types";
import { NotionToMarkdown } from "notion-to-md";


const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({notionClient: notion})

export const getAllPosts = async () => {
    const posts = await notion.databases.query({
        database_id: String(process.env.NOTION_DATABASE_ID),
        page_size: 100,
        filter: {
            property: "Published",
            checkbox: {
                equals: true
            }
        },
        sorts: [
            {
                property: "Date",
                direction: "descending",
            }
        ]
    });

    const allPosts = posts.results;
    
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

    const mbBlocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mbBlocks);

    return {
        metadata: metadata,
        markdown: mdString,
    };
}

//topページ用の記事の取得
export const getPostsTopPage = async () => {
    const allPosts = await getAllPosts();
    const fourPosts = allPosts.splice(0,4)
    return fourPosts;
};

//ページ番号に応じた記事を出力する
export const getPostsByPage = async (page: number) => {
    const allPosts = await getAllPosts();
    const startIndex = (page - 1) * 4
    const fourPosts = allPosts.splice(startIndex,4);
    return fourPosts;
}

export const getNumberOfPages = async () => {
    const allPosts = await getAllPosts();
    return (
        Math.ceil(allPosts.length / 4 )
    );
}

//タグごとのアーカイブページ
export const getPostsByTagAndPage = async (tagName: string, page: number) => {
    const allPosts = await getAllPosts();
    const post = allPosts.filter((post) => 
        post.tags.find((tag: string) => tag == tagName)
    );
    
    const startIndex = (page - 1) * 4
    const fourPosts = post.splice(startIndex, 4);

    return fourPosts;
}

export const getNumberOfPagesByTag = async (tagName: string) => {
    const allPosts = await getAllPosts();
    const post = allPosts.filter((post) => 
        post.tags.find((tag: string) => tag == tagName)
    );
    
    return (
        Math.ceil(post.length / 4 )
    );
}

export const getAllTags = async () => {
    const allPosts = await getAllPosts();
    const allTagDuplicaionLists = allPosts.flatMap((post) => post.tags);
    const set = new Set(allTagDuplicaionLists);
    const allTagList = Array.from(set);
    return allTagList;
}