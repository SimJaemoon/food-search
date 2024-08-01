'use client';

import Icon from '../atoms/Icon';

export default function IconButtonBack() {
  return (
    <button
      className="flex h-full w-full items-center justify-center"
      onClick={() => history.back()}
    >
      <Icon iconName={'back'} />
    </button>
  );
}
