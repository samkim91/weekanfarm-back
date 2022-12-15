export const SnsType = {
  YOUTUBE: '유튜브',
  INSTAGRAM: '인스타그램',
  BLOG: '블로그',
  FACEBOOK: '페이스북',
  URL: '웹주소',
} as const;

export type SnsType = typeof SnsType[keyof typeof SnsType];
