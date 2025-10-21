<script>
    import { onMount } from "svelte";
    // import { icons } from "../data/icons";
    import IconList from "../components/pageIcons/IconList.svelte";
    import Header from "../components/blocks/Header.svelte";
    import Footer from "../components/blocks/Footer.svelte";
    import { iconsDataDisplayStore, initIconDataStoreThunk } from "../stores/iconsStore";

    export let data;

    let iconsData = {};

    onMount(() => {
        if(data.iconsData) initIconDataStoreThunk(data.iconsData)
    })

    $: iconsData = $iconsDataDisplayStore;

    const clickOverlayEventsHandler = (event) => {
        const options = {detail: event.target};
        const closeDropDownEvent = new CustomEvent('closeAllDropDowns', options);
        document.dispatchEvent(closeDropDownEvent);
    }

</script>

<svelte:document on:click={clickOverlayEventsHandler} />

<svelte:head>
    <title>Download icons</title>
</svelte:head>

<div class="container">
    <Header />
    <IconList {iconsData}/>
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        grid-gap: 30px;
        align-items: start;
        align-content: start;
        justify-content: center;
        justify-items: center;
        min-height: 100dvh;
        box-sizing: border-box;
        padding: 30px;
        margin: 0 auto;
    }
</style>
