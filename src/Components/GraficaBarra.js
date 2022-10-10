import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import React, { useMemo } from "react";
import Swal from "sweetalert2";
import "chart.piecelabel.js";
import 'animate.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function GraficaBarra() {
  var cant = [];
  var empresa = [];
  var d = 0;
  var f = 0;
  var total = 0;
  const [equipo, setEquipo] = React.useState([]);

  //////////////////////////s

  let date = new Date();
  let fechai = "2022-09-26";
  let fechaf = date.toISOString().split("T")[0];
  ///////////////////////////////

  const obtenerDatos = async () => {
    const resp = await fetch(
      "http://192.168.4.221:82/api/dashboardbitacoracompanys/fil",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: 1, id_place: 1, fechai, fechaf }),
      }
    )
      .then((resp) => resp.json())

      .then((resp) => {
        setEquipo(resp.data);

        console.log(setEquipo);
      })
      .catch((error) => console.log("error"));
  };

  React.useEffect(() => {
    obtenerDatos();
  }, []);
  /////////////MAPEO PARA CALCULAR EL NUMERO DE VISITANTES FUERA, DENTRO Y EL TOTAL DE VISITANTES
  equipo.map((element, index) => {
    cant[index] = element.cantidad;
    empresa[index] = element.company;
  });

  const labels = [empresa[0], empresa[1]];

  const opciones = {
    responsive: false,
    pieceLabel: {
      render: function (args) {
        return args.labels + ":" + args.value;
      },
      fontSize: 15,
      fontColor: "#fff",
      fontFamily: "Arial",
    },
    plugins:{
      legend: {
        display: true
      }
    }
  };
///////////////
  const alerta = () => {
    Swal.fire({
      title: 'VISITAS POR EMPRESA',
      text: 'Cormago: 4',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  };
///////////////////////////
  const datas = useMemo(function () {
    return {
      datasets: [
        {
          label: "mis datos",
          data: cant,

          backgroundColor: ["rgb(36, 186, 238)", "green"],
        },
      ],
      labels,
    };
  });

  return <Pie data={datas} options={opciones} onClick={() => alerta()} />;
}
