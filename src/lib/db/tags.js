import { DBQuery } from "../server/Api.js";

export const getTagsByIds = async (tagsIds) => {
    return await DBQuery.select('icons_tags')
        .colAll()
        .where_id(tagsIds)
        .getIndexedRows();
}

export const getTagsRelationsByIds = async (itemsIds) => {
    return await DBQuery.select('icons_tags_items_relations')
        .colAll()
        .where_item_id(itemsIds)
        .getAll();
}