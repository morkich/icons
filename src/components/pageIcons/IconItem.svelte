<script>
    import ColorChanger from "../ui/ColorChanger.svelte";
    import DownloadIconMenu from "./DownloadIconMenu.svelte";

    export let iconItem = {};
    export let iconKey = "";
    export let iconBlockSize = 0;

    let iconWrapped = "",
        isShowColorPicker = true,
        color = "#444",
        menuValue = "",
        isMouseInside = false,
        isShowContextMenu = false;

    $: iconWrapped = getWrappedIcon(iconItem, color);
    $: isShowColorPicker = getIsShowColorPicker(iconItem);
    $: if (menuValue) downloadIconHandle(menuValue);

    const downloadIconHandle = (menuValue) => {
        let value = '';
        if (menuValue == "base64") {
            const base64 = btoa(iconWrapped)
            value = `data:image/svg+xml;base64,${base64}`;
        }

        if(menuValue == "svg") {
            value = iconWrapped;
        }

        navigator.clipboard.writeText(value);
    };

    const getIsShowColorPicker = (iconItem) => {
        if (!Object.values(iconItem).length) return false;
        const colorTag = iconItem.tags.filter((tag) => tag == "color");
        return !colorTag.length;
    };

    const getWrappedIcon = (iconItem, color) => {
        const viewBoxData = iconItem.viewBox.join(" ");
        return `<svg xmlns='http://www.w3.org/2000/svg' fill='${color}' viewBox='${viewBoxData}'>${iconItem.svg}</svg>`;
    };

    const enterMouseHandle = () => {
        isMouseInside = true;
    }

    const leaveMouseHandle = () => {
        if(!isShowContextMenu) isMouseInside = false
    }

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="iconItem"
    class:isMouseInside
    style:width={`${iconBlockSize}px`}
    style:height={`${iconBlockSize}px`}
    on:mouseenter={enterMouseHandle}
    on:mouseleave={leaveMouseHandle}
>
    {#if isShowColorPicker}
        <div class="colorChangerWrap">
            <ColorChanger id={`colorChanger--${iconKey}`} bind:color />
        </div>
    {/if}

    <div class="downloadMenu">
        <DownloadIconMenu bind:menuValue bind:isShowContextMenu id={iconKey} />
    </div>

    <button class="iconItem__button">
        {@html iconWrapped}
    </button>
</div>

<style>
    .iconItem {
        position: relative;
        border: 1px solid #ededed;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .isMouseInside .downloadMenu {
        opacity: 1;
        pointer-events: all;
    }

    .downloadMenu {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: transparent;
        top: 0;
        right: 0;
        border-radius: 0 3px 0 3px;
        transition: 0.2s;
    }

    .colorChangerWrap {
        position: absolute;
        top: 0;
        left: 0;
        margin: 2px;
        padding: 0;
        width: 10px;
        height: 10px;
    }

    .iconItem__button {
        cursor: pointer;
        padding: 0;
        margin: 0;
        border: none;
        background-color: transparent;
    }

    .iconItem :global(svg) {
        width: 100%;
        height: 100%;
        max-width: 30px;
        max-height: 30px;
    }
</style>
