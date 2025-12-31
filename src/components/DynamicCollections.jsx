
import React from 'react';
import { useProducts } from '../context/ProductContext';
import CollectionGrid from './CollectionGrid';
import CollectionCarousel from './CollectionCarousel';

const DynamicCollections = () => {
    const { collections } = useProducts();

    if (!collections || collections.length === 0) {
        return null;
    }

    return (
        <>
            {collections.map(collection => {
                if (collection.layout === 'carousel') {
                    return <CollectionCarousel key={collection.id} collection={collection} />;
                }
                return <CollectionGrid key={collection.id} collection={collection} />;
            })}
        </>
    );
};

export default DynamicCollections;
