<template>
    <ui-modal ref="errorModal"
              v-cloak title="Error">
        <div class="text-center">
            <p v-if="$errors.isUnderMaintenance">The site is currently in maintenance. Try again in a moment.</p>
            <p v-if="$errors.isUnauthorized">This action is not allowed.</p>
            <p v-if="$errors.isUnexpected">An unexpected error occurred.</p>
            <p v-if="$errors.isExpired">The form has expired. Please reload the page and try again.</p>
            <p v-if="$errors.isInvalid">One or more fields are invalid. Please review and try again.</p>
            <button class="btn btn-danger mt-4" type="button"
                    @click="closeModal('errorModal')">Close
            </button>
        </div>
    </ui-modal>
</template>
<script>
    export default {
        name: "ErrorModal"
    }
</script>
