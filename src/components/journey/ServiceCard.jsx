import useScrollAnimation from './useScrollAnimation'
import styles from './ServicesJourney.module.css'

/**
 * ServiceCard - Tjeneste-kort med scroll-triggered fade-in animasjon
 *
 * @param {Object} service - Tjeneste data fra servicesContent.js
 * @param {number} index - Index for staggered animation timing
 */
function ServiceCard({ service, index }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 })

  return (
    <div
      ref={ref}
      className={`${styles.serviceCard} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Badge nummer */}
      <div className={styles.serviceBadge}>{service.id}</div>

      {/* Content */}
      <div className={styles.serviceContent}>
        <h3 className={styles.serviceTitle}>{service.title}</h3>
        <p className={styles.serviceDescription}>{service.description}</p>
      </div>
    </div>
  )
}

export default ServiceCard
