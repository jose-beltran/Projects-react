import { toast } from 'react-toastify'
import { Patient } from "../types";
import PatientDetailItem from "./PatientDetailItem";
import { usePatientStore } from "../store";

type PatientDetailsProps = {
  patient: Patient;
};

const PatientDetails = ({ patient }: PatientDetailsProps) => {

  const { deletePatient, getPatientById } = usePatientStore()

  const handleClick = () => {
    deletePatient(patient.id)
    toast.error('Paciente eliminado', {
      theme: 'dark'
    })
  }

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="Nombre" data={patient.name} />
      <PatientDetailItem label="Propietario" data={patient.caretaker} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="Fecha Alta" data={patient.date.toString()} />
      <PatientDetailItem label="Síntomas" data={patient.symptoms} />

      <div className="flex flex-col ld:flex-row justify-content gap-3 mt-10">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg cursor-pointer"
          onClick={() => getPatientById(patient.id)}
        >
          Editar
        </button>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg cursor-pointer"
          onClick={handleClick}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
