import React from 'react'
import styles from './componentStyles.module.scss'

function GetJSON({ table, includeNohits }) {

  const copyJSON = () => {
    const tableDownload = Object.fromEntries(Object.entries(table).map(([name, data]) => [name, 
      data['reset'] ? { count: data['count'], reset: true } : {count: data['count']}]
    ))
    const blob = includeNohits ? new Blob([JSON.stringify(
      tableDownload
    )], { type: "application/json" }) :
      new Blob([
        JSON.stringify(
          Object.fromEntries(Object.entries(tableDownload).filter(([name, data]) => data['count'] > 0 || data['reset']))
        )
      ], { type: "application/json" })
    const href = URL.createObjectURL(blob)

    const currentDate = new Date();
    const fileName = 'BossHitCounts_' + (currentDate.getMonth() + 1) +
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
    <div className={styles.jsonButton} onClick={copyJSON}>
      Download JSON
    </div>
  )
}

export default GetJSON
