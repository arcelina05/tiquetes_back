const client = require("../db/database");

const listarReservas = async (req, res) => {
  try {
    const db = client.db("Tiquetes");
    const collection = db.collection("Reservas");
    const reservas = await collection.find().toArray();
    res.json(reservas); 
  } catch (error) {
    console.error("Error al cargar las reservas:", error);
    res.status(500).json({ mensaje: "Error al cargar las reservas" });
  }
};

const guardarReservas = async (req, res) => {
  const nuevaReserva = req.body;

  try {
    const db = client.db("Tiquetes");
    const collection = db.collection("Reservas");
    const filtro = { origen: nuevaReserva.origen };
    const filtro2 = { destino: nuevaReserva.destino };
    const filtro3 = { fecha: nuevaReserva.fecha };
    let mensaje = "";
    let creado= "";

    // Realizar la consulta utilizando el método find() con el filtro
    const filtroOrigen = await collection.find(filtro).toArray();
    const filtroDestino = await collection.find(filtro2).toArray();
    const filtroFecha= await collection.find(filtro3).toArray();
    if (filtroOrigen.length > 0 || filtroDestino.length > 0 || filtroFecha.length > 0 ) {
      mensaje= "Ya existe una reserva con esas caracteristicas";
      creado= "no";
    } else {
      const newReserve = await collection.insertOne(nuevaReserva);
      mensaje = "Reserva creada";
      creado="si"
    }
    res.json({ mensaje: mensaje,creado: creado });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ mensaje: "Error al crear la reserva" });
  }
};

const buscarPaises = async (req, res) => {

    const {buscar} = req.body;

    const regex = new RegExp(buscar, 'i'); // 'i' para que la búsqueda sea insensible a mayúsculas y minúsculas

    try{
        const db = client.db("Tiquetes");
    const collection = db.collection("Countries");
    const paisesBuscados = await collection.find({ name: regex }).toArray();
    res.json(paisesBuscados);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ mensaje: "Error al buscar pais" });
      }
};


module.exports = { listarReservas, guardarReservas, buscarPaises };
