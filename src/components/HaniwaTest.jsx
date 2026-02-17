'use client';

import { useLottie } from 'lottie-react';
import animationData from '@/animations/kofun_joystick-test.json';
import joystickTest from '@/animations/kofun_joystick-test.json';
import { useEffect, useState } from 'react';
import styles from './HaniwaTest.module.css';
import clsx from 'clsx';

function HaniwaTest() {
  const [emotion, setEmotion] = useState('Idle');

  const { View, goToAndPlay } = useLottie({
    animationData: animationData,
    loop: true,
    autoplay: false,
  });

  useEffect(() => {
    goToAndPlay(emotion, true);
  }, [emotion, goToAndPlay]);

  const emotions = ['Idle', 'Happy', 'Sad'];

  return (
    <>
      <div className={styles.lottieWrapper}>{View}</div>
      <div className={styles.buttonContainer}>
        {/* {emotions.map((emotionName) => (
          <button
            key={emotionName}
            className={clsx(
              styles.emotionButton,
              emotion === emotionName && styles.active,
            )}
            onClick={() => setEmotion(emotionName)}
          >
            {emotionName}
          </button>
        ))} */}
      </div>
    </>
  );
}

export default HaniwaTest;
