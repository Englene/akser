import React from 'react'
import { serviceCards } from '../../data/servicesContent'
import styles from './ScrollMap.module.css'

/**
 * CityInfo - Viser tjeneste-informasjon for en lokasjon
 */
function CityInfo({ location, services }) {
  return (
    <div className={styles.cityInfo}>
      <div className={styles.cityHeader}>
        <h3 className={styles.cityNameLarge}>{location.number}</h3>
        <p className={styles.cityDescription}>{location.description}</p>
      </div>

      <div className={styles.serviceList}>
        {services.map(serviceId => {
          const service = serviceCards.find(s => s.id === serviceId)
          if (!service) return null

          return (
            <div key={service.id} className={styles.serviceCard}>
              <span className={styles.serviceNumber}>{service.id}</span>
              <div className={styles.serviceContent}>
                <h4 className={styles.serviceTitle}>{service.title}</h4>
                <p className={styles.serviceDescription}>{service.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CityInfo
