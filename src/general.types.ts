export interface IDrug {
    name: string;
    color: string;
}

export interface Application {
  id: number;
  photo: string;
  description: string;
  datetime: string;
  verified: "Подтверждено" | "Отклонено" | "В ожидании";
  drugType: string;
}


export const drugTypes: IDrug[] = [
    {
       name: "Наркозакладчики",
       color: "#2b7eff" 
    },
    {
        name: "Наркограффити",
        color: "#ffba00"
    },
    {
        name: "Наркопритон",
        color: "#fb2b37"
    }
];