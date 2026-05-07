import { useEffect, useState } from "react";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export function GitHubCalendar() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/varora02")
      .then((res) => res.json())
      .then((res) => {
        const yearData = res.contributions.filter((d: ContributionDay) => d.date.startsWith(String(currentYear)));

        const firstDate = new Date(`${currentYear}-01-01`);
        const paddingCount = firstDate.getDay();
        const paddedData = [
          ...Array(paddingCount).fill({ date: "pad", count: 0, level: -1 }),
          ...yearData
        ];

        setData(paddedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch GitHub contributions:", err);
        setLoading(false);
      });
  }, [currentYear]);

  const getColor = (level: number) => {
    if (level === -1) return "transparent";
    switch (level) {
      case 1: return "#9be9a8";
      case 2: return "#40c463";
      case 3: return "#30a14e";
      case 4: return "#216e39";
      default: return "#ebedf0";
    }
  };

  if (loading) {
    return (
      <div className="flex h-32 w-full animate-pulse items-center justify-center rounded-xl bg-[var(--surface-soft)]">
        <p className="font-[Inter] text-xs text-[var(--muted)]">Fetching contribution data...</p>
      </div>
    );
  }

  if (data.length === 0) return null;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-black/6 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-[Instrument_Serif] text-xl text-[#000]">GitHub Contributions {currentYear}</h3>
        <div className="flex items-center gap-1.5 font-[Inter] text-[10px] text-[var(--muted)]">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div key={l} className="h-2 w-2 rounded-sm" style={{ backgroundColor: getColor(l) }} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-[700px] flex-col">
          <div
            className="grid h-28 gap-[3px]"
            style={{
              gridTemplateRows: "repeat(7, 1fr)",
              gridAutoFlow: "column",
              gridAutoColumns: "minmax(10px, 1fr)"
            }}
          >
            {data.map((day, i) => (
              <div
                key={day.date === "pad" ? `pad-${i}` : day.date}
                className={`group relative h-2.5 w-2.5 rounded-[2px] ${day.level === -1 ? "" : "hover:ring-2 hover:ring-black/10 transition-all"}`}
                style={{ backgroundColor: getColor(day.level) }}
              >
                {day.level !== -1 && (
                  <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 scale-75 whitespace-nowrap rounded bg-black px-2.5 py-1.5 font-[Inter] text-[10px] text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                    {day.count} contributions on {day.date}
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-[4px] border-transparent border-t-black" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between font-[Inter] text-[10px] text-[var(--muted)] uppercase tracking-wider">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
      </div>
    </div>
  );
}
