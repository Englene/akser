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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // 6 cards × 100vw = 600vw total content
  // Need to move 5 cards = 500vw translation
  const x = useTransform(scrollYProgress, [0, 0.9], ["0vw", "-500vw"])

  return (
    <section ref={containerRef} className={styles.section}>
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
                    <h3 className={styles.title}>{service.title}</h3>
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
