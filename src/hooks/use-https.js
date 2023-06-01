import { useState } from "react";

const useHttp = (requestConfig, transformRecipeData) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    async function fecthData() {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            }
            );

            if (!response.ok) {
                throw new Error('Something Went Wrong :(')
            }

            const data = await response.json();

            transformRecipeData(data)
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)

    }

    return {
        error: error,
        isLoading: isLoading,
        fecthData: fecthData
    }
}

export default useHttp;

