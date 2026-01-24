import React from 'react'
import { serviceCards } from '../../data/servicesContent'
import styles from './ServiceSteps.module.css'

/**
 * ServiceSteps - Vertical step-by-step flow of services
 * Traditional landing page style with arrows and progression
 */
function ServiceSteps() {
  return (
    <div className={styles.stepsContainer}>
      {serviceCards.map((service, index) => (
        <React.Fragment key={service.id}>
          {/* Service Card */}
          <div className={styles.stepCard}>
            <div className={styles.stepLeft}>
              <div className={styles.stepNumber}>{service.id}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{service.title}</h3>
                <p className={styles.stepDescription}>{service.description}</p>
              </div>
            </div>
            <div className={styles.stepImage}>
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

          {/* Arrow connector (not after last item) */}
          {index < serviceCards.length - 1 && (
            <div className={styles.stepConnector}>
              <svg
                width="40"
                height="80"
                viewBox="0 0 40 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.arrow}
              >
                <path
                  d="M20 0 L20 60 M20 60 L10 50 M20 60 L30 50"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ServiceSteps
