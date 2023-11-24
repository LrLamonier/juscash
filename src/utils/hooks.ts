import { useState } from "react";

export function useMediaQuery(query: string) {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState();
}
