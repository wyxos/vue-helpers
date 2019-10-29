<template>
    <div>
        <ui-modal ref="exampleModal">
            <button @click="closeModal('exampleModal')">Close</button>
        </ui-modal>
        <button @click="openModal('exampleModal')">
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