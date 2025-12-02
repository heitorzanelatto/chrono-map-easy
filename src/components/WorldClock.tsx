import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

interface TimeZone {
  city: string;
  country: string;
  timezone: string;
  flag: string;
}

const timezones: TimeZone[] = [
  { city: "São Paulo", country: "Brasil", timezone: "America/Sao_Paulo", flag: "🇧🇷" },
  { city: "Nova York", country: "EUA", timezone: "America/New_York", flag: "🇺🇸" },
  { city: "Londres", country: "Reino Unido", timezone: "Europe/London", flag: "🇬🇧" },
  { city: "Paris", country: "França", timezone: "Europe/Paris", flag: "🇫🇷" },
  { city: "Tóquio", country: "Japão", timezone: "Asia/Tokyo", flag: "🇯🇵" },
  { city: "Dubai", country: "Emirados", timezone: "Asia/Dubai", flag: "🇦🇪" },
  { city: "Sydney", country: "Austrália", timezone: "Australia/Sydney", flag: "🇦🇺" },
  { city: "Mumbai", country: "Índia", timezone: "Asia/Kolkata", flag: "🇮🇳" },
];

const WorldClock = () => {
  const [times, setTimes] = useState<Map<string, Date>>(new Map());

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = new Map<string, Date>();
      timezones.forEach((tz) => {
        newTimes.set(tz.timezone, new Date());
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timezone: string) => {
    const date = times.get(timezone) || new Date();
    return date.toLocaleTimeString("pt-BR", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (timezone: string) => {
    const date = times.get(timezone) || new Date();
    return date.toLocaleDateString("pt-BR", {
      timeZone: timezone,
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const isDaytime = (timezone: string) => {
    const date = times.get(timezone) || new Date();
    const hour = parseInt(
      date.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "numeric",
        hour12: false,
      })
    );
    return hour >= 6 && hour < 18;
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
          Horário Mundial
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timezones.map((tz) => (
            <div
              key={tz.timezone}
              className="glass-card p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{tz.flag}</span>
                  <div>
                    <p className="font-semibold text-foreground">{tz.city}</p>
                    <p className="text-xs text-muted-foreground">{tz.country}</p>
                  </div>
                </div>
                {isDaytime(tz.timezone) ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-400" />
                )}
              </div>
              
              <p className="time-display text-3xl font-mono font-bold text-primary">
                {formatTime(tz.timezone)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {formatDate(tz.timezone)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorldClock;
