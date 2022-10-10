import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";
import GraficaBarra from "./Components/GraficaBarra";
import GraficaAnillo from "./Components/GraficaAnillo";

const Nosotros = () => {
  var value1 = [];
  var dentro = 0;
  var fuera = 0;
  var total = 0;
  const [equipo, setEquipo] = React.useState([]);

  //////////////////////////s

  let date = new Date();
  let hour = date.toLocaleTimeString("en-US");
  let fecha1 = "2022-09-26";
  let fecha2 = date.toISOString().split("T")[0];
  ///////////////////////////////

  const obtenerDatos = async () => {
    const resp = await fetch(
      "http://192.168.4.221:82/api/dashboardinsideouts/fil",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: 1, id_place: 1, fecha1, fecha2 }),
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
    value1[index] = element.valor1;

    if (value1[index] === "true") {
      fuera = element.valor2;
    } else {
      dentro = element.valor2;
    }
  });
  //
  total = parseInt(dentro) + parseInt(fuera);

  /*const visitantes = [
    "Visitantes dentro",
    "visitantes fuera",
    "Total de visitantes",
  ];
  const num = [dentro, fuera, total];*/

  const cards = [
    {
      id: 1,
      title: "Visitantes dentro",
      visit: dentro,
    },

    {
      id: 2,
      title: "Visitantes fuera",
      visit: fuera,
    },

    {
      id: 3,
      title: "Total Visitantes",
      visit: total,
    },
  ];

  return (
    <>
      <div className="container-fluid h-100">
        <div className="row d-flex justify-content-center p-3 bd-highlight">
          <div className="col-xl-4">
            <div className="row d-flex justify-content-center ">
              <div className="card">
                <h5 className="card-header">Personas por empresa visitante</h5>
                <div className="card-body">
                  <GraficaBarra />
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="card">
                <h5 className="card-header">Cumplimiento de Protocolos</h5>
                <div className="card-body">
                  <GraficaAnillo />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card">
              <h5 className="card-header">Tiempo de visitantes</h5>
              <div className="card-body">
                <h6 className="card-title">Hora de entrada</h6>
                <p className="Card-text"> Visitante N: {hour}</p>
                <p className="Card-text"> Visitante 2: {hour}</p>
                <p className="Card-text"> Visitante 3: {fecha1}</p>
                <div className="row justify-content-md-center">
                  <p className="card-title">Tiempo Estimado</p>
                  <div className="col-md-auto">
                    <p className="card-title">15 min</p>
                    <h1 className="loader1"></h1>
                    <p className="card-text bg-text-secondary"> Visitante n</p>
                  </div>
                  <div className="col-md-auto align-items-center">
                    <p className="card-title">35 min</p>
                    <h1 className="loader2"></h1>
                    <p className="card-text bg-text-secondary"> Visitante n</p>
                  </div>
                  <div className="col-md-auto">
                    <p className="card-title">20 min</p>
                    <h1 className="loader3"></h1>
                    <p className="card-text bg-text-secondary"> Visitante n</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          {cards.map((card) => (
            <div className="col-md-2" key={card.id}>
              <div className="card">
                <h6 className="card-header text-dark">{card.title}</h6>
                <div className="card-body">
                  <h5 className="card-title ">{card.visit}</h5>
                </div>
                <p className="card-footer text-secondary"> Numero de visitas</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Nosotros;
