import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const searchedCars = [
  { id: 1, brand: "HONDA", model: "CIVIC", image: "/cars/civic.png" },
  { id: 2, brand: "TOYOTA", model: "COROLLA", image: "/cars/corolla.png" },
  { id: 3, brand: "HONDA", model: "FIT", image: "/cars/fit.png" },
  { id: 4, brand: "VOLKSWAGEN", model: "GOL", image: "/cars/gol.png" },
  { id: 5, brand: "VOLKSWAGEN", model: "GOLF", image: "/cars/golf.png" },
  { id: 6, brand: "VOLKSWAGEN", model: "JETTA", image: "/cars/jetta.png" },
];

export function MostSearched() {
  return (
    <section className="scroll-reveal relative z-10 -mt-[60px] pt-24 pb-24 bg-brand-green clip-diagonal-both">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-xl font-extrabold uppercase tracking-wider text-white/90">
          Carros mais buscados
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pb-4">
          {searchedCars.map((car) => (
            <Link 
              key={car.id} 
              to={`/estoque?brand=${car.brand}&search=${car.model}`}
              className="block cursor-pointer"
            >
              <Card
                className="group relative overflow-hidden rounded-xl border-none shadow-sm hover:shadow-md py-4 px-4 gap-0 bg-white flex flex-col items-start justify-between min-h-[200px] sm:min-h-[220px] transition-all hover:-translate-y-1 duration-300"
              >
                <div className="relative z-10">
                  <span className="block text-sm font-bold text-[#1E3A5F]">
                    {car.brand}
                  </span>
                  <span className="block text-xl font-extrabold text-[#E51D34] group-hover:scale-105 transition-transform origin-left">
                    {car.model}
                  </span>
                </div>

                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="absolute bottom-0 right-[-1%] w-[170%] max-w-none mix-blend-multiply contrast-[1.05] brightness-[1.05] transition-transform duration-1000 ease-in-out group-hover:translate-x-[70%]"
                />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

