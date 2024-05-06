export const DEFAULT_FETCH_OPTIONS: { [index: string]: any } = {
    query: {
        app_id: process.env.NX_TFL_APP_ID,
        app_key: process.env.NX_TFL_APP_KEY,
    },
    options: {}
};

export type UseFetchProps = {
    url: string;
    fetchOptions?: RequestInit;
    input?: { [index: string]: any };
};


export const useFetchWithTflCredentials = ({ url, fetchOptions, input }: UseFetchProps) => {
    const enhancedUrl = DEFAULT_FETCH_OPTIONS.query ? `${url}?${Object.keys(DEFAULT_FETCH_OPTIONS.query).map((q: string) => `${q}=${DEFAULT_FETCH_OPTIONS.query[q]}`).join('&')}` : url
    return fetch(enhancedUrl, {
        ...DEFAULT_FETCH_OPTIONS.options, // ToDo: carry to a config file
        ...fetchOptions, // override any default fetch options
        body: JSON.stringify(input),
    });
};

