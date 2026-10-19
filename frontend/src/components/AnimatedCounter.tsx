import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  triggerOnView?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 1600,
  prefix = '',
  suffix = '',
  className = '',
  triggerOnView = true,
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const prevEndRef = useRef(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // If not triggering on view or already in view, run count animation
    const animate = (fromValue: number, toValue: number) => {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out expo
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(fromValue + (toValue - fromValue) * easeOut);
        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(toValue);
        }
      };
      requestAnimationFrame(step);
    };

    if (!triggerOnView) {
      animate(prevEndRef.current, end);
      prevEndRef.current = end;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          animate(0, end);
          prevEndRef.current = end;
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, triggerOnView]);

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};
