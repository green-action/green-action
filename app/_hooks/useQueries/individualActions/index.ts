import { useQuery } from "@tanstack/react-query";
import {
  getImages,
  getIndividualDetail,
} from "@/app/_api/individualAction-detail/detail-api";
import {
  QUERY_KEY_GREEN_ACTION_IMAGE,
  QUERY_KEY_INDIVIDUALACTION,
  QUERY_KEY_ALLINDIVIDUALACTION,
  QUERY_KEY_GREEN_ACTION_ALLIMAGE,
} from "@/app/_api/queryKeys";
import {
  getAllImages,
  getAllIndividual,
} from "@/app/_api/individualAction/individualAction";

export const useIndividualAction = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_INDIVIDUALACTION],
    queryFn: () => getIndividualDetail(params.id),
  });
  return { data, isLoading, isError };
};

export const useActionImages = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_GREEN_ACTION_IMAGE],
    queryFn: () => getImages(params.id),
  });
  return { data, isLoading, isError };
};

export const useAllIndividualAction = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ALLINDIVIDUALACTION],
    queryFn: getAllIndividual,
  });
  return { data, isLoading, Error };
};

export const useActionAllImages = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_GREEN_ACTION_ALLIMAGE],
    queryFn: () => getAllImages(id),
  });
  console.log(data);
  return { data, isLoading, isError };
};
