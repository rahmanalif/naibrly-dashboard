import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    console.error("Application Error:", error);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-10 w-10 text-red-500" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>

                <p className="text-gray-600 mb-6">
                    {error?.statusText || error?.message || "An unexpected error occurred. Please try again later."}
                </p>

                <div className="flex gap-4 justify-center">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </Button>
                    <Button
                        className="bg-[#0E7A60] hover:bg-[#0E7A60]/90"
                        onClick={() => navigate('/dashboard')}
                    >
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
