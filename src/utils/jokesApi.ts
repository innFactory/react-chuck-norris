import axios, {AxiosResponse} from "axios";
import {toast} from "sonner";
import {ChuckNorrisJoke} from "@/models/joke";
import {QueryData} from "@/models/queryData";

const _getRandomJoke = () => {
    return axios
        .get<ChuckNorrisJoke>("https://api.chucknorris.io/jokes/random")
        .catch((error) => {
            console.error(error);
            toast.error("Error getting joke");
            throw error;
        });
};

export const getRandomJoke = (): QueryData<AxiosResponse<ChuckNorrisJoke, unknown>> => ({
    queryKey: ["randomJoke"],
    queryFn: () => _getRandomJoke(),
});
