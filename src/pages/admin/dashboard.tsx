import { useMemo, useState } from "react";
import Pagination from "../../components/Pagination";
import Chart from "react-apexcharts";
import { drugTypes, type Application } from "../../general.types";
import type { ApexOptions } from "apexcharts";
import { useNavigate } from "react-router-dom";

interface IDashboardPage {
  applications: Application[]
}

export default function DashboardPage(
  { applications }: IDashboardPage
) {
  const navigate = useNavigate();

  // const goToMap = (coordinates: [number, number]) => {
  //   const [lng, lat] = coordinates;
  //   navigate(`/admin/map?lng=${lng}&lat=${lat}`);
  // };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedDrug, setSelectedDrug] = useState<string>("");

  const itemsPerPage = 6;

  // Фильтрация
  const filteredApplications =
    selectedDrug === "all" || selectedDrug === ""
      ? applications
      : applications.filter((app) => app.drugType === selectedDrug);

  // Пагинация
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  // === 1️⃣ DONUT: распределение по типам ===
  const countsByType = drugTypes.map(
    (drug) => filteredApplications.filter((a) => a.drugType === drug.name).length
  );
  const donutOptions: ApexOptions = {
    chart: { type: "donut", toolbar: { show: false } },
    labels: drugTypes.map((d) => d.name),
    colors: drugTypes.map((d) => d.color),
    legend: { position: "bottom" },
  };

  // === 2️⃣ TOP РАЙОНЫ ===
  // const topDistricts = useMemo(() => {
  //   const acc: Record<string, number> = {};
  //   filteredApplications.forEach((a) => {
  //     acc[a.address] = (acc[a.address] || 0) + 1;
  //   });
  //   return Object.entries(acc)
  //     .sort((a, b) => b[1] - a[1])
  //     .slice(0, 5);
  // }, [filteredApplications]);

  // const topOptions: ApexOptions = {
  //   chart: { type: "bar", toolbar: { show: false } },
  //   plotOptions: { bar: { horizontal: true } },
  //   xaxis: { categories: topDistricts.map(([name]) => name) },
  //   colors: ["#4c9c64"],
  //   title: { text: "Топ районов", align: "center" },
  // };

  // === 3️⃣ HEATMAP: активность по часам ===
  const heatmapData = useMemo(() => {
    const matrix: Record<string, number[]> = {};
    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    days.forEach((d) => (matrix[d] = Array(24).fill(0)));

    filteredApplications.forEach((a) => {
      const [date, time] = a.datetime.split(" ");
      const d = new Date(date);
      const day = days[(d.getDay() + 6) % 7];
      const hour = parseInt(time.split(":")[0]);
      matrix[day][hour] += 1;
    });

    return days.map((d) => ({
      name: d,
      data: matrix[d].map((v, i) => ({ x: `${i}:00`, y: v })),
    }));
  }, [filteredApplications]);

  const heatmapOptions: ApexOptions = {
    chart: { type: "heatmap", toolbar: { show: false } },
    dataLabels: { enabled: false },
    colors: ["#e63946"],
    title: { text: "Плотность по дням и часам", align: "center" },
  };

  const [showDetails, setShowDetails] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<typeof applications[0] | null>(null);

  const ShowDetailsForm = () => {
  const [status, setStatus] = useState(selectedApplication?.verified || "");

  const handleSave = () => {
    if (!selectedApplication) return;

    // Обновляем статус в приложении (можно потом сделать API запрос)
    const index = applications.findIndex((a) => a.id === selectedApplication.id);
    if (index !== -1) {
      applications[index].verified = status;
    }

    setShowDetails(false);
  };

  if (!selectedApplication) return null;

  return (
    <div className="z-10 fixed top-0 left-0 w-full h-full bg-black/30 flex flex-col justify-center items-center py-3">
      <form className="bg-white max-w-[400px] w-full h-fit flex flex-col p-5 gap-2 rounded-xl overflow-y-scroll">
        <h2 className="text-lg font-semibold">Детали репорта #{selectedApplication.id}</h2>
        <img src="https://altainews.kz/ru/uploads/posts/2023-04/49bb5c8b94c4f2a981a71a49bc7e3315.webp" width={"100%"} />
        <p><strong>Client ID:</strong> rustem</p>
        <p><strong>Адрес:</strong> {selectedApplication.address}</p>
        <p><strong>Описание:</strong> {selectedApplication.description}</p>
        <p><strong>Дата/Время:</strong> {selectedApplication.datetime}</p>
        <p><strong>Тип:</strong> {selectedApplication.drugType}</p>
        <p><strong>Статус:</strong></p>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Подтверждено">Подтверждено</option>
          <option value="Отклонено">Отклонено</option>
        </select>

        <div className="flex justify-end gap-2 mt-3">
          <button
            type="button"
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => setShowDetails(false)}
          >
            Отмена
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

  return (
    <div className="p-2">
      <h1 className="text-xl font-semibold mb-3">Dashboard</h1>

      {/* === ГРАФИКИ === */}
      <div className="grid grid-cols-2 gap-4 mb-6 items-center">
        <Chart options={donutOptions} series={countsByType} type="donut" height={200} />
        <Chart options={heatmapOptions} series={heatmapData} type="heatmap" height={280} />
        {/**<Chart options={topOptions} series={[{ name: "Случаи", data: topDistricts.map(([_, val]) => val) }]} type="bar" width={"100%"} height={200} /> **/ }
        
      </div>

      {/* === ФИЛЬТР === */}
      <div>
        <select
          value={selectedDrug}
          onChange={(e) => setSelectedDrug(e.target.value)}
          className="text-sm outline-none bg-gray-100 p-2 rounded my-2"
        >
          <option value="all">Все</option>
          {drugTypes.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* === ТАБЛИЦА === */}
      <table className="bg-white w-full">
        <thead>
          <tr>
            <th className="p-2 text-xs bg-[#5d7388] text-white font-normal rounded-tl-2xl">№</th>
            <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">Вид</th>
            <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">Фото</th>
            <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">Описание</th>
            <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">Адрес</th>
            <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">Дата/Время</th>
            <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">Статус</th>
            <th className="p-2 text-xs bg-[#5d7388] text-white font-normal rounded-tr-2xl">Действие</th>
          </tr>
        </thead>
        <tbody>
          {currentApplications.map((item) => (
            <tr key={item.id}>
              <td className={`${item.id % 2 === 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}>
                {item.id}
              </td>
              <td className={`${item.id % 2 === 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}>
                <div
                  style={{
                    backgroundColor: drugTypes.find((d) => d.name === item.drugType)?.color || "#999",
                  }}
                  className="w-[10px] h-[10px] rounded-full"
                />
              </td>
              <td className={`${item.id % 2 === 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}>
                <img
                  src="https://altainews.kz/ru/uploads/posts/2023-04/49bb5c8b94c4f2a981a71a49bc7e3315.webp"
                  width={50}
                />
              </td>
              <td className={`${item.id % 2 === 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}>
                {item.description}
              </td>
              <td className={`${item.id % 2 === 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}>
                {item.address}
              </td>
              <td className={`${item.id % 2 === 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}>
                {item.datetime}
              </td>
              <td
                className={`${item.id % 2 === 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs ${
                  item.verified === "Подтверждено"
                    ? "text-green-600"
                    : item.verified === "Отклонено"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {item.verified}
              </td>
              <td className={`${item.id % 2 === 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}>
                {/* <button
                  className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                  onClick={() => goToMap(item.coordinates)}
                >
                  Показать
                </button> */}
                <button
                  className="bg-[#5d7388] text-white text-xs p-2 rounded-full px-4"
                  onClick={() => {
    setSelectedApplication(item);
    setShowDetails(true);
  }}
                >
                  Подробнее
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination totalPages={totalPages || 1} currentPage={currentPage} onPageChange={setCurrentPage} />
        { showDetails && <ShowDetailsForm /> }
    </div>
  );
}