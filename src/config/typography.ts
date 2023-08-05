export const textTypo = {
  normal: '16px',
  medium: '14px',
};

export const inputTypo = {
  fontSize: '14px',
};

export const captionTypo = {
  medium: '12px',
  small: '11px',
};

export const threeDotTextOverflow = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const nThreeDotTextOverflow = (line?: number) => {
  return {
    display: '-webkit-box',
    '-webkit-line-clamp': line ?? 2,
    '-webkit-box-orient': 'vertical',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
};
