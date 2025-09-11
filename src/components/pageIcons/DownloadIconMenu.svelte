<script>
    import { slide } from "svelte/transition";

    export let isShowContextMenu = false;
    export let menuValue = 'svg';

    const clickMenuHandle = (event) => {
        menuValue = event.target.value;
        isShowContextMenu = false;
    }

    const toggleShowMenuHandle = () => {
        isShowContextMenu = !isShowContextMenu
    }
</script>

<div class="downloadIconMenu">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button class="openMenuButton" on:click={toggleShowMenuHandle}></button>
    {#if isShowContextMenu}
    <div class="menu" transition:slide>
        <button class="menuItem" on:click={clickMenuHandle} value='svg'>svg</button>
        <button class="menuItem" on:click={clickMenuHandle} value='base64'>base64</button>
        <button class="menuItem" on:click={clickMenuHandle} value='php'>php</button>
    </div>
    {/if}
</div>

<style>
    .downloadIconMenu {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .openMenuButton {
        cursor: pointer;
        background-color: transparent;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1MTIgNTEyJyBjbGFzcz0nc3ZlbHRlLWM4dHlpaCcgZmlsbD0nIzQ0NCc+PHBhdGggZD0nTTQxNiAxOTkuNWgtOTEuNFY2NEgxODcuNHYxMzUuNUg5NmwxNjAgMTU4LjEgMTYwLTE1OC4xek05NiA0MDIuOFY0NDhoMzIwdi00NS4ySDk2eic+PC9wYXRoPjwvc3ZnPg==");
        background-size: 85%;
        background-repeat: no-repeat;
        background-position: center;
        border: none;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .menu {
        position: absolute;
        /* bottom: calc(100% + 5px); */
        bottom: 100%;
        box-shadow: 0px 7px 13px 2px rgba(0, 0, 0, .2);
        background-color: #fff;
        border-radius: 4px;
        padding: 0;
        margin: 0;
        overflow: hidden;
    }

    .menuItem {
        cursor: pointer;
        width: 100%;
        border: none;
        background-color: #fff;

        text-align: left;
        padding: 5px 10px;
        transition: .2s;
    }

    .menuItem:hover {
        filter: brightness(.9);
    }
</style>