import React, { useEffect, useRef } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  let timeoutId = null;

  useEffect(() => {
    const startTimer = () => {
      timeoutId = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          console.log("played")
        }
      }, 3000); // 3 saniye sonra sesi çal
    };

    const resetTimer = () => {
      clearTimeout(timeoutId);
      startTimer();
    };

    startTimer();

    document.addEventListener('mousemove', resetTimer); // Fare hareketinde süreyi sıfırlar
    document.addEventListener('keydown', resetTimer); // Tuşa basıldığında süreyi sıfırlar

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keydown', resetTimer);
    };
  }, []);

  return (
    <div>
      <audio controls ref={audioRef}>
        <source src='https://www.myinstants.com/en/instant/mp3/?utm_source=copy&utm_medium=share' type="audio/ogg" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
