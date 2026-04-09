import React, { useCallback, useEffect, useRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs) => twMerge(clsx(inputs));
const morphTime = 1;
const cooldownTime = 1;

const useMorphingText = (texts) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const setStyles = useCallback((fraction) => {
    const [t1, t2] = [text1Ref.current, text2Ref.current];
    if (!t1 || !t2) return;
    t2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    t2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    const inverted = 1 - fraction;
    t1.style.filter = `blur(${Math.min(8 / inverted - 8, 100)}px)`;
    t1.style.opacity = `${Math.pow(inverted, 0.4) * 100}%`;
    t1.textContent = texts[textIndexRef.current % texts.length];
    t2.textContent = texts[(textIndexRef.current + 1) % texts.length];
  }, [texts]);

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;
    let fraction = morphRef.current / morphTime;
    if (fraction > 1) { cooldownRef.current = cooldownTime; fraction = 1; }
    setStyles(fraction);
    if (fraction === 1) textIndexRef.current++;
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [t1, t2] = [text1Ref.current, text2Ref.current];
    if (t1 && t2) {
      t2.style.filter = "none"; t2.style.opacity = "100%";
      t1.style.filter = "none"; t1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;
      cooldownRef.current -= dt;
      if (cooldownRef.current <= 0) doMorph(); else doCooldown();
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

export const MorphingText = ({ texts, className }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <div className={cn("relative font-sans text-center text-sm mb-3 text-green-500 font-bold filter-[url(#threshold)] blur-[0.6px]", className)}>
      <span className="absolute inset-x-0 top-0 m-auto inline-block w-full" ref={text1Ref} />
      <span className="absolute inset-x-0 top-0 m-auto inline-block w-full" ref={text2Ref} />
      <svg id="filters" className="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice">
        <defs><filter id="threshold"><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140" /></filter></defs>
      </svg>
    </div>
  );
};
