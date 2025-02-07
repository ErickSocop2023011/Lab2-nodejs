import Pet from "../pet/pet.model.js";
import Appointment from "../appointment/appointment.model.js";
import { parse } from "date-fns";

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;

    const isoDate = new Date(data.date);

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Fecha inválida",
      });
    }

    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        msg: "No se encontró la mascota" 
      });
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });

    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "El usuario y la mascota ya tienen una cita para este día",
      });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: `Cita creada exitosamente en fecha ${data.date}`,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      msg: "Error al crear la cita", 
      error 
    }); 
  }
  
};

export const updateAppointment = async (req, res) => {
  try {
    const { uid } = req.params;
    const data = req.body

    const appointment = await Appointment.findByIdAndUpdate(uid, data, {new:true});

    return res.status(200).json({
      success: true,
      msg: 'Appointment Updated',
      appointment
  });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Error updating appointment',
      error: err.message
  });
  }
  
}

export const getAppointmentByUser = async (req, res) => {
  const { limite = 10, desde = 0 } = req.query;
  const query = { status: true };
  
      try {
        const  appointment = await Appointment.find(query)
          .skip(Number(desde))
          .limit(Number(limite));
  
          const AppointmentWithUser = await Promise.all(appointment.map(async (app) => {
            const usuario = await User.findById(app.user);
            return{
              ...app.toObject(),
              user: usuario ? usuario.nombre : "usuario no encontrado"
            };
          }));
  
          const total = await Appointment.countDocuments(query);
  
          res.status(200).json({
              success: true,
              total,
              appointment : AppointmentWithUser
          });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Error al obtener las citas',
              error
          });
      }
}

export const cancelAppointment = async (req, res) => {
  try{
          const { uid } = req.params
          const app = await Appointment.findByIdAndUpdate(uid, {status: "CANCELLED"}, {new: true})
  
          return res.status(200).json({
              success: true,
              message: "Appointment Canceled",
              app
          })
      }catch(err){
          return res.status(500).json({
              success: false,
              message: "Error canceling appointment",
              error: err.message
          })
      }
}
