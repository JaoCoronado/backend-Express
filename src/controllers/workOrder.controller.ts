import { Request, Response } from "express";
import { WorkOrderModel } from "../models/workOrder.model";
// import { UserModel } from "../models/user.model";


export const createWorkOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    // const { admin } = req.body;

    const newWorkOrder = new WorkOrderModel({
      ...data,
    });

    // const user = await UserModel.findById(admin);

    // if (!user) return res.json({ ok: false, msg: "uusario no registrado" });

    const saveWorkOrder = await newWorkOrder.save();

    if (saveWorkOrder) {
      res.json({
        ok: true,
        msg: "Orden de trabajo creada correctamente",
        workOrder: saveWorkOrder,
      });
    }
  } catch (error) {
    res.status(401).json({ ok: false, msg: `ocurrion un error: ${error}` });
  }
};

export const getWorkOrders = async (req: Request, res: Response) => {
  try {
    const getAllStores = await WorkOrderModel.find()
    
    res.json({ ok: true, workOrders: getAllStores });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error occurred", error });
  }
};

// export const getWorkOrderById = async (req: Request, res: Response) : Promise<void> => {
//   const id = req.params.id;

//   // Verifica si el id es inválido
//   if (!id) {
//     return res.status(400).json({ ok: false , msg: "nose encontro el id "});
//   }

//   try {
//     // Busca la orden de trabajo por id
//     const workOrder = await WorkOrderModel.findById(id);
    
//     if (!workOrder) {
//       return res.status(404).json({ ok: false, msg: "No se encontró la orden de trabajo con ese id" });
//     }

//     // Si la encuentra, retorna la orden de trabajo
//     res.json({ ok: true, workOrder });
//   } catch (error) {
//     res.status(500).json({ ok: false, msg: `Ocurrió un error: ${error}` });
//   }
// };
export const getWorkOrderById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ ok: false, msg: "No se encontró el id" });
    return;
  }

  try {
    const workOrder = await WorkOrderModel.findById(id);
    
    if (!workOrder) {
      res.status(404).json({ ok: false, msg: "No se encontró la orden de trabajo con ese id" });
      return;
    }

    res.json({ ok: true, workOrder });
  } catch (error) {
    res.status(500).json({ ok: false, msg: `Ocurrió un error: ${error}` });
  }
};

export const updateWorkOrderById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = req.body;

  if (!id) {
    res.status(400).json({ ok: false, msg: "Debe enviar un ID válido" });
    return;
  }

  if (!data || Object.keys(data).length === 0) {
    res.status(400).json({ ok: false, msg: "Debe enviar datos para actualizar la orden" });
    return;
  }

  try {
    const updatedWorkOrder = await WorkOrderModel.findByIdAndUpdate(id, data, { new: true });

    if (!updatedWorkOrder) {
      res.status(404).json({ ok: false, msg: "No se pudo actualizar la orden de trabajo" });
      return;
    }

    res.json({ ok: true, workOrder: updatedWorkOrder });
  } catch (error) {
    res.status(500).json({ ok: false, msg: `Ocurrió un error: ${error}` });
  }
};
export const deleteWorkOrderById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  
  if (!id) {
    res.status(400).json({ ok: false, msg: "Debe enviar un ID válido" });
    return;
  }

  try {
    const deleteStore = await WorkOrderModel.findByIdAndDelete(id);
    if (deleteStore) {
      res.json({ ok: true, msg: "Orden de trabajo eliminada correctamente" });
    } else {
      res.json({ ok: false, msg: "Orden de trabajo no se pudo eliminar" });
    }
  } catch (error) {
    res.status(401).json({ ok: false, msg: `ocurrió un error: ${error}` });
  }
};
// export const updateWorkOrderById= async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const data = req.body;

//   if (id === "" || id === null || id === undefined) return  res.status(400).json({ ok: false, msg: "Debe enviar un ID válido" });
//   if (!data) return "debe enviar datos para actualizar la tienda";

//   try {
//     const updateStore = await WorkOrderModel.findByIdAndUpdate(id, data, {
//       new: true,
//     });
//     if (updateStore) {
//       res.json({ ok: true, store: updateStore });
//     } else {
//       res.json({ ok: false, msg: `no se pudo actualizar la tienda` });
//     }
//   } catch (error) {
//     res.status(401).json({ ok: false, msg: `ocurrio un error: ${error}` });
//   }
// };

// export const updateWorkOrderById = async (req: Request, res: Response): Promise<void> => {
//   const id = req.params.id;
//   const data = req.body;

//   // Verifica si el ID es válido
//   if (!id) {
//     return res.status(400).json({ ok: false, msg: "Debe enviar un ID válido" });
//   }

//   // Verifica si se enviaron los datos
//   if (!data || Object.keys(data).length === 0) {
//     return res.status(400).json({ ok: false, msg: "Debe enviar datos para actualizar la orden" });
//   }

//   try {
//     // Actualiza la orden de trabajo
//     const updatedWorkOrder = await WorkOrderModel.findByIdAndUpdate(id, data, { new: true });

//     if (!updatedWorkOrder) {
//       return res.status(404).json({ ok: false, msg: "No se pudo actualizar la orden de trabajo" });
//     }

//     // Respuesta exitosa
//     return res.json({ ok: true, workOrder: updatedWorkOrder });
//   } catch (error) {
//     return res.status(500).json({ ok: false, msg: `Ocurrió un error: ${error}` });
//   }
// };


// export const deleteWorkOrderById = async (req: Request, res: Response) : Promise<void> => {
//   const id = req.params.id;
//   if (id === "" || id === null || id === undefined) return "debe enviar un id";

//   try {
//     const deleteStore = await WorkOrderModel.findByIdAndDelete(id);
//     if (deleteStore) {
//       res.json({ ok: true, msg: "tienda eliminada correctamente" });
//     } else {
//       res.json({ ok: false, msg: "la tienda no se pudo eliminar" });
//     }
//   } catch (error) {
//     res.status(401).json({ ok: false, msg: `ocurrio un error: ${error}` });
//   }
// };
