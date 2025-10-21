import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // يكتشف لغة المستخدم تلقائيًا
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home: "Home",
          products: "Products",
          about: "About Us",
          profile: "Profile",
          logout: "Logout",
          welcome: "Welcome to Onyx Store",
          shopping:"Start Shopping",
          Products:"Products",
          Price:"Price",
         Quantity:"Quantity",
         AddtoCart:"Add to Cart",
         Brands:"Brands",
           welcometo: " Welcome to my website!",
          this: "This website is a personal project aimed at showcasing products and services in an easy and attractive way for users. You can browse products, learn about services, and get in touch with me easily",
contact:"To contact me, send an email to",
        },
      },
      ar: {
        translation: {
          home: "الرئيسية",
          products: "المنتجات",
          about: "من نحن",
          profile: "الملف الشخصي",
          logout: "تسجيل الخروج",
          welcome: "مرحبًا بك في متجر Onyx",
           shopping:"ابدا بالتسوق",
            Products:"منتجات",
            Price:"السعر",
             Quantity:"كمية ",
              AddtoCart:"اضف الى السلة",
               Brands:"علامات تجارية",
           welcometo: " مرحبًا بكم في موقعي!",
           this: "هذا الموقع هو مشروع شخصي يهدف إلى عرض المنتجات والخدمات بطريقة سهلة وجذابة للمستخدمين. يمكنك تصفح المنتجات، والتعرف على الخدمات، والتواصل معي بسهولة",
contact:"للتواصل معي، أرسل بريدًا إلكترونيًا إلى",
        },
      },
    },
    fallbackLng: "en", // اللغة الافتراضية
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;