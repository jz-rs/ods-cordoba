"use client";
import { useState } from "react";

const ODS_COLOR: Record<string, string> = {
  "4":  "#c5192d",
  "7":  "#fcc30b",
  "11": "#fd9d24",
  "12": "#bf8b2e",
  "13": "#3f7e44",
  "15": "#56c02b",
};

type State = Record<string, string | string[] | number>;

const INIT: State = {
  ods4_tecnologia: "", ods4_satisfaccion: 5, ods4_oportunidades: "",
  ods4_razon_no: "", ods4_interes: "",
  ods7_renovable: "", ods7_consciencia: "", ods7_desafios: "", ods7_satisfaccion: 5,
  ods11_espacios: "", ods11_estado: 5, ods11_riesgos: "", ods11_contenedores: "",
  ods12_reciclaje: [], ods12_plasticos: "", ods12_comercios: "", ods12_ecoamigable: "",
  ods12_razon_no: "",
  ods13_cambios: "", ods13_importancia: "", ods13_participacion: "", ods13_razon_no: "",
  ods15_areas_verdes: "", ods15_flora_fauna: "", ods15_compromiso: "",
};

function SeccionHeader({ num, titulo }: { num: string; titulo: string }) {
  return (
    <div style={{
      background: ODS_COLOR[num], color: "white", borderRadius: "12px 12px 0 0",
      padding: "16px 24px", marginTop: "40px",
      display: "flex", alignItems: "center", gap: "12px",
    }}>
      <span style={{ fontSize: "28px", fontWeight: 900, opacity: .4 }}>{num}</span>
      <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: ".02em" }}>{titulo}</span>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "white", border: "1px solid #e2e8f0", borderTop: "none",
      borderRadius: "0 0 12px 12px", padding: "24px", marginBottom: "8px",
    }}>
      {children}
    </div>
  );
}

function Pregunta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b", margin: "0 0 10px", lineHeight: 1.5 }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function RadioGroup({ name, options, value, onChange }: {
  name: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {options.map(o => (
        <label key={o} style={{
          display: "flex", alignItems: "center", gap: "10px",
          cursor: "pointer", fontSize: "13px", color: "#475569",
          background: value === o ? "#f0f9ff" : "transparent",
          padding: "8px 12px", borderRadius: "8px",
          border: value === o ? "1.5px solid #3b82f6" : "1.5px solid #e2e8f0",
          transition: "all .15s",
        }}>
          <input type="radio" name={name} value={o} checked={value === o}
            onChange={() => onChange(o)} style={{ accentColor: "#3b82f6" }} />
          {o}
        </label>
      ))}
    </div>
  );
}

function CheckGroup({ name, options, value, onChange }: {
  name: string; options: string[]; value: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (o: string) => {
    onChange(value.includes(o) ? value.filter(x => x !== o) : [...value, o]);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {options.map(o => (
        <label key={o} style={{
          display: "flex", alignItems: "center", gap: "10px",
          cursor: "pointer", fontSize: "13px", color: "#475569",
          background: value.includes(o) ? "#f0f9ff" : "transparent",
          padding: "8px 12px", borderRadius: "8px",
          border: value.includes(o) ? "1.5px solid #3b82f6" : "1.5px solid #e2e8f0",
          transition: "all .15s",
        }}>
          <input type="checkbox" name={name} value={o} checked={value.includes(o)}
            onChange={() => toggle(o)} style={{ accentColor: "#3b82f6" }} />
          {o}
        </label>
      ))}
    </div>
  );
}

function Slider({ name, value, onChange }: {
  name: string; value: number; onChange: (v: number) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <span style={{ fontSize: "12px", color: "#94a3b8" }}>1</span>
      <input type="range" min={1} max={10} value={value} name={name}
        onChange={e => onChange(Number(e.target.value))}
        style={{ flex: 1, accentColor: "#3b82f6" }} />
      <span style={{ fontSize: "12px", color: "#94a3b8" }}>10</span>
      <span style={{
        minWidth: "36px", textAlign: "center", fontWeight: 700,
        fontSize: "18px", color: "#1e40af",
      }}>{value}</span>
    </div>
  );
}

function Textarea({ name, value, onChange, placeholder }: {
  name: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <textarea name={name} value={value} placeholder={placeholder}
      onChange={e => onChange(e.target.value)} rows={3}
      style={{
        width: "100%", padding: "10px 12px", borderRadius: "8px",
        border: "1.5px solid #e2e8f0", fontSize: "13px", lineHeight: 1.6,
        fontFamily: "inherit", color: "#1e293b", resize: "vertical",
        boxSizing: "border-box", outline: "none",
      }} />
  );
}

export default function EncuestaForm() {
  const [form, setForm] = useState<State>(INIT);
  const [step, setStep] = useState(0); // 0=form, 1=enviando, 2=gracias
  const [error, setError] = useState<string | null>(null);

  const set = (key: string) => (v: string | string[] | number) =>
    setForm(prev => ({ ...prev, [key]: v }));

  const handleSubmit = async () => {
    setStep(1);
    setError(null);
    try {
      const res = await fetch("/api/encuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error del servidor");
      setStep(2);
    } catch {
      setError("Hubo un error al enviar. Intentá de nuevo.");
      setStep(0);
    }
  };

  if (step === 2) return (
    <div style={{
      background: "white", borderRadius: "16px", padding: "64px 32px",
      textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,.08)",
    }}>
      <div style={{ fontSize: "64px", marginBottom: "16px" }}>🌱</div>
      <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1e293b", margin: "0 0 12px" }}>
        ¡Gracias por participar!
      </h2>
      <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "400px", margin: "0 auto" }}>
        Tus respuestas ayudan a construir un diagnóstico real de Córdoba para avanzar en los ODS.
      </p>
    </div>
  );

  return (
    <div>
      {/* ODS 4 */}
      <SeccionHeader num="4" titulo="Educación de Calidad" />
      <Card>
        <Pregunta label="¿Tiene usted o sus hijos acceso a tecnología adecuada para participar en la educación a distancia?">
          <RadioGroup name="ods4_tecnologia" options={["Sí", "No"]}
            value={form.ods4_tecnologia as string} onChange={set("ods4_tecnologia")} />
        </Pregunta>
        <Pregunta label="Del 1 al 10, ¿qué tan satisfecho está con la calidad de la educación que recibe usted o sus hijos?">
          <Slider name="ods4_satisfaccion" value={form.ods4_satisfaccion as number} onChange={set("ods4_satisfaccion")} />
        </Pregunta>
        <Pregunta label="¿Percibe oportunidades en su entorno para acceder a educación o formación continua?">
          <RadioGroup name="ods4_oportunidades" options={["Sí", "No"]}
            value={form.ods4_oportunidades as string} onChange={set("ods4_oportunidades")} />
        </Pregunta>
        {form.ods4_oportunidades === "No" && (
          <Pregunta label="Si respondió 'No', ¿podría comentarnos cuál sería la razón?">
            <Textarea name="ods4_razon_no" value={form.ods4_razon_no as string}
              onChange={set("ods4_razon_no")} placeholder="Su respuesta..." />
          </Pregunta>
        )}
        <Pregunta label="¿Está interesado en continuar su educación o recibir formación adicional para mejorar sus perspectivas laborales?">
          <RadioGroup name="ods4_interes" options={["Sí", "No"]}
            value={form.ods4_interes as string} onChange={set("ods4_interes")} />
        </Pregunta>
      </Card>

      {/* ODS 7 */}
      <SeccionHeader num="7" titulo="Energía Asequible y No Contaminante" />
      <Card>
        <Pregunta label="¿Estaría interesado en instalar sistemas de energía renovable en su hogar? ¿Cree que deberían estar subsidiados?">
          <Textarea name="ods7_renovable" value={form.ods7_renovable as string}
            onChange={set("ods7_renovable")} placeholder="Su respuesta..." />
        </Pregunta>
        <Pregunta label="¿Qué tan consciente es del consumo energético de su hogar y qué medidas ha tomado para reducirlo?">
          <Textarea name="ods7_consciencia" value={form.ods7_consciencia as string}
            onChange={set("ods7_consciencia")} placeholder="Su respuesta..." />
        </Pregunta>
        <Pregunta label="¿Cuáles son los principales desafíos que enfrenta al tratar de mejorar la eficiencia energética de su hogar?">
          <Textarea name="ods7_desafios" value={form.ods7_desafios as string}
            onChange={set("ods7_desafios")} placeholder="Su respuesta..." />
        </Pregunta>
        <Pregunta label="Del 1 al 10, ¿qué tan satisfecho está con el costo de la energía eléctrica en relación a sus ingresos?">
          <Slider name="ods7_satisfaccion" value={form.ods7_satisfaccion as number} onChange={set("ods7_satisfaccion")} />
        </Pregunta>
      </Card>

      {/* ODS 11 */}
      <SeccionHeader num="11" titulo="Ciudades y Comunidades Sostenibles" />
      <Card>
        <Pregunta label="¿Considera que en su barrio existen espacios públicos suficientes y accesibles para todas las personas?">
          <RadioGroup name="ods11_espacios" options={["Sí", "No"]}
            value={form.ods11_espacios as string} onChange={set("ods11_espacios")} />
        </Pregunta>
        <Pregunta label="Del 1 al 10, ¿en qué estado se encuentran esos espacios?">
          <Slider name="ods11_estado" value={form.ods11_estado as number} onChange={set("ods11_estado")} />
        </Pregunta>
        <Pregunta label="¿Percibe algún tipo de riesgo de desastres en su comunidad (inundaciones, incendios, etc.)?">
          <Textarea name="ods11_riesgos" value={form.ods11_riesgos as string}
            onChange={set("ods11_riesgos")} placeholder="Su respuesta..." />
        </Pregunta>
        <Pregunta label="¿Existen contenedores específicos para separar residuos reciclables en su comunidad? ¿Los utiliza?">
          <Textarea name="ods11_contenedores" value={form.ods11_contenedores as string}
            onChange={set("ods11_contenedores")} placeholder="Su respuesta..." />
        </Pregunta>
      </Card>

      {/* ODS 12 */}
      <SeccionHeader num="12" titulo="Producción y Consumo Responsables" />
      <Card>
        <Pregunta label="¿En qué medida separa o recicla los residuos en su hogar? (Puede seleccionar más de una)">
          <CheckGroup name="ods12_reciclaje"
            options={[
              "Separo plásticos y botellas", "Separo cartón y papel", "Separo latas y metales",
              "Separo residuos orgánicos", "Separo vidrios",
              "Llevo los reciclables a un punto verde", "No separo ni reciclo",
            ]}
            value={form.ods12_reciclaje as string[]} onChange={set("ods12_reciclaje")} />
        </Pregunta>
        <Pregunta label="¿Cuánta importancia le da a reducir el uso de plásticos de un solo uso en su vida diaria?">
          <RadioGroup name="ods12_plasticos"
            options={["Trato de evitarlos siempre", "Los evito cuando puedo", "A veces los uso sin pensar", "No me preocupa reducirlos"]}
            value={form.ods12_plasticos as string} onChange={set("ods12_plasticos")} />
        </Pregunta>
        <Pregunta label="¿Considera que los comercios de su barrio promueven prácticas sostenibles?">
          <RadioGroup name="ods12_comercios" options={["Sí", "No"]}
            value={form.ods12_comercios as string} onChange={set("ods12_comercios")} />
        </Pregunta>
        <Pregunta label="¿Estaría dispuesto a pagar más por un producto eco-amigable?">
          <RadioGroup name="ods12_ecoamigable" options={["Sí", "No"]}
            value={form.ods12_ecoamigable as string} onChange={set("ods12_ecoamigable")} />
        </Pregunta>
        {form.ods12_ecoamigable === "No" && (
          <Pregunta label="¿Podría comentarnos cuál sería la razón?">
            <Textarea name="ods12_razon_no" value={form.ods12_razon_no as string}
              onChange={set("ods12_razon_no")} placeholder="Su respuesta..." />
          </Pregunta>
        )}
      </Card>

      {/* ODS 13 */}
      <SeccionHeader num="13" titulo="Acción por el Clima" />
      <Card>
        <Pregunta label="¿Ha notado algún cambio en el clima de su barrio en los últimos años (temperaturas, patrones de lluvia)?">
          <Textarea name="ods13_cambios" value={form.ods13_cambios as string}
            onChange={set("ods13_cambios")} placeholder="Su respuesta..." />
        </Pregunta>
        <Pregunta label="¿Qué tan importante considera que es la acción comunitaria para enfrentar el cambio climático?">
          <RadioGroup name="ods13_importancia"
            options={["Clave para enfrentar el cambio climático", "Es necesaria, aunque no la única solución", "No creo que haga gran diferencia", "No pienso que sea relevante"]}
            value={form.ods13_importancia as string} onChange={set("ods13_importancia")} />
        </Pregunta>
        <Pregunta label="¿Estaría dispuesto a participar en actividades orientadas a mitigar el cambio climático (reforestación, educación ambiental)?">
          <RadioGroup name="ods13_participacion" options={["Sí", "No"]}
            value={form.ods13_participacion as string} onChange={set("ods13_participacion")} />
        </Pregunta>
        {form.ods13_participacion === "No" && (
          <Pregunta label="¿Podría comentarnos cuál sería la razón?">
            <Textarea name="ods13_razon_no" value={form.ods13_razon_no as string}
              onChange={set("ods13_razon_no")} placeholder="Su respuesta..." />
          </Pregunta>
        )}
      </Card>

      {/* ODS 15 */}
      <SeccionHeader num="15" titulo="Vida de Ecosistemas Terrestres" />
      <Card>
        <Pregunta label="¿Existen áreas verdes naturales en su barrio o cerca, y en qué estado de conservación están?">
          <Textarea name="ods15_areas_verdes" value={form.ods15_areas_verdes as string}
            onChange={set("ods15_areas_verdes")} placeholder="Su respuesta..." />
        </Pregunta>
        <Pregunta label="¿Considera que en su barrio se respeta la flora y fauna local?">
          <RadioGroup name="ods15_flora_fauna" options={["Sí", "No"]}
            value={form.ods15_flora_fauna as string} onChange={set("ods15_flora_fauna")} />
        </Pregunta>
        <Pregunta label="¿Qué tan comprometido está en participar o apoyar iniciativas para la conservación de espacios verdes?">
          <RadioGroup name="ods15_compromiso"
            options={["Participo o apoyo siempre que puedo", "Participo o apoyo de vez en cuando", "Casi nunca participo ni apoyo", "No participo ni apoyo"]}
            value={form.ods15_compromiso as string} onChange={set("ods15_compromiso")} />
        </Pregunta>
      </Card>

      {error && (
        <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "16px" }}>{error}</p>
      )}

      <button onClick={handleSubmit} disabled={step === 1}
        style={{
          marginTop: "32px", width: "100%", padding: "16px",
          borderRadius: "12px", border: "none",
          background: step === 1 ? "#e2e8f0" : "#1e40af",
          color: step === 1 ? "#94a3b8" : "white",
          fontWeight: 800, fontSize: "16px", cursor: step === 1 ? "not-allowed" : "pointer",
          transition: "all .15s",
        }}>
        {step === 1 ? "Enviando..." : "Enviar encuesta"}
      </button>
    </div>
  );
}
