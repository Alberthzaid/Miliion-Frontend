import { owner } from '@/Types/TypeProperty'


type Props = {
    Owner : owner
    formatDate : (birthday : string) => string
}

export const OwnerCard = ({ Owner , formatDate }: Props) => {
  return (
    <>
      <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl w-[300px]">
        <img
          src={Owner.photo}
          alt="Foto del dueño"
          className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg"
        />
        <h3 className="mt-4 text-lg font-semibold">{Owner.name}</h3>
        <p className="text-sm text-white/70 mt-1">{formatDate(Owner.birthday)}</p>
        <p className="text-center text-sm text-white/60 mt-2">{Owner.address}</p>
        <span className="mt-4 inline-block text-xs bg-white/20 text-white px-4 py-1 rounded-full">Owner</span>
      </div>

    </>
  )
}