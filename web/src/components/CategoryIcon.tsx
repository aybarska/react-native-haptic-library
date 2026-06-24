import type { CategoryIconName } from '../libraryData';

type Props = {
  name: CategoryIconName;
};

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 2,
} as const;

export function CategoryIcon({ name }: Props) {
  return (
    <svg aria-hidden="true" className="category-icon-svg" viewBox="0 0 24 24">
      {renderIcon(name)}
    </svg>
  );
}

function renderIcon(name: CategoryIconName) {
  switch (name) {
    case 'gamepad':
      return (
        <>
          <path {...strokeProps} d="M7.5 15.5 9.2 13.8M9.2 15.5 7.5 13.8" />
          <path {...strokeProps} d="M15.4 14.4h.1M17.6 15.8h.1" />
          <path {...strokeProps} d="M6.6 10.4h10.8c2 0 3.6 1.6 3.6 3.6v1.4c0 1.5-1.2 2.7-2.7 2.7-.8 0-1.5-.3-2-.9l-1.1-1.3H8.8l-1.1 1.3c-.5.6-1.2.9-2 .9-1.5 0-2.7-1.2-2.7-2.7V14c0-2 1.6-3.6 3.6-3.6Z" />
        </>
      );
    case 'graduation':
      return (
        <>
          <path {...strokeProps} d="m3 9 9-4 9 4-9 4-9-4Z" />
          <path {...strokeProps} d="M7 11.2v4.1c1.6 1.2 3.2 1.8 5 1.8s3.4-.6 5-1.8v-4.1" />
          <path {...strokeProps} d="M19 10.2v5.2" />
        </>
      );
    case 'cursor':
      return (
        <>
          <path {...strokeProps} d="M5 4.5 18.5 12l-5.3 1.6-2 5.1L5 4.5Z" />
          <path {...strokeProps} d="m13.3 13.6 4.1 4.1" />
        </>
      );
    case 'spark':
      return (
        <>
          <path {...strokeProps} d="M12 3.8 14 9l5.2 2-5.2 2-2 5.2-2-5.2-5.2-2 5.2-2 2-5.2Z" />
          <path {...strokeProps} d="M18.5 3.5v3M17 5h3" />
        </>
      );
    case 'wave':
      return (
        <>
          <path {...strokeProps} d="M4 12c1.2-2.2 2.4-2.2 3.6 0s2.4 2.2 3.6 0 2.4-2.2 3.6 0 2.4 2.2 3.6 0" />
          <path {...strokeProps} d="M4 16c1.2-1.8 2.4-1.8 3.6 0s2.4 1.8 3.6 0 2.4-1.8 3.6 0 2.4 1.8 3.6 0" />
          <path {...strokeProps} d="M4 8c1.2-1.8 2.4-1.8 3.6 0s2.4 1.8 3.6 0 2.4-1.8 3.6 0 2.4 1.8 3.6 0" />
        </>
      );
    case 'leaf':
      return (
        <>
          <path {...strokeProps} d="M19 4c-6.8.2-11.4 3.7-12 9.4-.3 3 1.7 5.1 4.5 5.1 5.7 0 7.5-6.6 7.5-14.5Z" />
          <path {...strokeProps} d="M7.8 16.4c2.2-3.3 5.1-5.5 8.8-6.5" />
        </>
      );
    case 'checklist':
      return (
        <>
          <path {...strokeProps} d="M8.5 7.5h9" />
          <path {...strokeProps} d="M8.5 12h9" />
          <path {...strokeProps} d="M8.5 16.5h9" />
          <path {...strokeProps} d="m4.5 7.5.8.8 1.4-1.6" />
          <path {...strokeProps} d="m4.5 12 .8.8 1.4-1.6" />
          <path {...strokeProps} d="m4.5 16.5.8.8 1.4-1.6" />
        </>
      );
    case 'wallet':
      return (
        <>
          <path {...strokeProps} d="M4 7.2h14.2c1 0 1.8.8 1.8 1.8v8c0 1-.8 1.8-1.8 1.8H5.8C4.8 18.8 4 18 4 17V7.2Z" />
          <path {...strokeProps} d="M4 7.2 15.8 5c1.2-.2 2.2.7 2.2 1.8v.4" />
          <path {...strokeProps} d="M16 13h4" />
          <path {...strokeProps} d="M16.8 13h.1" />
        </>
      );
    case 'heart':
      return <path {...strokeProps} d="M12 19.2S4.5 14.7 4.5 9.1c0-2.2 1.7-3.8 3.7-3.8 1.4 0 2.7.8 3.3 2 .6-1.2 1.9-2 3.3-2 2 0 3.7 1.6 3.7 3.8 0 5.6-7.5 10.1-7.5 10.1Z" />;
    case 'flame':
      return (
        <>
          <path {...strokeProps} d="M12 21c3.2 0 5.8-2.3 5.8-5.7 0-2.2-1.1-4-3.2-5.7.1 1.6-.5 2.6-1.5 3.2.1-3.1-1.5-5.4-4.4-7.8.4 4.2-2.5 5.9-2.5 9.9C6.2 18.6 8.8 21 12 21Z" />
          <path {...strokeProps} d="M10.2 18.7c-.5-1.8.3-3.1 1.8-4.4 1.4 1.4 2.1 2.7 1.8 4.4" />
        </>
      );
    case 'star':
      return <path {...strokeProps} d="m12 4.2 2.1 4.4 4.8.7-3.5 3.4.9 4.8L12 15.2l-4.3 2.3.9-4.8-3.5-3.4 4.8-.7L12 4.2Z" />;
    case 'pen':
      return (
        <>
          <path {...strokeProps} d="m15.8 4.8 3.4 3.4-9.7 9.7-4.2 1 1-4.2 9.5-9.9Z" />
          <path {...strokeProps} d="m13.8 6.8 3.4 3.4" />
          <path {...strokeProps} d="M5.3 18.9 9 15.2" />
        </>
      );
    case 'tap':
      return (
        <>
          <path {...strokeProps} d="M9 10.2V5.7a2 2 0 1 1 4 0v6.8" />
          <path {...strokeProps} d="M13 11.2v-1a1.8 1.8 0 1 1 3.6 0v2" />
          <path {...strokeProps} d="M16.6 12v-.7a1.7 1.7 0 1 1 3.4 0v3.1c0 3.7-2.6 6.6-6.6 6.6h-1.1c-2 0-3.7-.8-5-2.3L4.7 15.6a1.9 1.9 0 0 1 2.8-2.6L9 14.4" />
        </>
      );
  }
}
