<template>
    <div>
        <ui-modal v-for="modal in modals"
                  :title="modal.title"
                  :ref="modal.ref"
                  :key="modal.ref">
            {{ modal.content }}
        </ui-modal>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        modals: []
      };
    },
    mounted() {
      this.$events.on('openModal', this.open);
      this.$events.on('closeModal', this.close);
    },
    methods: {
      open(ref, options = {
        content: 'Modal content'
      }) {
        let modal = this.exists(ref);

        if (modal) {
          Object.assign(modal, options);

          this.showModal(ref);

          return;
        }

        this.modals.push(Object.assign({
          ref
        }, options));

        this.showModal(ref);
      },
      exists(ref) {
        return this.findModal(ref);
      },
      findModal(ref) {
        return this.modals.find(modal => modal.ref === ref);
      },
      showModal(ref) {
        this.$nextTick(function () {
          this.toggleModal(ref, 'open');
        });
      },
      close(ref, options = {}) {
        if (this.exists(ref)) {
          this.closeModal(ref);

          // return;
        }

        // console.error(`The modal ${ref} does not exist.`);
      },
      closeModal(ref) {
        this.toggleModal(ref, 'close');
      },
      toggleModal(ref, action) {
        let $modal = this.$refs[ref][0];

        $modal[action]();

        console.log(ref, action);
      }
    }
  };
</script>
