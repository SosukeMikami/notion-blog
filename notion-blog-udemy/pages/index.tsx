import { Inter } from "next/font/google";
import { getPostsTopPage } from "@/lib/notionAPI";

import { postType } from "@/pages/types";
import { SinglePost } from "@/components/Blog/SinglePost";
import Link from "next/link";
import Tag from "@/components/Tag/Tag";

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

export default function Home({ allPosts }: { allPosts: postType[] }) {

    return (
        <div>
            <main className="container w-full mt-16 mx-auto">
                <h1 className="text-5xl font-medium text-center mb-16">
                    Notion Blog 🚀
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
            <Link href="/page/1" className="mb-6 lg:w-1/2 mx-auto rounded-md px-5 text-right block">...もっと見る</Link>
            <Tag />
            </main>
        </div>
    );
}
