import Aurora from "./Aurora";


export const Header = () => {
    return (
        <section className="relative isolate overflow-hidden min-h-screen flex items-center justify-center text-white bg-black">
            {/* Fondo Aurora */}
            <div className="absolute inset-0 -z-10">
                <Aurora
                    colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            {/* Contenido principal en 2 columnas */}
            <div className="container mx-auto px-6 lg:px-16 py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                {/* Columna texto */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl font-extrabold sm:text-6xl leading-tight mb-6">
                        The palace of<br /> your DREAM
                    </h1>
                    <p className="text-lg text-white/80 mb-8 max-w-md">
                    Handcrafted real estate designed for your next strategic acquisition: mansions, corporate residences, private retreats, or high-yield investments. 
                    Each property comes with a refreshing architectural design and everything you need to solidify your next elite wealth move.
                    </p>

                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                        >
                            Get Started →
                        </a>
                        <a href="#" className="text-white/80 hover:text-white flex items-center gap-2">
                            <span className="inline-block w-3 h-3 bg-white rounded-full animate-ping" />
                            Get meet
                        </a>
                    </div>
                </div>

                {/* Columna imagen */}
                <div className="relative w-[400px] h-[500px]">
                    {/* Imagen de fondo */}
                    <img
                        src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Imagen base"
                        className="absolute top-20 left-20 w-full h-full object-cover rounded-xl"
                    />

                    {/* Imagen encima */}
                  { <img
                        src="https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Imagen encima"
                        className="absolute top-6 right-20 w-4/4 h-3/4 object-cover rounded-xl shadow-xl"
                    />}
                </div>

            </div>
        </section>
    )
}
