import { useEffect, useRef, useState } from 'react';

// Singleton audio instance that persists across component unmounts/remounts
let globalAudio = null;
// Default to unmuted state globally
let isGlobalMuted = false;

export default function MusicPlayer() {
  // Initialize state from global state (default: unmuted)
  const [muted, setMuted] = useState(isGlobalMuted);
  const initialized = useRef(false);
  
  useEffect(() => {
    // Setup audio once on first render
    if (!initialized.current) {
      if (!globalAudio) {
        globalAudio = new Audio('/music/bgm.mp3');
        globalAudio.loop = true;
      }
      initialized.current = true;
    }
    
    // Sync mute state
    globalAudio.muted = muted;
    isGlobalMuted = muted;
    
    // Attempt playback if paused
    if (globalAudio.paused) {
      globalAudio.play().catch((error) => {
        
        // Handle autoplay policy restrictions
        if (error.name === "NotAllowedError") {
          // Temporarily mute until user interacts with page
          setMuted(true);
          isGlobalMuted = true;
          
          // Unmute and play on first user interaction
          const handleFirstInteraction = () => {
            setMuted(false);
            isGlobalMuted = false;
            globalAudio.play().catch(e => console.error("Playback failed:", e));
            document.removeEventListener('click', handleFirstInteraction);
          };
          document.addEventListener('click', handleFirstInteraction);
        }
      });
    }
  }, [muted]);

  // Toggle mute state
  const toggleMute = () => setMuted(m => !m);

  return (
    <button 
      className="music-toggle" 
      onClick={toggleMute} 
      aria-label={muted ? 'Unmute' : 'Mute'}
    >
      <span className="material-icons">
        {muted ? 'volume_off' : 'volume_up'}
      </span>
    </button>
  );
}