import { useQuery } from "@tanstack/react-query";
import { useFetchWithTflCredentials } from "../hooks/useFetchWithTflCredentials";
import { LineStatusApiresponseItem } from "../types/lineStatusApiresponseItem";

export const useLineStatusQuery = () => useQuery<LineStatusApiresponseItem[]>({
    queryKey: ['lineStatus'],
    queryFn: LineStatusFetcher,
    refetchInterval: 30000
})

const LineStatusFetcher = async () => {
    const res = await useFetchWithTflCredentials({
        url: "http://api.tfl.gov.uk/Line/Mode/Tube/Status",
        fetchOptions: {
            method: 'GET'
        }
    })
    return await res.json()
}

