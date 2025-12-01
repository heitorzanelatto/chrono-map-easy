import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

interface TimeZone {
  city: string;
  country: string;
  timezone: string;
  flag: string;
}

const timeZones: TimeZone[] = [
  { city: "São Paulo", country: "Brasil", timezone: "America/Sao_Paulo", flag: "🇧🇷" },
  { city: "Nova York", country: "EUA", timezone: "America/New_York", flag: "🇺🇸" },
  { city: "Londres", country: "Reino Unido", timezone: "Europe/London", flag: "🇬🇧" },
  { city: "Paris", country: "França", timezone: "Europe/Paris", flag: "🇫🇷" },
  { city: "Tóquio", country: "Japão", timezone: "Asia/Tokyo", flag: "🇯🇵" },
  { city: "Sydney", country: "Austrália", timezone: "Australia/Sydney", flag: "🇦🇺" },
  { city: "Dubai", country: "Emirados", timezone: "Asia/Dubai", flag: "🇦🇪" },
  { city: "Moscou", country: "Rússia", timezone: "Europe/Moscow", flag: "🇷🇺" },
];

const WorldClock = () => {
  const [times, setTimes] = useState<Record<string, Date>>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, Date> = {};
      timeZones.forEach((tz) => {
        newTimes[tz.timezone] = new Date();
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timezone: string) => {
    const date = times[timezone];
    if (!date) return "--:--:--";
    return date.toLocaleTimeString("pt-BR", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (timezone: string) => {
    const date = times[timezone];
    if (!date) return "";
    return date.toLocaleDateString("pt-BR", {
      timeZone: timezone,
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const isDayTime = (timezone: string) => {
    const date = times[timezone];
    if (!date) return true;
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
    <div className="min-h-screen bg-background p-6 md:p-10">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
          Relógio Mundial
        </h1>
        <p className="text-muted-foreground">Horários ao redor do mundo</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {timeZones.map((tz) => (
          <div
            key={tz.timezone}
            className={`glass-card p-5 transition-all duration-300 hover:scale-[1.02] ${
              isDayTime(tz.timezone) ? "glow-primary" : "glow-accent"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{tz.flag}</span>
                <div>
                  <h2 className="font-medium text-foreground">{tz.city}</h2>
                  <p className="text-xs text-muted-foreground">{tz.country}</p>
                </div>
              </div>
              <div
                className={`p-2 rounded-full ${
                  isDayTime(tz.timezone)
                    ? "bg-primary/20 text-primary"
                    : "bg-accent/20 text-accent"
                }`}
              >
                {isDayTime(tz.timezone) ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </div>
            </div>

            <div className="time-display text-3xl md:text-4xl text-foreground mb-1">
              {formatTime(tz.timezone)}
            </div>

            <p className="text-sm text-muted-foreground capitalize">
              {formatDate(tz.timezone)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;
