import { useMemo, useState } from 'react';
import { IOption, IPainting, IViewPainting } from '../Types/types';

export const useReplaceFieldsIdInPaintings = (
  paintings: IPainting[],
  authors: IOption[],
  locations: IOption[]
) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return useMemo((): [IViewPainting[], boolean] => {
    setIsLoaded(false);
    const newPaintings: IViewPainting[] = paintings?.map((painting) => {
      const currentAuthor = authors.find(
        (author) => author.id === painting.authorId
      );
      const currentLocation = locations.find(
        (location) => location.id === painting.locationId
      );
      if (currentLocation && currentAuthor) {
        return {
          id: painting.id,
          location: currentLocation.name,
          author: currentAuthor.name,
          created: painting.created,
          imageUrl: painting.imageUrl,
          name: painting.name
        };
      }
      return {
        id: painting.id,
        location: '',
        author: '',
        created: painting.created,
        imageUrl: painting.imageUrl,
        name: painting.name
      };
    });
    setIsLoaded(true);
    return [newPaintings, isLoaded];
  }, [paintings, authors, locations]);
};
