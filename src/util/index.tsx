export * from "./normalizeRequestResponseMessages";

export function handleMouseDownPassword(
  event: React.MouseEvent<HTMLButtonElement>
) {
  event.preventDefault();
}

export const randomElement = (array: any[]) =>
  array[Math.floor(Math.random() * array.length)];

export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const sizes = ["P", "M", "G", "GG", "EG", "EGG"];

export const tissue = ["Algodão", "Cetim", "Malha", "Microfibra", "Seda"];
