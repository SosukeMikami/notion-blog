import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import Link from "next/link";
import React from "react";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vsDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const getStaticPaths = async () => {
    const allPosts = await getAllPosts();
    const paths = allPosts.map((post) => ({ params: { slug: post.slug } }));
    return {
        paths: paths,
        fallback: true,
    };
};

export const getStaticProps = async ({ params }) => {
    const post = await getSinglePost(params.slug);
    return {
        props: {
            post,
        },
        revalidate: 60,
    };
};

export const Post = ({ post }) => {

    return (
        <section className="container lg:px-2 px-5 lg:w-25 mx-auto mt-20">
            <h2 className="w-full text-2xl font-medium">
                {post.metadata.title}
            </h2>
            <div className="border-b-2 w-1/3 border-sky-900"></div>
            <span className="text-gray-500">{post.metadata.date}</span>
            <br />
            {post.metadata.tags.map((tag, index) => (
                <p
                    key={index}
                    className="text-white bg-gray-500 rounded-xl px-2 pb-1 mr-2 font-medium inline-block"
                >
                    {tag}
                </p>
            ))}

            <div className="mt-10 font-medium">
                <ReactMarkdown
                    children={post.markdown.parent}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(
                                className || ""
                            );
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    {...props}
                                    children={String(children).replace(
                                        /\n$/,
                                        ""
                                    )}
                                    style={vsDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                />
                            ) : (
                                <code {...props} className={className}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                ></ReactMarkdown>
            </div>

            <Link href="/">←ホームに戻る</Link>
        </section>
    );
};

export default Post;
