import { get, writable } from "svelte/store";
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

    const filteredKeys = Object.keys(iconDataInStore).filter(iconKey => {
        const tags = iconDataInStore[iconKey].tags;
        return tags.some(item => item.includes(query));
    })

    let result = {};
    filteredKeys.forEach(key => result = {...result, [key]: iconDataInStore[key]});
    iconsDataDisplayStore.set(result);
}
