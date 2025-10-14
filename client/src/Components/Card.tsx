import type { CardProps } from "@/Types/CardProps"

const Card: React.FC<CardProps> = ({ Title, P, ICON }) => {
    return (
        <div className="flex flex-col items-center bg-white border rounded-xl shadow-sm p-6 min-w-[220px] max-w-xs w-full transition hover:shadow-md hover:-translate-y-1 duration-200 border-gray-200">
            <div className="mb-4">{ICON}</div>
            <div className="font-bold text-lg text-center mb-2">{Title}</div>
            <div className="text-gray-500 text-center text-sm">{P}</div>
        </div>
    )
}

export default Card