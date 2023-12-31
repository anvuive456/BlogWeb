import {ImageResponse} from "next/og";

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
export default function Icon() {
  return new ImageResponse((
      <div
          style={{
            width: '100%',
            height: '100%',
            background: 'indianred',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '24',
            borderRadius: '4px',
            padding:'4px'
          }}
      >
        AP
      </div>
  ), {
    ...size
  });
}
