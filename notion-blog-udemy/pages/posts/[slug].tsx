import { getSinglePost } from '@/lib/notionAPI';
import React from 'react'

export const getStaticPaths = async () => {
  return {
    paths: [
      {params: {slug: "first"}},
      {params: {slug: "second"}},
      {params: {slug: "third"}}
    ],
    fallback: true
  }
}

export const getStaticProps = async ({params}) => {
  const post = await getSinglePost(params.slug);
  console.log(post);
  return {
      props: {
          post
      },
      revalidate: 60,
  };
};

export const Post = ({post}) => {
  return (
    <section className='container lg:px-2 px-5 lg:w-25 mx-auto mt-20'>
      <h2 className='w-full text-2xl font-medium'>3回目の投稿です</h2>
      <div className='border-b-2 w-1/3 border-sky-900'></div>
      <span className='text-gray-500'>2001-00-00</span>
      <br />
      <p><span className="text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium inline-block">Next.js</span></p>

      <div className='mt-10 font-medium'>

      </div>
    </section>
  )
}

export default Post;
