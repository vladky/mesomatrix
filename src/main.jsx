import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import confetti from 'canvas-confetti'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import {
  Heart,
  SkipForward,
  Sparkles,
  ThumbsDown,
} from 'lucide-react'
import './styles.css'

const imageUrls = {
  azelaicAcidClean: new URL(
    '../images/azelaic-acid-clean-base.webp',
    import.meta.url,
  ).href,
  balancing: new URL('../images/aha-balancing-base.webp', import.meta.url)
    .href,
  dmaeComplex: new URL('../images/dmae-complex-base.webp', import.meta.url)
    .href,
  gelCleanser: new URL(
    '../images/650x490-gel-ocishhaiushhii-skin-care-men-base.webp',
    import.meta.url,
  ).href,
  hyaluronic: new URL('../images/hyaluronic-c-base.webp', import.meta.url)
    .href,
  lotion: new URL(
    '../images/650x490-losyon-uspokaivaiushhii-skin-care-men-base.webp',
    import.meta.url,
  ).href,
  moisturizer: new URL(
    '../images/650x490-krem-uvlazniaiushhii-skin-care-men-base.webp',
    import.meta.url,
  ).href,
  serum: new URL(
    '../images/9a31cef6f1e52a7f394fe8b17430df1624abb938e7e5ff3d67816a4d76cfe40b-base.webp',
    import.meta.url,
  ).href,
  toner: new URL('../images/500-ml-2025-06-04t160257872-base.webp', import.meta.url)
    .href,
  wash: new URL('../images/500-ml-2025-07-10t103741509-base.webp', import.meta.url)
    .href,
}

const imageFiles = [
  imageUrls.azelaicAcidClean,
  imageUrls.wash,
  imageUrls.lotion,
  imageUrls.toner,
  imageUrls.serum,
  imageUrls.dmaeComplex,
  imageUrls.moisturizer,
  imageUrls.hyaluronic,
  imageUrls.balancing,
  imageUrls.gelCleanser,
]

const productTypes = ['Уходовая косметика', 'Декоративная косметика']
const categories = ['Гель', 'Пудра', 'Пенка']
const brands = ['Mesomatrix']
const heartConfettiShape = confetti.shapeFromText({ text: '❤', scalar: 1.9 })
const starConfettiShape = confetti.shapeFromText({
  text: '★',
  scalar: 1.7,
  color: '#f2c94c',
})

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

function createMockProducts() {
  return imageFiles.map((image, index) => ({
    id: `mesomatrix-${index + 1}`,
    title: getRandomItem(brands),
    type: getRandomItem(productTypes),
    category: getRandomItem(categories),
    image,
  }))
}

function pickRandomProducts(products, count = 6) {
  return shuffle(products).slice(0, count)
}

const exitVariants = {
  exit: (direction) => ({
    x: direction === 'left' ? -360 : 360,
    rotate: direction === 'left' ? -18 : 18,
    opacity: 0,
    transition: { duration: 0.25 },
  }),
}

function SwipeCard({ product, index, active, onSwipe, progress }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 220], [-12, 12])
  const likeOpacity = useTransform(x, [35, 130], [0, 1])
  const skipOpacity = useTransform(x, [-130, -35], [1, 0])

  return (
    <motion.article
      className="product-card"
      variants={exitVariants}
      style={{
        x,
        rotate,
        zIndex: 20 - index,
        scale: active ? 1 : 1 - index * 0.035,
        y: active ? 0 : index * 14,
      }}
      drag={active ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      initial={{ scale: 0.92, y: 36, opacity: 0 }}
      animate={{
        scale: active ? 1 : 1 - index * 0.035,
        y: active ? 0 : index * 14,
        opacity: 1,
      }}
      exit="exit"
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 110) onSwipe('like')
        if (info.offset.x < -110) onSwipe('skip')
      }}
    >
      {active && (
        <div
          className="card-progress"
          aria-label={`Просмотрено ${Math.round(progress)} процентов`}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      )}

      <motion.div className="stamp stamp-like" style={{ opacity: likeOpacity }}>
        Нравится
      </motion.div>
      <motion.div className="stamp stamp-skip" style={{ opacity: skipOpacity }}>
        Пропуск
      </motion.div>

      <div className="image-wrap">
        <img
          src={product.image}
          alt={`${product.title}, ${product.category}`}
          draggable="false"
        />
      </div>

      <div className="product-info">
        <div>
          <h2>{product.title}</h2>
          <p className="product-type">{product.type}</p>
        </div>
        <span>{product.category}</span>
      </div>
    </motion.article>
  )
}

function formatCountdown(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':')
}

function DiscountOffer() {
  const [expiresAt] = useState(() => Date.now() + 48 * 60 * 60 * 1000)
  const [timeLeft, setTimeLeft] = useState(() => expiresAt - Date.now())

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTimeLeft(expiresAt - Date.now())
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [expiresAt])

  return (
    <div className="discount-card">
      <Sparkles size={34} aria-hidden="true" />
      <h2>Вам доступна скидка&nbsp;<strong>20%</strong> на первый заказ</h2>
      <div className="countdown" aria-label={`До конца акции ${formatCountdown(timeLeft)}`}>
        {formatCountdown(timeLeft)}
      </div>
      <button type="button">Перейти к покупкам</button>
    </div>
  )
}

function App() {
  const confettiCanvasRef = useRef(null)
  const heartConfettiRef = useRef(null)
  const products = useMemo(() => createMockProducts(), [])
  const initialDeck = useMemo(() => pickRandomProducts(products), [products])
  const [deck, setDeck] = useState(initialDeck)
  const [liked, setLiked] = useState(0)
  const [exitDirection, setExitDirection] = useState('right')

  const current = deck[0]
  const viewedCount = initialDeck.length - deck.length
  const progress = (viewedCount / initialDeck.length) * 100

  useEffect(() => {
    if (!confettiCanvasRef.current) return

    heartConfettiRef.current = confetti.create(confettiCanvasRef.current, {
      resize: true,
      useWorker: true,
      disableForReducedMotion: true,
    })

    return () => {
      heartConfettiRef.current?.reset()
    }
  }, [])

  function fireHeartConfetti() {
    const fire = (x, y, particleCount, options = {}) =>
      heartConfettiRef.current?.({
        particleCount,
        angle: 90,
        spread: 360,
        startVelocity: 62,
        ticks: 210,
        gravity: 0.55,
        decay: 0.91,
        scalar: 1.9,
        shapes: [heartConfettiShape],
        colors: ['#e84d70', '#ff7aa2', '#cf4f5f'],
        origin: { x, y },
        ...options,
      })

    const variants = [
      {
        shapes: [heartConfettiShape],
        colors: ['#e84d70', '#ff7aa2', '#cf4f5f'],
        scalar: 1.9,
      },
      {
        shapes: [starConfettiShape],
        colors: ['#f2c94c', '#f2994a', '#ffffff'],
        scalar: 2.5,
      },
      {
        shapes: ['square', 'circle'],
        colors: ['#2f8c76', '#f2c94c', '#56ccf2', '#bb6bd9', '#ff7aa2'],
        scalar: 1.15,
      },
    ]
    const variant = getRandomItem(variants)
    // const variant = variants[1]

    fire(0.5, 0.55, 350, variant)
    fire(0.24, 0.62, 180, variant)
    fire(0.76, 0.62, 180, variant)
  }

  function handleSwipe(action) {
    setExitDirection(action === 'skip' ? 'left' : 'right')
    if (action === 'like') {
      setLiked((count) => count + 1)
      fireHeartConfetti()
    }
    setDeck((items) => items.slice(1))
  }

  function skipCard() {
    setExitDirection('right')
    setDeck((items) => items.slice(1))
  }

  return (
    <main className="app-shell">
      <canvas
        className="heart-confetti"
        ref={confettiCanvasRef}
        aria-hidden="true"
      />

      <section
        className="swipe-screen"
        aria-label="Карусель товаров Mesomatrix"
      >
        <header className="topbar">
          <div>
            <h1>Подбор косметики</h1>
          </div>
        </header>

        <div className="deck" aria-live="polite">
          <AnimatePresence custom={exitDirection}>
            {deck.map((product, index) => (
              <SwipeCard
                key={product.id}
                product={product}
                index={index}
                active={index === 0}
                onSwipe={handleSwipe}
                progress={progress}
              />
            ))}
          </AnimatePresence>

          {!current && <DiscountOffer />}
        </div>

        {current && (
          <footer className="actions">
            <div>
              <button
                className="action-button skip"
                type="button"
                aria-label="Пропустить товар"
                onClick={() => handleSwipe('skip')}
              >
                <ThumbsDown size={25} aria-hidden="true" />
              </button>
              <button
                className="action-button like"
                type="button"
                aria-label="Добавить товар в понравившиеся"
                onClick={() => handleSwipe('like')}
              >
                <Heart size={27} aria-hidden="true" />
              </button>
            </div>
            <div>
              <button className="skip-card-button" type="button" onClick={skipCard}>
                Пропустить
              </button>
            </div>
          </footer>
        )}
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
