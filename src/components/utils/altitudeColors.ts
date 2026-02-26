// Get color based on altitude with gradient effect - High contrast colors for visibility
export const getAltitudeColor = (altitude: number): string => {
  if (altitude < 10000) return '#FF00FF'; // Magenta for low altitude
  if (altitude < 20000) return '#FF1493'; // Deep pink
  if (altitude < 30000) return '#00BFFF'; // Deep sky blue
  if (altitude < 35000) return '#1E90FF'; // Dodger blue
  return '#8A2BE2'; // Blue violet for high altitude
};

export const getAltitudeLabel = (altitude: number): string => {
  const altInK = Math.round(altitude / 1000);
  return `${altInK}k ft`;
};