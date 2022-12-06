const FileType = {
  FILE: 'file',
  IMAGE: 'image',
} as const;

export type FileType = typeof FileType[keyof typeof FileType];
