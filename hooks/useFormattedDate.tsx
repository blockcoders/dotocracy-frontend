import { useEffect, useState } from "react";
import { useWalletContext } from "../providers/WalletProvider";

export default function useFormattedDate(timestamp: number) {
  const [_timestap, setTimestap] = useState("");
  const { getFormattedDate } = useWalletContext();

  useEffect(() => {
    if (timestamp) {
      (async () => {
        try {
          const res = await getFormattedDate(timestamp);
          setTimestap(res);
        } catch (error) {}
      })();
    }
  }, [timestamp]);

  return {
    time: _timestap,
  };
}
