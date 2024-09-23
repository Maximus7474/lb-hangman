import React from 'react';

interface HangmanSVGProps {
  step: number;
}

const strokeWidth = "4"

const HangmanSVG: React.FC<HangmanSVGProps> = ({ step }) => {
  return (<div
      style={{margin: '0 auto'}}
    >
      {/* Hangman SVG Credit to: https://codepen.io/aaronng/pen/JNRqYe */}
      <svg height="260" width="250" className='svg-icon'>
        <g>
          {/* Head */}
          {step >= 1 && (
            <g>
              <circle cx="200" cy="80" r="20" stroke="black" strokeWidth={strokeWidth} fill="none" />
              {step >= 6 && (
                /* Eyes */
                <g>
                  <line x1="190" y1="78" x2="196" y2="84" stroke="black" strokeWidth={strokeWidth} />
                  <line x1="204" y1="78" x2="210" y2="84" stroke="black" strokeWidth={strokeWidth} />
                  <line x1="190" y1="84" x2="196" y2="78" stroke="black" strokeWidth={strokeWidth} />
                  <line x1="204" y1="84" x2="210" y2="78" stroke="black" strokeWidth={strokeWidth} />
                </g>
              )}
            </g>
          )}

          {/* Body */}
          {step >= 2 && <line x1="200" y1="100" x2="200" y2="150" stroke="black" strokeWidth={strokeWidth} />}

          {/* Left Arm */}
          {step >= 3 && <line x1="200" y1="120" x2="170" y2="140" stroke="black" strokeWidth={strokeWidth} />}

          {/* Right Arm */}
          {step >= 4 && <line x1="200" y1="120" x2="230" y2="140" stroke="black" strokeWidth={strokeWidth} />}

          {/* Left Leg */}
          {step >= 5 && <line x1="200" y1="150" x2="180" y2="190" stroke="black" strokeWidth={strokeWidth} />}

          {/* Right Leg */}
          {step >= 6 && <line x1="200" y1="150" x2="220" y2="190" stroke="black" strokeWidth={strokeWidth} />}
        </g>

        {/* Ground */}
        <line x1="50" y1="250" x2="150" y2="250" stroke="black" strokeWidth={strokeWidth} />

        {/* Pole */}
        <line x1="100" y1="250" x2="100" y2="20" stroke="black" strokeWidth={strokeWidth} />
        <line x1="98" y1="20" x2="202" y2="20" stroke="black" strokeWidth={strokeWidth} />

        {/* Rope */}
        <line x1="200" y1="20" x2="200" y2="60" stroke="black" strokeWidth={strokeWidth} />
      </svg>
    </div>);
};

export default HangmanSVG;