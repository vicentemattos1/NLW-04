import Head from 'next/head'

import { GetServerSideProps } from 'next'

import { ChallangeBox } from '../components/ChallangeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CountdownProvider } from '../contexts/CountdownContext'

import styles from '../styles/pages/Home.module.css'
import { ChallangesProvider } from '../contexts/ChallangesContext'

interface HomeProps{
  level: number; 
  currentExperience: number; 
  challangesCompleted: number;
}

export default function Home(props: HomeProps) {
  console.log(props);
  return (
    <ChallangesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challangesCompleted={props.challangesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile /> 
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallangeBox />
            </div>
          </section>
        </CountdownProvider>

      </div>
    </ChallangesProvider>
  )
}


export const getServerSideProps :GetServerSideProps = async (context) => {
  
  const { level, currentExperience, challangesCompleted } = context.req.cookies
  
  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challangesCompleted: Number(challangesCompleted)
    }
  }
}