import React, { useEffect, useRef } from 'react';
import Audio from "./Ses.ogg"

const AudioPlayer = () => {
  const audioRef = useRef(null);
  let timeoutId = null;

  useEffect(() => {
    const startTimer = () => {
      timeoutId = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
        }
      }, 300990); // 3 saniye sonra sesi çal
    };

    const resetTimer = () => {
      audioRef.current.pause()
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
      <audio ref={audioRef} >
      <source src={Audio}/>
      </audio>
    </div>
  );
};

export default AudioPlayer;
