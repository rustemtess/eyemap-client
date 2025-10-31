import { useMemo, useState } from "react";
import KazakhstanRegionMap from "../../components/map";
import { drugTypes, regions, type Application } from "../../general.types";
import { useLocation } from "react-router-dom";

type DateFilter = "today" | "week" | "month" | "all";

interface IMapPage {
  applications: Application[]
}

export default function MapPage({ applications }: IMapPage) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialLng = parseFloat(params.get("lng") || "82.6");
  const initialLat = parseFloat(params.get("lat") || "49.5");

  const [selectedRegion, setSelectedRegion] = useState<string>("East Kazakhstan");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [selectedDrug, setSelectedDrug] = useState<string | "all">("all");

  // новые состояния для диапазона дат
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // фильтрация по дате и типу наркотика
  const filteredApplications = useMemo(() => {
    const now = new Date();
    return applications.filter((app) => {
      const appDate = new Date(app.datetime);

      // фильтр по дате
      let dateOk = true;
      if (dateFilter === "today") {
        dateOk = appDate.toDateString() === now.toDateString();
      } else if (dateFilter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        dateOk = appDate >= weekAgo && appDate <= now;
      } else if (dateFilter === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        dateOk = appDate >= monthAgo && appDate <= now;
      } else if (dateFilter === "all" && (dateFrom || dateTo)) {
        const from = dateFrom ? new Date(dateFrom) : new Date("1970-01-01");
        const to = dateTo ? new Date(dateTo) : now;
        dateOk = appDate >= from && appDate <= to;
      }

      // фильтр по типу наркотика
      const drugOk = selectedDrug === "all" || app.drugType === selectedDrug;

      return dateOk && drugOk;
    });
  }, [applications, dateFilter, selectedDrug, dateFrom, dateTo]);

  return (
    <div className="flex flex-col gap-2 h-screen p-2">
      <h1 className="text-xl font-bold">Map</h1>

      {/* Фильтры */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <p className="text-gray-700 text-sm shrink-0">Выберите регион:</p>
          {regions.map((region) => (
            <button
              key={region}
              className={`p-1 px-2 rounded-xl text-sm ${
                selectedRegion === region
                  ? "bg-[#5d7388] text-white"
                  : "bg-gray-100 text-black/70"
              }`}
              onClick={() => setSelectedRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-gray-700 text-sm shrink-0">Фильтр по дате:</p>
          {["today", "week", "month", "all"].map((d) => (
            <button
              key={d}
              className={`p-1 px-2 rounded-xl text-sm ${
                dateFilter === d
                  ? "bg-[#5d7388] text-white"
                  : "bg-gray-100 text-black/70"
              }`}
              onClick={() => setDateFilter(d as DateFilter)}
            >
              {d === "today"
                ? "Сегодня"
                : d === "week"
                ? "Неделя"
                : d === "month"
                ? "Месяц"
                : "Все"}
            </button>
          ))}

          {/* Диапазон дат, показываем только если "Все" */}
          {dateFilter === "all" && (
            <div className="flex items-center gap-2 ml-4">
              <label className="text-gray-700 text-sm">От:</label>
              <input
                type="date"
                className="text-sm outline-none bg-gray-100 p-1 rounded"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
              <label className="text-gray-700 text-sm">До:</label>
              <input
                type="date"
                className="text-sm outline-none bg-gray-100 p-1 rounded"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          )}

          <div className="ml-4">
            <label className="text-gray-700 text-sm mr-2">Тип:</label>
            <select
              className="text-sm outline-none bg-gray-100 p-2 rounded my-2"
              value={selectedDrug}
              onChange={(e) => setSelectedDrug(e.target.value)}
            >
              <option value="all">Все</option>
              {drugTypes.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Карта */}
      <div className="flex-1 mt-2">
        <KazakhstanRegionMap
          regionName={selectedRegion}
          applications={filteredApplications}
          initialCoords={[initialLng, initialLat]}
          isAdmin={true}
        />
      </div>
    </div>
  );
}


