import { useState } from "react";
import type { City } from "../data/morocco";

interface CityImageProps {
  city: City;
  className?: string;
  eager?: boolean;
}

// Shows the city photo from public/images/cities. If the file is missing, a soft gradient
// is shown instead of a broken image.
export default function CityImage({ city, className = "", eager = false }: CityImageProps) {
  const [failedId, setFailedId] = useState<string | null>(null);

  if (failedId === city.id) {
    return (
      <div
        role="img"
        aria-label={city.name}
        className={`bg-gradient-to-br from-amber-200 via-orange-200 to-red-200 ${className}`}
      />
    );
  }

  return (
    <img
      src={city.image}
      alt={city.name}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailedId(city.id)}
      className={className}
    />
  );
}
