import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { QueryData } from "../../app/model/QueryData";
import { ChuckNorrisJoke } from "../model/Joke";

const _getRandomJoke = () => {
  return axios
    .get<ChuckNorrisJoke>("https://api.chucknorris.io/jokes/random")
    .catch((error) => {
      console.error(error);
      toast.error("Error getting joke");
      throw error;
    });
};

export const getRandomJoke = (): QueryData<
  AxiosResponse<ChuckNorrisJoke, any>
> => ({
  queryKey: ["randomJoke"],
  queryFn: () => _getRandomJoke(),
});
