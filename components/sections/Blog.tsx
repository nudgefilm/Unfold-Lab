
import React, { useState, useEffect } from 'react';
import { useApp } from '../../store/AppContext';
import { Post } from '../../types';

const Blog: React.FC = () => {
  const { posts } = useApp();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // 게시글이 선택되었을 때 본문 스크롤을 막고 페이지 상단으로 이동
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  return (
    <section id="blog" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            <span className="text-orange-500">인사이트</span> <span className="text-white ml-2">리포트</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-zinc-900">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-zinc-500 text-xs font-medium">{post.date}</div>
                <h4 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">
                  {post.title}
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="pt-4 flex items-center text-orange-500 text-sm font-bold gap-2">
                  자세히 보기
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Full Page View */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] bg-black overflow-y-auto">
          {/* Top Navigation Bar */}
          <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 h-20">
            <div className="max-w-4xl mx-auto h-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                <h2 className="text-base font-black tracking-tight text-white uppercase">
                  <span className="text-orange-500">인사이트</span> 리포트
                </h2>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all duration-300 group font-bold text-sm"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                목록으로 돌아가기
              </button>
            </div>
          </div>

          <div className="relative w-full">
            <div className="max-w-4xl mx-auto pb-32">
              {/* Post Header Image */}
              <div className="w-full aspect-video md:aspect-[21/9] bg-zinc-900 overflow-hidden md:rounded-b-3xl">
                <img 
                  src={selectedPost.image} 
                  className="w-full h-full object-cover" 
                  alt={selectedPost.title} 
                />
              </div>
              
              <div className="px-6 md:px-0 pt-12 md:pt-20">
                <div className="flex items-center gap-4 mb-8">
                   <span className="px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs font-black rounded-full uppercase tracking-widest">
                    {selectedPost.category}
                  </span>
                  <span className="text-zinc-500 text-sm font-medium">{selectedPost.date}</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter leading-[1.1]">
                  {selectedPost.title}
                </h1>

                <div className="h-[1px] w-full bg-gradient-to-r from-orange-500/50 via-zinc-800 to-transparent mb-12"></div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-300 text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedPost.content}
                  </p>
                </div>

                <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-2">
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Published By</p>
                    <p className="text-white font-black text-lg">UNFOLD LAB Research Team</p>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="px-8 py-4 bg-zinc-900 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
                  >
                    목록으로 돌아가기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
