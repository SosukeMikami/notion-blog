import React from "react";
import { postType } from "@/pages/types";
import Link from "next/link";

export const SinglePost = (post: postType) => {
    return (
        <section className="lg:w-1/2 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3">
                <Link href={`/posts/${post.slug}`}>
                    <h2 className="text-gray-100 text-2xl font-medium mb-2">
                        {post.title}
                    </h2>
                </Link>
                <div className="text-gray-100">{post.date}</div>
                {post.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium inline-block"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <p className="text-gray-100">{post.description}</p>
        </section>
    );
};
