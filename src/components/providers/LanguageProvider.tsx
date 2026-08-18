"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "vi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: "Home",
    allStories: "All Stories",
    aboutAuthor: "About the Author",
    contact: "Contact",
    subscribe: "Subscribe",
    footerDesc: "Free and original kids stories read online by kids, parents, teachers, and guardians all over the world!",
    quickLinks: "Quick Links",
    legal: "Legal",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    cookies: "Cookies Policy",
    rights: "Stories for Kids. All rights reserved.",
  },
  vi: {
    home: "Trang chủ",
    allStories: "Tất cả truyện",
    aboutAuthor: "Về tác giả",
    contact: "Liên hệ",
    subscribe: "Đăng ký",
    footerDesc: "Truyện thiếu nhi gốc và miễn phí được đọc trực tuyến bởi trẻ em, phụ huynh, giáo viên và người giám hộ trên toàn thế giới!",
    quickLinks: "Liên kết nhanh",
    legal: "Pháp lý",
    terms: "Điều khoản dịch vụ",
    privacy: "Chính sách bảo mật",
    cookies: "Chính sách cookie",
    rights: "Truyện cho bé. Đã đăng ký bản quyền.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    // @ts-expect-error: dynamic key lookup
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
