import { ReactElement } from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchImage, IImageItem} from "../apis/the-cat";

interface ImageProps {
   id: string;
}

const Image = ( { id }: ImageProps ): ReactElement => {
    const { isPending, error, data, isFetching } = useQuery<IImageItem, Error>({
        queryKey: ['image', id],
        queryFn: fetchImage(id),
        select: (data: IImageItem) => ({url: data.url})
    })

    if(isFetching || isPending) {
        return <>"LOADING ..."</>;
    }
    if(error) {
        return <>"ERROR"</>;
    }

    return (
        <>
            {data && (
                <img src={data.url} alt="" />
            )}
        </>
    );
};

export default Image;