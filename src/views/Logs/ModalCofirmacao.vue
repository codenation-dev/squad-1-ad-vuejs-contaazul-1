<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card modal-size">
      <header class="modal-card-head head-padding">
        <p class="modal-card-title padding-message">Confirmação necessária</p>
        <button
          class="delete button-margin"
          @click="close"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body section-padding">
        {{ modalMessage }}
      </section>
      <footer class="modal-card-foot">
        <button class="button is-pulled-left" @click="close">Cancelar</button>
        <button
          class="button button-success is-success is-pulled-right"
          @click="confirm"
        >
          Confirmar
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalConfirmacao",
  props: {
    type: String,
    log: Object,
  },
  computed: {
    modalMessage() {
      if (this.type == "archive") {
        return "Você deseja realmente arquivar este log?";
      }

      if (this.type == "unarchive") {
        return "Você deseja realmente recuperar este log?";
      }

      if (this.type == "delete") {
        return "Você deseja realmente apagar este log?";
      }

      return null;
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm", this.type, this.log);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.head-padding {
  padding-bottom: 0px;
}

.button-margin {
  margin-top: -26px;
}

.button-success {
  margin-left: 400px;
}

@media screen and (max-width: 768px) {
  .modal-size {
    width: 530px;
  }

  .button-success {
    margin-left: 284px;
  }
}
</style>
