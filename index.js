import { registerInfoSection } from './components/info-section/info-section.js';
import { registerTimelineSection } from './components/timeline/timeline-section.js';

const app = () => {
  registerInfoSection();
  registerTimelineSection();
}

document.addEventListener('DOMContentLoaded', app);
