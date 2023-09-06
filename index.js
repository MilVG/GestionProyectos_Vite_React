import express from "express";
import conectMongodb from "./config/db.js";
import dotenv  from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import cors from "cors";
import { Server } from "socket.io";


const app = express();
app.use(express.json());


dotenv.config();

conectMongodb();


//Configurar Cors

const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions));


//Rounting
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const PORT = process.env.PORT || 4000;
const servidor = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


//Socket.io

const io = new Server(servidor,{
    pingTimeout:60000,
    cors: {
        origin: process.env.FRONTEND_URL
    },
});

io.on("connection", (socket) => {

    //Definir los eventos de socket.io
   socket.on("abrir proyecto", (proyecto) => {
       socket.join(proyecto);
   })

   //deben tener el mismo nombre de los parametros pasados al frontend en este caso "tarea agregada tal cual"
   socket.on("nueva tarea", (tarea) => {
       socket.to(tarea.proyecto).emit("tarea agregada", tarea);
   })
   //debe tener el mismo parametro en el frontend "tarea eliminada tal cual"
   socket.on("eliminar tarea", (tarea) => {
       socket.to(tarea.proyecto).emit("tarea eliminada", tarea);
   })

   socket.on("actualizar tarea", (tarea) => {
       const proyecto = tarea.proyecto._id
       socket.to(proyecto).emit("tarea actualizada", tarea);
   })

   socket.on("cambiar estado", (tarea) => {
       const proyecto = tarea.proyecto._id
       socket.to(proyecto).emit("nuevo estado", tarea);
   })
})
