import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  end?: number;
  value?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  triggerOnView?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  value,
  duration = 1600,
  prefix = '',
  suffix = '',
  className = '',
  triggerOnView = true,
}) => {
  const targetEnd = Number(end ?? value ?? 0);
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const prevEndRef = useRef(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // If target is 0 or invalid number
    if (isNaN(targetEnd)) {
      setCount(0);
      return;
    }

    const animate = (fromValue: number, toValue: number) => {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out expo
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(fromValue + (toValue - fromValue) * easeOut);
        setCount(isNaN(current) ? toValue : current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(toValue);
        }
      };
      requestAnimationFrame(step);
    };

    if (!triggerOnView) {
      animate(prevEndRef.current, targetEnd);
      prevEndRef.current = targetEnd;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          animate(0, targetEnd);
          prevEndRef.current = targetEnd;
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetEnd, duration, triggerOnView]);

  const safeCount = typeof count === 'number' && !isNaN(count) ? count : (targetEnd || 0);

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}
      {safeCount.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};
