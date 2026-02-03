
import React from 'react';
import { BLOG_POSTS } from '../../../constants';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = BLOG_POSTS.find(p => p.id === params.id);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 animate-fade-in-up">
      <Link href="/blog" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-rose-600 mb-12 transition-colors">
        ← Back to Blog
      </Link>
      
      <div className="mb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-stone-300"></span>
          <span>Article</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-stone-900 leading-[1.1] mb-8 italic">
          {post.title}
        </h1>
        <img src={post.image} alt={post.title} className="w-full aspect-[21/9] object-cover rounded-[40px] shadow-2xl mb-12" />
      </div>

      <div className="prose prose-stone max-w-none">
        <p className="text-xl text-stone-600 leading-relaxed font-serif italic mb-10 border-l-4 border-rose-200 pl-8">
          {post.excerpt}
        </p>
        <div className="text-stone-800 leading-loose text-lg space-y-6">
          {post.content.split('. ').map((para, i) => (
            <p key={i}>{para}.</p>
          ))}
        </div>
      </div>
    </div>
  );
}
