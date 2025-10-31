
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./ProtectedRoute";
import MobileApp from "./pages/app";

export const applications = [
  {
    id: 1,
    address: "г. Усть-Каменогорск, ул. Казахстан, 25",
    description: "Подозрительный мужчина оставил пакет в кустах.",
    datetime: "2025-10-30 14:20",
    verified: "В ожидании",
    drugType: "Наркозакладчики",
    coordinates: [82.615, 49.956] as [number, number]
  },
  {
    id: 2,
    address: "г. Усть-Каменогорск, пр. Абая, 103",
    description: "Надпись на стене с Telegram-каналом.",
    datetime: "2025-10-29 12:45",
    verified: "Подтверждено",
    drugType: "Наркограффити",
    coordinates: [82.628, 49.975] as [number, number]
  },
  {
    id: 3,
    address: "г. Семей, ул. Интернациональная, 8",
    description: "Замечены подозрительные лица возле гаражей.",
    datetime: "2025-10-29 21:15",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [80.245, 50.411] as [number, number]
  },
  {
    id: 4,
    address: "г. Зайсан, ул. Абая, 19",
    description: "Брошенный пакет с порошком у остановки.",
    datetime: "2025-10-28 18:30",
    verified: "Отклонено",
    drugType: "Наркозакладчики",
    coordinates: [84.877, 47.476] as [number, number]
  },
  {
    id: 5,
    address: "г. Риддер, ул. Ленина, 40",
    description: "Надпись на стене с кодом, похожим на метку.",
    datetime: "2025-10-28 10:12",
    verified: "Подтверждено",
    drugType: "Наркограффити",
    coordinates: [83.516, 50.351] as [number, number]
  },
  {
    id: 6,
    address: "г. Шемонаиха, ул. Победы, 5",
    description: "Дом, где часто замечают подозрительных людей.",
    datetime: "2025-10-27 22:10",
    verified: "В ожидании",
    drugType: "Наркопритон",
    coordinates: [81.911, 50.629] as [number, number]
  },
  {
    id: 7,
    address: "г. Усть-Каменогорск, мкр. 19, дом 12",
    description: "Подъезд исписан граффити с упоминанием бота.",
    datetime: "2025-10-27 15:05",
    verified: "Подтверждено",
    drugType: "Наркограффити",
    coordinates: [82.601, 49.971] as [number, number]
  },
  {
    id: 8,
    address: "г. Семей, район вокзала",
    description: "Сообщение о продаже веществ на Telegram.",
    datetime: "2025-10-26 20:18",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [80.245, 50.404] as [number, number]
  },
  {
    id: 9,
    address: "г. Зайсан, ул. Казахстан, 7",
    description: "Квартира, где регулярно собираются неизвестные.",
    datetime: "2025-10-26 11:35",
    verified: "В ожидании",
    drugType: "Наркопритон",
    coordinates: [84.873, 47.475] as [number, number]
  },
  {
    id: 10,
    address: "г. Риддер, ул. Молодежная, 3",
    description: "Подозрительный след на земле рядом с подъездом.",
    datetime: "2025-10-25 16:40",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [83.512, 50.352] as [number, number]
  },
  {
    id: 11,
    address: "г. Усть-Каменогорск, ул. Гоголя, 77",
    description: "Код на стене, похожий на метку закладчиков.",
    datetime: "2025-10-25 19:50",
    verified: "Отклонено",
    drugType: "Наркограффити",
    coordinates: [82.638, 49.972] as [number, number]
  },
  {
    id: 12,
    address: "г. Семей, мкр. Восточный, дом 2",
    description: "Жильцы жалуются на запах химикатов.",
    datetime: "2025-10-24 21:20",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [80.27, 50.412] as [number, number]
  },
  {
    id: 13,
    address: "г. Шемонаиха, ул. Абая, 16",
    description: "Следы порошка возле мусорных баков.",
    datetime: "2025-10-24 09:10",
    verified: "В ожидании",
    drugType: "Наркозакладчики",
    coordinates: [81.905, 50.631] as [number, number]
  },
  {
    id: 14,
    address: "г. Зайсан, ул. Базарная, 3",
    description: "Подозрительные надписи у школы.",
    datetime: "2025-10-23 17:45",
    verified: "Подтверждено",
    drugType: "Наркограффити",
    coordinates: [84.872, 47.48] as [number, number]
  },
  {
    id: 15,
    address: "г. Усть-Каменогорск, ул. Протозанова, 10",
    description: "Замечены молодые люди с пакетами.",
    datetime: "2025-10-23 14:50",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [82.614, 49.963] as [number, number]
  },
  {
    id: 16,
    address: "г. Риддер, ул. Металлургов, 20",
    description: "Запах ацетона в подвале.",
    datetime: "2025-10-22 22:30",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [83.514, 50.354] as [number, number]
  },
  {
    id: 17,
    address: "г. Семей, ул. Бейбитшилик, 25",
    description: "Нарисован код на подъезде.",
    datetime: "2025-10-22 18:12",
    verified: "Отклонено",
    drugType: "Наркограффити",
    coordinates: [80.235, 50.41] as [number, number]
  },
  {
    id: 18,
    address: "г. Зайсан, ул. Центральная, 1",
    description: "Регулярно приходят молодые люди по ночам.",
    datetime: "2025-10-21 23:50",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [84.881, 47.474] as [number, number]
  },
  {
    id: 19,
    address: "г. Шемонаиха, ул. Железнодорожная, 7",
    description: "На асфальте найден QR-код.",
    datetime: "2025-10-21 11:15",
    verified: "В ожидании",
    drugType: "Наркограффити",
    coordinates: [81.908, 50.627] as [number, number]
  },
  {
    id: 20,
    address: "г. Усть-Каменогорск, пр. Назарбаева, 120",
    description: "Мужчина что-то закапывал в снегу.",
    datetime: "2025-10-20 19:25",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [82.642, 49.969] as [number, number]
  },
  {
    id: 21,
    address: "г. Семей, ул. Аймауытова, 12",
    description: "Замечен притон в подвале жилого дома.",
    datetime: "2025-10-20 15:30",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [80.243, 50.413] as [number, number]
  },
  {
    id: 22,
    address: "г. Зайсан, ул. Абая, 35",
    description: "Надписи на заборе с каналом Telegram.",
    datetime: "2025-10-19 16:45",
    verified: "Отклонено",
    drugType: "Наркограффити",
    coordinates: [84.871, 47.472] as [number, number]
  },
  {
    id: 23,
    address: "г. Риддер, ул. Советская, 22",
    description: "Мужчина спрятал сверток под камнем.",
    datetime: "2025-10-19 10:20",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [83.519, 50.353] as [number, number]
  },
  {
    id: 24,
    address: "г. Усть-Каменогорск, ул. Молдагуловой, 4",
    description: "Сильный запах химии из квартиры.",
    datetime: "2025-10-18 22:10",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [82.615, 49.958] as [number, number]
  },
  {
    id: 25,
    address: "г. Семей, район набережной",
    description: "На стенах надписи с надписями «бот» и «закладка».",
    datetime: "2025-10-18 11:45",
    verified: "Подтверждено",
    drugType: "Наркограффити",
    coordinates: [80.252, 50.41] as [number, number]
  },
  {
    id: 26,
    address: "г. Усть-Каменогорск, ул. Глинки, 22",
    description: "Подозрительный сверток у мусорки.",
    datetime: "2025-10-17 09:50",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [82.609, 49.959] as [number, number]
  },
  {
    id: 27,
    address: "г. Зайсан, ул. Сатпаева, 12",
    description: "Квартира, где часто слышен шум ночью.",
    datetime: "2025-10-17 22:05",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [84.877, 47.471] as [number, number]
  },
  {
    id: 28,
    address: "г. Шемонаиха, ул. Парковая, 8",
    description: "Нарисованы странные символы.",
    datetime: "2025-10-16 14:40",
    verified: "В ожидании",
    drugType: "Наркограффити",
    coordinates: [81.913, 50.625] as [number, number]
  },
  {
    id: 29,
    address: "г. Риддер, ул. Абая, 6",
    description: "Следы порошка на земле.",
    datetime: "2025-10-15 12:20",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [83.511, 50.356] as [number, number]
  },
  {
    id: 30,
    address: "г. Семей, ул. Байтурсынова, 11",
    description: "Жильцы жалуются на подозрительных посетителей.",
    datetime: "2025-10-15 19:30",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [80.247, 50.414] as [number, number]
  },
  {
    id: 31,
    address: "г. Зайсан, ул. Восточная, 9",
    description: "Надпись с Telegram-ботом.",
    datetime: "2025-10-14 10:15",
    verified: "Отклонено",
    drugType: "Наркограффити",
    coordinates: [84.875, 47.473] as [number, number]
  },
  {
    id: 32,
    address: "г. Усть-Каменогорск, пр. Сатпаева, 50",
    description: "Замечен мужчина, что-то закапывал под деревом.",
    datetime: "2025-10-14 18:40",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [82.63, 49.965] as [number, number]
  },
  {
    id: 33,
    address: "г. Риддер, ул. Лесная, 1",
    description: "Сильный запах химии в подвале.",
    datetime: "2025-10-13 21:10",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [83.517, 50.349] as [number, number]
  },
  {
    id: 34,
    address: "г. Семей, ул. Горького, 18",
    description: "Граффити с QR-кодом.",
    datetime: "2025-10-12 14:25",
    verified: "Подтверждено",
    drugType: "Наркограффити",
    coordinates: [80.253, 50.409] as [number, number]
  },
  {
    id: 35,
    address: "г. Усть-Каменогорск, ул. Крылова, 10",
    description: "Подозрительный пакет возле школы.",
    datetime: "2025-10-12 17:55",
    verified: "В ожидании",
    drugType: "Наркозакладчики",
    coordinates: [82.62, 49.961] as [number, number]
  },
  {
    id: 36,
    address: "г. Зайсан, ул. Назарбаева, 4",
    description: "Регулярные ночные сборы в доме.",
    datetime: "2025-10-11 22:00",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [84.879, 47.476] as [number, number]
  },
  {
    id: 37,
    address: "г. Усть-Каменогорск, ул. Казахстан, 88",
    description: "Надписи на заборе с кодами.",
    datetime: "2025-10-11 13:15",
    verified: "Подтверждено",
    drugType: "Наркограффити",
    coordinates: [82.633, 49.968] as [number, number]
  },
  {
    id: 38,
    address: "г. Шемонаиха, ул. Восточная, 9",
    description: "Мужчина закапывал сверток у дерева.",
    datetime: "2025-10-10 09:50",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [81.912, 50.626] as [number, number]
  },
  {
    id: 39,
    address: "г. Риддер, ул. Центральная, 15",
    description: "Подозрительный запах из подвала.",
    datetime: "2025-10-09 23:10",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [83.514, 50.353] as [number, number]
  },
  {
    id: 40,
    address: "г. Семей, ул. Ермекова, 7",
    description: "Надпись с хэштегом на стене.",
    datetime: "2025-10-09 11:20",
    verified: "Подтверждено",
    drugType: "Наркограффити",
    coordinates: [80.241, 50.412] as [number, number]
  },
  {
    id: 41,
    address: "г. Усть-Каменогорск, мкр. 7, дом 14",
    description: "Мужчина что-то прятал за гаражами.",
    datetime: "2025-10-08 20:30",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [82.617, 49.966] as [number, number]
  },
  {
    id: 42,
    address: "г. Зайсан, ул. Абая, 11",
    description: "Надписи и странный запах в подъезде.",
    datetime: "2025-10-08 15:00",
    verified: "В ожидании",
    drugType: "Наркопритон",
    coordinates: [84.874, 47.473] as [number, number]
  },
  {
    id: 43,
    address: "г. Риддер, ул. Крупской, 5",
    description: "Нарисованы символы на стенах.",
    datetime: "2025-10-07 18:10",
    verified: "Подтверждено",
    drugType: "Наркограффити",
    coordinates: [83.515, 50.355] as [number, number]
  },
  {
    id: 44,
    address: "г. Шемонаиха, ул. Касымова, 6",
    description: "Следы от закопанных пакетов.",
    datetime: "2025-10-07 10:40",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [81.909, 50.628] as [number, number]
  },
  {
    id: 45,
    address: "г. Усть-Каменогорск, ул. Кирова, 5",
    description: "Подозрительная квартира с постоянными гостями.",
    datetime: "2025-10-06 22:50",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [82.611, 49.963] as [number, number]
  },
  {
    id: 46,
    address: "г. Семей, ул. Чокана Валиханова, 2",
    description: "Граффити на стене с Telegram-каналом.",
    datetime: "2025-10-06 16:15",
    verified: "Подтверждено",
    drugType: "Наркограффити",
    coordinates: [80.25, 50.411] as [number, number]
  },
  {
    id: 47,
    address: "г. Зайсан, ул. Сатпаева, 10",
    description: "Жильцы жалуются на запах химии.",
    datetime: "2025-10-05 20:40",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [84.878, 47.477] as [number, number]
  },
  {
    id: 48,
    address: "г. Усть-Каменогорск, ул. Казахстан, 95",
    description: "На стенах дома — надписи с хэштегом.",
    datetime: "2025-10-05 12:00",
    verified: "Подтверждено",
    drugType: "Наркограффити",
    coordinates: [82.635, 49.97] as [number, number]
  },
  {
    id: 49,
    address: "г. Риддер, ул. Пролетарская, 1",
    description: "Мужчина что-то закапывал под деревом.",
    datetime: "2025-10-04 19:15",
    verified: "Подтверждено",
    drugType: "Наркозакладчики",
    coordinates: [83.516, 50.352] as [number, number]
  },
  {
    id: 50,
    address: "г. Шемонаиха, ул. Победы, 9",
    description: "Дом, где часто замечают подозрительных людей.",
    datetime: "2025-10-04 22:10",
    verified: "Подтверждено",
    drugType: "Наркопритон",
    coordinates: [81.91, 50.629] as [number, number]
  },
];

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/app" element={<MobileApp applications={applications} />} />
          <Route path="/admin/*" element={ 
            <ProtectedRoute>
              <AdminPage applications={applications} />
            </ProtectedRoute>
          }  />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
