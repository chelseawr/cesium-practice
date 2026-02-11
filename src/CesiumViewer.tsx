import { Ion, createWorldTerrainAsync } from "cesium";
import { Viewer, CameraFlyTo, Cesium3DTileset } from "resium";
import { Cartesian3, Math as CesiumMath, IonResource } from "cesium";
import { useEffect, useState } from "react";

// Set the Ion access token globally
Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

export default function CesiumViewer() {
  const [terrainProvider, setTerrainProvider] = useState<Awaited<
    ReturnType<typeof createWorldTerrainAsync>
  > | null>(null);

  useEffect(() => {
    createWorldTerrainAsync().then(setTerrainProvider);
  }, []);

  if (!terrainProvider) {
    return <div className="loading">Loading terrain...</div>;
  }

  return (
    <Viewer
      full
      terrainProvider={terrainProvider}
      timeline={false}
      animation={false}
      homeButton={true}
      sceneModePicker={true}
      baseLayerPicker={true}
      navigationHelpButton={false}
      geocoder={true}
    >
      {/* OSM Buildings — Ion asset 96188 */}
      <Cesium3DTileset url={IonResource.fromAssetId(96188)} />

      {/* Fly to Washington DC on load */}
      <CameraFlyTo
        destination={Cartesian3.fromDegrees(-77.0369, 38.8977, 2500)}
        orientation={{
          heading: CesiumMath.toRadians(10),
          pitch: CesiumMath.toRadians(-25),
          roll: 0,
        }}
        duration={0}
      />
    </Viewer>
  );
}
