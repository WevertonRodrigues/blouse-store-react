export * from "./normalizeRequestResponseMessages";
export * from "./enumObjects";
export * from "./parse";
export * from "./random";
export * from "./strings";

export function handlePreventDefault(
  event: React.MouseEvent<HTMLButtonElement>
) {
  event.preventDefault();
}
