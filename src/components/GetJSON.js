import React from 'react'
import styles from './componentStyles.module.scss'

function GetJSON({ table, includeNohits }) {

  const copyJSON = () => {
    const reset = Object.entries(table).filter(([key, value]) => value["reset"])
    console.log(reset.length)

    const tableDownload = {
      reset: reset.length ? reset[0][0] : "",
      bosses: Object.fromEntries(Object.entries(table).map(([name, data]) => [name,
        { count: data['count'] }]
      ))
    }

    const hitsOnly = {
      ...tableDownload, bosses:
        Object.fromEntries(Object.entries(tableDownload.bosses).filter(([name, data]) =>
          data['count'] > 0))
    }


    const blob = includeNohits ? new Blob([JSON.stringify(
      tableDownload
    )], { type: "application/json" }) :
      new Blob([
        JSON.stringify(hitsOnly)
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
