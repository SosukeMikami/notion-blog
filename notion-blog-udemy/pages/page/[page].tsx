import { Inter } from "next/font/google";
import { getPostsByPage } from "@/lib/notionAPI";

import { postType } from "@/pages/types";
import { SinglePost } from "@/components/Blog/SinglePost";

export const getStaticPaths = async () => {
    return {
        paths: [{ params: { page: "1" } }, { params: { page: "2" } }, { params: { page: "3" } }],
        fallback: true,
    };
};

export const getStaticProps = async (context) => {
    const currentPage = context.params?.page;
    const postsByPage = await getPostsByPage(
        parseInt(currentPage.toString(), 10)
    )

    console.log(postsByPage);
    

    return {
        props: {
            postsByPage,
        },
        revalidate: 60,
    };
};

export const BlogPageList = ({ postsByPage }: { postsByPage: postType[] }) => {
    console.log(postsByPage);

    return (
        <div>
            <main className="container w-full mt-16 mx-auto">
                <h1 className="text-5xl font-medium text-center mb-16">
                    Notion Blog 🚀
                </h1>
                <div className="flex flex-wrap justify-between">
                    {postsByPage.map((post, index) => (
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

export default BlogPageList;
