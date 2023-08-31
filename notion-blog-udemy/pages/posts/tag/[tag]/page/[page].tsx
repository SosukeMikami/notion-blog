import { Inter } from "next/font/google";
import {
    getAllTags,
    getNumberOfPagesByTag,
    getPostsByTagAndPage,
} from "@/lib/notionAPI";

import { postType } from "@/pages/types";
import { SinglePost } from "@/components/Blog/SinglePost";
import Pagenation from "@/components/Pagenation/Pagenation";

export const getStaticPaths = async () => {
    const allTags = await getAllTags();

    let params = [];

    await Promise.all(
        allTags.map((tag) => {
            return getNumberOfPagesByTag(tag).then((numberOfPage: number) => {
                for (let i = 1; i <= numberOfPage; i++) {
                    params.push({ params: { tag: tag, page: String(i) } });
                }
            });
        })
    )
    
    return {
        paths: params,
        fallback: true,
    };
};

export const getStaticProps = async (context) => {
    const currentPage = context.params?.page;
    const currentTag = context.params?.tag;

    const posts = await getPostsByTagAndPage(currentTag, Number(currentPage));

    const numberOfPage = await getNumberOfPagesByTag(currentTag);

    return {
        props: {
            numberOfPage,
            posts,
            currentTag
        },
        revalidate: 60,
    };
};

export const BlogTagPageList = ({ posts, numberOfPage, currentTag }: { posts: postType[], numberOfPage: number, currentTag: string }) => {
    return (
        <div>
            <main className="container w-full mt-16 mx-auto">
                <h1 className="text-5xl font-medium text-center mb-16">
                    Notion Blog 🚀
                </h1>
                <div className="flex flex-wrap justify-between">
                    {posts.map((post, index) => (
                        <SinglePost
                            id={post.id}
                            key={index}
                            title={post.title}
                            description={post.description}
                            date={post.date}
                            slug={post.slug}
                            tags={post.tags}
                            isPagenationPage={true}
                        />
                    ))}
                </div>
            </main>
            <Pagenation numberOfPage={numberOfPage} tag={currentTag} />
        </div>
    );
};

export default BlogTagPageList;
