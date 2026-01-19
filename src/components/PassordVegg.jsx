import { useState } from 'react'
import styles from './PassordVegg.module.css'

function PassordVegg({ onUnlock }) {
  const [passord, setPassord] = useState('')
  const [feil, setFeil] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (passord.toLowerCase() === 'småkraft') {
      onUnlock()
    } else {
      setFeil(true)
      setTimeout(() => setFeil(false), 2000)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Akser</h1>
        <p className={styles.subtitle}>Nettsiden er under utvikling</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            value={passord}
            onChange={(e) => setPassord(e.target.value)}
            placeholder="Skriv inn passord"
            className={`${styles.input} ${feil ? styles.feil : ''}`}
            autoFocus
          />
          <button type="submit" className={styles.button}>
            Gå inn
          </button>
          {feil && <p className={styles.feilmelding}>Feil passord</p>}
        </form>
      </div>
    </div>
  )
}

export default PassordVegg
