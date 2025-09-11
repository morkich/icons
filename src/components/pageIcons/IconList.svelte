<script>
    import WhiteRoundBlock from "../grid/WhiteRoundBlock.svelte";
    import IconItem from "./IconItem.svelte";

    export let iconsData = {};

    let iconBlockSize = 80;
</script>

<WhiteRoundBlock>
    <div class="iconList" style:grid-template-columns={`repeat(auto-fill, minmax(${iconBlockSize}px, 1fr))`}>
        {#each Object.keys(iconsData) as iconKey}
            <IconItem iconItem={iconsData[iconKey]} {iconKey} {iconBlockSize}/>
        {/each}
    </div>
</WhiteRoundBlock>

<style>
    .iconList {
        width: 100%;
        display: grid;
        align-items: start;
        align-content: start;
        grid-gap: 10px;
        height: 100%;
    }
</style>
