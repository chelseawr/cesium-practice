import { useEffect } from "react";
import { useCesium } from "resium";
import { Material, Color } from "cesium";

interface TerrainOverlayOptions {
  showContours: boolean;
  contourSpacing: number;
  enableLighting: boolean;
  exaggeration: number;
}

/**
 * Imperatively applies terrain overlay settings to the existing globe.
 * Avoids using <Globe> component which can interfere with terrain rendering.
 */
export function useTerrainOverlays({
  showContours,
  contourSpacing,
  enableLighting,
  exaggeration,
}: TerrainOverlayOptions) {
  const { viewer } = useCesium();

  // Contour lines
  useEffect(() => {
    if (!viewer) return;
    const globe = viewer.scene.globe;

    if (showContours) {
      globe.material = Material.fromType("ElevationContour", {
        color: new Color(1.0, 1.0, 1.0, 0.5),
        spacing: contourSpacing,
        width: 1.5,
      });
    } else {
      globe.material = undefined as unknown as Material;
    }
  }, [viewer, showContours, contourSpacing]);

  // Hillshade lighting
  useEffect(() => {
    if (!viewer) return;
    viewer.scene.globe.enableLighting = enableLighting;
    viewer.scene.globe.lambertDiffuseMultiplier = 0.9;
  }, [viewer, enableLighting]);

  // Terrain exaggeration
  useEffect(() => {
    if (!viewer) return;
    viewer.scene.verticalExaggeration = exaggeration;
    viewer.scene.verticalExaggerationRelativeHeight = 0;
  }, [viewer, exaggeration]);

  // Depth test so entities sit on terrain properly
  useEffect(() => {
    if (!viewer) return;
    viewer.scene.globe.depthTestAgainstTerrain = true;
  }, [viewer]);
}
