import React, { useEffect, useRef } from 'react';
import Audio from "./Ses.ogg"
//component to play sound if no action is taken for a while
const AudioPlayer = () => {
  const audioRef = useRef(null);
  let timeoutId = null;

  //useEffect to set up timer 
  useEffect(() => {
    const startTimer = () => {
      timeoutId = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
          document.body.style.backgroundColor = "red"
        }
      }, 30000000); // Play the audio after 30 seconds
    };
    //Function to reset timer if any action is taken
    const resetTimer = () => {
      audioRef.current.pause();
      clearTimeout(timeoutId);
      startTimer();
      document.body.style.backgroundColor = "#c6ffc8"
    };

    startTimer();

    // Reset the timer when there is mouse movement or key press events
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);

    //clearing the timeout and event listeners
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keydown', resetTimer);
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef}>
        <source src={Audio} />
      </audio>
    </div>
  );
};

export default AudioPlayer;
