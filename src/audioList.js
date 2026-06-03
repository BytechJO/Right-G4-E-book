const audioModules = import.meta.glob(
  "./assets/**/*.mp3",
  { eager: true }
);

const imageModules = import.meta.glob(
  "./assets/**/*.{png,jpg,jpeg,webp,svg}",
  { eager: true }
);

export const ALL_ASSETS = [
  ...Object.values(audioModules).map((m) => m.default),
  ...Object.values(imageModules).map((m) => m.default),
];