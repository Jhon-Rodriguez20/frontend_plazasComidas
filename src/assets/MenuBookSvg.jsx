import PropTypes from 'prop-types';

const MenuBookIconWithGradient = ({ width = 100, height = 100 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width={width}
    height={height}
  >
    <defs>
      <linearGradient id="menuBookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#FEA93C", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#C56B22", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M21 2.04c-.51 0-1.02.1-1.52.28C18.7 1.55 17.65 1 16.5 1c-1.23 0-2.37.52-3.21 1.36-.83-.85-1.97-1.36-3.21-1.36-1.23 0-2.37.52-3.21 1.36-.83-.85-1.97-1.36-3.21-1.36C4.35 1 3.3 1.55 2.52 2.32c-.5-.18-1.01-.28-1.52-.28-.9 0-1.75.38-2.35.98C.1 3.62 0 4.03 0 4.5v16c0 .47.1.88.32 1.26.6.6 1.45.98 2.35.98.51 0 1.02-.1 1.52-.28.78.77 1.83 1.32 3.01 1.32 1.23 0 2.37-.52 3.21-1.36.83.85 1.97 1.36 3.21 1.36 1.18 0 2.23-.55 3.01-1.32.5.18 1.01.28 1.52.28.9 0 1.75-.38 2.35-.98.22-.38.32-.79.32-1.26v-16c0-.47-.1-.88-.32-1.26-.6-.6-1.45-.98-2.35-.98zM12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm2.5 18c-.7 0-1.35-.15-1.94-.43-.83.33-1.76.43-2.63.43s-1.8-.1-2.63-.43c-.59.28-1.24.43-1.94.43-1.15 0-2.16-.37-3-1v-12c.84.63 1.85 1 3 1 .7 0 1.35-.15 1.94-.43.83.33 1.76.43 2.63.43s1.8-.1 2.63-.43c.59.28 1.24.43 1.94.43 1.15 0 2.16-.37 3-1v12c-.84.63-1.85 1-3 1z"
      fill="url(#menuBookGradient)"
    />
  </svg>
);

MenuBookIconWithGradient.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
}

export default MenuBookIconWithGradient;