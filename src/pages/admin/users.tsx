import { useState } from "react";

export default function UsersPage() {

    const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

    const RegisterForm = () => {
        return (
            <div className="z-10 fixed top-0 left-0 w-full h-full bg-black/30 flex flex-col justify-center items-center">
                <form className="bg-white max-w-[400px] w-full h-fit flex flex-col p-5 gap-2 rounded-xl">
                    <button onClick={() => setShowRegisterForm(false)}>Закрыть</button>
                    <input placeholder="Имя" className="border" />
                    <input placeholder="Фамилия" className="border"  />
                    <input placeholder="Отчество" className="border"  />
                    <input placeholder="Email" className="border"  />
                    <input placeholder="Password" className="border"  />
                    <button className="bg-[#5d7388] text-white text-xs p-2 rounded-full px-4" onClick={() => setShowRegisterForm(true)}>
                        Создать пользователя
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="my-2 flex flex-col gap-2">
            { showRegisterForm && <RegisterForm /> }
            <h1 className="text-xl font-bold">Users</h1>
            <div>
                <button className="bg-[#5d7388] text-white text-xs p-2 rounded-full px-4" onClick={() => setShowRegisterForm(true)}>
                    Зарегистрировать пользователя
                </button>
            </div>
            <table className="w-full flex flex-col gap-3 mt-4">
                <thead>
                    <tr>
                        <th className="w-[300px]">ФИО</th>
                        <th className="w-[300px]">Почта</th>
                        <th className="w-[300px]">Статус</th>
                        <th className="w-[300px]">Действие</th>
                    </tr>
                </thead>
                <tbody className="flex flex-col gap-4">
                    <tr>
                        <td className="w-[300px] text-center">Rustem Zhumabek</td>
                        <td className="w-[300px] text-center">rustemnew@icloud.com</td>
                        <td className="w-[300px] text-center"></td>
                        <td className="w-[300px] text-center ">
                            <button className="bg-[#5d7388] text-white text-xs p-2 rounded-full px-4">
                                Удалить
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="w-[300px] text-center">Rustem Zhumabek</td>
                        <td className="w-[300px] text-center">rustemnew@icloud.com</td>
                        <td className="w-[300px] text-center"></td>
                        <td className="w-[300px] text-center ">
                            <button className="bg-[#5d7388] text-white text-xs p-2 rounded-full px-4">
                                Удалить
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

}