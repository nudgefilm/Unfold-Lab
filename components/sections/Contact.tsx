
import React from 'react';
import { useApp } from '../../store/AppContext';

const Contact: React.FC = () => {
  const { settings } = useApp();

  return (
    <section id="contact" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-4">Contact Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-8">UNFOLD LAB이 함께 합니다.</h3>
            <p className="text-zinc-400 text-lg leading-relaxed mb-12">
              무료 상담을 통해 고민을 공유해 주시면 최적의 솔루션을 제안해 드리겠습니다.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-zinc-900 border border-white/5 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email</p>
                  <p className="text-white font-medium">{settings.contactEmail}</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-zinc-900 border border-white/5 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Location</p>
                  <p className="text-white font-medium">{settings.contactAddress}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 p-10 rounded-2xl border border-white/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">이름</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange-500 focus:outline-none" placeholder="홍길동" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">연락처</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange-500 focus:outline-none" placeholder="010-0000-0000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">이메일</label>
                <input type="email" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange-500 focus:outline-none" placeholder="example@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">문의 내용</label>
                <textarea rows={5} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange-500 focus:outline-none" placeholder="구체적인 문의 내용을 적어주세요."></textarea>
              </div>
              <button className="w-full bg-orange-500 text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition-all">
                문의 보내기
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
