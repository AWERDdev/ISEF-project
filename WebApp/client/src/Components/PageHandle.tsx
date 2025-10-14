import { ButtonStyle8 } from "./ButtonStyles"

export const LoadingPage: React.FC = () =>{
return(
<>
<div className="flex justify-center items-center min-h-64">
    <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Page is Loading...</p>
    </div>
</div>
</>
)
}

interface ErrorPageProps {
    error: string
}

export const ErrorPage: React.FC<ErrorPageProps> = ({error}) =>{
    return(
    <>
     <div className="flex justify-center items-center min-h-64">
            <div className="text-center max-w-md mx-auto">
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
                <div className="text-red-600 text-lg font-medium mb-4">{error}</div>
                <p className="text-gray-500 text-sm mb-6">We&apos;re sorry, but something unexpected happened. Please try again.</p>
              </div>
              <div className="grid justify-center">
              <ButtonStyle8  
                ButtonText="Retry"
                onClick={() => window.location.reload()} 
              />
              </div>
            </div>
          </div>
    </>
    )
    }

interface NoDataPageProps {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
}

export const NoDataPage: React.FC<NoDataPageProps> = ({ 
    title = "No Data Available", 
    message = "There's nothing to display at the moment.",
    icon 
}) => {
    return (
        <div className="flex justify-center items-center min-h-64">
            <div className="text-center max-w-md mx-auto">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {icon || (
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
};
     