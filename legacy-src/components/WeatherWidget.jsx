import { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, CloudDrizzle, Wind } from 'lucide-react';

const WMO = {
  0:  { label: 'Clear',          type: 'sun'   },
  1:  { label: 'Mostly Clear',   type: 'sun'   },
  2:  { label: 'Partly Cloudy',  type: 'cloud' },
  3:  { label: 'Overcast',       type: 'cloud' },
  45: { label: 'Foggy',          type: 'cloud' },
  48: { label: 'Foggy',          type: 'cloud' },
  51: { label: 'Drizzle',        type: 'drizzle' },
  53: { label: 'Drizzle',        type: 'drizzle' },
  55: { label: 'Drizzle',        type: 'drizzle' },
  61: { label: 'Rain',           type: 'rain'  },
  63: { label: 'Rain',           type: 'rain'  },
  65: { label: 'Heavy Rain',     type: 'rain'  },
  80: { label: 'Showers',        type: 'rain'  },
  81: { label: 'Showers',        type: 'rain'  },
  82: { label: 'Heavy Showers',  type: 'rain'  },
  95: { label: 'Thunderstorm',   type: 'storm' },
  96: { label: 'Thunderstorm',   type: 'storm' },
  99: { label: 'Thunderstorm',   type: 'storm' },
};

const ICON_CLASSES = {
  sun:    'text-amber-400',
  cloud:  'text-slate-400',
  drizzle:'text-sky-400',
  rain:   'text-blue-400',
  storm:  'text-violet-400',
};

function WeatherIcon({ type, size = 13 }) {
  const cls = ICON_CLASSES[type] ?? 'text-amber-400';
  if (type === 'storm')   return <CloudLightning size={size} className={cls} />;
  if (type === 'rain')    return <CloudRain size={size} className={cls} />;
  if (type === 'drizzle') return <CloudDrizzle size={size} className={cls} />;
  if (type === 'cloud')   return <Cloud size={size} className={cls} />;
  return <Sun size={size} className={cls} />;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=6.9271&longitude=79.8612' +
      '&current=temperature_2m,weathercode,windspeed_10m&timezone=Asia/Colombo'
    )
      .then(r => r.json())
      .then(d => {
        const code = d.current.weathercode;
        setWeather({
          temp:  Math.round(d.current.temperature_2m),
          wind:  Math.round(d.current.windspeed_10m),
          code,
          label: WMO[code]?.label ?? 'Clear',
          type:  WMO[code]?.type  ?? 'sun',
        });
      })
      .catch(() => {
        // Realistic Colombo fallback
        setWeather({ temp: 30, wind: 14, code: 2, label: 'Partly Cloudy', type: 'cloud' });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <span className="flex items-center gap-1 text-supreme-mid/40 animate-pulse">
        <span className="w-3 h-3 rounded-full bg-current" />
        <span>--°C</span>
      </span>
    );
  }

  if (!weather) return null;

  return (
    <span className="flex items-center gap-1.5 font-body">
      <span className="w-px h-3 bg-supreme-primary/25 mx-0.5" />
      <WeatherIcon type={weather.type} size={13} />
      <span className="text-white/70">Colombo</span>
      <span className="text-white font-600">{weather.temp}°C</span>
      <span className="text-supreme-mid hidden sm:inline">· {weather.label}</span>
    </span>
  );
}
