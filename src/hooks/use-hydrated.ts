import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";

export function useHydrated() {
  const hydrated = useUserStore((s) => s.hydrated);
  const setHydrated = useUserStore((s) => s.setHydrated);

  useEffect(() => {
    const finish = () => setHydrated(true);
    if (useUserStore.persist.hasHydrated()) finish();
    const unsub = useUserStore.persist.onFinishHydration(finish);
    const t = window.setTimeout(finish, 400);
    return () => {
      unsub();
      window.clearTimeout(t);
    };
  }, [setHydrated]);

  return hydrated;
}
