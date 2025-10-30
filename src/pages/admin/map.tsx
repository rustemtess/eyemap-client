import { useState } from "react";
import KazakhstanRegionMap from "../../components/map";

const regions: string[] = [
    "Abai", 
    "Akmola", 
    "Aktobe", 
    "Almaty", 
    "West Kazakhstan", 
    "Jambyl", 
    "Jetisu", 
    "Karaganda", 
    "Kostanay", 
    "Kyzylorda", 
    "Mangystau", 
    "Pavlodar", 
    "North Kazakhstan", 
    "Turkestan", 
    "Ulytau", 
    "East Kazakhstan", 
    "Astana", 
    "Shymkent (city)"
];

export default function MapPage() {

    const [selectedRegion, setSelectedRegion] = useState<string>('East Kazakhstan');

    return(
        <div className="flex flex-col gap-2 h-svh">
            <h1 className="text-xl">Map</h1>
            <div className="flex flex-col gap-2 shrink-0"> 
                <p className="text-gray-700 text-sm">Выберите регион:</p>
                <div className="flex flex-wrap gap-2 w-full">
                {regions.map((region) => (
                    <button
                    key={region}
                    className="bg-gray-100 text-black/70 p-1 px-2 rounded-xl text-sm"
                    onClick={() => setSelectedRegion(region)}
                    >
                    {region}
                    </button>
                ))}
                </div>
            </div>

            <div className="flex-1">
                <KazakhstanRegionMap regionName={selectedRegion} />
            </div>
        </div>
    );

}