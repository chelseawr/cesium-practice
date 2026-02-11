import { Entity, PolygonGraphics } from "resium";
import {
  Cartesian3,
  Color,
  ColorMaterialProperty,
  ConstantProperty,
  HeightReference,
} from "cesium";

/**
 * A demo "proposed building" near the National Mall in Washington DC.
 * Uses an extruded polygon entity — no Ion upload required.
 *
 * Based on the Cesium tutorial pattern:
 * https://cesium.com/learn/cesiumjs-learn/cesiumjs-interactive-building/
 */
export default function DemoBuilding() {
  // Building footprint corners (lon, lat) — a rectangle near the Mall
  const footprint = Cartesian3.fromDegreesArray([
    -77.0365, 38.8975,
    -77.0355, 38.8975,
    -77.0355, 38.8968,
    -77.0365, 38.8968,
  ]);

  return (
    <Entity
      name="Proposed Building"
      description="A demo proposed building near the National Mall."
    >
      <PolygonGraphics
        hierarchy={footprint}
        material={new ColorMaterialProperty(
          Color.fromCssColorString("#3388ff").withAlpha(0.6)
        )}
        extrudedHeight={new ConstantProperty(80)}
        height={new ConstantProperty(0)}
        heightReference={HeightReference.CLAMP_TO_GROUND}
        outline
        outlineColor={Color.WHITE}
      />
    </Entity>
  );
}
