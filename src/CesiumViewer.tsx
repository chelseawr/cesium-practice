import { Ion, createWorldTerrainAsync } from "cesium";
import { Viewer, CameraFlyTo, Cesium3DTileset } from "resium";
import { Cartesian3, Math as CesiumMath, IonResource } from "cesium";
import { useEffect, useState } from "react";
import { useTerrainOverlays } from "./useTerrainOverlays";
import TerrainControls from "./TerrainControls";
import DemoBuilding from "./DemoBuilding";

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

/** Inner component — must be a child of <Viewer> so useCesium() works */
function ViewerContents() {
  const [showContours, setShowContours] = useState(true);
  const [contourSpacing, setContourSpacing] = useState(150);
  const [enableLighting, setEnableLighting] = useState(true);
  const [exaggeration, setExaggeration] = useState(1.5);

  useTerrainOverlays({
    showContours,
    contourSpacing,
    enableLighting,
    exaggeration,
  });

  return (
    <>
      {/* 3D OSM Buildings — Ion asset 96188 */}
      <Cesium3DTileset url={IonResource.fromAssetId(96188)} />

      {/* Demo proposed building near the National Mall */}
      <DemoBuilding />

      {/* Fly to the demo building on load */}
      <CameraFlyTo
        destination={Cartesian3.fromDegrees(-77.036, 38.896, 500)}
        orientation={{
          heading: CesiumMath.toRadians(350),
          pitch: CesiumMath.toRadians(-25),
          roll: 0,
        }}
        duration={0}
      />

      <TerrainControls
        showContours={showContours}
        onToggleContours={() => setShowContours((v) => !v)}
        contourSpacing={contourSpacing}
        onContourSpacingChange={setContourSpacing}
        enableLighting={enableLighting}
        onToggleLighting={() => setEnableLighting((v) => !v)}
        exaggeration={exaggeration}
        onExaggerationChange={setExaggeration}
      />
    </>
  );
}

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
      <ViewerContents />
    </Viewer>
  );
}
