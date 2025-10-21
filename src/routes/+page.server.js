import { getIconsData } from "../lib/db/icons.js";

export const load = async ({ params, parent }) => {
    console.log(params, parent);
    const iconsData = await getIconsData();
    // console.log(iconsData, 'iconsData');
    return { iconsData };
}
