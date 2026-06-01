import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'ecolobrick-hero-sound';

/** Procedural eco-industrial ambient pad — no external audio files */
function createAmbientEngine(ctx: AudioContext) {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const padGain = ctx.createGain();
  padGain.gain.value = 0.05;

  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 0.015;
  lfo.connect(lfoDepth);
  lfoDepth.connect(padGain.gain);
  lfo.start();

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 300;
  filter.Q.value = 0.6;

  const oscA = ctx.createOscillator();
  oscA.type = 'sine';
  oscA.frequency.value = 55;
  const oscB = ctx.createOscillator();
  oscB.type = 'sine';
  oscB.frequency.value = 82.5;
  const oscC = ctx.createOscillator();
  oscC.type = 'triangle';
  oscC.frequency.value = 110;

  [oscA, oscB, oscC].forEach((osc) => {
    osc.connect(filter);
    osc.start();
  });
  filter.connect(padGain);
  padGain.connect(master);

  const bufferSize = 2 * ctx.sampleRate;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = 140;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.02;
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(master);
  noise.start();

  const maxVolume = 0.85;

  return {
    stop: () => {
      try {
        lfo.stop();
        oscA.stop();
        oscB.stop();
        oscC.stop();
        noise.stop();
      } catch {
        /* already stopped */
      }
      master.disconnect();
    },
    fadeIn: (duration = 1.4) => {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.gain.linearRampToValueAtTime(maxVolume, ctx.currentTime + duration);
    },
    fadeOut: (duration = 0.7) => {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    },
  };
}

export function useHeroAmbientSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const engineRef = useRef<ReturnType<typeof createAmbientEngine> | null>(null);
  const [enabled, setEnabled] = useState(false);

  const stopEngine = useCallback(() => {
    if (!engineRef.current) return;
    engineRef.current.fadeOut(0.6);
    const engine = engineRef.current;
    engineRef.current = null;
    setTimeout(() => engine.stop(), 750);
  }, []);

  const startEngine = useCallback(async () => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') await ctx.resume();
    if (engineRef.current) return;
    engineRef.current = createAmbientEngine(ctx);
    engineRef.current.fadeIn(1.5);
  }, []);

  const toggle = useCallback(async () => {
    if (enabled) {
      stopEngine();
      setEnabled(false);
      try {
        sessionStorage.setItem(STORAGE_KEY, 'off');
      } catch {
        /* ignore */
      }
    } else {
      await startEngine();
      setEnabled(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, 'on');
      } catch {
        /* ignore */
      }
    }
  }, [enabled, startEngine, stopEngine]);

  useEffect(() => {
    return () => {
      engineRef.current?.stop();
      engineRef.current = null;
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  return { enabled, toggle };
}
