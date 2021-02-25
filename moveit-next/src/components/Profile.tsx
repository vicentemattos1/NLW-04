import { useContext } from 'react';
import { ChallangesContext } from '../contexts/ChallangesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile(){

    const { level } = useContext(ChallangesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="http://github.com/vicentemattos1.png" alt="Vicente Mattos"/>
            <div>
                <strong>
                    Vicente Mattos
                </strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}