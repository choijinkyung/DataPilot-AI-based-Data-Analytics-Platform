// charts/register.ts
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  ChartJS.register(
    LineElement,
    BarElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
  );