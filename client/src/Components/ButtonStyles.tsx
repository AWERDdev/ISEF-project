import type { BUTTONPROPS } from "@/Types/Button"

const baseButtonClass = "flex items-center justify-center gap-2 cursor-pointer select-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed";

export const ButtonStyle1: React.FC<BUTTONPROPS> = ({ButtonText, onClick,  children, className}) =>(
    <button onClick={onClick} className={`${baseButtonClass} py-1.5 px-5 rounded bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-green-700 ${className || ''}`}>
        <span className="flex-1 text-center">{ButtonText}</span>
        {children}
    </button>
)

export const ButtonStyle2: React.FC<BUTTONPROPS> = ({ButtonText, onClick,  children, className}) =>(
    <button onClick={onClick} className={`${baseButtonClass} bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg py-2 px-5 font-semibold text-base shadow ${className || ''}`}>
        <span className="flex-1 text-center">{ButtonText}</span>
        {children}
    </button>
)

export const ButtonStyle3: React.FC<BUTTONPROPS> = ({ButtonText, onClick,  children, className}) =>(
    <button onClick={onClick} className={`${baseButtonClass} px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 ${className || ''}`}>
        {children}
        <span className="flex-1 text-center">{ButtonText}</span>
    </button>
)

export const ButtonStyle4: React.FC<BUTTONPROPS> = ({ButtonText, onClick,  children, className}) =>(
    <button onClick={onClick} className={`${baseButtonClass} px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ${className || ''}`}>
        {children}
        <span className="flex-1 text-center">{ButtonText}</span>
    </button>
)

export const ButtonStyle5: React.FC<BUTTONPROPS> = ({ButtonText, onClick,  children, className}) =>(
    <button onClick={onClick} className={`${baseButtonClass} p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 ${className || ''}`}>
        {children}
        <span className="flex-1 text-center">{ButtonText}</span>
    </button>
)

export const ButtonStyle6: React.FC<BUTTONPROPS> = ({ButtonText, onClick, children, className}) =>(
    <button onClick={onClick} className={`${baseButtonClass} px-4 py-2 text-gray-600 hover:text-gray-800 ${className || ''}`}>
        <span className="flex-1 text-center">{ButtonText}</span>
        {children}
    </button>
)

export const ButtonStyle7: React.FC<BUTTONPROPS> = ({ButtonText, onClick,  children, className}) =>(
    <button onClick={onClick} className={`${baseButtonClass} p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left ${className || ''}`}>
        <span className="flex-1">{ButtonText}</span>
        {children}
    </button>
)

export const ButtonStyle8: React.FC<BUTTONPROPS> = ({ButtonText, onClick,  children, className}) =>(
    <button onClick={onClick} className={`${baseButtonClass} bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium ${className || ''}`}>
        <span className="flex-1 text-center">{ButtonText}</span>
        {children}
    </button>
)

export const ButtonStyle9: React.FC<BUTTONPROPS> = ({ButtonText, onClick,  children, className}) =>(
    <button onClick={onClick} className={`${baseButtonClass} bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold ${className || ''}`}>
        <span className="flex-1 text-center">{ButtonText}</span>
        {children}
    </button>
)

export const ButtonStyle10: React.FC<BUTTONPROPS> = ({ButtonText, onClick,  children, className}) =>(
    <button onClick={onClick} className={`${baseButtonClass} w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold text-lg shadow-md hover:from-blue-700 hover:to-green-700 ${className || ''}`}>
        <span className="flex-1 text-center">{ButtonText}</span>
        {children}
    </button>
)

export const ButtonStyle11: React.FC<BUTTONPROPS> = ({ButtonText, onClick, children, className}) =>(
    <button onClick={onClick} className={`${baseButtonClass} w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-lg shadow-md hover:from-green-700 hover:to-blue-700 ${className || ''}`}>
        <span className="flex-1 text-center">{ButtonText}</span>
        {children}
    </button>
)


 