import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import GridInfoCard from '../ui/GridInfoCard'
import { serviceCards } from '../../data/servicesContent'
import styles from './ServiceSteps.module.css'

/**
 * ServiceSteps - Horizontal Scroll Carousel
 * Vertical scroll drives horizontal card movement
 * Viewport locks until all cards are viewed
 */

function ServiceSteps() {
  const containerRef = useRef(null)
  const cardCount = serviceCards.length
  // Extra 15vw to ensure last card is fully visible
  const scrollDistance = Math.max(cardCount - 1, 1) * 100 + 15

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Translate across all cards: (cardCount - 1) * 100vw
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${scrollDistance}vw`])

  return (
    <section
      ref={containerRef}
      className={styles.section}
      style={{ height: `${scrollDistance}vh` }}
    >
      <div className={styles.stickyContainer}>
        <motion.div
          className={styles.horizontalScroller}
          style={{ x }}
        >
          {serviceCards.map((service, index) => (
            <div key={service.id} className={styles.card} data-card-index={index}>
              <GridInfoCard
                variant="default"
                coordinates={{
                  tl: `[${index},0]`,
                  tr: `[${index},1]`,
                  bl: `[${index + 1},0]`,
                  br: `[${index + 1},1]`
                }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.textContent}>
                    <div className={styles.stepMeta}>
                      Steg {index + 1} av {serviceCards.length}
                    </div>
                    <h3
                      className={`${styles.title} ${service.title.length > 24 ? styles.titleLong : ''}`}
                    >
                      {service.title}
                    </h3>
                    <p className={styles.description}>{service.description}</p>
                  </div>
                  <div className={styles.imageContent}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className={service.imageRotate ? styles.rotateImage : ''}
                    />
                    {service.id === '01' && (
                      <div className={styles.mapPins}>
                        <div className={styles.pin} style={{ top: '18%', left: '52%' }}></div>
                        <div className={styles.pin} style={{ top: '48%', left: '38%' }}></div>
                        <div className={styles.pin} style={{ top: '62%', left: '27%' }}></div>
                        <div className={styles.pin} style={{ top: '75%', left: '20%' }}></div>
                        <div className={styles.pin} style={{ top: '85%', left: '35%' }}></div>
                      </div>
                    )}
                  </div>
                </div>
              </GridInfoCard>
            </div>
          ))}
          {/* Buffer space after last card */}
          <div className={styles.buffer} />
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceSteps
