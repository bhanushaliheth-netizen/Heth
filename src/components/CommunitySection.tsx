import React from 'react';
import { Camera, Instagram, Sparkles, Heart } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const posts = [
    {
      user: '@dev_marcus',
      role: 'Full-Stack Lead',
      item: 'GoogleVerse Obsidian Hoodie',
      likes: '1.4k',
      avatar: '#4285F4',
    },
    {
      user: '@creator_priya',
      role: 'YouTube Tech Reviewer',
      item: 'YouTube Studio Cap',
      likes: '2.8k',
      avatar: '#EA4335',
    },
    {
      user: '@ai_sora',
      role: 'Machine Learning Student',
      item: 'Gemini AI Spark Tee',
      likes: '3.1k',
      avatar: '#FBBC05',
    },
    {
      user: '@design_leo',
      role: 'UI Designer',
      item: 'Android Bugdroid Desk Mat',
      likes: '950',
      avatar: '#34A853',
    },
  ];

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-extrabold text-slate-800 uppercase tracking-wider border border-slate-200">
            <Camera className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>COMMUNITY SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            SPOTTED IN THE WILD<span className="text-[#34A853]">.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            See how developers, creators, and students style GoogleVerse merchandise across the globe.
          </p>
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: post.avatar }}
                  >
                    {post.user[1].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">{post.user}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{post.role}</div>
                  </div>
                </div>

                <Instagram className="w-4 h-4 text-slate-400" />
              </div>

              {/* Photo Card Visual */}
              <div className="h-44 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-2 shadow-xs">
                  <Sparkles className="w-6 h-6 text-[#4285F4]" />
                </div>
                <span className="text-xs font-extrabold text-slate-900 line-clamp-1">
                  {post.item}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-slate-600 pt-1">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                  <span>{post.likes}</span>
                </span>
                <span className="text-[10px] text-[#4285F4] uppercase">#GOOGLEVERSE</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
