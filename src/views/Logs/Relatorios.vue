<template>
  <div class="container is-fluid">
    <section class="space-section-padding">
      <table class="table is-hoverable">
        <div class="padding">
          <div class="tile is-ancestor is-12">
            <div class="tile is-parent">
              <article class="tile is-child box has-background-grey">
                <p class="title">Total de Erros</p>
                <p class="title">{{ total }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box notification is-info">
                <p class="title">Debugs</p>
                <p class="title">{{ totalTipo("debug") }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box notification is-danger">
                <p class="title">Error</p>
                <p class="title">{{ totalTipo("error") }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box notification is-warning">
                <p class="title">Warning</p>
                <p class="title">{{ totalTipo("warning") }}</p>
              </article>
            </div>
          </div>
          <div class="tile is-ancestor pie is-12">
            <div class="tile is-parent is-6">
              <div class="tile is-child is-5">
                <chart :options="chartStatus"></chart>
              </div>
              <div class="tile is-12 is-vertical">
                <p>Legenda</p>
                <span>
                  <i class="far fa-square noventa"></i>
                  {{ getMonth(90) }}
                </span>
                <span>
                  <i class="far fa-square sessenta"></i>
                  {{ getMonth(60) }}
                </span>
                <span>
                  <i class="far fa-square trinta"></i>
                  {{ getMonth(30) }}
                </span>
              </div>
            </div>

            <div class="tile is-parent is-6">
              <div class="tile is-vertical is-child">
                <chart :options="pieLevel"></chart>
              </div>
            </div>
          </div>


          <div class="tile is-ancestor pie is-12">
            <div class="tile is-parent is-6">
              <div class="tile is-child is-5">
                <chart :options="chartAmbiente"></chart>
              </div>
              <div class="tile is-12 is-vertical">
                <p>Legenda</p>
                <span>
                  <i class="far fa-square noventa"></i>
                  {{ getMonth(90) }}
                </span>
                <span>
                  <i class="far fa-square sessenta"></i>
                  {{ getMonth(60) }}
                </span>
                <span>
                  <i class="far fa-square trinta"></i>
                  {{ getMonth(30) }}
                </span>
              </div>
            </div>
            <div class="tile is-parent is-6">
              <div class="tile is-vertical is-child">
                <chart :options="pieOrigin"></chart>
              </div>
            </div>
          </div>
          <div class="tile is-ancestor is-12" style="margin-top: -130px">
            <div class="tile is-parent">
              <article class="tile is-child box has-background-white-ter">
                <p class="title">Coletados</p>
                <p class="title">{{ totalStatus("Coletado") }}</p>
              </article>
              <article class="tile is-child box has-background-white-ter">
                <p class="title">Arquivados</p>
                <p class="title">{{ totalStatus("Arquivado") }}</p>
              </article>
              <article class="tile is-child box has-background-white-ter">
                <p class="title">Apagados</p>
                <p class="title">{{ totalStatus("Apagado") }}</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box has-background-grey-lighter">
                <p class="title">Produção</p>
                <p class="title">{{ totalAmbiente("Produção") }}</p>
              </article>
              <article class="tile is-child box has-background-grey-lighter">
                <p class="title">Homologação</p>
                <p class="title">{{ totalAmbiente("Homologação") }}</p>
              </article>
              <article class="tile is-child box has-background-grey-lighter">
                <p class="title">Desenvolvimento</p>
                <p class="title">{{ totalAmbiente("Desenvolvimento") }}</p>
              </article>
            </div>
          </div>
        </div>
      </table>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "echarts/lib/component/title";
let moment = require("moment");

export default {
  name: "Relatorios",
  components: {},
  data() {
    return {
      total: null,
      pieOrigin: {
        title: {
          show: true,
          text: "Distribuição por Origem",
          left: 230,
        },
        series: [
          {
            type: "pie",
            radius: [0, "100%"],
            center: ["55%", "60%"],
            bottom: 50,
            color: ["#18ca29", "#ca5618", "#5618ca"],
            label: {
              position: "outer",
              color: "black",
            },
            labelLine: {
              show: true,
              length: 25,
              length2: 25,
              smooth: false,
            },
            data: [
              { value: this.totalOrigem("database"), name: "Database" },
              { value: this.totalOrigem("backend"), name: "Backend" },
              { value: this.totalOrigem("frontend"), name: "Frontend" },
            ],
          },
        ],
      },
      pieLevel: {
        title: {
          show: true,
          text: "Distribuição por Tipo",
          left: 230,
        },
        series: [
          {
            type: "pie",
            radius: [0, "100%"],
            center: ["55%", "60%"],
            bottom: 50,
            color: ["#3298dc", "#f14668", "#ffdd57"],
            label: {
              position: "outer",
              color: "black",
            },
            labelLine: {
              show: true,
              length: 25,
              length2: 25,
              smooth: false,
            },
            data: [
              { value: this.totalTipo("debug"), name: "Debug" },
              { value: this.totalTipo("error"), name: "Error" },
              { value: this.totalTipo("warning"), name: "Warning" },
            ],
          },
        ],
      },
      chartStatus: {
        responsive: true,
        color: ["#17A589", "#943126", "#34495E"],
        title: {
          show: true,
          text: "Variação últimos 3 meses por Status",
          left: 150,
        },
        dataset: {
          source: [
            [
              "Coletado",
              this.logsStatusPorData("Coletado", 90, 60),
              this.logsStatusPorData("Coletado", 60, 30),
              this.logsStatusPorData("Coletado", 30, 0),
            ],
            [
              "Arquivado",
              this.logsStatusPorData("Arquivado", 90, 60),
              this.logsStatusPorData("Arquivado", 60, 30),
              this.logsStatusPorData("Arquivado", 30, 0),
            ],
            [
              "Apagado",
              this.logsStatusPorData("Apagado", 90, 60),
              this.logsStatusPorData("Apagado", 60, 30),
              this.logsStatusPorData("Apagado", 30, 0),
            ],
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      },
      chartAmbiente: {
        responsive: true,
        color: ["#17A589", "#943126", "#34495E"],
        title: {
          show: true,
          text: "Variação últimos 3 meses por Ambiente",
          left: 150,
        },
        dataset: {
          source: [
            [
              "Produção",
              this.logsAmbientePorData("Produção", 90, 60),
              this.logsAmbientePorData("Produção", 60, 30),
              this.logsAmbientePorData("Produção", 30, 0),
            ],
            [
              "Homologação",
              this.logsAmbientePorData("Homologação", 90, 60),
              this.logsAmbientePorData("Homologação", 60, 30),
              this.logsAmbientePorData("Homologação", 30, 0),
            ],
            [
              "Desenvolvimento",
              this.logsAmbientePorData("Desenvolvimento", 90, 60),
              this.logsAmbientePorData("Desenvolvimento", 60, 30),
              this.logsAmbientePorData("Desenvolvimento", 30, 0),
            ],
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      },
    };
  },
  methods: {
    ...mapState(["logs"]),
    totalLogs() {
      this.total = this.logs().length;
    },
    totalTipo(level) {
      const logsByLevel = this.logs().filter((log) => log.level === level);
      return logsByLevel.length;
    },
    totalOrigem(origem) {
      const logsByOrigem = this.logs().filter((log) => log.origin === origem);
      return logsByOrigem.length;
    },
    totalAmbiente(ambiente) {
      const logsByAmbiente = this.logs().filter(
        (log) => log.environment === ambiente
      );
      return logsByAmbiente.length;
    },
    totalStatus(status) {
      const logsByStatus = this.logs().filter((log) => log.status === status);
      return logsByStatus.length;
    },
    logsStatusPorData(status, inicio, fim) {
      const logsByStatus = this.logs().filter((log) => log.status === status);
      const logsBydate = logsByStatus.filter(
        (log) =>
          moment().subtract(fim, "days") >= moment(log.date) &&
          moment(log.date) >= moment().subtract(inicio, "days")
      );
      return logsBydate.length;
    },
    logsAmbientePorData(environment, inicio, fim) {
      const logsByAmbiente = this.logs().filter(
        (log) => log.environment === environment
      );
      const logsBydate = logsByAmbiente.filter(
        (log) =>
          moment().subtract(fim, "days") >= moment(log.date) &&
          moment(log.date) >= moment().subtract(inicio, "days")
      );
      return logsBydate.length;
    },
    getMonth(dias) {
      let mes = moment()
        .subtract(dias, "days")
        .get("month");
      return moment()
        .month(mes)
        .format("MMM");
    },
  },
  created() {
    this.totalLogs();
  },
};
</script>

<style scoped>

.sessenta {
  background-color: #943126;
}

.trinta {
  background-color: #34495e;
}

.noventa {
  background-color: #17a589;
}

table {
  width: 100%;
  border-radius: 5px;
}
.padding {
  padding: 20px;
}

.pie {
  margin-bottom: 80px;
  padding-bottom: 120px;
}

.space-section-padding {
  margin-top: 5px;
}

</style>
