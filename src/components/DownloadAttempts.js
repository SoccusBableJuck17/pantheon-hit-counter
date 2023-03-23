import React from 'react'
import styles from './componentStyles.module.scss'

function DownloadAttempts({ includeNohits }) {
  const downloadAttempts = () => {

    const attemptsObject = JSON.parse(localStorage.getItem("attempts"))
    const hitsOnly = attemptsObject.map(attempt => {
      return {
        ...attempt, bosses: Object.fromEntries(Object.entries(attempt.bosses).filter(([name, count]) =>
          count > 0))
      }
    })

    const blob = includeNohits ?
      new Blob([localStorage.getItem("attempts")], { type: "application/json" }) :
      new Blob([JSON.stringify(hitsOnly)], { type: "application/json" })

    const href = URL.createObjectURL(blob)

    const currentDate = new Date();
    const fileName = 'UserAttempts_' + (currentDate.getMonth() + 1) +
      '-' + currentDate.getDay() +
      '-' + currentDate.getFullYear() +
      '_' + currentDate.getHours() +
      '-' + currentDate.getMinutes() +
      '-' + currentDate.getSeconds()
    const aTag = document.createElement('a')
    aTag.href = href
    aTag.setAttribute('download', fileName)
    document.body.appendChild(aTag)
    aTag.click()
    aTag.remove()

    URL.revokeObjectURL(href)
  }

  return (
    <div className={styles.downloadAttempts} onClick={downloadAttempts}>
      Download All Attempts
    </div>
  )
}

export default DownloadAttempts
