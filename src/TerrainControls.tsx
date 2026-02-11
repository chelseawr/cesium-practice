import "./TerrainControls.css";

interface TerrainControlsProps {
  showContours: boolean;
  onToggleContours: () => void;
  contourSpacing: number;
  onContourSpacingChange: (value: number) => void;
  enableLighting: boolean;
  onToggleLighting: () => void;
  exaggeration: number;
  onExaggerationChange: (value: number) => void;
}

export default function TerrainControls({
  showContours,
  onToggleContours,
  contourSpacing,
  onContourSpacingChange,
  enableLighting,
  onToggleLighting,
  exaggeration,
  onExaggerationChange,
}: TerrainControlsProps) {
  return (
    <div className="terrain-controls">
      <h3>Terrain</h3>

      <label className="toggle-row">
        <input
          type="checkbox"
          checked={showContours}
          onChange={onToggleContours}
        />
        Contour lines
      </label>

      {showContours && (
        <div className="slider-row">
          Spacing
          <input
            type="range"
            min={25}
            max={500}
            step={25}
            value={contourSpacing}
            onChange={(e) => onContourSpacingChange(Number(e.target.value))}
          />
          <span className="value">{contourSpacing}m</span>
        </div>
      )}

      <label className="toggle-row">
        <input
          type="checkbox"
          checked={enableLighting}
          onChange={onToggleLighting}
        />
        Hillshade
      </label>

      <div className="slider-row">
        Exaggeration
        <input
          type="range"
          min={1}
          max={5}
          step={0.25}
          value={exaggeration}
          onChange={(e) => onExaggerationChange(Number(e.target.value))}
        />
        <span className="value">{exaggeration}x</span>
      </div>
    </div>
  );
}
