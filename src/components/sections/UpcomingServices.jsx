import { motion } from 'framer-motion'
import GridInfoCard from '../ui/GridInfoCard'
import { upcomingServices } from '../../data/servicesContent'
import styles from './UpcomingServices.module.css'

/**
 * UpcomingServices - Kommende tjenester i pipelinen
 *
 * Viser fremtidige tjenester som er under utvikling eller planlagt
 * Inkluderer solenergi, datasenter-analyse, og multi-energi kostnader
 */
function UpcomingServices() {
  return (
    <section className={styles.section} id="upcoming-section">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.badge}>Under utvikling</div>
          <h2 className="text-hero">Kommende Analyseområder</h2>
          <p className={styles.description}>
            Analysegrunnlaget utvides kontinuerlig med nye fagområder innen fornybar energi og energiinfrastruktur.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className={styles.grid}>
          {upcomingServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <GridInfoCard
                variant="default"
                coordinates={{
                  tl: `[${index},0]`,
                  tr: `[${index},1]`,
                  bl: `[${index + 1},0]`,
                  br: `[${index + 1},1]`
                }}
                className={styles.card}
              >
                <div className={styles.cardContent}>
                  <div className={styles.statusBadge}>
                    {service.status}
                  </div>
                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.cardDescription}>{service.description}</p>
                </div>
              </GridInfoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UpcomingServices
