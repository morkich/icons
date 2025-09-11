<script>
    import { filterIconsBySearchQueryThunk, iconsDataStore } from "../../stores/iconsStore";

    const inputSearchHandle = (event) => {
        const query = event.target.value;
        const iconDataInStore = $iconsDataStore;
        filterIconsBySearchQueryThunk({query, iconDataInStore});
    }
</script>

<div class="searchInput">
    <input type="text" value='' on:input={inputSearchHandle}>
    <div class="icon"></div>
</div>

<style>
    .searchInput {
        position: relative;
        width: 100%;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25) inset;
        border-radius: 3px;
        min-height: 35px;
        box-sizing: border-box;
    }

    .searchInput input {
        background-color: transparent;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: none;
        outline: none;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: start;
        color: #444;
    }
    .icon {
        position: absolute;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1MTIgNTEyJyBjbGFzcz0nc3ZlbHRlLWM4dHlpaCcgZmlsbD0nI2RlZGVkZSc+PHBhdGggZD0nTTMzNy41MDkgMzA1LjM3MmgtMTcuNTAxbC02LjU3MS01LjQ4NmMyMC43OTEtMjUuMjMyIDMzLjkyMi01Ny4wNTQgMzMuOTIyLTkzLjI1N0MzNDcuMzU4IDEyNy42MzIgMjgzLjg5NiA2NCAyMDUuMTM1IDY0IDEyNy40NTIgNjQgNjQgMTI3LjYzMiA2NCAyMDYuNjI5czYzLjQ1MiAxNDIuNjI4IDE0Mi4yMjUgMTQyLjYyOGMzNS4wMTEgMCA2Ny44MzEtMTMuMTY3IDkyLjk5MS0zNC4wMDhsNi41NjEgNS40ODd2MTcuNTUxTDQxNS4xOCA0NDggNDQ4IDQxNS4wODYgMzM3LjUwOSAzMDUuMzcyem0tMTMxLjI4NCAwYy01NC43MDIgMC05OC40NjMtNDMuODg3LTk4LjQ2My05OC43NDMgMC01NC44NTggNDMuNzYxLTk4Ljc0MiA5OC40NjMtOTguNzQyIDU0LjcgMCA5OC40NjIgNDMuODg0IDk4LjQ2MiA5OC43NDIgMCA1NC44NTYtNDMuNzYyIDk4Ljc0My05OC40NjIgOTguNzQzeic+PC9wYXRoPjwvc3ZnPg==");
        width: 30px;
        height: 30px;
        right: 0;
        top: 0;
        margin: 3px;
    }

</style>
