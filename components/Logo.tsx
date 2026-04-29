export const AILogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="serverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00cfa1" />
        <stop offset="100%" stopColor="#085482" />
      </linearGradient>
    </defs>
    
    {/* Main Document Outline */}
    <path 
      d="M 32 16 
         L 76 16 
         A 24 24 0 0 1 100 40 
         L 100 48 
         C 100 68, 56 64, 56 84 
         L 56 104 
         A 12 12 0 0 1 44 116 
         L 32 116 
         A 12 12 0 0 1 20 104 
         L 20 28 
         A 12 12 0 0 1 32 16 
         Z" 
      stroke="#085482" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"
    />
    
    {/* Connector Tail with Dot */}
    <path 
      d="M 40 116 
         C 64 116, 72 108, 72 92 
         L 72 84 
         C 72 74, 80 74, 88 74" 
      stroke="#085482" strokeWidth="7" strokeLinecap="round" fill="none"
    />
    <circle cx="88" cy="74" r="5" fill="#085482" />

    {/* AI Text */}
    <text 
      x="38" y="58" 
      fill="#00cfa1" 
      textAnchor="middle"
      style={{ fontSize: '28px', fontWeight: '900', fontFamily: 'Arial, sans-serif', letterSpacing: '-0.5px' }}
    >
      AI
    </text>

    {/* Small Server/Document Icon */}
    <rect 
      x="74" y="88" width="28" height="30" rx="4" 
      stroke="url(#serverGrad)" strokeWidth="4" fill="none"
    />
    <line x1="81" y1="96" x2="95" y2="96" stroke="#00cfa1" strokeWidth="3" strokeLinecap="round" />
    <line x1="81" y1="104" x2="95" y2="104" stroke="#00cfa1" strokeWidth="3" strokeLinecap="round" />
    <line x1="81" y1="112" x2="95" y2="112" stroke="#00cfa1" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

