import React, { useEffect, useState } from 'react'
import Heading from './Heading';
import BossRow from './BossRow';
import GetJSON from './GetJSON';
import styles from './componentStyles.module.scss'
import Footer from './Footer';
import TotalHits from './TotalHits';
import ToggleNohits from './ToggleNohits';

const initialState = {
    "vengefly_king": 0,
    "gruz_mother": 0,
    "false_knight": 0,
    "massive_moss_charger": 0,
    "hornet_protector": 0,
    "gorb": 0,
    "dung_defender": 0,
    "soul_warrior": 0,
    "brooding_mawlek": 0,
    "nailmasters_oro_&_mato": 0,
    "xero": 0,
    "crystal_guardian": 0,
    "soul_master": 0,
    "oblobbles": 0,
    "sisters_of_battle": 0,
    "marmu": 0,
    "flukemarm": 0,
    "broken_vessel": 0,
    "galien": 0,
    "paintmaster_sheo": 0,
    "hive_knight": 0,
    "elder_hu": 0,
    "the_collector": 0,
    "god_tamer": 0,
    "troupe_master_grimm": 0,
    "watcher_knights": 0,
    "uumuu": 0,
    "winged_nosk": 0,
    "great_nailsage_sly": 0,
    "hornet_sentinel": 0,
    "enraged_guardian": 0,
    "lost_kin": 0,
    "no_eyes": 0,
    "traitor_lord": 0,
    "white_defender": 0,
    "soul_tyrant": 0,
    "markoth": 0,
    "grey_prince_zote": 0,
    "falied_champion": 0,
    "nightmare_king_grimm": 0,
    "pure_vessel": 0,
    "absolute_radiance": 0
}

function Container() {

    const [table, setTable] = useState(initialState)
    const [displayNohits, setDisplayNohits] = useState(true)

    useEffect(() => {
        const root = document.documentElement
        //console.log(root.style.getPropertyValue("--zoomConstant")) Why is the --zoomConstant property value from scss ignored?
        root?.style.setProperty("--zoomConstant", 1)
        window.addEventListener('resize', () => {
            const browserZoomLevel = Math.round(window.devicePixelRatio * 100) / 100
            root?.style.setProperty("--zoomConstant", browserZoomLevel)
        })
    }, [])

    const toggleNohits = () => {
        setDisplayNohits(prevDisplay => !prevDisplay)
        console.log(displayNohits)
    }

    const incrementCount = key => {
        setTable(prevTable => {
            return prevTable[key] < 9999999 ?
                Object.assign({}, { ...prevTable, [key]: prevTable[key] + 1 }) :
                prevTable
        })
    }

    const decrementCount = key => {
        setTable(prevTable => {
            return prevTable[key] > 0 ?
                Object.assign({}, { ...prevTable, [key]: prevTable[key] - 1 }) :
                prevTable
        })
    }

    const writeCount = (key, event) => {
        let newValue = event.target.value
        if (newValue.length > 7) newValue = newValue.substring(0, 7)
        newValue = isNaN(parseInt(newValue)) ? 0 : parseInt(newValue)
        setTable(prevTable => Object.assign({}, { ...prevTable, [key]: newValue}))
    }

    return (
        <div>
            <div className={styles.containerDiv}>
                <Heading />
                <div className={styles.buttonsContainer}>
                    <GetJSON table={table} includeNohits={displayNohits} />
                    <ToggleNohits displayNohits={displayNohits} toggleNohits={toggleNohits} />
                </div>
                <div className={styles.bossesContainer}>
                    <TotalHits hits={
                        Object.values(table).reduce((accumulator, currentValue) => accumulator + currentValue)
                    }
                    />
                    {
                        Object.entries(table).map(([name, count]) => {
                            return (
                                count == 0 && !displayNohits ? null :
                                    <BossRow
                                        name={name}
                                        count={count}
                                        incrementCount={incrementCount}
                                        decrementCount={decrementCount}
                                        writeCount={writeCount}
                                        key={name}
                                    />
                            )
                        }
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default React.memo(Container)
