<template>
    <ui-modal ref="errorModal"
              v-cloak :title="title">
        <div class="text-center">
            <slot v-if="$errors.isUnderMaintenance" name="maintenance">The site is currently in maintenance. Try again in a moment.</slot>
            <slot v-if="$errors.isUnauthorized" name="unauthorized">This action is not allowed.</slot>
            <slot v-if="$errors.isUnexpected" name="unexpected">An unexpected error occurred.</slot>
            <slot v-if="$errors.isNotFound" name="not-found">This action does not exist.</slot>
            <slot v-if="$errors.isUnauthenticated" name="unauthenticated">You need to be logged in to perform this action.</slot>
            <slot v-if="$errors.isExpired" name="expired">The form has expired. Please reload the page and try again.</slot>
            <slot v-if="$errors.isInvalid" name="invalid">One or more fields are invalid. Please review and try again.</slot>
            <div>
                <slot name="actions">
                    <button class="btn btn-danger mt-4"
                            type="button"
                            @click="closeModal('errorModal')">Close
                    </button>
                </slot>
            </div>
        </div>
    </ui-modal>
</template>
<script>
    export default {
        name: "ErrorModal",
        props: {
            title: 'Error'
        }
    }
</script>
