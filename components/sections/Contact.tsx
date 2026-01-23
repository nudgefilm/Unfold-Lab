
import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';

const Contact: React.FC = () => {
  const { settings } = useApp();
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SUBMITTING');

    try {
      const response = await fetch('https://formspree.io/f/mnjpnjkq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

          <div className="bg-zinc-900 p-10 rounded-2xl border border-white/5 relative overflow-hidden">
            {status === 'SUCCESS' ? (
              <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tight">전송 완료</h4>
                <p className="text-zinc-400">문의가 성공적으로 전달되었습니다.<br/>검토 후 빠르게 연락드리겠습니다.</p>
                <button 
                  onClick={() => setStatus('IDLE')}
                  className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all"
                >
                  새 문의 작성하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase">이름</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors" 
                      placeholder="홍길동" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase">연락처</label>
                    <input 
                      required
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors" 
                      placeholder="010-0000-0000" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">이메일</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors" 
                    placeholder="example@company.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">문의 내용</label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5} 
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors" 
                    placeholder="구체적인 문의 내용을 적어주세요."
                  ></textarea>
                </div>
                
                {status === 'ERROR' && (
                  <p className="text-red-500 text-xs font-bold">오류가 발생했습니다. 다시 시도해 주세요.</p>
                )}

                <button 
                  disabled={status === 'SUBMITTING'}
                  className={`w-full bg-orange-500 text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-3 ${status === 'SUBMITTING' ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {status === 'SUBMITTING' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      전송 중...
                    </>
                  ) : '문의 보내기'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
