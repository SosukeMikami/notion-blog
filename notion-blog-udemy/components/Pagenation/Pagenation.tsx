import Link from "next/link";
import React from "react";

const Pagenation = ({ numberOfPage }: { numberOfPage: number }) => {
    let pages: number[] = [];
    for (let i = 1; i <= numberOfPage; i++) {
        pages.push(i);
    }
    

    return (
        <section>
            <ul className="flex justify-center gap-2">
                {pages.map((page, index) => (
                    <li key={index}>
                        <Link
                            className="inline-block w-7 h-7 leading-7 font-medium text-center rounded-full text-white bg-sky-900"
                            href={`/page/${page}`}
                        >
                            {page}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Pagenation;
