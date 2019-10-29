<template>
    <div>
        <ui-modal ref="exampleModal">
            <button @click="closeModal('exampleModal')">Close</button>
        </ui-modal>
        <button @click="openModal('exampleModal')">
            Open
        </button>
    </div>
</template>
<script>
    export default {

    }
</script>