/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import styles from './page.module.css'

const Layout = ({children}) => {
  return (
    <div>
      <h1 className={styles.mainTitle}>Relive the Moments: Last Year's Event Highlights</h1>
      {children}
    </div>
  )
}

export default Layout