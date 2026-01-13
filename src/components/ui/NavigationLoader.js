"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import GlobalLoader from "@/components/ui/GlobalLoader";

export default function NavigationLoader({ minMs = 400 }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger on route change
    setShow(true);

    const t = setTimeout(() => {
      setShow(false);
    }, minMs);

    return () => clearTimeout(t);
  }, [pathname, searchParams, minMs]);

  return show ? <GlobalLoader /> : null;
}
