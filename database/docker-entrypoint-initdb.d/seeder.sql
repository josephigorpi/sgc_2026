
-- ==========================================
-- SEEDER SGC-UNT - DATOS INICIALES
-- ==========================================
-- Versión compatible con PostgreSQL 15/16
-- Orden de inserción respeta claves foráneas
-- ==========================================

SET search_path TO sgc;

-- ==========================================
-- 1. USUARIOS
-- ==========================================
-- Primero creamos los usuarios, ya que son referenciados por casi todas las tablas
INSERT INTO usuarios (id, codigo, nombres, apellidos, correo, contrasena_hash, rol, facultad, escuela, activo) VALUES
  -- Usuario Administrador (requerido)
  ('550e8400-e29b-41d4-a716-446655440000', 'ADMIN001', 'Administrador', 'SGC', 'admin@unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'admin', NULL, NULL, TRUE),
  -- Gestor de Calidad
  ('550e8400-e29b-41d4-a716-446655440001', 'GCAL001', 'Gestor', 'Calidad', 'gestor.calidad@unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'gestor_calidad', 'Facultad de Ingeniería', 'Ingeniería de Sistemas', TRUE),
  -- Auditor
  ('550e8400-e29b-41d4-a716-446655440002', 'AUD001', 'Auditor', 'SGC', 'auditor@unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'auditor', 'Facultad de Ingeniería', 'Ingeniería de Sistemas', TRUE),
  -- Docente
  ('550e8400-e29b-41d4-a716-446655440003', 'DOC001', 'Juan', 'Pérez', 'juan.perez@unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'docente', 'Facultad de Ingeniería', 'Ingeniería de Sistemas', TRUE),
  -- Estudiante
  ('550e8400-e29b-41d4-a716-446655440004', 'EST001', 'María', 'García', 'maria.garcia@unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'estudiante', 'Facultad de Ingeniería', 'Ingeniería de Sistemas', TRUE);

-- ==========================================
-- 2. MAPA DE PROCESOS - MACROPROCESOS
-- ==========================================
INSERT INTO macroprocesos (id, codigo, nombre, descripcion, responsable_id, tipo, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', 'MAC-FOR', 'Formación Profesional', 'Macroproceso encargado de la formación integral de los estudiantes', '550e8400-e29b-41d4-a716-446655440000', 'misional', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 3. MAPA DE PROCESOS - PROCESOS
-- ==========================================
INSERT INTO procesos (id, macroproceso_id, codigo, nombre, objetivo, alcance, responsable_id, estado, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', 'PRO-PLAN', 'Planificación Curricular', 'Garantizar la coherencia y pertinencia de los planes de estudio', 'Todas las escuelas profesionales de la universidad', '550e8400-e29b-41d4-a716-446655440003', 'activo', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 4. MAPA DE PROCESOS - ACTIVIDADES DE PROCESO
-- ==========================================
INSERT INTO actividades_proceso (id, proceso_id, codigo, nombre, descripcion, secuencia, responsable_id, entradas, salidas, indicadores, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440020', 'ACT-SIL', 'Elaboración de sílabo', 'Definir el contenido, estrategias y evaluación de cada curso', 1, '550e8400-e29b-41d4-a716-446655440003', 'Plan de estudios, lineamientos institucionales', 'Sílabo aprobado', 'Porcentaje de sílabos entregados en plazo', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 5. GESTIÓN DOCUMENTAL - DOCUMENTOS
-- ==========================================
-- Nota: tipos_documento ya fueron insertados en init.sql
INSERT INTO documentos (id, codigo, titulo, tipo_documento_id, proceso_id, version_actual, estado, contenido, fecha_vigencia, fecha_revision, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440040', 'POL-001', 'Política de Calidad de la Universidad Nacional de Trujillo', 1, NULL, 1, 'aprobado', 'La UNT se compromete a brindar servicios educativos de calidad...', '2024-01-01', '2025-01-01', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 6. ACREDITACIÓN - ESTÁNDARES
-- ==========================================
INSERT INTO estandares_acreditacion (id, codigo, nombre, organizacion, descripcion, vigente_desde, vigente_hasta, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440050', 'EST-SUNEDU-2024', 'Estándares de Acreditación SUNEDU', 'SUNEDU', 'Estándares para la acreditación de programas de pregrado', '2024-01-01', '2028-12-31', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 7. ACREDITACIÓN - FACTORES DE CRITERIO
-- ==========================================
INSERT INTO factores_criterio (id, estandar_id, codigo, nombre, descripcion, peso, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440050', 'FAC-MV', 'Misión y Visión', 'Alineamiento de la institución con su misión y visión', 15.00, '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 8. ACREDITACIÓN - AUTOEVALUACIONES
-- ==========================================
INSERT INTO autoevaluaciones (id, estandar_id, periodo, fecha_inicio, fecha_fin, estado, puntaje_total, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440050', '2024-I', '2024-03-01', '2024-06-30', 'en_proceso', NULL, '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 9. AUDITORÍAS - PLANES DE AUDITORÍA
-- ==========================================
INSERT INTO planes_auditoria (id, codigo, nombre, tipo, alcance, fecha_programada, estado, lider_id, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440080', 'PAUD-2024-I', 'Plan de Auditoría Interna 2024-I', 'interna', 'Facultad de Ingeniería - Escuela de Sistemas', '2024-05-15', 'planificado', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 10. AUDITORÍAS - HALLAZGOS
-- ==========================================
INSERT INTO hallazgos (id, plan_id, tipo, descripcion, area_proceso_id, gravedad, estado, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440090', '550e8400-e29b-41d4-a716-446655440080', 'no_conformidad', 'Los sílabos no incluyen la sección de competencias', '550e8400-e29b-41d4-a716-446655440020', 'media', 'abierto', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 11. CAPA - ACCIONES CORRECTIVAS Y PREVENTIVAS
-- ==========================================
INSERT INTO capas (id, codigo, tipo, hallazgo_id, descripcion, causa_raiz, accion_propuesta, responsable_id, fecha_implementacion, estado, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440100', 'CAPA-2026-001', 'correctiva', '550e8400-e29b-41d4-a716-446655440090', 'Incluir sección de competencias en los sílabos', 'Falta de claridad en los lineamientos', 'Actualizar la plantilla de sílabo y capacitar a docentes', '550e8400-e29b-41d4-a716-446655440003', '2024-06-01', 'registrada', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 12. RIESGOS
-- ==========================================
INSERT INTO riesgos (id, codigo, nombre, descripcion, proceso_id, categoria, probabilidad, impacto, estado, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440110', 'R-2026-001', 'Desactualización de sílabos', 'Riesgo de que los sílabos no estén actualizados según el plan de estudios', '550e8400-e29b-41d4-a716-446655440020', 'operativo', 3, 3, 'activo', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 13. INDICADORES
-- ==========================================
INSERT INTO indicadores (id, codigo, nombre, descripcion, proceso_id, tipo, formula_calculo, unidad_medida, meta, frecuencia_medicion, estado, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440120', 'IND-01', 'Porcentaje de sílabos aprobados', 'Porcentaje de sílabos que han sido aprobados en el periodo', '550e8400-e29b-41d4-a716-446655440020', 'eficacia', '(Sílabos aprobados / Total de sílabos) * 100', '%', 95.00, 'semestral', 'activo', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 14. INDICADORES - MEDICIONES
-- ==========================================
INSERT INTO mediciones_indicador (id, indicador_id, periodo, valor_real, valor_esperado, cumplimiento, analisis_tendencia, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440130', '550e8400-e29b-41d4-a716-446655440120', '2024-I', 88.50, 95.00, 93.16, 'El valor está cerca de la meta, se debe mejorar la aprobación en la próxima entrega', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 15. ENCUESTAS
-- ==========================================
INSERT INTO encuestas (id, codigo, titulo, descripcion, dirigido_a, fecha_inicio, fecha_fin, anonima, estado, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440140', 'ENC-2026-I', 'Encuesta de Satisfacción Estudiantil 2024-I', 'Encuesta para medir la satisfacción de los estudiantes con los servicios académicos', 'estudiantes', '2024-04-01', '2024-04-30', TRUE, 'publicada', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 16. ENCUESTAS - PREGUNTAS
-- ==========================================
INSERT INTO preguntas_encuesta (id, encuesta_id, texto, tipo, orden, obligatoria) VALUES
  ('550e8400-e29b-41d4-a716-446655440150', '550e8400-e29b-41d4-a716-446655440140', '¿Qué tan satisfecho está con la calidad de las clases?', 'likert_5', 1, TRUE),
  ('550e8400-e29b-41d4-a716-446655440151', '550e8400-e29b-41d4-a716-446655440140', '¿Qué tan satisfecho está con la infraestructura del laboratorio?', 'likert_5', 2, TRUE);

-- ==========================================
-- 17. ENCUESTAS - RESPUESTAS
-- ==========================================
INSERT INTO respuestas_encuesta (id, encuesta_id, pregunta_id, usuario_id, valor_numerico, enviado_en) VALUES
  ('550e8400-e29b-41d4-a716-446655440160', '550e8400-e29b-41d4-a716-446655440140', '550e8400-e29b-41d4-a716-446655440150', '550e8400-e29b-41d4-a716-446655440004', 4, '2024-04-15 10:30:00'),
  ('550e8400-e29b-41d4-a716-446655440161', '550e8400-e29b-41d4-a716-446655440140', '550e8400-e29b-41d4-a716-446655440151', '550e8400-e29b-41d4-a716-446655440004', 5, '2024-04-15 10:30:00');

-- ==========================================
-- FIN DEL SEEDER
-- ==========================================

