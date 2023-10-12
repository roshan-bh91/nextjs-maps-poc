import { createCustomEqual, deepEqual } from "fast-equals";
import type { EffectCallback } from "react";
import { useEffect, useRef } from "react";

const isLatLngLiteral = (obj: any): obj is google.maps.LatLngLiteral =>
  obj != null &&
  typeof obj === "object" &&
  Number.isFinite(obj.lat) &&
  Number.isFinite(obj.lng);

const deepCompareEqualsForMaps = createCustomEqual((options) => ({
  areObjectsEqual(a, b) {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    return deepEqual(a, b);
  },
}));

const useDeepCompareMemorize = (value: any) => {
  const ref = useRef();
  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

export const useDeepCompareEffectForMaps = (
  callback: EffectCallback,
  dependencies: Array<any>
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies.map(useDeepCompareMemorize));
};
