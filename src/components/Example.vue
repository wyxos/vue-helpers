<template>
    <div>
        <modal ref="exampleModal">
            <button @click="closeUiModal('exampleModal')">Close</button>
        </modal>
        <button @click="openUiModal('exampleModal')">
            Open
        </button>

        <button @click="$modals.open('globalModal')">Open global</button>
    </div>
</template>
<script>
    export default {
        name: 'Example'
    }
</script>
