<template>
    <ui-modal ref="errorModal"
              v-cloak title="Error">
        <div class="text-center">
            <slot v-if="$errors.isUnderMaintenance" name="maintenance">The site is currently in maintenance. Try again in a moment.</slot>
            <slot v-if="$errors.isUnauthorized" name="unauthorized">This action is not allowed.</slot>
            <slot v-if="$errors.isUnexpected" name="unexpected">An unexpected error occurred.</slot>
            <slot v-if="$errors.isNotFound" name="unexpected">This action does not exist.</slot>
            <slot v-if="$errors.isExpired" name="expired">The form has expired. Please reload the page and try again.</slot>
            <slot v-if="$errors.isInvalid" name="invalid">One or more fields are invalid. Please review and try again.</slot>
            <slot name="actions">
                <button class="btn btn-danger mt-4"
                        type="button"
                        @click="closeModal('errorModal')">Close
                </button>
            </slot>
        </div>
    </ui-modal>
</template>
<script>
    export default {
        name: "ErrorModal"
    }
</script>
