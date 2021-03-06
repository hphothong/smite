import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react';
import Card from '../components/card';
import Layout from '../components/layout';
import Select from '../components/select';
import { BASE_URL } from '../config';
import { SmiteGod } from '../models/smite.god';
import { SmiteService } from '../services/smite.service';
import styles from '../styles/Home.module.css'
import { SettingsBar } from "../components/settings-bar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

interface CardData {
  smiteGod: SmiteGod;
  isFlipped: boolean;
  selectedRole: string;
}

export interface HomeProps {
  smiteGods: SmiteGod[];
  roles: string[];
}

const Home: NextPage<HomeProps> = ({ smiteGods, roles }) => {
  const cardCount: number = 5;
  const defaultCardData: CardData[] = [];
  for (let i = 0; i < cardCount; i++) {
    defaultCardData.push({
      smiteGod: smiteGods[i],
      isFlipped: false,
      selectedRole: roles[0],
    });
  }
  const [cardData, setCardData] = useState<CardData[]>(defaultCardData);

  const lastSmiteGodNames: string[] = cardData.map((data: CardData) => data.smiteGod.name);

  const getAvailableSmiteGodIndicesByRole = (role: string, excludedNames?: string[]): number[] => smiteGods.reduce((list: number[], smiteGod: SmiteGod, smiteGodIndex: number) => {
    const isValidRole: boolean = role === "Any" || smiteGod.roles.includes(role);
    const isNotChosen: boolean = !lastSmiteGodNames.includes(smiteGod.name);
    const isNotExcluded: boolean = !excludedNames?.includes(smiteGod.name);
    if (isValidRole && isNotChosen && isNotExcluded) {
      list.push(smiteGodIndex);
    }
    return list;
  }, []);

  const getRandomSmiteGodFrom = (available: number[]): number => {
    const index: number = Math.floor(Math.random() * available.length);
    return available[index];
  }

  const randomize = (cardIndex: number, newRole?: string) => {
    const role: string = newRole ?? cardData[cardIndex].selectedRole;
    const available: number[] = getAvailableSmiteGodIndicesByRole(role);
    const smiteGodIndex: number = getRandomSmiteGodFrom(available);
    setCardData(cardData.map((data: CardData, index: number) =>
      index === cardIndex
      ? { isFlipped: false, smiteGod: smiteGods[smiteGodIndex], selectedRole: role }
      : data,
    ));
  }

  const randomizeAll = () => {
    const newCardData: CardData[] = [];
    for (let i = 0; i < cardData.length; i++) {
      const role: string = cardData[i].selectedRole;
      const excludedNames: string[] = newCardData.map((data: CardData) => data.smiteGod.name);
      const available: number[] = getAvailableSmiteGodIndicesByRole(role, excludedNames);
      const smiteGodIndex: number = getRandomSmiteGodFrom(available);
      newCardData.push({ isFlipped: false, selectedRole: role, smiteGod: smiteGods[smiteGodIndex] });
    }
    setCardData(newCardData);
  }

  const onChangeRole = (cardIndex: number) => (selectedRole: string) => randomize(cardIndex, selectedRole);

  const flip = (cardIndex: number) => () => setCardData(cardData.map((data: CardData, index: number) =>
    index === cardIndex
    ? { ...data, isFlipped: true }
    : data
  ));

  return (
    <Layout>
      <Head>
        <title>Smite Team Randomizer</title>
        <meta name="description" content="Author: Hayden Phothong" />
        <link rel="icon" href={`${BASE_URL}/favicon.ico`} />
      </Head>
      {/* <SettingsBar /> */}
      <div className={styles.cards}>
        {cardData.map(({ smiteGod, isFlipped, selectedRole }: CardData, cardIndex: number) => {
          const { name, godCardURL, title, pantheon}: SmiteGod = smiteGod;
          return (
            <div className={styles.cardColumn} key={`${name}-${cardIndex}`}>
              <Card flipped={isFlipped} onClick={flip(cardIndex)}>
                <Card.Front>
                  <img className={styles.image} src={`${BASE_URL}/hexagons.svg`} alt="Hexagon Pattern SVG" draggable={false} />
                </Card.Front>
                <Card.Back>
                  <Card.Background imageURL={godCardURL}>
                    <div className={styles.content}>
                      <h2>{name}</h2>
                      <p>{title}</p>
                      <p>{pantheon}</p>
                    </div>
                  </Card.Background>
                </Card.Back>
              </Card>
              <Select options={roles} defaultValue={selectedRole} onChange={onChangeRole(cardIndex)} />
            </div>
          );
        })}
      </div>
      <div className={styles.random}>
        <button type="button" onClick={randomizeAll}>
          <FontAwesomeIcon icon={faRandom} className={styles.icon}/>
        </button>
      </div>
    </Layout>
  );
}

export default Home

export async function getStaticProps() {
  const smiteGods: SmiteGod[] = SmiteService.getGods();
  const roles: string[] = SmiteService.getRoles();
  return {
    props: {
      smiteGods,
      roles,
    },
  };
}
