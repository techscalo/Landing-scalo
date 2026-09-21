// Scalo symbol as a vector so it remains crisp at favicon and sharing sizes.
export function ScaloSymbol({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 2 98 19v22L50 25 10 39v13l40-14 48 17v37l-48 18L2 93V71l48 17 40-14V62L50 76 2 59V19L50 2Z"
        fill="white"
      />
    </svg>
  );
}
