export interface IDrug {
    name: string;
    color: string;
}

export interface Application {
  id: number;
  address: string;
  photo?: string;
  description: string;
  datetime: string;
  verified: string;
  drugType: string;
  coordinates: [number, number]; // <--- добавь координаты
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