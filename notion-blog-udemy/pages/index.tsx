import { Inter } from 'next/font/google'
import { getAllPosts } from '@/lib/notionAPI'

import { postType } from '@/pages/types';

export const getStaticProps = async () => {
  const allPosts: postType[] = await getAllPosts();
  return {
    props: {
      allPosts,
    },
    revalidate: 60,
  }
}

const inter = Inter({ subsets: ['latin'] })

export default function Home({ allPosts }: {allPosts: postType[]}) {
  console.log(allPosts);
  
  return (
    <div><h1 className='text-red-900'>hogehoge</h1></div>
  )
}
