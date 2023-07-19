import React, { useEffect } from 'react'
import Vivus from 'vivus';
import "./style/Logo.css"



function Logo() {
  useEffect(() => {
    new Vivus(
      'logo',
      {
        type: 'delayed',
        duration: 200,
        start: 'autostart'
      },
    );
  }, []);
	
  return (
	<div className="logo">
		  <svg id='logo'
    width={121}
    height={86}
    viewBox="0 0 121 86"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.0905 83.4998C18.0905 83.4998 -11.3631 12.9637 18.0905 5.99985C45.5125 -0.483639 58.898 63.5293 59.712 67.558C59.7385 67.6895 59.7856 67.8184 59.8811 67.9125C60.2693 68.2949 60.9038 68.2914 61.2878 67.9048C61.3824 67.8096 61.4278 67.6808 61.4529 67.5491C62.2168 63.5406 74.7577 0.0885257 102.09 5.99985C131.672 12.3975 102.09 83.4998 102.09 83.4998"
      stroke="#2575C6"
      strokeWidth={10}
    />
    <g filter="url(#filter0_d_16_2279)">
      <rect
        x="9.34045"
        y="13.25"
        width="101.5"
        height="2.5"
        stroke="#2575C6"
        strokeWidth="2.5"
        shapeRendering="crispEdges"
      />
    </g>
    <g filter="url(#filter1_d_16_2279)">
      <rect
        x="9.34045"
        y="25.25"
        width="101.5"
        height="2.5"
        stroke="#2575C6"
        strokeWidth="2.5"
        shapeRendering="crispEdges"
      />
    </g>
    <g filter="url(#filter2_d_16_2279)">
      <rect
        x="9.34045"
        y="37.25"
        width="101.5"
        height="2.5"
        stroke="#2575C6"
        strokeWidth="2.5"
        shapeRendering="crispEdges"
      />
    </g>
    <g filter="url(#filter3_d_16_2279)">
      <rect
        x="9.34045"
        y="49.25"
        width="101.5"
        height="2.5"
        stroke="#C8504F"
        strokeWidth="2.5"
        shapeRendering="crispEdges"
      />
    </g>
    <g filter="url(#filter4_d_16_2279)">
      <rect
        x="9.34045"
        y="61.25"
        width="101.5"
        height="2.5"
        stroke="#C8504F"
        strokeWidth="2.5"
        shapeRendering="crispEdges"
      />
    </g>
    <g filter="url(#filter5_d_16_2279)">
      <rect
        x="9.34045"
        y="73.25"
        width="101.5"
        height="2.5"
        stroke="#C8504F"
        strokeWidth="2.5"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_16_2279"
        x="4.09045"
        y={6}
        width={112}
        height={13}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={-2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_16_2279"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_16_2279"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_16_2279"
        x="4.09045"
        y={24}
        width={112}
        height={13}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_16_2279"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_16_2279"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_d_16_2279"
        x="4.09045"
        y={36}
        width={112}
        height={13}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_16_2279"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_16_2279"
          result="shape"
        />
      </filter>
      <filter
        id="filter3_d_16_2279"
        x="4.09045"
        y={48}
        width={112}
        height={13}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_16_2279"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_16_2279"
          result="shape"
        />
      </filter>
      <filter
        id="filter4_d_16_2279"
        x="4.09045"
        y={60}
        width={112}
        height={13}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_16_2279"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_16_2279"
          result="shape"
        />
      </filter>
      <filter
        id="filter5_d_16_2279"
        x="4.09045"
        y={72}
        width={112}
        height={13}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_16_2279"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_16_2279"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
	</div>
	
  )
}

export default Logo;