<script>
    export let id = 'colorChangerId';
    export let color = 'tomato';

    let colorForData = '';
    $: colorForData = color;

    const changeColorHandle = (event) => {
        color = event.target.value;
    }

</script>

<label for="{id}" class="colorChanger">
    <div class="colorPicker__display" style:background-color={color}></div>
    <input
        type="color"
        class="colorPicker__input"
        data-value=""
        value={color}
        name="color"
        on:change={changeColorHandle}
        id="{id}"
    />
</label>

<style>
    .colorPicker__input {
        position: absolute;
        visibility: hidden;
        width: 0px;
        padding: 0;
        margin: 0;
    }

    .colorPicker__display {
        width: 100%;
        height: 100%;
        border-radius: 10em;
    }

    .colorChanger {
        cursor: pointer;
        position: relative;
        padding: 0;
        display: flex;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
    }
</style>
