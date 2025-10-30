import { useState } from "react";
import Pagination from "../../components/Pagination";
import Chart from "react-apexcharts";
import { drugTypes, type Application } from "../../general.types";
import type { ApexOptions } from "apexcharts";

const applications: Application[][] = [
  [
    {
      id: 1,
      photo: "photo1.jpg",
      description: "Найден подозрительный пакет у подъезда №5.",
      datetime: "2025-10-30 12:45",
      verified: "В ожидании",
      drugType: "Cannabis",
    },
    {
      id: 2,
      photo: "photo2.jpg",
      description: "Брошенный шприц на детской площадке.",
      datetime: "2025-10-30 13:20",
      verified: "Подтверждено",
      drugType: "Opioids",
    },
    {
      id: 3,
      photo: "photo3.jpg",
      description: "Неизвестное вещество найдено в парке.",
      datetime: "2025-10-29 16:10",
      verified: "Отклонено",
      drugType: "Methamphetamine",
    },
    {
      id: 4,
      photo: "photo4.jpg",
      description: "Запах химии в районе старого завода.",
      datetime: "2025-10-29 20:30",
      verified: "В ожидании",
      drugType: "Synthetic drugs",
    },
    {
      id: 5,
      photo: "photo5.jpg",
      description: "Подозрительный порошок в пакете.",
      datetime: "2025-10-28 18:05",
      verified: "Подтверждено",
      drugType: "Cocaine",
    },
  ],
  [
    {
      id: 6,
      photo: "photo6.jpg",
      description: "Шприц в подъезде 7 дома.",
      datetime: "2025-10-27 09:40",
      verified: "Подтверждено",
      drugType: "Opioids",
    },
    {
      id: 7,
      photo: "photo7.jpg",
      description: "Пакет с таблетками у школы №3.",
      datetime: "2025-10-26 15:15",
      verified: "В ожидании",
      drugType: "Ecstasy",
    },
    {
      id: 8,
      photo: "photo8.jpg",
      description: "Порошок в пластиковом контейнере.",
      datetime: "2025-10-25 11:22",
      verified: "Отклонено",
      drugType: "Cocaine",
    },
    {
      id: 9,
      photo: "photo9.jpg",
      description: "Сильный запах в подвале.",
      datetime: "2025-10-25 22:05",
      verified: "Подтверждено",
      drugType: "Methamphetamine",
    },
    {
      id: 10,
      photo: "photo10.jpg",
      description: "Следы приготовления раствора.",
      datetime: "2025-10-24 17:45",
      verified: "В ожидании",
      drugType: "Heroin",
    },
  ],
  [
    {
      id: 11,
      photo: "photo11.jpg",
      description: "Подозрительные капсулы у остановки.",
      datetime: "2025-10-23 13:50",
      verified: "Подтверждено",
      drugType: "LSD",
    },
    {
      id: 12,
      photo: "photo12.jpg",
      description: "Запах ацетона в гаражах.",
      datetime: "2025-10-23 19:30",
      verified: "Отклонено",
      drugType: "Synthetic drugs",
    },
    {
      id: 13,
      photo: "photo13.jpg",
      description: "Молодые люди передают свёртки.",
      datetime: "2025-10-22 22:40",
      verified: "В ожидании",
      drugType: "Unknown",
    },
    {
      id: 14,
      photo: "photo14.jpg",
      description: "Нашли упаковку с порошком на рынке.",
      datetime: "2025-10-22 15:05",
      verified: "Подтверждено",
      drugType: "Cocaine",
    },
    {
      id: 15,
      photo: "photo15.jpg",
      description: "Кто-то оставил сумку с таблетками.",
      datetime: "2025-10-21 09:25",
      verified: "Подтверждено",
      drugType: "Ecstasy",
    },
  ],
];

export default function DashboardPage() {

    
    const [currentPage, setCurrentPage] = useState<number>(1);

    // === Donut chart ===
    const options1: ApexOptions = {
        chart: { toolbar: { show: false } },
        colors: [drugTypes[0].color],
        labels: [drugTypes[0].name],
        dataLabels: { enabled: false },
        legend: { show: false },
        plotOptions: {
        radialBar: {
        hollow: {
            size: "60%", // размер внутреннего отверстия
        }, 
        dataLabels: {
            name: {
            fontSize: "11px",  // уменьшает текст сверху (название)
            offsetY: 20,
            fontWeight: 500,
            color: "rgba(0,0,0,0.7)"
            },
            value: {
            fontSize: "30px",  // уменьшает цифры/проценты
            offsetY: -15,
            fontWeight: 500,
            color: drugTypes[0].color
            },
        },
        },
  },
    };

    const options2: ApexOptions = {
        chart: { toolbar: { show: false } },
        colors: [drugTypes[1].color],
        labels: [drugTypes[1].name],
        dataLabels: { enabled: false },
        legend: { show: false },
        plotOptions: {
        radialBar: {
        hollow: {
            size: "60%", // размер внутреннего отверстия
        }, 
        dataLabels: {
            name: {
            fontSize: "11px",  // уменьшает текст сверху (название)
            offsetY: 20,
            fontWeight: 500,
            color: "rgba(0,0,0,0.7)"
            },
            value: {
            fontSize: "30px",  // уменьшает цифры/проценты
            offsetY: -15,
            fontWeight: 500,
            color: drugTypes[1].color
            },
        },
        },
  },
    };

    const options3: ApexOptions = {
        chart: { toolbar: { show: false } },
        colors: [drugTypes[2].color],
        labels: [drugTypes[2].name],
        dataLabels: { enabled: false },
        legend: { show: false },
        plotOptions: {
        radialBar: {
        hollow: {
            size: "60%", // размер внутреннего отверстия
        }, 
        dataLabels: {
            name: {
            fontSize: "11px",  // уменьшает текст сверху (название)
            offsetY: 20,
            fontWeight: 500,
            color: "rgba(0,0,0,0.7)"
            },
            value: {
            fontSize: "30px",  // уменьшает цифры/проценты
            offsetY: -15,
            fontWeight: 500,
            color: drugTypes[2].color
            },
        },
        },
  },
    };

    return (
        <div className="">
            <h1 className="text-xl">Dashboard</h1>

            <div className="flex items-center justify-center">

                <Chart
                        options={options1}
                        series={[50]}
                        type="radialBar"
                        width="100%"
                        height="220"
                    />

                    <Chart
                        options={options2}
                        series={[70]}
                        type="radialBar"
                        width="100%"
                        height="220"
                    />

                    <Chart
                        options={options3}
                        series={[30]}
                        type="radialBar"
                        width="100%"
                        height="220"
                    />
                

            </div>

            <Pagination
                totalPages={5}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
            <table className="bg-white w-full">
            <thead>
              <tr>
                <th className="p-2 text-xs bg-[#5d7388] text-white font-normal rounded-tl-2xl">
                  ID
                </th>
                <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">
                  Client ID
                </th>
                <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">
                  Пользователь
                </th>
                <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">
                  Фото
                </th>
                <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">
                  Описание
                </th>
                <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">
                  Адрес
                </th>
                <th className="p-2 text-xs bg-[#5d7388] text-white font-normal">
                  Дата/Время
                </th>
                <th className="p-2 text-xs bg-[#5d7388] text-white font-normal rounded-tr-2xl">
                  Подтверждение
                </th>
              </tr>
            </thead>
            <tbody>
              {applications[currentPage - 1].map((item) => (
                <tr key={item.id}>
                  <td
                    className={`${item.id % 2 == 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}
                  >
                    {item.id}
                  </td>
                  <td
                    className={`${item.id % 2 == 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}
                  >
                    
                  </td>
                  <td
                    className={`${item.id % 2 == 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}
                  >
                    
                  </td>
                  <td
                    className={`${item.id % 2 == 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}
                  >
                    {item.photo}
                  </td>
                  <td
                    className={`${item.id % 2 == 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}
                  >
                    {item.description}
                  </td>
                  <td
                    className={`${item.id % 2 == 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}
                  >
                    
                  </td>
                  <td
                    className={`${item.id % 2 == 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs`}
                  >
                    {item.datetime}
                  </td>
                  <td className={`${item.id % 2 == 0 ? "bg-[#5d7388]/20" : "bg-gray-100"} p-2 text-xs ${item.verified === "Подтверждено" ? "text-green-600" : item.verified === "Отклонено" ? "text-red-600" : "text-yellow-600"}`}>
                    {item.verified}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );

}