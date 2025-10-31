import KazakhstanRegionMap from "../components/map";
import { regions, type Application } from "../general.types";


interface IMobileApp {
  applications: Application[]
}

export default function MobileApp({ applications }: IMobileApp) {

    return (
        <div className="w-full h-screen">
            <KazakhstanRegionMap regionName={ regions[13] } applications={applications} initialCoords={[82.6, 49.5]} isAdmin={false} />
        </div>
    );

}