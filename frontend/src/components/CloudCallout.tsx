import React from 'react';

interface CloudCalloutProps {
  texts: string[];
  theme?: 'gradient' | 'navy' | 'white';
  tailSide?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

export const CloudCallout: React.FC<CloudCalloutProps> = ({
  texts,
  theme = 'gradient',
  tailSide = 'right',
  className = '',
  style = {},
}) => {
  // 14 natural cloud lobes around ellipse
  const cx = 260;
  const cy = 190;
  const rx = 195;
  const ry = 135;
  const n = 14;
  const lobeR = [46, 50, 54, 52, 48, 46, 50, 52, 54, 50, 48, 46, 48, 50];

  const circles = [];
  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const px = cx + rx * Math.cos(angle);
    const py = cy + ry * Math.sin(angle);
    circles.push({ cx: px, cy: py, r: lobeR[i] });
  }

  // Define colors based on theme
  let strokeColor = '#FFFFFF';
  let strokeWidth = 4;
  let textColor = '#FFFFFF';
  let textFontWeight = 400;

  if (theme === 'gradient') {
    strokeColor = '#FFFFFF';
    textColor = '#FFFFFF';
  } else if (theme === 'navy') {
    strokeColor = '#FFFFFF';
    textColor = '#FFFFFF';
  } else if (theme === 'white') {
    strokeColor = '#ED0081';
    strokeWidth = 4.5;
    textColor = '#ED0081';
    textFontWeight = 600;
  }

  const gradId = `cloudGrad-${theme}`;

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`} style={style}>
      {/* Background Cloud SVG */}
      <svg
        viewBox="0 0 540 390"
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cloudGrad-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF1088" />
            <stop offset="45%" stopColor="#DE28A5" />
            <stop offset="75%" stopColor="#7B68EE" />
            <stop offset="100%" stopColor="#00A8F3" />
          </linearGradient>
          <linearGradient id="cloudGrad-navy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D3568" />
            <stop offset="100%" stopColor="#092F5E" />
          </linearGradient>
          <linearGradient id="cloudGrad-white" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        {/* Cloud Body */}
        <g fill={`url(#${gradId})`} stroke={strokeColor} strokeWidth={strokeWidth}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
          {circles.map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />
          ))}
        </g>

        {/* Thought Bubbles Trailing */}
        {tailSide === 'right' ? (
          <>
            <circle
              cx="450"
              cy="315"
              r="26"
              fill={theme === 'white' ? '#FFFFFF' : theme === 'navy' ? '#092F5E' : '#00A8F3'}
              stroke={strokeColor}
              strokeWidth={strokeWidth * 0.8}
            />
            <circle
              cx="495"
              cy="352"
              r="17"
              fill={theme === 'white' ? '#FFFFFF' : theme === 'navy' ? '#092F5E' : '#00A8F3'}
              stroke={strokeColor}
              strokeWidth={strokeWidth * 0.7}
            />
            <circle
              cx="518"
              cy="374"
              r="10"
              fill={theme === 'white' ? '#FFFFFF' : theme === 'navy' ? '#092F5E' : '#00A8F3'}
              stroke={strokeColor}
              strokeWidth={strokeWidth * 0.6}
            />
          </>
        ) : (
          <>
            <circle
              cx="90"
              cy="315"
              r="26"
              fill={theme === 'white' ? '#FFFFFF' : theme === 'navy' ? '#092F5E' : '#00A8F3'}
              stroke={strokeColor}
              strokeWidth={strokeWidth * 0.8}
            />
            <circle
              cx="45"
              cy="352"
              r="17"
              fill={theme === 'white' ? '#FFFFFF' : theme === 'navy' ? '#092F5E' : '#00A8F3'}
              stroke={strokeColor}
              strokeWidth={strokeWidth * 0.7}
            />
            <circle
              cx="22"
              cy="374"
              r="10"
              fill={theme === 'white' ? '#FFFFFF' : theme === 'navy' ? '#092F5E' : '#00A8F3'}
              stroke={strokeColor}
              strokeWidth={strokeWidth * 0.6}
            />
          </>
        )}
      </svg>

      {/* Content Text inside cloud */}
      <div
        className="relative z-10 w-[78%] h-[74%] flex flex-col items-center justify-center text-center px-3 py-2 overflow-hidden pointer-events-none"
        style={{
          color: textColor,
          fontWeight: textFontWeight,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {texts.map((t, i) => (
          <p
            key={i}
            className="text-[0.65rem] sm:text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed tracking-normal line-clamp-6"
          >
            {t}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CloudCallout;
