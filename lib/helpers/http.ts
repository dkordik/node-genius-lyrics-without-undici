import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface CustomRequestOptions extends AxiosRequestConfig {
    throwOnError?: boolean;
}

export type RequestOptions = CustomRequestOptions;
export type MethodlessRequestOptions = Omit<RequestOptions, "method">;

// Mimic the structure of `undici` errors using a namespace
export namespace errors {
    export class ResponseStatusCodeError extends Error {
        status: number;
        statusCode: number;
        response: AxiosResponse;

        constructor(response: AxiosResponse) {
            super(`Request failed with status code ${response.status}`);
            this.statusCode = response.status;
            this.status = response.status; // Added for alignment with undici
            this.response = response;
            this.name = "ResponseStatusCodeError";
        }
    }

    // Add other error classes here as needed
}

// Mimicking undici's request function structure
export async function request(
    url: string,
    options: RequestOptions = {}
): Promise<{ body: any }> {
    try {
        const response = await axios({ url, ...options });
        if (options.throwOnError && response.status >= 400) {
            throw new errors.ResponseStatusCodeError(response);
        }
        // Create a body object with a text() function to mimic undici's style
        return {
            body: {
                text: async () => {
                    if (typeof response.data === "object") {
                        return JSON.stringify(response.data);
                    }
                    return String(response.data);
                },
            },
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new errors.ResponseStatusCodeError(error.response);
        }
        throw error;
    }
}
