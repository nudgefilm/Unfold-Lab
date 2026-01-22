
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, Service, SiteSettings, ViewType } from '../types';

interface AppContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

const defaultPosts: Post[] = [];

const defaultSettings: SiteSettings = {
  brandName: 'UNFOLD LAB',
  heroTitle: '진실의 조각을 맞추는\n민간 조사 솔루션',
  heroDescription: 'UNFOLD LAB은 데이터가 가리키는 보이지 않는 진실에 다가섭니다.',
  labIntroTitle: '데이터 기반의\n인사이트 추출.',
  labIntroDescription: '우리는 법적 근거가 되는 증거를 합법적으로 수집하고 분석하는 전문가 그룹입니다. 부정 조사부터 개인의 권리 보호까지, 신뢰할 수 있는 데이터와 철저한 보안을 바탕으로 최선의 솔루션을 제공합니다.',
  labStat1Value: '94%',
  labStat1Label: '데이터 교차 검증 일치율',
  labStat2Value: '72시간',
  labStat2Label: '골든타임 증거 확보',
  labStat3Value: '360°',
  labStat3Label: '입체 동선 복원',
  services: [
    {
      id: '1',
      title: "동선 재구성 (3D Spatial Trajectory Analysis)",
      description: "수집된 위치 데이터와 현장 분석을 결합하여, 대상자의 이동 경로를 3차원 입체 공간으로 복원합니다.",
      icon: "trajectory"
    },
    {
      id: '2',
      title: "지능형 OSINT 및 디지털 프로파일링 (Intelligent OSINT & Profiling)",
      description: "공개된 데이터(Open Source Intelligence)를 수집·분석하여 숨겨진 연결 고리를 찾습니다.",
      icon: "profiling"
    },
    {
      id: '3',
      title: "팩트체크 (Investigative Fact-Checking)",
      description: "전직 기자의 집요한 취재 노하우를 바탕으로, 정황 증거들 사이의 모순을 찾아내고 실체적 진실을 규명합니다.",
      icon: "factcheck"
    },
    {
      id: '4',
      title: "시각화 리포트 (Strategic Evidence Visualization)",
      description: "복잡한 분석 결과를 법률 전문가나 판사가 한눈에 이해할 수 있도록 시각화 리포트를 발행합니다.",
      icon: "visualization"
    }
  ],
  accentColor: '#ff5c00',
  contactEmail: 'info@unfoldlab.ai',
  contactAddress: '서울특별시 강남구 테헤란로 123 데이터 타워 18층',
  footerDescription: '확인된 데이터를 토대로 인사이트를 도출하고 문제 해결을 지원합니다.',
  seoTitle: 'UNFOLD LAB | 데이터 분석 및 시각화 전문 연구소',
  seoDescription: '현대적인 데이터 분석과 예술적인 시각화를 통해 비즈니스 인사이트를 도출하는 전문 연구소입니다.',
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: 'https://www.youtube.com/@Unfold-Lab'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('unfold_posts');
    return saved ? JSON.parse(saved) : defaultPosts;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('unfold_settings');
    const parsed = saved ? JSON.parse(saved) : defaultSettings;
    if (!parsed.services) parsed.services = defaultSettings.services;
    // Ensure social links are updated to the new structure if loading from cache
    if (!parsed.socialLinks) {
        parsed.socialLinks = defaultSettings.socialLinks;
    }
    return parsed;
  });

  const [currentView, setCurrentView] = useState<ViewType>('home');

  useEffect(() => {
    localStorage.setItem('unfold_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('unfold_settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <AppContext.Provider value={{ posts, setPosts, settings, setSettings, currentView, setCurrentView }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
