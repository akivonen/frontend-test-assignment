import { useEffect, useRef, useState } from 'react';

export default function TruncatedText({ text }: { text: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState<boolean>(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(
          textRef.current.scrollWidth > textRef.current.clientWidth
        );
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [text]);

  return (
    <div className="truncated-text-wrapper">
      <p
        className={`truncated-text ${
          isTruncated ? 'truncated-text--truncated' : ''
        }`}
        ref={textRef}
        title={isTruncated ? text : undefined}
        aria-label={isTruncated ? text : undefined}
      >
        {text}
      </p>
      {isTruncated && (
        <span
          className="truncated-text__tooltip"
          aria-hidden="true"
          role="tooltip"
        >
          {text}
        </span>
      )}
    </div>
  );
}
