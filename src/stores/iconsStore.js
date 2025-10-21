import { writable } from "svelte/store";
export const iconsDataStore = writable({});
export const iconsDataDisplayStore = writable({});

export const initIconDataStoreThunk = (data) => {
    iconsDataDisplayStore.set(data);
    iconsDataStore.set(data);
}

export const filterIconsBySearchQueryThunk = ({query, iconDataInStore}) => {
    if(!query){
        iconsDataDisplayStore.set(iconDataInStore);
        return false;
    }

    const filteredIndexes = Object.keys(iconDataInStore).filter(iconKey => {
        const tags = iconDataInStore[iconKey].tags;
        return tags.some(item => item.includes(query));
    })

    const result = filteredIndexes.map(index => iconDataInStore[index]);
    iconsDataDisplayStore.set(result);
}
