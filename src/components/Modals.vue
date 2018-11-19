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
    data: function () {
      return {
        modals: []
      };
    },
    mounted: function () {
      this.$events.on('openModal', this.open);
      this.$events.on('closeModal', this.close);
    },
    methods: {
      open: function (ref, options = {
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
      exists: function (ref) {
        return this.findModal(ref);
      },
      findModal: function (ref) {
        return this.modals.find(modal => modal.ref === ref);
      },
      showModal: function (ref) {
        this.$nextTick(function () {
          this.toggleModal(ref, 'open');
        });
      },
      close: function (ref, options = {}) {
        if (this.exists(ref)) {
          this.closeModal(ref);

          // return;
        }

        // console.error(`The modal ${ref} does not exist.`);
      },
      closeModal: function (ref) {
        this.toggleModal(ref, 'close');
      },
      toggleModal: function (ref, action) {
        let $modal = this.$refs[ref][0];

        $modal[action]();

        console.log(ref, action);
      }
    }
  };
</script>
