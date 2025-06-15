import { TypeProperty } from '@/Types/TypeProperty'

type Props = {
    propertyProfile : TypeProperty
    formatPrice : (price : number) => string
}

export const PropertyCard = ({ propertyProfile , formatPrice }: Props) => {
  return (
    <>
         {/* Card de la Propiedad */}
      <div className="relative max-w-3xl w-full bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl p-6">
        <img
          src={propertyProfile.image.fileLink}
          alt="Imagen de la propiedad"
          className="w-full h-[400px] object-cover rounded-xl shadow-lg"
        />

        <div className="mt-6">
          <h2 className="text-2xl font-bold">{propertyProfile.name}</h2>
          <p className="text-white/70 text-sm mt-1">{propertyProfile.address}</p>
          <p className="text-xl font-semibold text-green-400 mt-4">{formatPrice(propertyProfile.price)}</p>
        </div>

        <div className="absolute bottom-4 right-4 bg-white/10 px-4 py-2 rounded-full text-sm text-white shadow-lg">
          ID Propiedad: {propertyProfile.id}
        </div>
      </div>
    </>
  )
}