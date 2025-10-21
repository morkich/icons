import { DBQuery } from "../server/Api.js";
import { getTagsByIds, getTagsRelationsByIds } from "./tags.js";

export const getIconsData = async () => {
    const iconsData = await DBQuery.select('icons_items')
        .colAll()
        .getIndexedRows();

    if(!Object.keys(iconsData).length) return {};

    const iconsIds = Object.keys(iconsData);
    const tagsRelations = await getTagsRelationsByIds(iconsIds);
    const tagsIds = [...new Set(tagsRelations.map(relationItem => relationItem.tag_id))];
    const tags = await getTagsByIds(tagsIds);

    tagsRelations.forEach(relationItem => {
        const tagId = relationItem.tag_id;
        const itemId = relationItem.item_id;

        if (!iconsData[itemId]['tags']) iconsData[itemId]['tags'] = [];
        iconsData[itemId]['tags'] = [...iconsData[itemId]['tags'], tags[tagId].tag_name];
    })

    const result = Object.values(iconsData);
    return result;
}
