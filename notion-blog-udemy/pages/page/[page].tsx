import { Inter } from "next/font/google";
import { getNumberOfPages, getPostsByPage } from "@/lib/notionAPI";

import { postType } from "@/pages/types";
import { SinglePost } from "@/components/Blog/SinglePost";
import Pagenation from "@/components/Pagenation/Pagenation";

export const getStaticPaths = async () => {
    const numberOfPage = await getNumberOfPages();
    let params = []
    for(let i = 1; i <= numberOfPage; i++) {
        params.push({ params: { page: String(i) } });
    }

    return {
        paths: params,
        fallback: true,
    };
};

export const getStaticProps = async (context) => {
    const currentPage = context.params?.page;
    const postsByPage = await getPostsByPage(
        parseInt(currentPage.toString(), 10)
    )

    const numberOfPage = await getNumberOfPages();

    return {
        props: {
            postsByPage,
            numberOfPage,
        },
        revalidate: 60,
    };
};

export const BlogPageList = ({ postsByPage, numberOfPage }: { postsByPage: postType[], numberOfPage: number }) => {

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
                <Pagenation numberOfPage={numberOfPage}/>
            </main>
        </div>
    );
};

export default BlogPageList;
