import { useState } from "react";

export default function useRequest() {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    request: (options: () => Promise<any>) => request(options, setLoading),
  };
}

async function request(
  fn: () => Promise<any>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setLoading(true);

  await fn();

  setLoading(false);
}
