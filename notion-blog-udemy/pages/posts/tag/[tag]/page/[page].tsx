import { Inter } from "next/font/google";
import { getNumberOfPages, getPostsByPage, getPostsByTagAndPage } from "@/lib/notionAPI";

import { postType } from "@/pages/types";
import { SinglePost } from "@/components/Blog/SinglePost";
import Pagenation from "@/components/Pagenation/Pagenation";

export const getStaticPaths = async () => {
    const numberOfPage = await getNumberOfPages();
    return {
        paths: [{ params: {tag: "TypeScript", page: "2"} }],
        fallback: true,
    };
};

export const getStaticProps = async (context) => {
    const currentPage = context.params?.page;
    const currentTag = context.params?.tag;

    const posts = await getPostsByTagAndPage(currentTag, Number(currentPage));

    return {
        props: {
            posts,
        },
        revalidate: 60,
    };
};

export const BlogTagPageList = ({ posts }: { posts: postType[]}) => {

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
        </div>
    );
};

export default BlogTagPageList;
