
import React from 'react';
import { BLOG_POSTS } from '../../constants';
import Link from 'next/link';

export default function BlogListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-fade-in-up">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 mb-4">Marriage & Lifestyle Blog</h2>
        <p className="text-stone-600 max-w-2xl mx-auto">Expert advice on finding your life partner, wedding planning, and crafting the perfect biodata.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {BLOG_POSTS.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <article className="group cursor-pointer bg-white rounded-[32px] overflow-hidden border border-stone-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-rose-600">Relationship</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>5 min read</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-3 group-hover:text-rose-600 transition-colors leading-tight">{post.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center text-rose-600 text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all">Read More <span>→</span></div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
