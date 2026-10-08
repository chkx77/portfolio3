import { useState } from 'react';
import { Github, ExternalLink, Mail, Linkedin } from 'lucide-react';
import './Portfolio.css';

const projects = [
  {name:'Ferretería PRO',repo:'ferreteria',demo:'https://ferreteria-wheat.vercel.app',stack:'React · Vite · Firestore · Chart.js · XLSX',description:'Gestión de inventario, ventas, compras y proveedores, con estadísticas e importación y exportación de planillas.',status:'Proyecto personal. La actualización de acceso y permisos requiere configurar Firebase.'},
  {name:'Agenda Pro',repo:'agenda2',demo:'https://agenda2-eight.vercel.app',stack:'React · Vite · Firebase Authentication · Firestore',description:'Panel de propietario y reserva pública de turnos, con configuración de horarios y bloqueo de fechas.',status:'Proyecto personal en desarrollo. Las mejoras de privacidad y cancelación requieren desplegar los servicios de Firebase.'},
  {name:'Cuentas Claras',repo:'cuentas-claras',demo:'https://cuentas-claras-navy.vercel.app',stack:'React · Vite · Tailwind CSS · localStorage',description:'Organizador de pagos y vencimientos con estados, filtros, guardado local y copias de recuperación.',status:'Datos locales al navegador. Incluye integración Android con Capacitor, sin distribución verificada.'},
  {name:'Gestión de empleados',repo:'TpFinal-React',stack:'React · React Router · Axios · json-server',description:'Trabajo práctico con búsqueda, alta, edición, eliminación y detalle de empleados mediante una API de demostración.',status:'Proyecto académico. La sesión es simulada y utiliza datos ficticios.'},
];
export default function Portfolio() {
  const [form,setForm]=useState({email:'',subject:'',message:''});
  const set=key=>event=>setForm(previous=>({...previous,[key]:event.target.value}));
  function contact(event) {
    event.preventDefault();
    window.location.href=`mailto:matirom77@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`De: ${form.email}\n\n${form.message}`)}`;
  }
  return <div className="professional-portfolio">
    <a className="skip-link" href="#contenido">Ir al contenido</a>
    <header className="portfolio-header"><a href="#inicio" className="brand">MR<span>.</span></a><nav aria-label="Navegación principal"><a href="#proyectos">Proyectos</a><a href="#tecnologias">Tecnologías</a><a href="#contacto">Contacto</a></nav></header>
    <main id="contenido">
      <section id="inicio" className="portfolio-hero"><p className="eyebrow">PERFIL TECNOLÓGICO VERSÁTIL</p><h1>Matías Romero<span>Desarrollo web e implementación</span></h1>
        <p>Desarrollo aplicaciones para organizar información y resolver necesidades cotidianas. Busco oportunidades iniciales en desarrollo web, soporte e implementación de software.</p>
        <div className="portfolio-actions"><a className="primary-link" href="#proyectos">Explorá mis proyectos</a><a href="https://github.com/chkx77" target="_blank" rel="noopener noreferrer"><Github size={18}/> GitHub</a></div>
      </section>
      <section id="proyectos"><p className="eyebrow">TRABAJO PERSONAL Y ACADÉMICO</p><h2>Proyectos seleccionados</h2><div className="project-grid">{projects.map(project=><article className="project-card" key={project.repo}>
        <h3>{project.name}</h3><p>{project.description}</p><p className="stack">{project.stack}</p><p className="project-status">{project.status}</p>
        <div className="project-links"><a href={`https://github.com/chkx77/${project.repo}`} target="_blank" rel="noopener noreferrer" aria-label={`Ver código de ${project.name}`}><Github size={17}/> Código y documentación</a>{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Abrir demo de ${project.name}`}><ExternalLink size={17}/> Demo</a>}</div>
      </article>)}</div></section>
      <section id="tecnologias"><p className="eyebrow">EVIDENCIA EN LOS REPOSITORIOS</p><h2>Tecnologías</h2><div className="technology-grid">
        <article><h3>Desarrollo web</h3><p>HTML, CSS, JavaScript, React y Vite.</p></article><article><h3>Datos e integración</h3><p>Firebase Authentication, Firestore, Axios y manejo de planillas con XLSX.</p></article><article><h3>Formación y práctica</h3><p>PHP, MySQL y Java. Práctica inicial con Spring Boot y Laravel.</p></article>
      </div><p className="note">Los proyectos muestran aprendizaje y desarrollo de soluciones. No se presentan como implementaciones verificadas en clientes.</p></section>
      <section id="contacto" className="contact-section"><div><p className="eyebrow">CONVERSEMOS</p><h2>Contacto</h2><p>Podés contactarme para conversar sobre una oportunidad o conocer más sobre mis proyectos.</p><a href="mailto:matirom77@gmail.com"><Mail size={18}/> matirom77@gmail.com</a><a href="https://www.linkedin.com/in/matias-romero-838925373/" target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LinkedIn</a></div>
        <form onSubmit={contact}><label htmlFor="contact-email">Tu email</label><input id="contact-email" type="email" required value={form.email} onChange={set('email')}/><label htmlFor="contact-subject">Asunto</label><input id="contact-subject" required maxLength={150} value={form.subject} onChange={set('subject')}/><label htmlFor="contact-message">Mensaje</label><textarea id="contact-message" required maxLength={4000} rows={5} value={form.message} onChange={set('message')}/><button type="submit">Abrir mi aplicación de correo</button><p className="note">Se abre tu aplicación de correo con el mensaje preparado. Vos decidís cuándo enviarlo.</p></form>
      </section>
    </main><footer>Matías Romero · Proyectos personales y académicos · <a href="https://github.com/chkx77/portfolio3">Código del portfolio</a></footer>
  </div>;
}
