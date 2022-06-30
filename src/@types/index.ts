export type ObjectStyle = Record<string, React.CSSProperties>;

export type GenericEnumObjectType<T> = { [k in keyof T]: any };
