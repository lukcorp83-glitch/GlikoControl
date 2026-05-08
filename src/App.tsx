/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import PromoWidget from './components/PromoWidget';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Brain, 
  Radio, 
  TrendingUp, 
  Shield, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  Smartphone, 
  Globe, 
  Mail,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  SignalHigh,
  Waves,
  Database,
  Network,
  Cpu,
  Heart,
  PawPrint,
  FileText,
  Plus,
  Sparkles,
  Camera,
  Utensils
} from 'lucide-react';
import { cn } from './lib/utils';
import { GlikoSenseCollision } from './components/GlikoSenseCollision';

const instructionSlides = [
  {
    icon: Smartphone,
    title: 'Mobilne PWA',
    desc: 'GlikoSense działa jako nowoczesna aplikacja PWA, dostępna bezpośrednio przez przeglądarkę na Twoim telefonie.',
    bg: 'bg-indigo-50',
    color: 'text-indigo-600',
    details: [
      { title: 'iOS / Safari', content: 'Kliknij Udostępnij (square-arrow) i wybierz "Dodaj do ekranu początkowego". Gotowe!' },
      { title: 'Android / Chrome', content: 'Otwórz menu (trzy kropki) i wybierz "Instaluj aplikację". GlikoSense pojawi się na pulpicie.' },
      { title: 'Działanie Cloud', content: 'Aplikacja aktualizuje się automatycznie przy każdym otwarciu, bez wizyt w App Store.' }
    ]
  },
  {
    icon: Database,
    title: 'Dane Nightscout',
    desc: 'Twoja baza Nightscout to fundament analityki. GlikoSense bezpiecznie pobiera z niej dane Twojej glikemii.',
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    details: [
      { title: 'Adres URL', content: 'Wprowadź publiczny adres swojej bazy (np. https://ns.mojadomena.pl) w profilu.' },
      { title: 'API Secret', content: 'API Secret służy wyłącznie do bezpiecznego odczytu trendów historycznych do modelu AI.' },
      { title: 'Autoryzacja', content: 'Zalecane jest użycie Tokenów Dostępu (Access Tokens) dla maksymalnego poziomu ochrony.' }
    ]
  },
  {
    icon: Radio,
    title: 'Ekosystem xDrip+',
    desc: 'Pełna integracja z xDrip+. Wysyłaj dane bezpośrednio lub wyświetlaj prognozy GlikoSense na zegarku.',
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
    details: [
      { title: 'Tryb Follower', content: 'Skonfiguruj xDrip+ jako Nightscout Follower, używając unikalnego URL GlikoSense.' },
      { title: 'Prognozy AI', content: 'Dzięki integracji, przewidywane trendy z modelu Gemini zobaczysz bezpośrednio w menu xDrip.' },
      { title: 'Dla Rodziców', content: 'Podłącz wiele telefonów jako Followers, aby monitorować prognozy AI dziecka w czasie rzeczywistym.' }
    ]
  },
  {
    icon: FileText,
    title: 'Analiza CSV',
    desc: 'Nie masz Nightscout? To nie problem. Prześlij eksport CSV z XDrip, a Gemini AI zajmie się resztą.',
    bg: 'bg-amber-50',
    color: 'text-amber-600',
    details: [
      { title: 'Format Eksportu', content: 'Obsługujemy standardowy eksport CSV z xDrip+ (Settings > Data Export).' },
      { title: 'Modele Gemini', content: 'Przesłany plik analizowany jest przez model Gemini Pro pod kątem Twoich nawyków.' },
      { title: 'Głębokie wzorce', content: 'Otrzymasz raport identyfikujący błędy w dawkowaniu, których nie widać na co dzień.' }
    ]
  }
];

const InstructionCarousel = ({ slides }: { slides: typeof instructionSlides }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Visual Tab Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "flex flex-col items-center p-6 rounded-[32px] transition-all duration-500 border-2",
              current === i 
                ? "bg-white border-brand-600 shadow-xl shadow-brand-600/10 scale-105 z-10" 
                : "bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
            )}
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm", slide.bg, slide.color)}>
              <slide.icon size={24} />
            </div>
            <span className={cn("text-sm font-bold tracking-tight", current === i ? "text-brand-600" : "text-slate-500")}>
              {slide.title}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="relative group h-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[40px] p-8 md:p-14 border border-slate-100 shadow-2xl overflow-hidden min-h-[550px]">
            {/* Left Decor / Background */}
            <div className={cn("absolute top-0 left-0 w-2 h-full", slides[current].color.replace('text', 'bg'))} />
            
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm", slides[current].bg, slides[current].color)}>
                KROK {current + 1}
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                {slides[current].title}
              </h3>
              <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-8">
                {slides[current].desc}
              </p>
              
              <div className="flex items-center gap-4">
                 <button 
                  onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                  className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft size={28} />
                </button>
                <button 
                  onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                  className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center text-white hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/30"
                >
                  <ChevronRight size={28} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center gap-4">
              {slides[current].details.map((detail, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="group flex gap-6 p-6 md:p-8 rounded-[32px] hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-lg font-black text-slate-300 group-hover:border-brand-500 group-hover:text-brand-500 transition-colors">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{detail.title}</h4>
                    <p className="text-slate-500 text-base md:text-lg leading-relaxed">{detail.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const GlikoSenseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <defs>
      <linearGradient id="glikoSenseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#glikoSenseGradient)" />
    <path 
      d="M 25,50 L 35,50 L 42,30 L 52,70 L 58,45 L 65,55 L 75,55" 
      stroke="white" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="none"
    />
  </svg>
);

const features = [
  {
    id: 'glikosens-neural',
    title: 'Sieć Neuronowa GlikoSense',
    description: 'Zaawansowana sieć neuronowa (TensorFlow.js), która analizuje trendy glikemii w czasie rzeczywistym, eliminując szumy pomiarowe i dostarczając precyzyjne prognozy.',
    icon: GlikoSenseIcon,
    color: 'text-brand-500',
    bg: 'bg-brand-50'
  },
  {
    id: 'zwierzaki',
    title: 'Zwierzaki dla Najmłodszych',
    description: 'Interaktywne Gliko pomagają dzieciom zrozumieć cukrzycę. Wirtualny opiekun reaguje na trendy glikemii, ucząc poprzez zabawę.',
    icon: PawPrint,
    color: 'text-rose-500',
    bg: 'bg-rose-50'
  },
  {
    id: 'raporty-ai',
    title: 'Analiza Plików CSV',
    description: 'Zaawansowana analiza wgranych plików CSV. Gemini AI przetwarza Twoje dane historyczne, identyfikując trendy i sugerując optymalizacje.',
    icon: FileText,
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  },
  {
    id: 'pwa-pro',
    title: 'Tryb PWA & Cloud',
    description: 'Pełna funkcjonalność offline jako aplikacja natywna. Bezpieczna synchronizacja z Google Firebase zabezpiecza Twoje dane na zawsze.',
    icon: Smartphone,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50'
  }
];

const NeuralNetIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <circle cx="5" cy="5" r="2" />
    <path d="M7 7l10 10M7 17L17 7M12 9V5M12 15v4M9 12H5M15 12h4" />
  </svg>
);

const GlikoLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <rect width="100" height="100" rx="20" fill="#020617"/>
    <g transform="scale(0.8) translate(12.5, 12.5)">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      <path 
        d="M 60,15 A 35,35 0 1 0 85,50" 
        stroke="url(#logoGradient)" 
        strokeWidth="15" 
        strokeLinecap="round" 
        fill="none"
      />
      <path 
        d="M 38,55 L 50,43 L 62,55" 
        stroke="white" 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
      />
    </g>
  </svg>
);

const GlikoSensIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
    <path d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z"/>
    <path d="M12 12v.01"/>
    <path d="M16 12a4 4 0 0 1-4 4"/>
    <path d="M8 12a4 4 0 0 1 4-4"/>
  </svg>
);

const FaqItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:border-brand-200 transition-colors"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left"
      >
        <h4 className="font-bold text-lg text-slate-900 pr-8">{q}</h4>
        <div className={cn("flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm border border-slate-100 transition-transform duration-300", isOpen && "rotate-180 bg-brand-50 border-brand-200")}>
          <ChevronDown className={cn("text-slate-400 transition-colors", isOpen && "text-brand-500")} size={18} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-6 pb-6 text-slate-600 leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const showcaseFeatures = [
  {
    title: "Inteligentny Skan Talerza",
    description: "Zrób zdjęcie swojego posiłku, a nasz AI automatycznie przeliczy węglowodany, białka, tłuszcze oraz indeks glikemiczny.",
    icon: <Camera className="w-6 h-6 text-emerald-500" />,
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-100 dark:border-emerald-900/20",
    colSpan: "col-span-1 md:col-span-2"
  },
  {
    title: "GlikoSense AI",
    description: "Uczący się algorytm przewidujący trendy, zjawisko brzasku i analizujący Twoje skoki cukru przed czasem.",
    icon: <Brain className="w-6 h-6 text-purple-500" />,
    bg: "bg-purple-50 dark:bg-purple-500/10",
    border: "border-purple-100 dark:border-purple-900/20",
    colSpan: "col-span-1 md:col-span-2"
  },
  {
    title: "Precyzyjny Kalkulator Bolusa",
    description: "Obliczanie dawki na podstawie trendu z CGM, aktywnych węglowodanów i profili godzinowych.",
    icon: <Activity className="w-6 h-6 text-blue-500" />,
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-100 dark:border-blue-900/20",
    colSpan: "col-span-1"
  },
  {
    title: "Społeczność Produktów",
    description: "Dodawaj własne dania, udostępniaj je i odkrywaj bazę zweryfikowanych posiłków innych użytkowników.",
    icon: <Globe className="w-6 h-6 text-orange-500" />,
    bg: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-100 dark:border-orange-900/20",
    colSpan: "col-span-1 md:col-span-2"
  },
  {
    title: "Tryb Pizza i FBT",
    description: "Zaawansowane obliczenia dla posiłków bogatych w białka i tłuszcze z rekomendacją podziału dawek.",
    icon: <Utensils className="w-6 h-6 text-rose-500" />,
    bg: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-100 dark:border-rose-900/20",
    colSpan: "col-span-1"
  },
  {
    title: "Badania i Prywatność",
    description: "Anonimowa telemetria. Włącz się do badania, by razem z GlikoSense ulepszać globalne systemy predykcji leczenia.",
    icon: <Shield className="w-6 h-6 text-slate-500" />,
    bg: "bg-slate-50 dark:bg-slate-500/10",
    border: "border-slate-100 dark:border-slate-900/20",
    colSpan: "col-span-1 md:col-span-3"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showGlikoSenseDetails, setShowGlikoSenseDetails] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-100">
      {/* Navigation */}
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          scrolled ? "bg-white/80 backdrop-blur-md py-3 border-slate-200" : "bg-transparent py-5 border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GlikoLogo className="w-10 h-10 shadow-lg shadow-brand-500/20" />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Gliko<span className="text-brand-600">Control</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Funkcje', 'Technologia', 'Nightscout', 'Nowości', 'FAQ'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <a 
              href="mailto:GlikoControl@proton.me" 
              className="bg-brand-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-brand-700 transition-all flex items-center gap-2"
            >
              <Mail size={16} />
              Kontakt
            </a>
          </div>

          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {['Funkcje', 'Technologia', 'Nightscout', 'Nowości', 'FAQ'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                  className="text-2xl font-semibold text-slate-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a 
                href="mailto:GlikoControl@proton.me" 
                className="bg-brand-600 text-white px-5 py-4 rounded-2xl text-center font-bold flex items-center justify-center gap-3"
              >
                <Mail size={20} />
                Kontakt e-mail
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.4, 0.6]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-50 rounded-full blur-[120px]" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.5, 0.6]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-50 rounded-full blur-[120px]" 
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <Zap size={14} className="fill-brand-700 animate-pulse" />
                Napędzane przez AI Gemini
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 max-w-4xl mx-auto leading-[1.1]">
                Twoja Cukrzyca pod Kontrolą <span className="text-brand-600 italic">Sztucznej Inteligencji</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                GlikoControl to zaawansowany ekosystem, który łączy dane z CGM, integrację Nightscout i moc Gemini AI, aby dostarczać precyzyjne prognozy i analizy Twojego zdrowia.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-brand-600/20 hover:bg-brand-700 transition-all flex items-center justify-center gap-2"
                >
                  Rozpocznij Teraz 
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Dashboard Preview removed */}
          </div>

          {/* Stats Bar */}
          <div className="absolute bottom-0 left-0 right-0 border-y border-slate-200/50 bg-white/50 backdrop-blur-md hidden md:block">
            <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center divide-x divide-slate-200/50">
              {[
                { value: 'Firebase', label: 'Infrastruktura Google z pancerą autoryzacją i bezpieczną bazą danych Cloud' },
                { value: 'Cloudflare', label: 'Globalna tarcza anty-DDoS i inteligentna ochrona aplikacji w czasie rzeczywistym' },
                { value: 'Szyfrowanie', label: 'Standard wojskowy AES-256 i bezpieczny protokół TLS 1.3 dla każdego połączenia' },
                { value: 'RODO', label: 'Pełna anonimizacja danych i rygorystyczne podejście do prywatności zgodnie z wymogami UE' }
              ].map((stat, i) => (
                <div key={i} className="flex-1 text-center px-4">
                  <div className="text-2xl font-black text-slate-900 mb-1 leading-none">{stat.value}</div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-tight max-w-[180px] mx-auto">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Showcase (Bento Grid) */}
        <section id="funkcje" className="py-24 bg-white dark:bg-slate-950 px-6">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Zarządzanie Cukrzycą <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">
                na zupełnie nowym poziomie.
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Zbudowany dla pełnej kontroli, wspierany przez najnowszą sztuczną inteligencję i wspólną wiedzę naszej wielkiej pacjenckiej społeczności.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {showcaseFeatures.map((feat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`p-8 rounded-[2rem] border ${feat.bg} ${feat.border} ${feat.colSpan} transition-transform hover:-translate-y-1 cursor-pointer`}
              >
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feat.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Analysis Demo */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[60%] h-full bg-brand-500/10 blur-[120px] -z-0" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/20 text-brand-300 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  Mózg Systemu
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                  Analityka Gemini AI w Służbie <span className="text-brand-400">Twojego Zdrowia</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  GlikoControl wysyła anonimowe trendy glikemii do modelu Gemini, który dokonuje wielowymiarowej analizy. Rozpoznaje ukryte wzorce, wpływ posiłków i aktywności fizycznej, dostarczając personalizowane wskazówki.
                </p>
                
                <ul className="space-y-4">
                  {[
                    'Wykrywanie wzorców nocnych hipoglikemii',
                    'Analiza wpływu węglowodanów na wzrosty',
                    'Sugestie korekt bazy na podstawie trendów',
                    'Inteligentna analiza plików CSV (ML)'
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex items-center gap-3 text-slate-200"
                    >
                      <CheckCircle2 className="text-brand-400" size={20} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 20 }}
                  className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-[40px] shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center"
                    >
                      <Brain size={18} />
                    </motion.div>
                    <span className="font-bold">Analiza Gemini AI</span>
                  </div>
                  
                  <div className="space-y-4 font-mono text-sm">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50 text-slate-300"
                    >
                      <span className="text-brand-400">$</span> Analizuję dane z ostatnich 24h...
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="p-4 bg-brand-500/10 rounded-2xl border border-brand-500/20 text-brand-100"
                    >
                      <AlertCircle className="inline mr-2 mb-1" size={16} />
                      Wykryto powtarzalny wzrost o 10:30 po śniadaniu. Sugerowana korekta czasu pre-bolusa o +5 minut.
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 }}
                      className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-purple-100"
                    >
                      Przewidywana stabilizacja: 120 mg/dL ±10 za ok. 45 min.
                    </motion.div>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <div className="flex gap-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-3 h-3 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* GlikoSense Section (Merged Tech and NN) */}
        <section className="py-24 bg-white overflow-hidden text-center md:text-left">
          <div className="max-w-7xl mx-auto px-6">
            <GlikoSenseCollision />
            <div className="flex flex-col md:flex-row items-center gap-16 mt-16">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex-1 order-2 md:order-1"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: GlikoSenseIcon, title: 'GlikoSense NN', label: 'Neural Network', color: 'bg-brand-100' },
                    { icon: PawPrint, title: 'Gliko', label: 'Dla Dzieci', color: 'bg-rose-100', iconColor: 'text-rose-600' },
                    { icon: Brain, title: 'Gemini AI', label: 'Analiza Wzorców', color: 'bg-purple-100', iconColor: 'text-purple-600' },
                    { icon: FileText, title: 'Analiza CSV', label: 'Import Danych', color: 'bg-emerald-100', iconColor: 'text-emerald-600' }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-sm"
                    >
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", item.color)}>
                        {item.title === 'GlikoSense NN' ? (
                          <item.icon className="w-8 h-8" />
                        ) : (
                          <item.icon size={24} className={item.iconColor} />
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex-1 order-1 md:order-2"
              >
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6"><span className="text-brand-600">GlikoSense</span> Pod Maską</h2>
                <p className="text-slate-600 text-lg mb-4 leading-relaxed">
                  Wyobraź sobie swój metabolizm jako układ napędowy samochodu. Podstawowe aplikacje to po prostu deska rozdzielcza – pokazują Ci, z jaką prędkością właśnie jedziesz.
                </p>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  <strong className="text-brand-700">GlikoSense to zaawansowany komputer sterujący silnikiem (ECU).</strong> Zamiast tylko informować o obecnym poziomie glukozy, analizuje tysiące parametrów na bieżąco, rozumiąc, ile podajesz "paliwa" (insuliny i jedzenia) w zderzeniu ze stopniem "obciążenia" trasą (stresem i ruchem). Przewiduje następne "zakręty" Twojej glikemii, zanim do nich dojedziesz.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 justify-center md:justify-start">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mt-1 w-5 h-5 rounded-full bg-brand-500 flex-shrink-0" 
                    />
                    <p className="text-slate-700 font-medium font-sans italic">Prywatność i precyzja to fundamenty tego projektu.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-slate-600">
                       <Shield size={16} className="text-brand-600" />
                       <span className="text-sm font-semibold">Szyfrowanie 256-bit</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                       <Zap size={16} className="text-brand-600" />
                       <span className="text-sm font-semibold">Real-time sync</span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={() => setShowGlikoSenseDetails(!showGlikoSenseDetails)}
                      className={cn(
                        "relative group px-8 py-4 rounded-2xl font-bold transition-all duration-500 flex items-center gap-3 overflow-hidden",
                        showGlikoSenseDetails 
                          ? "bg-slate-900 text-white shadow-2xl shadow-brand-500/20" 
                          : "bg-brand-50 text-brand-600 hover:bg-brand-100"
                      )}
                    >
                      {/* Button Glow Effect */}
                      <motion.div 
                        animate={{ 
                          opacity: showGlikoSenseDetails ? [0.5, 0.8, 0.5] : 0,
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-indigo-500/20 blur-xl"
                      />
                      
                      <span className="relative z-10">
                        {showGlikoSenseDetails ? "Ukryj szczegóły" : "Odkryj magię GlikoSense"}
                      </span>
                      
                      <motion.div
                        animate={{ 
                          rotate: showGlikoSenseDetails ? 180 : 0,
                          x: showGlikoSenseDetails ? 0 : [0, 5, 0]
                        }}
                        transition={showGlikoSenseDetails ? { duration: 0.4 } : { repeat: Infinity, duration: 1.5 }}
                        className="relative z-10"
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {showGlikoSenseDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="relative"
                        >
                          {/* Neural Connection Web Effect - More Magic */}
                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {[...Array(12)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                  opacity: [0, 0.4, 0], 
                                  scale: [0, 1.5, 0],
                                  x: [0, (Math.random() - 0.5) * 200],
                                  y: [0, (Math.random() - 0.5) * 200]
                                }}
                                transition={{ 
                                  duration: 4 + Math.random() * 4, 
                                  repeat: Infinity, 
                                  delay: i * 0.3 
                                }}
                                className="absolute left-1/2 top-1/2"
                              >
                                <div className="w-2 h-2 bg-brand-400 blur-sm rounded-full" />
                              </motion.div>
                            ))}
                          </div>

                          <div className="mt-8 p-[1px] bg-gradient-to-br from-brand-400 via-indigo-500 to-brand-400 rounded-[40px] animate-gradient-xy">
                            <div className="p-8 md:p-12 bg-white/95 backdrop-blur-xl rounded-[39px] shadow-inner relative overflow-hidden">
                              {/* Scanning Line - Faster & More Vivid */}
                              <motion.div 
                                animate={{ top: ['-20%', '120%'], opacity: [0, 1, 1, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-500 to-transparent z-10 shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                              />

                              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-600/30">
                                      <Brain size={24} />
                                    </div>
                                    <div>
                                      <h4 className="text-xl font-black text-slate-900 tracking-tight">Kognitywne ECU (LSTM)</h4>
                                      <p className="text-brand-600 text-xs font-bold uppercase tracking-widest">TensorFlow.js Core</p>
                                    </div>
                                  </div>
                                  <p className="text-slate-600 leading-relaxed">
                                    GlikoSense wykorzystuje sieć <span className="text-slate-900 font-bold">Long Short-Term Memory</span>. Podobnie jak nowoczesny silnik dostraja zapłon w ułamkach sekund analizując dziesiątki czujników, nasz model predykcyjny uczy się Twojej unikalnej "mapy wtrysku" – czyli tego, jak Twój organizm reaguje na insulinę, posiłki i wysiłek.
                                  </p>

                                  {/* High-Tech Data Flow Presentation */}
                                  <div className="relative h-64 bg-[#020617] rounded-[40px] overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl group/present">
                                    {/* Grid Overlay */}
                                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:14px_14px]" />
                                    
                                    {/* Glow Background - Dynamic */}
                                    <motion.div 
                                      animate={{ 
                                        opacity: [0.3, 0.5, 0.3],
                                        scale: [1, 1.1, 1]
                                      }}
                                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                      className="absolute inset-0 bg-gradient-to-tr from-brand-600/20 via-transparent to-indigo-600/20" 
                                    />

                                    <div className="flex items-center justify-between w-full px-8 md:px-16 relative z-10">
                                      {/* Inputs */}
                                      <div className="flex flex-col gap-5">
                                        {[
                                          { label: 'Glukoza', icon: Activity, color: 'text-brand-400', delay: 0 },
                                          { label: 'Insulina', icon: Zap, color: 'text-amber-400', delay: 0.4 },
                                          { label: 'Ruch', icon: Smartphone, color: 'text-emerald-400', delay: 0.8 }
                                        ].map((input, i) => (
                                          <motion.div 
                                            key={i}
                                            initial={{ x: -30, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 + (i * 0.2), type: "spring" }}
                                            className="relative flex items-center gap-3 bg-white/5 border border-white/10 p-2.5 pr-5 rounded-2xl backdrop-blur-xl shadow-lg"
                                          >
                                            <div className={cn("w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-inner", input.color)}>
                                              <input.icon size={18} />
                                            </div>
                                            <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{input.label}</span>
                                            
                                            {/* Data Stream to Core - Enhanced */}
                                            <div className="absolute left-full ml-3 w-16 md:w-32 h-px">
                                              <div className="absolute inset-0 bg-white/10 rounded-full" />
                                              {[...Array(2)].map((_, j) => (
                                                <motion.div 
                                                  key={j}
                                                  animate={{ 
                                                    x: ['-10%', '110%'],
                                                    opacity: [0, 1, 0]
                                                  }}
                                                  transition={{ 
                                                    duration: 1.2 + (j * 0.4), 
                                                    repeat: Infinity, 
                                                    delay: input.delay + (j * 0.2), 
                                                    ease: "anticipate" 
                                                  }}
                                                  className={cn(
                                                    "absolute top-1/2 -translate-y-1/2 h-[2px] rounded-full shadow-[0_0_8px_currentColor]",
                                                    input.color,
                                                    j === 0 ? "w-4 bg-current" : "w-2 bg-white"
                                                  )}
                                                />
                                              ))}
                                            </div>
                                          </motion.div>
                                        ))}
                                      </div>

                                      {/* The Neural Core - Magical & Prominent */}
                                      <div className="relative">
                                        <motion.div 
                                          animate={{ 
                                            scale: [1, 1.08, 1],
                                            rotate: [0, 2, -2, 0],
                                            filter: [
                                              "drop-shadow(0 0 20px rgba(14,165,233,0.3))",
                                              "drop-shadow(0 0 40px rgba(14,165,233,0.6))",
                                              "drop-shadow(0 0 20px rgba(14,165,233,0.3))"
                                            ]
                                          }}
                                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                          className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] bg-gradient-to-br from-brand-600 to-indigo-700 flex items-center justify-center text-white relative z-20 shadow-2xl overflow-hidden group/core"
                                        >
                                          {/* Internal Core Magic */}
                                          <motion.div 
                                            animate={{ 
                                              opacity: [0.1, 0.4, 0.1],
                                              scale: [1, 1.5, 1]
                                            }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="absolute inset-0 bg-white blur-2xl rounded-full"
                                          />
                                          <Brain size={48} className="relative z-10 drop-shadow-lg" />
                                        </motion.div>
                                        
                                        {/* Multi-Layered Orbiting Rings */}
                                        {[...Array(3)].map((_, i) => (
                                          <motion.div 
                                            key={i}
                                            animate={{ 
                                              rotate: i % 2 === 0 ? 360 : -360,
                                              scale: [0.95, 1.05, 0.95],
                                              opacity: [0.1, 0.3, 0.1]
                                            }}
                                            transition={{ 
                                              rotate: { duration: 8 + (i * 4), repeat: Infinity, ease: "linear" },
                                              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                            }}
                                            className={cn(
                                              "absolute -inset-6 border border-dashed rounded-[40px] pointer-events-none",
                                              i === 0 ? "border-brand-400" : i === 1 ? "border-indigo-400 rotate-45" : "border-emerald-400 rotate-90"
                                            )}
                                            style={{ margin: `-${i * 12}px` }}
                                          />
                                        ))}

                                        {/* Pulse Rays */}
                                        {[...Array(4)].map((_, i) => (
                                          <motion.div 
                                            key={i}
                                            animate={{ 
                                              scale: [1, 2],
                                              opacity: [0.4, 0]
                                            }}
                                            transition={{ 
                                              duration: 2, 
                                              repeat: Infinity, 
                                              delay: i * 0.5,
                                              ease: "easeOut"
                                            }}
                                            className="absolute inset-0 border-2 border-brand-500/30 rounded-[32px] -z-10"
                                          />
                                        ))}

                                        {/* Engine Data link */}
                                        <div className="absolute left-full ml-4 md:ml-6 top-1/2 -translate-y-1/2 w-8 md:w-16 h-px z-0 hidden md:block">
                                          <div className="absolute inset-0 bg-brand-500/20 rounded-full" />
                                          {[...Array(3)].map((_, j) => (
                                            <motion.div 
                                              key={`stream-${j}`}
                                              animate={{ 
                                                x: ['-10%', '110%'],
                                                opacity: [0, 1, 0]
                                              }}
                                              transition={{ 
                                                duration: 1, 
                                                repeat: Infinity, 
                                                delay: j * 0.3, 
                                                ease: "linear" 
                                              }}
                                              className="absolute top-1/2 -translate-y-1/2 h-[2px] w-4 md:w-6 bg-brand-400 rounded-full shadow-[0_0_8px_#38bdf8]"
                                            />
                                          ))}
                                        </div>
                                      </div>

                                      {/* Output - The Engine (Metabolism) */}
                                      <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1.5 }}
                                        className="flex flex-col items-center gap-3 relative z-10"
                                      >
                                        <div className="relative group/engine bg-[#0a0f1c] border border-slate-700/60 p-2 md:p-3 rounded-2xl shadow-[0_0_30px_rgba(30,41,59,0.8)] flex gap-1 items-center">
                                          {/* Subtle engine block glow */}
                                          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/20 to-transparent rounded-2xl" />
                                          
                                          {/* 4 Pistons representing optimized metabolism */}
                                          {[...Array(4)].map((_, i) => (
                                            <div key={i} className="w-5 md:w-8 h-20 md:h-24 border-x border-slate-700/80 relative overflow-hidden bg-[#05080f] mx-[1px] md:mx-0.5 rounded-[2px] shadow-inner">
                                              {/* Spark/Combustion Glow */}
                                              <motion.div
                                                animate={{ opacity: [0, 0, 1, 0, 0] }}
                                                transition={{ duration: 0.8, repeat: Infinity, delay: [0, 0.6, 0.2, 0.4][i], ease: "easeInOut" }}
                                                className="absolute top-0 inset-x-0 h-4 md:h-6 bg-gradient-to-b from-brand-400 to-transparent mix-blend-screen z-20"
                                              />
                                              <motion.div
                                                animate={{ scale: [1, 1, 1.5, 1, 1], opacity: [0, 0, 1, 0, 0] }}
                                                transition={{ duration: 0.8, repeat: Infinity, delay: [0, 0.6, 0.2, 0.4][i], ease: "easeInOut" }}
                                                className="absolute -top-1 md:-top-2 left-1/2 -translate-x-1/2 w-3 h-3 md:w-5 md:h-5 bg-amber-300 rounded-full blur-[3px] md:blur-[4px] z-20"
                                              />

                                              {/* Piston Head & Rod */}
                                              <motion.div
                                                animate={{ y: ['48px', '4px', '48px'] }}
                                                transition={{ duration: 0.8, repeat: Infinity, delay: [0, 0.6, 0.2, 0.4][i], ease: "easeInOut" }}
                                                className="absolute top-0 w-full h-8 flex flex-col items-center z-10"
                                              >
                                                {/* Head */}
                                                <div className="w-[85%] h-4 md:h-5 bg-gradient-to-b from-slate-300 to-slate-500 rounded-t-[2px] shadow-[0_-2px_4px_rgba(0,0,0,0.5)_inset] border-b border-slate-600 flex flex-col justify-evenly py-[2px] md:py-[3px]">
                                                  <div className="w-full h-px bg-slate-700/60" />
                                                  <div className="w-full h-px bg-slate-700/60" />
                                                </div>
                                                {/* Rod */}
                                                <div className="w-1.5 md:w-2.5 h-16 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 shadow-inner" />
                                              </motion.div>
                                            </div>
                                          ))}
                                        </div>
                                        <span className="text-[10px] md:text-[11px] font-black text-brand-400 uppercase tracking-[0.2em] md:tracking-[0.3em] leading-none drop-shadow-sm mt-1">METABOLIZM</span>
                                      </motion.div>
                                    </div>

                                    {/* Wandering Photon Particles - More Organic & Colorful */}
                                    {[...Array(25)].map((_, i) => (
                                      <motion.div
                                        key={i}
                                        initial={{ 
                                          x: Math.random() * 600, 
                                          y: Math.random() * 300,
                                          opacity: 0,
                                          scale: 0.5
                                        }}
                                        animate={{ 
                                          x: [null, Math.random() * 600, Math.random() * 600], 
                                          y: [null, Math.random() * 300, Math.random() * 300],
                                          opacity: [0, 0.6, 0.2, 0.6, 0],
                                          scale: [0.5, 1.2, 0.5]
                                        }}
                                        transition={{ 
                                          duration: 10 + Math.random() * 15, 
                                          repeat: Infinity, 
                                          ease: "easeInOut" 
                                        }}
                                        className={cn(
                                          "absolute w-1 h-1 rounded-full blur-[1px]",
                                          i % 3 === 0 ? "bg-brand-400 shadow-[0_0_8px_#0ea5e9]" : 
                                          i % 3 === 1 ? "bg-indigo-400 shadow-[0_0_8px_#818cf8]" : 
                                          "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                                        )}
                                      />
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-4">
                                   {[
                                    { 
                                      title: 'Filtracja Szumów', 
                                      icon: Zap, 
                                      desc: 'Eliminacja błędnych odczytów sensorów w milisekundach.',
                                      animate: { scale: [1, 1.2, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }
                                    },
                                    { 
                                      title: 'Gemini Synergy', 
                                      icon: Sparkles, 
                                      desc: 'Weryfikacja trendów przez LLM dla opisowej interpretacji.',
                                      animate: { rotate: [0, 15, -15, 0], color: ["#0ea5e9", "#8b5cf6", "#0ea5e9"] }
                                    },
                                    { 
                                      title: 'Adaptacja fazy', 
                                      icon: Activity, 
                                      desc: 'Model dostraja się do Twojej wrażliwości na insulinę.',
                                      animate: { x: [0, 4, 0], opacity: [1, 0.7, 1] }
                                    }
                                   ].map((item, idx) => (
                                      <motion.div 
                                        key={idx}
                                        initial={{ x: 30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ 
                                          delay: 0.4 + (idx * 0.15),
                                          duration: 0.5,
                                          ease: "easeOut"
                                        }}
                                        className="flex gap-5 p-5 rounded-[24px] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-brand-500/5 transition-all group relative overflow-hidden"
                                      >
                                        <div className="relative">
                                          <motion.div
                                            animate={item.animate}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                          >
                                            <item.icon size={24} className="text-brand-500 shrink-0 relative z-10" />
                                          </motion.div>
                                          <motion.div 
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 bg-brand-400/20 blur-lg rounded-full"
                                          />
                                        </div>
                                        <div>
                                          <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                                            {item.title}
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                          </div>
                                          <div className="text-slate-500 text-sm leading-snug">{item.desc}</div>
                                        </div>
                                      </motion.div>
                                   ))}
                                </div>
                              </div>

                              <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-[10px] font-black text-brand-600 uppercase tracking-[0.4em] animate-pulse">
                                  Neural Link Active • GlikoSense Engine
                                </div>
                                <div className="flex gap-2">
                                  {[...Array(8)].map((_, i) => (
                                    <motion.div 
                                      key={i}
                                      animate={{ 
                                        opacity: [0.1, 1, 0.1],
                                        height: [4, 12, 4]
                                      }}
                                      transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: i * 0.1 }}
                                      className="w-1 bg-brand-500 rounded-full"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Instructions Section (Carousel) */}
        <section id="instrukcje" className="py-24 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Centrum Konfiguracji</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Wszystko, co musisz wiedzieć, aby GlikoControl działało idealnie na Twoim urządzeniu.</p>
            </motion.div>

            <InstructionCarousel slides={instructionSlides} />
          </div>
        </section>

        <section className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                  Twój cyfrowy asystent, <br className="hidden md:block" /><span className="text-brand-600">zawsze pod ręką</span>
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  GlikoControl łączy potęgę algorytmów sztucznej inteligencji z intuicyjnym, nowoczesnym interfejsem. Monitoruj swoją glikemię, analizuj posiłki i zarządzaj dawkami insuliny z poziomu jednego potężnego narzędzia.
                </p>
                <ul className="space-y-4">
                  {[
                    "Natychmiastowe predykcje z Gemini AI",
                    "Analiza makroskładników wprost ze zdjęć",
                    "Przejrzyste i interaktywne wykresy na żywo"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium text-lg">
                      <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-sm">
                        ✓
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex justify-center lg:justify-end"
              >
                {/* Decorative glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-400/20 blur-[100px] rounded-full point-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-400/20 blur-[80px] rounded-full point-events-none" />
                
                <PromoWidget />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="nowosci" className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-1/3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  <Sparkles size={14} />
                  Aktualizacja 3.3
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Stale Ulepszamy <br /> <span className="text-brand-600">GlikoControl</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  Wersja 3.3 to milowy krok w stabilności i niezawodności. Skupiłem się na fundamentach, aby Twoje doświadczenie z aplikacją było bezbłędne.
                </p>
                <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Zap className="text-brand-500" size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Wersja Aplikacji</div>
                      <div className="text-lg font-black text-slate-900">v3.3 Build Open</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Ostatnia aktualizacja: Maj 2026</div>
                </div>
              </div>

              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Naprawa powiadomień mobilnych",
                    desc: "Przywrócono działanie alertów na telefonach (rozwiązano błąd \"Illegal constructor\").",
                    icon: <Smartphone size={24} className="text-blue-500" />,
                    bg: "bg-blue-50"
                  },
                  {
                    title: "Stabilność PWA",
                    desc: "Poprawiono plik manifestu i Service Worker, co zapewnia lepszą instalację na ekranie głównym.",
                    icon: <Database size={24} className="text-emerald-500" />,
                    bg: "bg-emerald-50"
                  },
                  {
                    title: "Niezawodność Push",
                    desc: "Wyeliminowano błędy 404 przy rejestracji powiadomień w tle.",
                    icon: <Radio size={24} className="text-purple-500" />,
                    bg: "bg-purple-50"
                  },
                  {
                    title: "Poprawki GlikoSense",
                    desc: "Optymalizacja działania wirtualnego asystenta i reakcji zwrotnych.",
                    icon: <Brain size={24} className="text-amber-500" />,
                    bg: "bg-amber-50"
                  },
                  {
                    title: "Lepsza obsługa linków",
                    desc: "Poprawne ścieżki zasobów przy publikacji na różnych serwerach (np. GitHub Pages).",
                    icon: <Globe size={24} className="text-rose-500" />,
                    bg: "bg-rose-50"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-[32px] border border-slate-100 hover:border-brand-200 transition-all hover:shadow-xl hover:shadow-brand-500/5 group"
                  >
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", item.bg)}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-12 text-center"
            >
              Częste Pytania
            </motion.h2>
            <div className="space-y-4">
              {[
                {
                  q: "Czy moje dane są bezpieczne?",
                  a: "Tak. GlikoControl wykorzystuje bezpieczne szyfrowanie i integrację z Twoimi danymi. Przesył do analizy AI jest chroniony i anonimowy."
                },
                {
                  q: "Dla kogo jest ten projekt?",
                  a: "GlikoControl to w 100% projekt hobbistyczny, rozwijany z pasji do technologii i chęci eksploracji nowych rozwiązań w kontroli glikemii."
                },
                {
                  q: "Czy aplikacja jest darmowa?",
                  a: "Tak, GlikoControl jest w pełni darmowa i otwarta dla wszystkich jako projekt hobbistyczny."
                },
                {
                  q: "Czym różni się od standardowego Nightscout?",
                  a: "Nightscout to baza danych i prosty wykres. GlikoSense to warstwa inteligencji: prognozowanie AI opierające się na Gemini, zaawansowane filtry i nowoczesny interfejs PWA."
                }
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <FaqItem q={item.q} a={item.a} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white px-6">
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-500/10 blur-[100px]" />
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 relative z-10 leading-tight">Zmień zarządzanie cukrzycą <span className="text-brand-400">na lepsze</span></h2>
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10">Dołącz do użytkowników GlikoControl i zyskaj spokój ducha dzięki analityce nowej generacji.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <button className="w-full sm:w-auto bg-brand-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-brand-600 hover:-translate-y-1 transition-all shadow-xl shadow-brand-500/20">
                Pobierz GlikoControl
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <GlikoLogo className="w-8 h-8" />
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Gliko<span className="text-brand-600">Control</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="mailto:GlikoControl@proton.me" className="flex items-center gap-2 text-slate-500 hover:text-brand-600 font-medium transition-all group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 group-hover:border-brand-200 shadow-sm group-hover:shadow-md transition-all">
                  <Mail size={20} />
                </div>
                GlikoControl@proton.me
              </a>
            </div>
          </div>
          <div className="text-center text-slate-500 text-sm">
            © 2026 Projekt GlikoControl. Stworzony z pasją do technologii zdrowotnych. 
            <p className="mt-2 text-slate-400 italic">To nie jest wyrób medyczny. Skonsultuj się z lekarzem przed wprowadzeniem zmian w leczeniu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
