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
  registerables,
} from "chart.js";
import { Doughnut} from "react-chartjs-2";
import { useMemo, defaults  } from "react";
import Swal from "sweetalert2";


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

const scores1 = [90, 10];

const labels = ["Completo", "Incompleto"];

const opciones = {
  responsive:false,
  
};

export default function GraficaAnillo() {
  const pluginText = [
    {
      id: "total",
      beforeDraw(chart, arg, options) {
        const {
          ctx,
          chartArea: { top, right, bottom, left, width, height },
        } = chart;
        ctx.save();
        ctx.font = "20px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "blue";
        ctx.fillText(scores1[0] + "%", width / 2, top + height / 2);
      },
      
    },
    
  ];

  const data = useMemo(function () {
    return {
      labels,
      datasets: [
        {
          label: "mis datos",
          data: scores1,
          borderWidth: 1,
          cutout: "75%",

          backgroundColor: ["#802FC3", "#CFCFD0"],
        },
      ],
    };
  }, []);

  return <Doughnut data={data} options={opciones} plugins={pluginText} />;
}
