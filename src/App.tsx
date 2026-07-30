import { useState } from 'react';
import { Check, Eye, X, Clapperboard, Heart, MessageCircle, Share2 } from 'lucide-react';
import { TimecodeWidget } from './components/TimecodeWidget.tsx';
import { TrailerModal } from './components/TrailerModal.tsx';
import { EnrollModal } from './components/EnrollModal.tsx';

interface ProgramModule {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  lessonsCount: number;
  duration: string;
  topics: string[];
  image: string;
}

const PROGRAM_MODULES: ProgramModule[] = [
  {
    id: 'mod-1',
    number: 'МОДУЛЬ 01',
    title: 'Анатомия Кадра и Композиция',
    subtitle: 'Геометрия кадра, силовые линии и зрительный центр',
    description: 'Как великие режиссеры строят композицию, которая управляет взглядом зрителя без слов. Практический анализ кадров из фильмов Кубрика, Тарковского и Антониони.',
    lessonsCount: 6,
    duration: '2 недели',
    topics: [
      'Золотое сечение и правило третей в кинематографе',
      'Глубина кадра, передний и задний план',
      'Динамика симметрии и хаоса',
      'Оптические иллюзии и работа с объективами'
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK-EMNHHnIVPlaX8up1Ri9TFWqmr-Q98iqViBiC9OJkn4O58YuccVSYIgSBeR0qHk6YDuERnaTjqmPp9BTOM6_I5q5yd2LdiJepJv5DTw4q36hR-ywX_OYeIewkx4iILisyXP9N24d92b2gAHRgF7CpeROEvNVHSnQlHhlC2CA5mRxr9n2cNSHLSYsOYREAgS6rn-VH-eUMU2hxkDMqttXoZ3X7RBRpkhzleilr-WceEyOZUpuPx9fxVqefCnmp14BCEWp4n2qF2gq'
  },
  {
    id: 'mod-2',
    number: 'МОДУЛЬ 02',
    title: 'Драматургия Света и Тени',
    subtitle: 'Метафизика светотени от Караваджо до кинонуара',
    description: 'Свет как самостоятельный персонаж повествования. Психология световых контрастов, жесткий и мягкий свет, цвет как эмоция.',
    lessonsCount: 8,
    duration: '3 недели',
    topics: [
      'Классический световой рисунок (Кьяроскуро)',
      'Свет в стиле Нуар и Экспрессионизм',
      'Естественный свет и магия "золотого часа"',
      'Цветовая палитра кадра (Color Grading как драматургия)'
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbfhsm4bkY631YCANMbRx0HRHfXvzTLVQ9ElmfhEmtyM7NJnqgyO0WiY3GX9juLJuQAbXGS8gxfor9iICZJ20z6JxWqyl-8H3I10lv9JxKHSf0Btc3BtJo6BiuRzlJ3pgLOWeLNnCrKF9s_TeH9438uF-MIosjwFoqi3TkYaQi7rDb99Y5ZGTC13pjJg5_IJ7R-G5NxEWiHkWOkK5MZ5iv2aW9mNdxBg1xzJpRu7Zc80HNxLFVvO-jh14xzbVJmidOAD8IG0s9nEXT'
  },
  {
    id: 'mod-3',
    number: 'МОДУЛЬ 03',
    title: 'Ритм и Монтажные Склейки',
    subtitle: 'Поэтика кинематографического времени',
    description: 'Монтаж Эйзенштейна, Годара и Бергмана. Как создавать напряжение через темпоритм, внутрикадровый монтаж и параллельное действие.',
    lessonsCount: 7,
    duration: '2.5 недели',
    topics: [
      'Теория монтажа: эффекты Кулешова и невидимые склейки',
      'Длинный кадр (Plan-séquence) и внутрикадровый монтаж',
      'Ассоциативный и параллельный монтаж',
      'Работа со временем: замедление, ускорение и пауза'
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG18VLes9zxnSXa-XBiswyP13HPWma5sGr_iz7w7UKqBieOicR1a2NBjSyp7UICupJYeTcsPkJeQed3IHbyAluSIoUYC0wlyhuFo6n6f39N8M-7n03P6APPXQYJtCF6q2YvF3A5Oyq3melDQV44FcQOa_vwR4HWoQqYHZZc-G7QjEVLEAtSM8hhClKW1E0qq1Ke4BxA4hEHJN0fOR-dKy9-hq2E4w858_eA9TzBAnlr42Bb3R_814K6OamQZvm08NNmX-JnMbtN4Is'
  },
  {
    id: 'mod-4',
    number: 'МОДУЛЬ 04',
    title: 'Звуковое Пространство и Тишина',
    subtitle: 'Шумы, музыка и тишина как визуальный инструмент',
    description: 'Почему тишина в кино звучит громче взрыва. Анализ саунд-дизайна у Робера Брессона, Андрея Тарковского и Дэвида Линча.',
    lessonsCount: 5,
    duration: '2 недели',
    topics: [
      'Диегетический и недиегетический звук',
      'Контрапункт звука и изображения',
      'Драматургия паузы и тишины',
      'Озвучивание деталей и фактуры предметов'
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzLmFkmXF86scfa1iiUttDId-TP7XuT6L1OakmMUI8ockcaTsKKZ31mvbXj68BXZ2f7UzaZHFli8pfVzre1PCjpPo-I-49nxG7lwzoW2PsNZSX0WkHvzTLmoutkEtHaoZtoZL62DGVd8pd14YfdTMidXo840yWG2j1u_8o3axIuIO6lXU3fa79_C2KNDkC9NrRz3HaEOlGs29bmWRGGCDaZWMe_EETZxZxzFRNxiC9BOTtZ4giSzTpgd5E00NZQdRIwYf-aI2D0kEQ'
  }
];

const AUTHORS = [
  {
    name: 'Александр Власов',
    role: 'Киновед и оператор-постановщик',
    bio: 'Преподаватель истории кино с 15-летним стажем. Член союза кинематографистов, эксперт по европейскому авангарду и французской новой волне.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    quote: 'Кино — это не то, что снято, а то, как снято и с каким чувством меры.'
  },
  {
    name: 'Елена Северная',
    role: 'Режиссер монтажа & Художник света',
    bio: 'Обладательница премий независимых кинофестивалей. Автор более 20 короткометражных картин и авторских визуальных исследований.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    quote: 'Каждый кадр — это застывшее стихотворение. Нужно научиться слышать его ритм.'
  },
  {
    name: 'Михаил Берг',
    role: 'Саунд-дизайнер & Композитор',
    bio: 'Создавал звуковые партитуры для авторского кино и экспериментальных выставок в Вене и Берлине.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    quote: 'Тишина в кадре требует большего мастерства, чем самый насыщенный оркестр.'
  }
];

const REVIEWS = [
  {
    name: 'София Маркова',
    occupation: 'Фотограф & Арт-директор',
    text: 'Курс полностью перевернул моё восприятие кадра. Раньше я полагалась на интуицию, а теперь вижу скрытую геометрию и световую драматургию в каждом шедевре.',
    rating: 5,
    tag: 'Выпуск 2024'
  },
  {
    name: 'Артем Краснов',
    occupation: 'Видеограф & Режиссер роликов',
    text: 'Потрясающая атмосфера и глубина подачи. Без лишней "воды", только чистая теория визуального языка и фундаментальный анализ классических лент.',
    rating: 5,
    tag: 'Выпуск 2024'
  },
  {
    name: 'Ека��ерина Орлова',
    occupation: 'Кинокритик & Блогер',
    text: 'Настоящее эстетическое наслаждение. Разбор светотени и монтажных пауз помог мне написать серию статей для киножурнала.',
    rating: 5,
    tag: 'Выпуск 2023'
  }
];

const POSTS = [
  {
    id: 'post-1',
    category: 'Кумиры',
    categoryTag: 'PRIMARY',
    title: 'Мастера кадра: Ингмар Бергман',
    excerpt: 'Исследуем, как шведский мастер использовал тени и психологическую глубину для создания новой формы визуального повествования...',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNuOu99Q3o6vcCM2XhfctHcdD9Sh6Ne8gF1BFQcxb5ky1qKdZglpFoSSuK_SbafcK0CpfjTDKSNJQTCzvNMBbC9-Fh9Ax-bo-TS7ucqCYzU-r2xyzwnzFPPzgUf1H1MGQTppoBZhEHzmEZsqYqqPE6hooJ2XsUQxNcame-ZNZhCnWyk-YYqk9ZZFdzeLn558sGtX_zhl4jd3EVQw6ZAfqBBmvyjP26Nw2ven_8uc9WXycW72Ff9mAkLQ',
    likes: '12.4K',
    comments: '342',
    timeAgo: '2h ago',
    aspectRatio: '4/5'
  },
  {
    id: 'post-2',
    category: 'Жанры',
    categoryTag: 'SECONDARY',
    title: 'Неонуар: Эстетика ночного города',
    excerpt: 'Разбор того, как яркие неоновые огни и дождливые улицы стали современным эквивалентом классической черно-белой игры света и тени.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoEZjpZwWhmiFtQlPu7ufno-UFMzEXhVZVQc0VhAocJzvQXXg9uZzvyUYhn7nARnPUpmhMk1ngds3FM0lRmipXvs6kDj6Ej4t0e2GMWDBRapA95qYV1YTYdnROXr268FOC2vsex9AQBwPWWWTH6vF2F8JtnFaSo4cg_saOCQFlS93W_ncdaO4tS4S7mXxxpdIZcMXoUe1sCGgPPjh46C8HPYw4AAgIr44hXZxLtN4aqEFpQnW4G5F7eQ',
    likes: '8.2K',
    comments: '156',
    timeAgo: '5h ago',
    aspectRatio: '16/9',
    tags: ['Lighting', 'Cinematography', 'Cyberpunk']
  },
  {
    id: 'post-3',
    category: 'Фишки',
    categoryTag: 'ACCENT',
    title: 'Техника длинного кадра у Тарковского',
    excerpt: 'План-сéквенс как медитация. Почему режиссер выбирал минимум склеек, а максимум присутствия.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG18VLes9zxnSXa-XBiswyP13HPWma5sGr_iz7w7UKqBieOicR1a2NBjSyp7UICupJYeTcsPkJeQed3IHbyAluSIoUYC0wlyhuFo6n6f39N8M-7n03P6APPPXQYJtCF6q2YvF3A5Oyq3melDQV44FcQOa_vwR4HWoQqYHZZc-G7QjEVLEAtSM8hhClKW1E0qq1Ke4BxA4hEHJN0fOR-dKy9-hq2E4w858_eA9TzBAnlr42Bb3R_814K6OamQZvm08NNmX-JnMbtN4Is',
    likes: '5.8K',
    comments: '89',
    timeAgo: '1d ago',
    aspectRatio: '16/9'
  }
];

const PLANS = [
  {
    id: 'plan-basic',
    title: 'БАЗОВЫЙ',
    subtitle: 'Самостоятельное погружение',
    price: '24 900 ₽',
    period: 'Доступ на 6 месяцев',
    popular: false,
    features: [
      'Все 4 модуля (26 лекций)',
      'Доступ к библиотеке кадров и стенограммам',
      'Закрытый Telegram-канал участников',
      'Сертификат о прохождении курса'
    ]
  },
  {
    id: 'plan-pro',
    title: 'ПРОДВИНУТЫЙ',
    subtitle: 'С обратной связью кураторов',
    price: '39 900 ₽',
    period: 'Доступ на 12 месяцев',
    popular: true,
    features: [
      'Все возможности Базового тарифа',
      'Проверка домашних заданий кураторами',
      '4 онлайн-разбора домашних работ',
      'Практические задания по анализу кадров',
      'Доступ к закрытому клубу кинозрителей'
    ]
  },
  {
    id: 'plan-vip',
    title: 'НАСТАВНИЧЕСТВО',
    subtitle: 'Персональная работа с мастером',
    price: '79 900 ₽',
    period: 'Бессрочный доступ',
    popular: false,
    features: [
      'Все возможности Продвинутого тарифа',
      '3 личные консультации с авторами курса',
      'Помощь в подготовке собственного дипломного исследования',
      'Рекомендательное письмо и разбор портфолио',
      'Индивидуальный план кинопросмотров'
    ]
  }
];

export default function App() {
  // Modals & Active States
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('plan-pro');
  const [activeModuleId, setActiveModuleId] = useState('mod-1');
  const [isOverlayEnabled, setIsOverlayEnabled] = useState(true);

  // Mobile Nav Toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeModule = PROGRAM_MODULES.find((m) => m.id === activeModuleId) || PROGRAM_MODULES[0];

  const handleEnrollClick = (planId?: string) => {
    if (planId) setSelectedPlan(planId);
    setIsEnrollOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface relative selection:bg-secondary selection:text-background">
      {/* Global Vignette */}
      <div className="vignette-global" />

      {/* Scroll & Film Timecode Widget - isolated component */}
      <TimecodeWidget />

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-[6000] bg-background/80 backdrop-blur-md border-b border-on-surface/20 flex justify-between items-center px-[5vw] py-5">
        <a href="#" className="font-display text-2xl md:text-3xl text-secondary tracking-tighter hover:opacity-90 transition-opacity">
          AZBUKA KINO
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 items-center">
          <a href="#program" className="font-mono-subtitle text-[12px] tracking-[0.2em] text-secondary border-b border-secondary pb-1 hover:opacity-80 transition-colors">
            ПРОГРАММА
          </a>
          <a href="#authors" className="font-mono-subtitle text-[12px] tracking-[0.2em] text-on-surface hover:text-secondary transition-colors">
            АВТОРЫ
          </a>
          <a href="#reviews" className="font-mono-subtitle text-[12px] tracking-[0.2em] text-on-surface hover:text-secondary transition-colors">
            ОТЗЫВЫ
          </a>
          <a href="#plans" className="font-mono-subtitle text-[12px] tracking-[0.2em] text-on-surface hover:text-secondary transition-colors">
            ТАРИФЫ
          </a>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleEnrollClick()}
            className="bg-secondary text-background font-mono-subtitle text-[12px] tracking-[0.2em] px-6 py-2.5 hover:opacity-90 active:scale-95 transition-all duration-200 uppercase font-semibold cursor-pointer"
          >
            ЗАПИСАТЬСЯ
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden text-on-surface p-2 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Clapperboard className="w-6 h-6 text-secondary" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[5999] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden px-[5vw]">
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Закрыть меню"
            className="absolute top-6 right-[5vw] text-on-surface p-2"
          >
            <X className="w-8 h-8" />
          </button>
          <a
            href="#program"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-3xl text-secondary hover:underline"
          >
            ПРОГРАММА
          </a>
          <a
            href="#authors"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-3xl text-on-surface hover:text-secondary"
          >
            АВТОРЫ
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-3xl text-on-surface hover:text-secondary"
          >
            ОТЗЫВЫ
          </a>
          <a
            href="#plans"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-3xl text-on-surface hover:text-secondary"
          >
            ТАРИФЫ
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleEnrollClick();
            }}
            className="mt-4 bg-secondary text-background font-mono-subtitle text-sm tracking-[0.2em] px-10 py-4 uppercase font-bold"
          >
            ЗАПИСАТЬСЯ НА КУРС
          </button>
        </div>
      )}

      {/* Hero & Cinematic Noir Channel Section */}
      <section className="relative pt-24 pb-8 px-6 bg-background">
        {/* Cover Image */}
        <div className="relative w-full aspect-[21/9] overflow-hidden mb-6">
          <img 
            className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-[20s] ease-linear hover:scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUDv6ETeQ09om8Gum6cG_G_-H-5DhBJw7toID75StNykI_sDSm2VnRpsrU719ia4SpiC2yzpUBMO6OOlnlOGXR9X8u9ENg_4U2_eUyIZpunx0XLBS4A9-bZPwtYU_jiISURyvvE0aUx0NkOGM8KsvZIKbATS72yV_BRai_XwGfohXP70FcDebh47op3cMykbwfWsGHeZfLOVlnIZNIA25BUJnaG9tRYQpXy1OqTE9m11HSaxnERsigTQ"
            alt="Cinematic Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="flex items-end justify-between">
            <div className="w-24 h-24 border-4 border-background bg-surface-container rounded-none overflow-hidden shadow-2xl">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHXn_kcsbbDO2bMU5sGLK2N54rlEy1VOISGDcVYOt4jljazJvyP8PGpFhwKz7vdDviwqG_-rSmLlfb7oTAUw3uLwr7Ep0tDVH-7p1YqTCi9C3ONDI1Ua96VFLUhoZGSEoT296Pbk494ua-7UbhUEBv7D9sapY_qzlNak_wIeMeeaXaQqTXkMJdc-qkjEQndJfWF9NVV_GfFrXwSLCLNi5qj9Qj4CtwsaiG4s6YdcmrxLV6M9tgBDAQRw"
                alt="Channel Avatar"
              />
            </div>
            <button 
              onClick={() => handleEnrollClick()}
              className="bg-secondary text-background font-label-caps text-label-caps px-6 py-3 transition-all hover:opacity-90 active:scale-95 shadow-lg"
            >
              ПОДПИСАТЬСЯ
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Cinematic Noir</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs opacity-80">
              Auteur Cinema Channel. Исследуем эстетику нуара и авторского кино через объектив истории.
            </p>
            <div className="flex gap-4 mt-2 font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest opacity-60">
              <span>1.2M Followers</span>
              <span>428 Posts</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-8 border-b border-outline-variant/10 overflow-x-auto flex gap-8">
          <a className="font-label-caps text-label-caps py-4 text-secondary border-b-2 border-secondary uppercase" href="#posts">НОВОСТИ</a>
          <a className="font-label-caps text-label-caps py-4 text-on-surface-variant/70 uppercase hover:text-on-surface transition-colors" href="#posts">ЖАНРЫ</a>
          <a className="font-label-caps text-label-caps py-4 text-on-surface-variant/70 uppercase hover:text-on-surface transition-colors" href="#posts">КУМИРЫ</a>
          <a className="font-label-caps text-label-caps py-4 text-on-surface-variant/70 uppercase hover:text-on-surface transition-colors" href="#posts">ФИШКИ</a>
        </nav>
      </section>

      {/* Posts Feed Section */}
      <section id="posts" className="relative py-8 px-6 max-w-3xl mx-auto">
        <div className="flex flex-col gap-section-gap">
          {POSTS.map((post, index) => (
            <article key={post.id} className="group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-0.5 h-4 bg-[#E11D48]"></div>
                <span className="font-label-caps text-label-caps text-secondary uppercase">{post.category}</span>
                <span className="font-label-mono text-label-mono text-on-surface-variant ml-auto opacity-50">{post.timeAgo}</span>
              </div>

              <div className="relative overflow-hidden border border-outline-variant/10">
                <div style={{ aspectRatio: post.aspectRatio }} className="bg-surface-container overflow-hidden">
                  <img 
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" 
                    src={post.image}
                    alt={post.title}
                  />
                </div>

                {index === 0 ? (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2 leading-tight">{post.title}</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 opacity-90">{post.excerpt}</p>
                  </div>
                ) : (
                  <div className="p-6 bg-surface-container-low">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface mb-3">{post.title}</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant opacity-80 mb-4">{post.excerpt}</p>
                    {post.tags && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="font-label-mono text-[10px] border border-outline-variant/20 px-2 py-0.5 uppercase">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-6 mt-4 border-t border-outline-variant/5 pt-4">
                <button className="flex items-center gap-1.5 font-label-mono text-label-mono text-on-surface-variant hover:text-secondary transition-colors">
                  <Heart className="w-4 h-4" /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 font-label-mono text-label-mono text-on-surface-variant hover:text-secondary transition-colors">
                  <MessageCircle className="w-4 h-4" /> {post.comments}
                </button>
                <button className="flex items-center gap-1.5 font-label-mono text-label-mono text-on-surface-variant hover:text-secondary transition-colors ml-auto">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="relative py-28 px-[5vw] bg-[#131313]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
          {/* Sticky Left Column */}
          <div className="md:col-span-5 sticky top-32">
            <span className="font-mono-subtitle text-[11px] text-[#c9a84c] tracking-[0.25em] uppercase mb-4 block">
              ПРОБЛЕМА ВОСПРИЯТИЯ
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight text-[#f5f0e8]">
              КОГДА КИНО
              <br />
              СТАНОВИТСЯ
              <br />
              ШУМОМ.
            </h2>
            <div className="w-20 h-1 bg-[#c9a84c] mb-8" />
            <p className="font-sans text-base md:text-lg text-[#d0c5b2] leading-relaxed">
              В эпоху бесконечного контента мы разучились смотреть. Мы видим картинку, но не чувствуем ритм. Слышим звук, но не улавливаем тишину.
            </p>
          </div>

          {/* Right Column Scenes */}
          <div className="md:col-span-7 flex flex-col gap-16 md:gap-24">
            {/* Scene 01 */}
            <div className="relative cinematic-frame p-8 md:p-10 bg-black/40 backdrop-blur-sm border-t border-b border-[#f5f0e8]/20 overflow-hidden">
              <span className="font-mono-subtitle text-[12px] text-[#c9a84c] mb-4 block tracking-[0.2em]">
                SCENE 01: THE OVERLOAD
              </span>
              <p className="font-display text-2xl md:text-3xl leading-snug mb-6 text-[#f5f0e8]">
                Современный зритель потребляет 5000 визуальных образов в день.
              </p>
              <p className="font-sans text-sm md:text-base text-[#d0c5b2]/70 leading-relaxed">
                Большинство из них забываются через 5 секунд. Мы превратили искусство в фастфуд, теряя глубину кадра и намерение режиссера.
              </p>
            </div>

            {/* Scene 02 */}
            <div className="relative cinematic-frame p-8 md:p-10 bg-[#f5f0e8]/5 border-t border-b border-[#c9a84c]/40 overflow-hidden">
              <span className="font-mono-subtitle text-[12px] text-[#c9a84c] mb-4 block tracking-[0.2em]">
                SCENE 02: THE AWAKENING
              </span>
              <h3 className="font-display text-2xl md:text-3xl leading-snug mb-6 text-[#c9a84c]">
                «Азбука Кино» — это возвращение к истокам восприятия.
              </h3>
              <p className="font-sans text-sm md:text-base text-[#d0c5b2] leading-relaxed">
                Мы разбираем анатомию шедевров, чтобы вы научились читать кино как открытую книгу. От золотого сечения до метафизики света.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is It For Section */}
      <section className="py-28 px-[5vw] bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-mono-subtitle text-[12px] tracking-[0.3em] text-[#c9a84c] uppercase">
              CASTING CALL
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mt-4 text-[#f5f0e8]">
              ДЛЯ КОГО ЭТОТ ПУТЬ
            </h2>
            <p className="font-mono-subtitle text-xs text-[#d0c5b2]/60 mt-4 max-w-xl mx-auto">
              Курс разработан для тех, кто ищет эстетическую осознанность и глубинное понимание кадра
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {/* Card 1 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="aspect-[4/5] relative overflow-hidden mb-6 cinematic-frame bg-[#131313]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzLmFkmXF86scfa1iiUttDId-TP7XuT6L1OakmMUI8ockcaTsKKZ31mvbXj68BXZ2f7UzaZHFli8pfVzre1PCjpPo-I-49nxG7lwzoW2PsNZSX0WkHvzTLmoutkEtHaoZtoZL62DGVd8pd14YfdTMidXo840yWG2j1u_8o3axIuIO6lXU3fa79_C2KNDkC9NrRz3HaEOlGs29bmWRGGCDaZWMe_EETZxZxzFRNxiC9BOTtZ4giSzTpgd5E00NZQdRIwYf-aI2D0kEQ')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono-subtitle text-[#c9a84c]">
                  <span>ROLE 01</span>
                  <span>VIEWER ARCHETYPE</span>
                </div>
              </div>
              <h4 className="font-display text-2xl mb-2 text-[#c9a84c] group-hover:text-[#f5f0e8] transition-colors">
                Искатели смыслов
              </h4>
              <p className="font-sans text-sm text-[#d0c5b2]/70 leading-relaxed">
                Для тех, кто хочет перестать "просто смотреть" и начать анализировать визуальный язык великих мастеров.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col group cursor-pointer md:translate-y-8">
              <div className="aspect-[4/5] relative overflow-hidden mb-6 cinematic-frame bg-[#131313]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAG18VLes9zxnSXa-XBiswyP13HPWma5sGr_iz7w7UKqBieOicR1a2NBjSyp7UICupJYeTcsPkJeQed3IHbyAluSIoUYC0wlyhuFo6n6f39N8M-7n03P6APPXQYJtCF6q2YvF3A5Oyq3melDQV44FcQOa_vwR4HWoQqYHZZc-G7QjEVLEAtSM8hhClKW1E0qq1Ke4BxA4hEHJN0fOR-dKy9-hq2E4w858_eA9TzBAnlr42Bb3R_814K6OamQZvm08NNmX-JnMbtN4Is')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono-subtitle text-[#c9a84c]">
                  <span>ROLE 02</span>
                  <span>CREATOR ARCHETYPE</span>
                </div>
              </div>
              <h4 className="font-display text-2xl mb-2 text-[#c9a84c] group-hover:text-[#f5f0e8] transition-colors">
                Создатели контента
              </h4>
              <p className="font-sans text-sm text-[#d0c5b2]/70 leading-relaxed">
                Фотографы, видеографы и дизайнеры, ищущие вдохновение в классической композиции и драматургии света.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="aspect-[4/5] relative overflow-hidden mb-6 cinematic-frame bg-[#131313]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbfhsm4bkY631YCANMbRx0HRHfXvzTLVQ9ElmfhEmtyM7NJnqgyO0WiY3GX9juLJuQAbXGS8gxfor9iICZJ20z6JxWqyl-8H3I10lv9JxKHSf0Btc3BtJo6BiuRzlJ3pgLOWeLNnCrKF9s_TeH9438uF-MIosjwFoqi3TkYaQi7rDb99Y5ZGTC13pjJg5_IJ7R-G5NxEWiHkWOkK5MZ5iv2aW9mNdxBg1xzJpRu7Zc80HNxLFVvO-jh14xzbVJmidOAD8IG0s9nEXT')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono-subtitle text-[#c9a84c]">
                  <span>ROLE 03</span>
                  <span>DIRECTOR ARCHETYPE</span>
                </div>
              </div>
              <h4 className="font-display text-2xl mb-2 text-[#c9a84c] group-hover:text-[#f5f0e8] transition-colors">
                Кинематографисты
              </h4>
              <p className="font-sans text-sm text-[#d0c5b2]/70 leading-relaxed">
                Начинающие режиссеры, которым нужен фундамент из истории кино и теории визуального повествования.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program & Interactive Frame Inspector Section */}
      <section id="program" className="py-28 px-[5vw] bg-[#131313]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#f5f0e8]/20 gap-6">
            <div>
              <span className="font-mono-subtitle text-[11px] tracking-[0.25em] text-[#c9a84c] uppercase">
                CURRICULUM Breakdown
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[#f5f0e8] mt-2">
                ПРОГРАММА КУРСА
              </h2>
            </div>
            <p className="font-mono-subtitle text-xs text-[#d0c5b2]/70 max-w-md">
              4 фундаментальных модуля, 26 теоретических и практических уроков, домашние задания и разбор авторского кино.
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {PROGRAM_MODULES.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`p-4 border text-left transition-all duration-300 cursor-pointer ${
                  activeModuleId === mod.id
                    ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]'
                    : 'border-[#f5f0e8]/10 bg-black/30 text-[#f5f0e8]/70 hover:border-[#f5f0e8]/30'
                }`}
              >
                <span className="font-mono-subtitle text-[10px] block mb-1 opacity-70">
                  {mod.number}
                </span>
                <span className="font-display text-sm sm:text-base font-semibold line-clamp-1">
                  {mod.title}
                </span>
              </button>
            ))}
          </div>

          {/* Active Module Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-black/50 p-8 sm:p-12 border border-[#f5f0e8]/10 relative overflow-hidden">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4 text-xs font-mono-subtitle text-[#c9a84c]">
                <span>{activeModule.number}</span>
                <span>•</span>
                <span>{activeModule.duration}</span>
                <span>•</span>
                <span>{activeModule.lessonsCount} ЛЕКЦИЙ</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-[#f5f0e8]">
                {activeModule.title}
              </h3>

              <p className="font-mono-subtitle text-xs text-[#c9a84c] uppercase tracking-wider">
                {activeModule.subtitle}
              </p>

              <p className="font-sans text-sm text-[#d0c5b2] leading-relaxed">
                {activeModule.description}
              </p>

              <div className="pt-4 border-t border-[#f5f0e8]/10">
                <h4 className="font-mono-subtitle text-xs text-[#f5f0e8] uppercase tracking-widest mb-4">
                  КЛЮЧЕВЫЕ ТЕМЫ МОДУЛЯ:
                </h4>
                <ul className="space-y-3">
                  {activeModule.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#d0c5b2]">
                      <span className="text-[#c9a84c] font-mono-subtitle mt-0.5">0{i + 1}.</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Interactive Frame Preview Column */}
            <div className="lg:col-span-6">
              <div className="relative aspect-video bg-black rounded-sm border border-[#c9a84c]/30 overflow-hidden group">
                <img
                  src={activeModule.image}
                  alt={activeModule.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Optional Grid Overlay simulation */}
                {isOverlayEnabled && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Golden ratio / Rule of Thirds grid lines */}
                    <div className="w-full h-full grid grid-cols-3 grid-rows-3 border border-[#c9a84c]/20">
                      <div className="border-r border-b border-[#c9a84c]/20" />
                      <div className="border-r border-b border-[#c9a84c]/20" />
                      <div className="border-b border-[#c9a84c]/20" />
                      <div className="border-r border-b border-[#c9a84c]/20" />
                      <div className="border-r border-b border-[#c9a84c]/30 bg-[#c9a84c]/5" />
                      <div className="border-b border-[#c9a84c]/20" />
                      <div className="border-r border-[#c9a84c]/20" />
                      <div className="border-r border-[#c9a84c]/20" />
                      <div />
                    </div>
                  </div>
                )}

                {/* Overlay Toggle Button */}
                <button
                  onClick={() => setIsOverlayEnabled(!isOverlayEnabled)}
                  aria-label={`Сетка кадра: ${isOverlayEnabled ? 'включена' : 'выключена'}`}
                  className="absolute bottom-4 right-4 bg-[#0a0a0a]/80 backdrop-blur-md border border-[#c9a84c]/50 text-[#c9a84c] font-mono-subtitle text-[10px] px-3 py-1.5 flex items-center gap-2 hover:bg-[#c9a84c] hover:text-[#0a0a0a] transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>СЕТКА КАДРА: {isOverlayEnabled ? 'ВКЛ' : 'ВЫКЛ'}</span>
                </button>

                <div className="absolute top-4 left-4 bg-[#0a0a0a]/80 border border-[#f5f0e8]/20 px-3 py-1 font-mono-subtitle text-[10px] text-[#f5f0e8]">
                  FRAME ANALYZER v1.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authors Section */}
      <section id="authors" className="py-28 px-[5vw] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-mono-subtitle text-[11px] tracking-[0.3em] text-[#c9a84c] uppercase">
              MASTERS & MENTORS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mt-3 text-[#f5f0e8]">
              АВТОРЫ КУРСА
            </h2>
            <p className="font-mono-subtitle text-xs text-[#d0c5b2]/60 mt-3 max-w-lg mx-auto">
              Практики киноиндустрии с глубоким академическим бэкграундом
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {AUTHORS.map((author, index) => (
              <div key={index} className="flex flex-col cinematic-frame p-6 bg-[#131313]/60 border-t border-b border-[#f5f0e8]/10 group">
                <div className="aspect-[3/4] relative overflow-hidden mb-6 bg-black">
                  <img
                    src={author.photo}
                    alt={author.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                </div>

                <span className="font-mono-subtitle text-[10px] text-[#c9a84c] uppercase tracking-widest block mb-1">
                  {author.role}
                </span>

                <h3 className="font-display text-2xl text-[#f5f0e8] mb-3">
                  {author.name}
                </h3>

                <p className="font-sans text-xs text-[#d0c5b2]/80 leading-relaxed mb-6">
                  {author.bio}
                </p>

                <blockquote className="mt-auto pt-4 border-t border-[#f5f0e8]/10 font-mono-subtitle text-[11px] italic text-[#c9a84c] leading-relaxed">
                  "{author.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-28 px-[5vw] bg-[#131313]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono-subtitle text-[11px] tracking-[0.3em] text-[#c9a84c] uppercase">
              STUDENT TESTIMONIALS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-[#f5f0e8] mt-3">
              ОТЗЫВЫ ВЫПУСКНИКОВ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev, i) => (
              <div key={i} className="p-8 bg-[#0a0a0a] border border-[#f5f0e8]/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono-subtitle text-[10px] text-[#c9a84c] border border-[#c9a84c]/30 px-2.5 py-1">
                      {rev.tag}
                    </span>
                    <div className="flex text-[#c9a84c] gap-1 text-xs">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <span key={idx}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="font-sans text-sm text-[#d0c5b2] leading-relaxed mb-8 italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f5f0e8]/10">
                  <h4 className="font-display text-lg text-[#f5f0e8]">{rev.name}</h4>
                  <span className="font-mono-subtitle text-[11px] text-[#c9a84c]/80 block">{rev.occupation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans & Pricing Section */}
      <section id="plans" className="py-28 px-[5vw] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-mono-subtitle text-[11px] tracking-[0.3em] text-[#c9a84c] uppercase">
              ENROLLMENT OPTIONS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mt-3 text-[#f5f0e8]">
              ТАРИФЫ ОБУЧЕНИЯ
            </h2>
            <p className="font-mono-subtitle text-xs text-[#d0c5b2]/60 mt-3 max-w-md mx-auto">
              Выберите подходящий формат взаимодействия и глубину погружения
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`flex flex-col p-8 sm:p-10 border transition-all duration-300 relative ${
                  plan.popular
                    ? 'border-[#c9a84c] bg-[#131313] shadow-2xl shadow-[#c9a84c]/10'
                    : 'border-[#f5f0e8]/15 bg-[#131313]/40'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-[#0a0a0a] font-mono-subtitle text-[10px] tracking-[0.2em] px-4 py-1 uppercase font-bold">
                    ПОПУЛЯРНЫЙ ВЫБОР
                  </div>
                )}

                <span className="font-mono-subtitle text-[11px] text-[#c9a84c] tracking-[0.2em] uppercase block mb-1">
                  {plan.subtitle}
                </span>

                <h3 className="font-display text-3xl text-[#f5f0e8] mb-4">
                  {plan.title}
                </h3>

                <div className="mb-6 pb-6 border-b border-[#f5f0e8]/10">
                  <span className="font-display text-4xl font-bold text-[#c9a84c]">
                    {plan.price}
                  </span>
                  <span className="font-mono-subtitle text-[11px] block text-[#d0c5b2]/60 mt-1">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#d0c5b2]">
                      <Check className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleEnrollClick(plan.id)}
                  className={`w-full py-4 font-mono-subtitle text-xs tracking-[0.2em] uppercase font-semibold transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#f5f0e8]'
                      : 'border border-[#f5f0e8] text-[#f5f0e8] hover:bg-[#f5f0e8] hover:text-[#0a0a0a]'
                  }`}
                >
                  ВЫБРАТЬ ТАРИФ
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full relative bg-[#0a0a0a] border-t border-[#f5f0e8]/20 flex flex-col md:flex-row justify-between items-center px-[5vw] py-12 gap-8">
        <div className="font-display text-2xl text-[#c9a84c]">
          AZBUKA KINO
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <a
            href="#"
            className="font-mono-subtitle text-xs text-[#f5f0e8]/60 hover:text-[#c9a84c] underline underline-offset-4 transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href="#"
            className="font-mono-subtitle text-xs text-[#f5f0e8]/60 hover:text-[#c9a84c] underline underline-offset-4 transition-colors"
          >
            VIMEO
          </a>
          <a
            href="#"
            className="font-mono-subtitle text-xs text-[#f5f0e8]/60 hover:text-[#c9a84c] underline underline-offset-4 transition-colors"
          >
            TELEGRAM
          </a>
          <a
            href="#"
            className="font-mono-subtitle text-xs text-[#f5f0e8]/60 hover:text-[#c9a84c] underline underline-offset-4 transition-colors"
          >
            CONTACT US
          </a>
        </div>

        <div className="font-mono-subtitle text-[11px] text-[#f5f0e8]/40 text-center md:text-right leading-relaxed">
          © {new Date().getFullYear()} AZBUKA KINO. ALL RIGHTS RESERVED.
          <br />
          CINEMATIC MINIMALISM REGIME.
        </div>
      </footer>

      {/* Interactive Trailer Modal */}
      <TrailerModal isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} />

      {/* Enrollment Modal */}
      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        selectedPlan={selectedPlan}
        onSelectPlan={setSelectedPlan}
      />
    </div>
  );
}
