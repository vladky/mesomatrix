import { useEffect, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Heart,
  List,
  MapPin,
  Menu,
  Phone,
  Plus,
  Search,
  Star,
  X,
} from 'lucide-react'

const productImages = {
  relief: new URL('../images/hyaluronic-c-base.webp', import.meta.url).href,
  menGel: new URL(
    '../images/500-ml-2025-07-10t103741509-base.webp',
    import.meta.url,
  ).href,
  menLotion: new URL(
    '../images/650x490-losyon-uspokaivaiushhii-skin-care-men-base.webp',
    import.meta.url,
  ).href,
  menCream: new URL(
    '../images/650x490-krem-uvlazniaiushhii-skin-care-men-base.webp',
    import.meta.url,
  ).href,
  cleanPowder: new URL(
    '../images/650x490-gel-ocishhaiushhii-skin-care-men-base.webp',
    import.meta.url,
  ).href,
  hyaluronic: new URL('../images/hyaluronic-c-base.webp', import.meta.url).href,
  serum: new URL(
    '../images/9a31cef6f1e52a7f394fe8b17430df1624abb938e7e5ff3d67816a4d76cfe40b-base.webp',
    import.meta.url,
  ).href,
  azelaic: new URL('../images/azelaic-acid-clean-base.webp', import.meta.url)
    .href,
  balancing: new URL('../images/aha-balancing-base.webp', import.meta.url).href,
  softClean: new URL('../images/aha-balancing-base.webp', import.meta.url).href,
  dmae: new URL('../images/dmae-complex-base.webp', import.meta.url).href,
  vita: new URL(
    '../images/500-ml-2025-06-04t160257872-base.webp',
    import.meta.url,
  ).href,
}

const categories = [
  'Все',
  'Очищение',
  'Скрабы для лица',
  'Тонизация',
  'Сыворотки и концентраты',
  'Кремы',
  'Гель-маски',
  'Солнцезащитные кремы',
  'Энзимные пудры',
  'Патчи для век',
]

const products = [
  {
    image: productImages.relief,
    badge: 'Новинка',
    price: '1 890 ₽',
    title: 'Крем для тела с кислотами RELIEF BODY CARE',
  },
  {
    image: productImages.menGel,
    badge: 'Новинка',
    price: '1 341 ₽',
    oldPrice: '1 490 ₽',
    discount: '-10%',
    title: 'Гель очищающий мужской',
  },
  {
    image: productImages.menLotion,
    badge: 'Новинка',
    price: '1 422 ₽',
    oldPrice: '1 580 ₽',
    discount: '-10%',
    title: 'Лосьон успокаивающий мужской',
  },
  {
    image: productImages.menCream,
    badge: 'Новинка',
    price: '1 782 ₽',
    oldPrice: '1 980 ₽',
    discount: '-10%',
    title: 'Крем увлажняющий для мужчин',
    rating: '5',
  },
  {
    image: productImages.cleanPowder,
    price: '980 ₽',
    title:
      'Энзимная пудра для чувствительной кожи SENSI PHA CLEAN ENZYME POWDER',
  },
  {
    image: productImages.hyaluronic,
    badge: 'Бестселлер',
    badgeTone: 'red',
    price: '1 280 ₽',
    title: 'HYALURONIC-C, пенка очищающая увлажняющая с гиалуроновой кислотой',
    rating: '4.9',
  },
  {
    image: productImages.serum,
    badge: 'Акция',
    badgeTone: 'yellow',
    price: '1 448 ₽',
    oldPrice: '1 930 ₽',
    discount: '-25%',
    title: 'Сыворотка для лица и век с пептидом-миорелаксантом BTA PEPTIDE',
    rating: '5',
  },
  {
    image: productImages.azelaic,
    badge: 'Акция',
    badgeTone: 'yellow',
    price: '686 ₽',
    oldPrice: '980 ₽',
    discount: '-30%',
    title:
      'Энзимная пудра для умывания с азелаиновой кислотой AZELAIC ACID CLEAN ENZYME POWDER',
    rating: '5',
  },
  {
    image: productImages.balancing,
    badge: 'Бестселлер',
    badgeTone: 'red',
    price: '1 280 ₽',
    title: 'AHA-BALANCING, пенка очищающая и обновляющая с кислотами',
    rating: '4.8',
  },
  {
    image: productImages.softClean,
    price: 'от 980 ₽',
    title: 'SOFT CLEANING, мягкий очищающий гель с D-пантенолом',
    rating: '4.3',
  },
  {
    image: productImages.dmae,
    price: 'от 1 180 ₽',
    title:
      'Очищающий гель DMAE Complex, активированный с экстрактом гамамелиса',
    rating: '5',
  },
  {
    image: productImages.vita,
    badge: 'Акция',
    badgeTone: 'yellow',
    price: '686 ₽',
    oldPrice: '980 ₽',
    discount: '-30%',
    title: 'Энзимная пудра для умывания с витамином C VITA-C ENZYME POWDER',
    rating: '5',
  },
]

function ProductCard({ product }) {
  return (
    <article className="wd-product">
      <div className="wd-product-media">
        {product.badge && (
          <span
            className={`wd-badge ${product.badgeTone ? `wd-badge-${product.badgeTone}` : ''}`}
          >
            {product.badge}
          </span>
        )}
        <button
          className="wd-heart"
          type="button"
          aria-label="Добавить в избранное"
        >
          <Heart size={19} aria-hidden="true" />
        </button>
        <img src={product.image} alt="" />
        {/* <span className="wd-aiona">AIONA<br />PROFESSIONAL<br />COSMETICS</span> */}
        <div className="wd-profi">
          <span>?</span>
          Узнать цены для ПРОФИ
        </div>
      </div>
      <div className="wd-product-body">
        <div className="wd-price-row">
          <strong>{product.price}</strong>
          {product.oldPrice && <span>{product.oldPrice}</span>}
          {product.discount && <b>{product.discount}</b>}
        </div>
        <h3>{product.title}</h3>
        {product.rating ? (
          <div className="wd-rating" aria-label={`Рейтинг ${product.rating}`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                fill="currentColor"
                aria-hidden="true"
              />
            ))}
            <span>{product.rating}</span>
          </div>
        ) : (
          <p className="wd-no-rating">Отзывов пока нет</p>
        )}
        <button className="wd-cart-button" type="button">
          В корзину
        </button>
      </div>
    </article>
  )
}

function InteractyWidget() {
  const [hidden, setHidden] = useState(false)
  const widgetRef = useRef(null)

  useEffect(() => {
    if (!widgetRef.current) return undefined

    const script = document.createElement('script')
    script.src = 'https://p.interacty.me/l.js'
    script.async = true

    widgetRef.current.appendChild(script)

    return () => {
      widgetRef.current?.replaceChildren()
    }
  }, [])

  return (
    <div className="wd-interacty-widget" style={{ display: hidden ? 'none' : undefined }}>
      <button type="button" onClick={() => setHidden(true)}>X</button>
      <div className="remix-app" data-hash="4c87f32217088a33" ref={widgetRef} />
    </div>
  )
}

export default function WidgetDemoPage() {
  return (
    <div className="widget-demo-page">
      <aside className="wd-float-chat" aria-hidden="true">
        ▢
      </aside>
      <button className="wd-scroll-top" type="button" aria-label="Наверх">
        ↑
      </button>

      <div className="wd-sale-strip">
        -50% на весенние хиты до 31.05! <strong>Купить</strong>
        <X size={16} aria-hidden="true" />
      </div>

      <InteractyWidget />

      <header className="wd-header">
        <div className="wd-header-meta wd-container">
          <span>
            <MapPin size={14} /> Санкт-Петербург
          </span>
          <span>Режим работы:</span>
          <span>
            <Phone size={14} /> 8 (800) 555 5604
          </span>
          <nav aria-label="Сервисное меню">
            <a href="#/widget-demo">О нас</a>
            <a href="#/widget-demo">Отзывы</a>
            <a href="#/widget-demo">Оплата и доставка</a>
            <a href="#/widget-demo">Контакты</a>
          </nav>
        </div>

        <div className="wd-logo-row wd-container">
          <button type="button">
            Определить
            <br />
            тип кожи
          </button>
          <button type="button">
            Бесплатная
            <br />
            консультация
          </button>
          <div className="wd-logo">
            <span>mesomatrix</span>
            <small>PROFESSIONAL</small>
            <b>AIONA</b>
          </div>
          <div className="wd-header-actions">
            <span>Избранное</span>
            <span>Корзина</span>
            <span>Войти</span>
          </div>
        </div>

        <div className="wd-main-nav">
          <div className="wd-container">
            <button className="wd-catalog-button" type="button">
              <Menu size={19} /> Каталог
            </button>
            <a href="#/widget-demo">Линии MESOMATRIX</a>
            <label className="wd-search">
              <input aria-label="Поиск" placeholder="Я ищу..." />
              <Search size={17} />
            </label>
            <a href="#/widget-demo">Косметологам</a>
            <a href="#/widget-demo">Обучение</a>
          </div>
        </div>
      </header>

      <main className="wd-container wd-main">
        <nav className="wd-breadcrumbs" aria-label="Хлебные крошки">
          <a href="#/widget-demo">⌂</a>
          <ChevronRight size={13} />
          <a href="#/widget-demo">Каталог</a>
          <ChevronRight size={13} />
          <span>Уходовая косметика</span>
        </nav>

        <h1>
          Профессиональная косметика MESOMATRIX для салонного и домашнего ухода
        </h1>

        <div className="wd-layout">
          <aside className="wd-filters" aria-label="Фильтры">
            <button type="button">
              Линия продукта <Plus size={18} />
            </button>
            <button type="button">
              Тип кожи <Plus size={18} />
            </button>
            <button type="button">
              В наличии <span className="wd-switch" />
            </button>
            <a href="#/widget-demo">× Сбросить фильтры</a>
          </aside>

          <section className="wd-catalog" aria-label="Каталог товаров">
            <div className="wd-chips" aria-label="Категории">
              {categories.map((category) => (
                <button
                  className={category === 'Все' ? 'wd-chip-active' : ''}
                  key={category}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="wd-catalog-toolbar">
              <span>90 товаров</span>
              <div>
                <span>Вид каталога:</span>
                <Grid3X3 size={18} />
                <List size={18} />
              </div>
            </div>

            <div className="wd-product-grid">
              {products.map((product) => (
                <ProductCard key={product.title} product={product} />
              ))}
            </div>

            <button className="wd-more" type="button">
              Показать ещё
            </button>

            <nav className="wd-pagination" aria-label="Страницы каталога">
              <button type="button">
                <ChevronLeft size={16} /> Назад
              </button>
              {[1, 2, 3, 4].map((page) => (
                <button
                  className={page === 1 ? 'wd-current-page' : ''}
                  key={page}
                  type="button"
                >
                  {page}
                </button>
              ))}
              <span>...</span>
              <button type="button">7</button>
              <button type="button">8</button>
              <button type="button">
                Вперед <ChevronRight size={16} />
              </button>
            </nav>

            <section className="wd-description">
              <p>
                MESOMATRIX - профессиональная косметика и космецевтика,
                созданная на основе комплексов нано-гиалуроновой кислоты. В
                нашем ассортименте - сыворотки, уходовая косметика, аппаратные
                серумы, альгинатные маски, SPA-косметика для тела.
              </p>
              {[
                'Очищение: средства для очищения кожи разработаны с учетом особенностей разных типов кожи.',
                'Скрабы для лица: мягкие составы помогают сделать кожу гладкой и сияющей.',
                'Тонизация: тоники бережно восстанавливают естественный баланс кожи.',
                'Сыворотки и концентраты: средства содержат высокую концентрацию активных компонентов.',
                'Кремы: питательные продукты увлажняют и защищают кожу.',
                'SPF защита: средства предотвращают воздействие УФ-фильтров.',
                'Наборы косметики: готовые комплекты для регулярного ухода.',
              ].map((item) => (
                <p className="wd-description-item" key={item}>
                  {item}
                </p>
              ))}
            </section>
          </section>
        </div>
      </main>

      <footer className="wd-footer">
        <div className="wd-container">
          <div className="wd-footer-main">
            <div>
              <div className="wd-footer-logo">
                mesomatrix
                <br />
                <span>PROFESSIONAL</span>
              </div>
              <div className="wd-socials">
                <span>▶</span>
                <span>R</span>
                <span>vk</span>
                <span>✈</span>
              </div>
            </div>
            <div>
              <small>Звоните нам</small>
              <strong>8 (800) 555 5604</strong>
            </div>
            <form className="wd-subscribe">
              <small>Подпишитесь на наши новости</small>
              <label>
                <input placeholder="Введите E-mail" aria-label="Email" />
                <button type="button">
                  <ChevronRight size={16} />
                </button>
              </label>
            </form>
            <div className="wd-qr">
              <div />
              <p>Скачивайте наше приложение наведите камеру на QR-код</p>
            </div>
          </div>

          <div className="wd-footer-bottom">
            <span>VISA</span>
            <span>МИР</span>
            <span>CONTACT</span>
            <a href="#/widget-demo">Вакансии</a>
            <a href="#/widget-demo">Вопрос-ответ</a>
            <a href="#/widget-demo">Статьи</a>
            <a href="#/widget-demo">Каталог</a>
            <button type="button">Как получить статус ПРОФИ?</button>
          </div>
          <p className="wd-copyright">
            © 2003-2026 Aiona, All Rights Reserved. Все материалы, размещенные
            на сайте, являются объектами авторского права.
          </p>
        </div>
      </footer>
    </div>
  )
}
