export const TRACKS = {
  air_quality: {
    label: "Air Quality & Hazard Sensing",
    color: "var(--track-air)",
    short: "Air Quality",
  },
  drowning_prevention: {
    label: "Drowning Prevention & Water Safety",
    color: "var(--track-water)",
    short: "Water Safety",
  },
  health_monitoring: {
    label: "Continuous Health Monitoring",
    color: "var(--track-health)",
    short: "Health Monitoring",
  },
};

export const TRACK_LIST = Object.entries(TRACKS).map(([value, meta]) => ({ value, ...meta }));
