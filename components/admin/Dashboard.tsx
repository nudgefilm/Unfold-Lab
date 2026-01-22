
import React, { useState, useRef } from 'react';
import { useApp } from '../../store/AppContext';
import { Post, Service } from '../../types';

const Dashboard: React.FC = () => {
  const { posts, setPosts, settings, setSettings } = useApp();
  const [activeTab, setActiveTab] = useState<'posts' | 'settings' | 'seo'>('posts');
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Post Form State
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '',
    excerpt: '',
    category: 'UNFOLD POST',
    content: '',
    image: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (editingPost) {
          setEditingPost({ ...editingPost, image: base64String });
        } else {
          setNewPost({ ...newPost, image: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePost = () => {
    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? { ...editingPost, category: 'UNFOLD POST' } : p));
      setEditingPost(null);
    } else {
      const postToAdd: Post = {
        ...newPost as Post,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        image: newPost.image || `https://picsum.photos/seed/${Date.now()}/800/400`,
        category: 'UNFOLD POST'
      };
      setPosts([postToAdd, ...posts]);
      setNewPost({ title: '', excerpt: '', category: 'UNFOLD POST', content: '', image: '' });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleSettingsSave = () => {
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleServiceChange = (id: string, field: keyof Service, value: string) => {
    const updatedServices = settings.services.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    );
    setSettings({ ...settings, services: updatedServices });
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <button
            onClick={() => setActiveTab('posts')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
              activeTab === 'posts' ? 'bg-orange-500 text-white' : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
            }`}
          >
            포스트 관리
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
              activeTab === 'settings' ? 'bg-orange-500 text-white' : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
            }`}
          >
            기본 설정
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
              activeTab === 'seo' ? 'bg-orange-500 text-white' : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
            }`}
          >
            SEO 및 소셜 도구
          </button>
        </div>

        {/* Main Dashboard Area */}
        <div className="flex-1 bg-zinc-900 rounded-2xl p-8 border border-white/5">
          {activeTab === 'posts' && (
            <div className="space-y-12">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">블로그 포스트 관리</h2>
                <button 
                  onClick={() => {setEditingPost(null); setNewPost({title:'', excerpt:'', category:'UNFOLD POST', content:'', image:''})}}
                  className="text-xs text-orange-500 hover:underline"
                >
                  새 양식 초기화
                </button>
              </div>

              <div className="bg-black/40 p-6 rounded-xl border border-white/5 space-y-4">
                <h3 className="font-bold text-zinc-300">{editingPost ? '포스트 수정' : '새 포스트 추가'}</h3>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="제목"
                    value={editingPost ? editingPost.title : (newPost.title || '')}
                    onChange={(e) => editingPost ? setEditingPost({...editingPost, title: e.target.value}) : setNewPost({...newPost, title: e.target.value})}
                    className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-xs font-bold text-white hover:bg-zinc-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    이미지 첨부
                  </button>
                  <input 
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {(editingPost?.image || newPost.image) && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded border border-white/10 overflow-hidden">
                        <img src={editingPost?.image || newPost.image} className="w-full h-full object-cover" alt="미리보기" />
                      </div>
                      <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">이미지 선택됨</span>
                    </div>
                  )}
                </div>

                <textarea
                  placeholder="요약 설명"
                  rows={2}
                  value={editingPost ? editingPost.excerpt : (newPost.excerpt || '')}
                  onChange={(e) => editingPost ? setEditingPost({...editingPost, excerpt: e.target.value}) : setNewPost({...newPost, excerpt: e.target.value})}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                ></textarea>
                <textarea
                  placeholder="본문 내용"
                  rows={6}
                  value={editingPost ? editingPost.content : (newPost.content || '')}
                  onChange={(e) => editingPost ? setEditingPost({...editingPost, content: e.target.value}) : setNewPost({...newPost, content: e.target.value})}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                ></textarea>
                <button
                  onClick={handleSavePost}
                  className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {editingPost ? '변경사항 저장' : '포스트 게시'}
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-zinc-300">현재 포스트 목록 ({posts.length})</h3>
                <div className="divide-y divide-white/5">
                  {posts.map(post => (
                    <div key={post.id} className="py-4 flex justify-between items-center group">
                      <div className="flex items-center gap-4 pr-4">
                        <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden shrink-0 border border-white/5">
                          <img src={post.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <p className="text-white font-medium line-clamp-1">{post.title}</p>
                          <p className="text-zinc-500 text-xs">{post.date} | {post.category}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 shrink-0">
                        <button onClick={() => {
                          setEditingPost(post);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }} className="text-sm text-zinc-400 hover:text-orange-500 transition-colors font-bold">수정</button>
                        <button onClick={() => handleDeletePost(post.id)} className="text-sm text-red-500/70 hover:text-red-500 transition-colors font-bold">삭제</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8 text-white">
              <h2 className="text-2xl font-bold">기본 사이트 설정</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-full border-b border-white/10 pb-4 mb-4">
                  <h3 className="text-orange-500 font-bold text-lg mb-4">히어로 섹션</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">히어로 제목 (줄바꿈 \n)</label>
                      <textarea
                        rows={2}
                        value={settings.heroTitle}
                        onChange={(e) => setSettings({...settings, heroTitle: e.target.value})}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                      ></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">히어로 설명</label>
                      <textarea
                        rows={2}
                        value={settings.heroDescription}
                        onChange={(e) => setSettings({...settings, heroDescription: e.target.value})}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-span-full border-b border-white/10 pb-4 mb-4">
                  <h3 className="text-orange-500 font-bold text-lg mb-4">LAB 소개 섹션</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">제목</label>
                      <input
                        type="text"
                        value={settings.labIntroTitle}
                        onChange={(e) => setSettings({...settings, labIntroTitle: e.target.value})}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">설명</label>
                      <textarea
                        rows={3}
                        value={settings.labIntroDescription}
                        onChange={(e) => setSettings({...settings, labIntroDescription: e.target.value})}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-black/30 rounded-lg space-y-3">
                        <label className="text-[10px] text-zinc-500 font-black uppercase">통계 1 (값 / 라벨)</label>
                        <input value={settings.labStat1Value} onChange={(e) => setSettings({...settings, labStat1Value: e.target.value})} className="w-full bg-zinc-800 p-2 rounded text-sm mb-2" />
                        <input value={settings.labStat1Label} onChange={(e) => setSettings({...settings, labStat1Label: e.target.value})} className="w-full bg-zinc-800 p-2 rounded text-xs" />
                      </div>
                      <div className="p-4 bg-black/30 rounded-lg space-y-3">
                        <label className="text-[10px] text-zinc-500 font-black uppercase">통계 2 (값 / 라벨)</label>
                        <input value={settings.labStat2Value} onChange={(e) => setSettings({...settings, labStat2Value: e.target.value})} className="w-full bg-zinc-800 p-2 rounded text-sm mb-2" />
                        <input value={settings.labStat2Label} onChange={(e) => setSettings({...settings, labStat2Label: e.target.value})} className="w-full bg-zinc-800 p-2 rounded text-xs" />
                      </div>
                      <div className="p-4 bg-black/30 rounded-lg space-y-3">
                        <label className="text-[10px] text-zinc-500 font-black uppercase">통계 3 (값 / 라벨)</label>
                        <input value={settings.labStat3Value} onChange={(e) => setSettings({...settings, labStat3Value: e.target.value})} className="w-full bg-zinc-800 p-2 rounded text-sm mb-2" />
                        <input value={settings.labStat3Label} onChange={(e) => setSettings({...settings, labStat3Label: e.target.value})} className="w-full bg-zinc-800 p-2 rounded text-xs" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-full border-b border-white/10 pb-4 mb-4">
                  <h3 className="text-orange-500 font-bold text-lg mb-4">서비스 섹션</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {settings.services.map((service, index) => (
                      <div key={service.id} className="p-6 bg-black/30 rounded-xl space-y-4 border border-white/5">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">서비스 {index + 1}</label>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] text-zinc-600 font-bold uppercase">제목</label>
                          <input 
                            value={service.title} 
                            onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)} 
                            className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] text-zinc-600 font-bold uppercase">설명</label>
                          <textarea 
                            rows={3}
                            value={service.description} 
                            onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)} 
                            className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-orange-500 focus:outline-none" 
                          ></textarea>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">브랜드 이름</label>
                  <input
                    type="text"
                    value={settings.brandName}
                    onChange={(e) => setSettings({...settings, brandName: e.target.value})}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">포인트 컬러</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={settings.accentColor}
                      onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                      className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                    />
                    <div className="w-10 h-10 rounded-lg" style={{backgroundColor: settings.accentColor}}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">연락처 이메일</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">사무실 주소</label>
                  <input
                    type="text"
                    value={settings.contactAddress}
                    onChange={(e) => setSettings({...settings, contactAddress: e.target.value})}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">푸터 설명</label>
                  <textarea
                    rows={2}
                    value={settings.footerDescription}
                    onChange={(e) => setSettings({...settings, footerDescription: e.target.value})}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-10 flex flex-col items-center gap-4">
                {showSaveMessage && (
                  <div className="text-orange-500 text-sm font-bold animate-pulse">
                    모든 설정 변경사항이 즉시 적용되었습니다.
                  </div>
                )}
                <button
                  onClick={handleSettingsSave}
                  className="w-full bg-orange-500 text-white font-black py-5 rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 text-lg uppercase tracking-tight"
                >
                  저장하기
                </button>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white">SEO 및 소셜 미디어 연동</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-black/40 rounded-xl border border-white/5 space-y-4">
                  <h3 className="font-bold text-zinc-300 flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    검색 엔진 최적화 (SEO)
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">페이지 메타 제목</label>
                      <input
                        type="text"
                        value={settings.seoTitle}
                        onChange={(e) => setSettings({...settings, seoTitle: e.target.value})}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                        placeholder="검색 결과에 표시될 제목"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">페이지 메타 설명</label>
                      <textarea
                        rows={3}
                        value={settings.seoDescription}
                        onChange={(e) => setSettings({...settings, seoDescription: e.target.value})}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                        placeholder="검색 결과 아래에 표시될 간단한 설명"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-black/40 rounded-xl border border-white/5 space-y-4">
                  <h3 className="font-bold text-zinc-300 flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    소셜 미디어 링크
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">FACEBOOK</label>
                      <input
                        type="text"
                        value={settings.socialLinks.facebook || ''}
                        onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, facebook: e.target.value}})}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">INSTAGRAM</label>
                      <input
                        type="text"
                        value={settings.socialLinks.instagram || ''}
                        onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, instagram: e.target.value}})}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">TWITTER (X)</label>
                      <input
                        type="text"
                        value={settings.socialLinks.twitter || ''}
                        onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, twitter: e.target.value}})}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase">YouTube</label>
                      <input
                        type="text"
                        value={settings.socialLinks.youtube || ''}
                        onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, youtube: e.target.value}})}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-xs text-zinc-500">모든 변경사항은 기기에 자동 저장됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
