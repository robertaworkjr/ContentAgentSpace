export type View = 'welcome' | 'menu' | 'simulator';

export interface SimulationTool {
  id: string;
  title: string;
  description: string;
  status: 'available' | 'coming-soon' | 'locked';
  badge?: string;
}

export const TOOLS: SimulationTool[] = [
  {
    id: 'embers',
    title: '01. Inferno Embers',
    description: 'High-performance thermal dynamics. Features Simplex noise turbulence and procedural ash shapes.',
    status: 'available',
    badge: '30s TRIAL'
  },
  {
    id: 'sakura',
    title: '02. Sakura Flowers',
    description: 'Soft petal dynamics with breeze chaos and depth-of-field flutter. Experience the garden at night.',
    status: 'available',
    badge: '30s TRIAL'
  },
  {
    id: 'rose',
    title: '03. Red Roses',
    description: 'Velvety deep red petals with broader heart-like shapes and organic flutter dynamics.',
    status: 'available',
    badge: '30s TRIAL'
  },
  {
    id: 'inferno',
    title: '06. Inferno Core',
    description: 'Intense fire simulation with additive blending and thermal updraft physics. Experience the heat.',
    status: 'available',
    badge: '30s TRIAL'
  },
  {
    id: 'bokeh',
    title: '04. Cinematic Bokeh',
    description: 'Advanced lens blur simulation with chromatic aberration and depth-of-field drift.',
    status: 'available',
    badge: '30s TRIAL'
  },
  {
    id: 'nexus',
    title: '05. Particle Nexus',
    description: 'Interactive constellation systems with neural-link physics and magnetic attraction.',
    status: 'available',
    badge: '30s TRIAL'
  }
];
