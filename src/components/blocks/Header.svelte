<script>
    import WhiteRoundBlock from "../grid/WhiteRoundBlock.svelte";
    import SearchBlock from "./SearchBlock.svelte";
</script>

<WhiteRoundBlock>
    <div class="header">
        <div class="logo">
            Mrkch
        </div>
        <SearchBlock />
    </div>
</WhiteRoundBlock>

<style>
    .header {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        gap: 20px;
    }

    .logo {
        display: flex;
        align-items: center;
        text-transform: uppercase;
        font-size: 25px;
        font-weight: 900;
        letter-spacing: -5px;
    }
</style>
