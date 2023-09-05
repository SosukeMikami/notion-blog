import React from "react";
import Link from "next/link";

import { getPageLink } from "@/lib/blog-helper"

const Tag = ({tags}: {tags: string[]}) => {
    return (
        <section className="lg:w-1/2 mb-8 mx-auto bg-orange-200 rounded-sm p-5 shadow-sm hove:shadow-none hover:translate-y-1 duration-300">
            <div className="font-medium mb-4">タグ検索</div>
            <div className="flex flex-wrap gap-5">
                {tags.map((tag) => (
                    <Link href={getPageLink(1, tag)}>
                    <span className="rounded-xl bg-slate-500 text-white px-2 py-1 mb-2">
                        { tag }
                    </span>
                </Link>
                ))}
            </div>
        </section>
    );
};

export default Tag;
