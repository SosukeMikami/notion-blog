import { Inter } from "next/font/google";
import { getPostsTopPage } from "@/lib/notionAPI";

import { postType } from "@/pages/types";
import { SinglePost } from "@/components/Blog/SinglePost";

export const getStaticPaths = async () => {
    return {
        paths: [
            {params: {page: "1"}},
            {params: {page: "2"}},
        ],
        fallback: true,
    };
};

export const getStaticProps = async () => {
    const allPosts = await getPostsTopPage();
    return {
        props: {
            allPosts,
        },
        revalidate: 60,
    };
};

const inter = Inter({ subsets: ["latin"] });

export const BlogPageList = ({ allPosts }: { allPosts: postType[] }) => {
    console.log(allPosts);

    return (
        <div>
            <main className="container w-full mt-16 mx-auto">
                <h1 className="text-5xl font-medium text-center mb-16">
                    Notin Blog 🚀
                </h1>
                {allPosts.map((post, index) => (
                    <SinglePost
                    id={post.id}
                    key={index}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    slug={post.slug}
                    tags={post.tags}/>
                ))}
            </main>
        </div>
    );
}

export default BlogPageList;
