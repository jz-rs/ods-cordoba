import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

export type Reporte = {
  id:          string;
  lat:         number;
  lng:         number;
  descripcion: string;
  categoria:   string;
  created_at:  string;
};

export type Encuesta = {
  id:                  string;
  ods4_tecnologia:     string;
  ods4_satisfaccion:   number;
  ods4_oportunidades:  string;
  ods4_razon_no:       string;
  ods4_interes:        string;
  ods7_renovable:      string;
  ods7_consciencia:    string;
  ods7_desafios:       string;
  ods7_satisfaccion:   number;
  ods11_espacios:      string;
  ods11_estado:        number;
  ods11_riesgos:       string;
  ods11_contenedores:  string;
  ods12_reciclaje:     string[];
  ods12_plasticos:     string;
  ods12_comercios:     string;
  ods12_ecoamigable:   string;
  ods12_razon_no:      string;
  ods13_cambios:       string;
  ods13_importancia:   string;
  ods13_participacion: string;
  ods13_razon_no:      string;
  ods15_areas_verdes:  string;
  ods15_flora_fauna:   string;
  ods15_compromiso:    string;
  created_at:          string;
};
