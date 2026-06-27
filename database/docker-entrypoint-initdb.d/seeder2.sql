-- ==========================================
-- SEEDER EXTRA - SGC-UNT
-- DATOS ADICIONALES PARA PRUEBAS COMPLETAS
-- ==========================================
-- Versión compatible con PostgreSQL 15/16
-- Complementa al seeder.sql existente
-- ==========================================

SET search_path TO sgc;

-- ==========================================
-- 1. USUARIOS ADICIONALES
-- ==========================================
INSERT INTO usuarios (id, codigo, nombres, apellidos, correo, contrasena_hash, rol, facultad, escuela, activo) VALUES
  -- Más docentes
  ('550e8400-e29b-41d4-a716-446655440005', 'DOC002', 'María', 'Rodríguez', 'maria.rodriguez@unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'docente', 'Facultad de Ciencias', 'Biología', TRUE),
  ('550e8400-e29b-41d4-a716-446655440006', 'DOC003', 'Carlos', 'Luna', 'carlos.luna@unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'docente', 'Facultad de Ingeniería', 'Ingeniería Industrial', TRUE),
  
  -- Más estudiantes
  ('550e8400-e29b-41d4-a716-446655440007', 'EST002', 'Ana', 'Quispe', 'ana.quispe@unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'estudiante', 'Facultad de Ingeniería', 'Ingeniería de Sistemas', TRUE),
  ('550e8400-e29b-41d4-a716-446655440008', 'EST003', 'Luis', 'Torres', 'luis.torres@unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'estudiante', 'Facultad de Ciencias', 'Biología', TRUE),
  ('550e8400-e29b-41d4-a716-446655440009', 'EST004', 'Carmen', 'Ramos', 'carmen.ramos@unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'estudiante', 'Facultad de Ingeniería', 'Ingeniería Industrial', TRUE),

  -- Egresados
  ('550e8400-e29b-41d4-a716-446655440010', 'EGR001', 'Jorge', 'Castillo', 'jorge.castillo@egresados.unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'egresado', 'Facultad de Ingeniería', 'Ingeniería de Sistemas', TRUE),
  ('550e8400-e29b-41d4-a716-446655440011', 'EGR002', 'Elena', 'Vargas', 'elena.vargas@egresados.unitru.edu.pe', '$2a$10$lsSx0KWKH0uWx3Qd8g74sePLpT8Dl6mlqKO4ky.5zjv3hxoVGRbpK', 'egresado', 'Facultad de Ciencias', 'Biología', TRUE);

-- ==========================================
-- 2. MACROPROCESOS ADICIONALES
-- ==========================================
INSERT INTO macroprocesos (id, codigo, nombre, descripcion, responsable_id, tipo, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440011', 'MAC-EST', 'Direccionamiento Estratégico', 'Macroproceso que define la estrategia institucional', '550e8400-e29b-41d4-a716-446655440000', 'estrategico', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440012', 'MAC-APO', 'Gestión Administrativa y Financiera', 'Macroproceso de apoyo para la gestión administrativa', '550e8400-e29b-41d4-a716-446655440001', 'apoyo', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440013', 'MAC-EVA', 'Aseguramiento de la Calidad', 'Macroproceso de evaluación y mejora continua', '550e8400-e29b-41d4-a716-446655440001', 'evaluacion', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 3. PROCESOS ADICIONALES
-- ==========================================
INSERT INTO procesos (id, macroproceso_id, codigo, nombre, objetivo, alcance, responsable_id, estado, creado_por) VALUES
  -- Procesos del macroproceso Formación Profesional
  ('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440010', 'PRO-DOC', 'Gestión de Docencia', 'Ejecutar y monitorear la actividad docente', 'Todos los programas académicos', '550e8400-e29b-41d4-a716-446655440003', 'activo', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440010', 'PRO-INV', 'Gestión de Investigación', 'Fomentar y gestionar actividades de investigación', 'Docentes y estudiantes investigadores', '550e8400-e29b-41d4-a716-446655440005', 'activo', '550e8400-e29b-41d4-a716-446655440000'),
  
  -- Procesos del macroproceso Direccionamiento Estratégico
  ('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440011', 'PRO-PLA', 'Planificación Estratégica', 'Definir el plan de desarrollo institucional', 'Toda la universidad', '550e8400-e29b-41d4-a716-446655440000', 'activo', '550e8400-e29b-41d4-a716-446655440000'),
  
  -- Procesos del macroproceso Gestión Administrativa
  ('550e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440012', 'PRO-PRE', 'Gestión Presupuestal', 'Asignar y controlar el presupuesto institucional', 'Todas las unidades académicas', '550e8400-e29b-41d4-a716-446655440001', 'activo', '550e8400-e29b-41d4-a716-446655440000'),
  
  -- Procesos del macroproceso Aseguramiento de la Calidad
  ('550e8400-e29b-41d4-a716-446655440025', '550e8400-e29b-41d4-a716-446655440013', 'PRO-MEJ', 'Mejora Continua', 'Implementar planes de mejora institucional', 'Toda la universidad', '550e8400-e29b-41d4-a716-446655440001', 'activo', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 4. ACTIVIDADES DE PROCESO ADICIONALES
-- ==========================================
INSERT INTO actividades_proceso (id, proceso_id, codigo, nombre, descripcion, secuencia, responsable_id, entradas, salidas, indicadores, creado_por) VALUES
  -- Actividades de Gestión de Docencia
  ('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440021', 'ACT-CLA', 'Ejecución de clases', 'Desarrollar sesiones de aprendizaje según sílabo', 1, '550e8400-e29b-41d4-a716-446655440003', 'Sílabo, recursos didácticos', 'Clases ejecutadas, evaluaciones', 'Porcentaje de asistencia a clases', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440021', 'ACT-EVA', 'Evaluación del aprendizaje', 'Evaluar el desempeño de los estudiantes', 2, '550e8400-e29b-41d4-a716-446655440003', 'Resultados de evaluaciones', 'Calificaciones, reportes', 'Tasa de aprobación', '550e8400-e29b-41d4-a716-446655440000'),
  
  -- Actividades de Planificación Estratégica
  ('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440023', 'ACT-DIA', 'Diagnóstico institucional', 'Analizar la situación actual de la universidad', 1, '550e8400-e29b-41d4-a716-446655440000', 'Indicadores, informes, encuestas', 'Informe de diagnóstico', 'Índice de percepción institucional', '550e8400-e29b-41d4-a716-446655440000'),
  
  -- Actividades de Mejora Continua
  ('550e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440025', 'ACT-PLA', 'Elaboración de planes de mejora', 'Crear planes de acción para resolver hallazgos', 1, '550e8400-e29b-41d4-a716-446655440001', 'Hallazgos, no conformidades', 'Plan de mejora aprobado', 'Número de planes implementados', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 5. DOCUMENTOS ADICIONALES
-- ==========================================
INSERT INTO documentos (id, codigo, titulo, tipo_documento_id, proceso_id, version_actual, estado, contenido, archivo_url, fecha_vigencia, fecha_revision, creado_por) VALUES
  -- Más documentos
  ('550e8400-e29b-41d4-a716-446655440041', 'MAN-001', 'Manual de Gestión de Procesos', 2, '550e8400-e29b-41d4-a716-446655440025', 2, 'aprobado', 'Manual que describe todos los procesos del SGC', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '2024-01-01', '2025-01-01', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440042', 'PRO-001', 'Procedimiento de Acreditación', 3, '550e8400-e29b-41d4-a716-446655440013', 1, 'en_revision', 'Procedimiento para la acreditación de programas', NULL, '2024-03-01', '2024-09-01', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440043', 'INS-001', 'Instructivo para el Sílabo', 4, '550e8400-e29b-41d4-a716-446655440020', 3, 'aprobado', 'Instructivo detallado para la elaboración del sílabo', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '2024-02-15', '2024-08-15', '550e8400-e29b-41d4-a716-446655440003'),
  ('550e8400-e29b-41d4-a716-446655440044', 'FOR-001', 'Formato de Evaluación Docente', 5, '550e8400-e29b-41d4-a716-446655440021', 1, 'borrador', 'Formato para la evaluación del desempeño docente', NULL, NULL, NULL, '550e8400-e29b-41d4-a716-446655440001');

-- ==========================================
-- 6. VERSIONES DE DOCUMENTOS
-- ==========================================
INSERT INTO versiones_documento (id, documento_id, numero_version, cambios_descripcion, contenido, estado, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440041', 1, 'Versión inicial del manual', 'Manual de Gestión de Procesos v1', 'aprobado', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440041', 2, 'Actualización de procesos según nueva normativa', 'Manual de Gestión de Procesos v2 - Actualizado', 'aprobado', '550e8400-e29b-41d4-a716-446655440001');

-- ==========================================
-- 7. ESTÁNDARES DE ACREDITACIÓN ADICIONALES
-- ==========================================
INSERT INTO estandares_acreditacion (id, codigo, nombre, organizacion, descripcion, vigente_desde, vigente_hasta, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440052', 'EST-ISO-21001', 'ISO 21001:2018', 'ISO', 'Estándar internacional para sistemas de gestión educativa', '2024-01-01', '2027-12-31', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440053', 'EST-ICACIT', 'Estándares ICACIT', 'ICACIT', 'Estándares para acreditación de programas de ingeniería', '2024-01-01', '2026-12-31', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 8. FACTORES DE CRITERIO ADICIONALES
-- ==========================================
INSERT INTO factores_criterio (id, estandar_id, codigo, nombre, descripcion, peso, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440050', 'FAC-PLA', 'Planificación y Gestión', 'Calidad de la planificación institucional', 20.00, '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440062', '550e8400-e29b-41d4-a716-446655440050', 'FAC-DOC', 'Docencia y Formación', 'Calidad de la formación profesional', 35.00, '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440063', '550e8400-e29b-41d4-a716-446655440052', 'FAC-LID', 'Liderazgo Estratégico', 'Capacidad de liderazgo de la institución', 25.00, '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 9. AUTOEVALUACIONES ADICIONALES
-- ==========================================
INSERT INTO autoevaluaciones (id, estandar_id, periodo, fecha_inicio, fecha_fin, estado, puntaje_total, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440052', '2024-II', '2024-07-01', '2024-12-31', 'planificado', NULL, '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440072', '550e8400-e29b-41d4-a716-446655440050', '2023-II', '2023-07-01', '2023-12-20', 'completada', 85.50, '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 10. EVALUACIONES DE CRITERIO
-- ==========================================
INSERT INTO evaluaciones_criterio (id, autoevaluacion_id, factor_id, cumplimiento, puntaje, evidencias, observaciones, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440080', '550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440060', 'cumple', 14.00, 'Documentos institucionales, plan estratégico', 'Buen alineamiento', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440081', '550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440061', 'cumple_parcial', 15.00, 'Plan de desarrollo, indicadores', 'Debe mejorar la medición', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 11. PLANES DE AUDITORÍA ADICIONALES
-- ==========================================
INSERT INTO planes_auditoria (id, codigo, nombre, tipo, alcance, fecha_programada, fecha_ejecucion, estado, lider_id, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440081', 'PAUD-2024-II', 'Auditoría de Procesos 2024-II', 'interna', 'Facultad de Ciencias - Escuela de Biología', '2024-11-15', NULL, 'planificado', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440082', 'PAUD-EXT-2024', 'Auditoría Externa ISO 21001', 'externa', 'Toda la institución', '2024-09-01', '2024-09-30', 'ejecutado', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 12. HALLAZGOS ADICIONALES
-- ==========================================
INSERT INTO hallazgos (id, plan_id, tipo, descripcion, area_proceso_id, gravedad, estado, fecha_cierre, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440091', '550e8400-e29b-41d4-a716-446655440081', 'no_conformidad', 'No se realizan evaluaciones de satisfacción en los laboratorios', '550e8400-e29b-41d4-a716-446655440021', 'alta', 'abierto', NULL, '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440092', '550e8400-e29b-41d4-a716-446655440082', 'observacion', 'La documentación del SGC no está completamente actualizada', '550e8400-e29b-41d4-a716-446655440025', 'media', 'cerrado', '2024-10-15', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440093', '550e8400-e29b-41d4-a716-446655440080', 'oportunidad_mejora', 'Implementar un sistema de notificaciones automáticas', '550e8400-e29b-41d4-a716-446655440025', 'baja', 'en_tratamiento', NULL, '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 13. CAPAS ADICIONALES
-- ==========================================
INSERT INTO capas (id, codigo, tipo, hallazgo_id, descripcion, causa_raiz, accion_propuesta, responsable_id, fecha_implementacion, fecha_verificacion, estado, efectividad, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440101', 'CAPA-2026-002', 'preventiva', '550e8400-e29b-41d4-a716-446655440093', 'Implementar sistema de notificaciones automáticas', 'Falta de herramientas de automatización', 'Desarrollar módulo de notificaciones con n8n', '550e8400-e29b-41d4-a716-446655440001', '2024-07-15', NULL, 'en_implementacion', 'pendiente', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440102', 'CAPA-2026-003', 'correctiva', '550e8400-e29b-41d4-a716-446655440091', 'Crear sistema de evaluaciones de laboratorios', 'Ausencia de instrumentos de medición', 'Diseñar encuestas específicas para laboratorios', '550e8400-e29b-41d4-a716-446655440005', '2024-08-01', '2024-08-30', 'verificada', 'efectiva', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440103', 'CAPA-2026-004', 'mejora', '550e8400-e29b-41d4-a716-446655440092', 'Actualizar documentación del SGC', 'Procesos de revisión lentos', 'Crear flujo de revisión documental automatizado', '550e8400-e29b-41d4-a716-446655440001', '2024-09-01', NULL, 'implementada', 'parcial', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 14. SEGUIMIENTOS DE CAPA
-- ==========================================
INSERT INTO seguimientos_capa (id, capa_id, fecha_seguimiento, avance, observaciones, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440110', '550e8400-e29b-41d4-a716-446655440101', '2024-07-31', 60.00, 'Se ha desarrollado el 60% del módulo de notificaciones', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440111', '550e8400-e29b-41d4-a716-446655440102', '2024-08-15', 100.00, 'Encuesta implementada y validada', '550e8400-e29b-41d4-a716-446655440005');

-- ==========================================
-- 15. RIESGOS ADICIONALES
-- ==========================================
INSERT INTO riesgos (id, codigo, nombre, descripcion, proceso_id, categoria, probabilidad, impacto, estado, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440111', 'R-2026-002', 'Baja participación en encuestas', 'Riesgo de baja participación en las encuestas de satisfacción', '550e8400-e29b-41d4-a716-446655440021', 'operativo', 2, 3, 'activo', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440112', 'R-2026-003', 'Cambios en normativa nacional', 'Posibles cambios en las normativas de educación superior', '550e8400-e29b-41d4-a716-446655440023', 'legal', 3, 5, 'activo', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440113', 'R-2026-004', 'Fuga de docentes calificados', 'Posible salida de docentes con alta especialización', '550e8400-e29b-41d4-a716-446655440021', 'estrategico', 1, 4, 'mitigado', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440114', 'R-2026-005', 'Ciberataques a plataformas educativas', 'Vulnerabilidad en sistemas de gestión académica', '550e8400-e29b-41d4-a716-446655440021', 'tecnologico', 4, 5, 'activo', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 16. PLANES DE MITIGACIÓN
-- ==========================================
INSERT INTO planes_mitigacion (id, riesgo_id, codigo, nombre, descripcion, acciones, responsable_id, fecha_limite, estado, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440120', '550e8400-e29b-41d4-a716-446655440113', 'PM-001', 'Plan de Retención Docente', 'Estrategias para retener a docentes calificados', 'Programas de capacitación, incentivos, reconocimiento', '550e8400-e29b-41d4-a716-446655440000', '2024-12-31', 'completado', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440121', '550e8400-e29b-41d4-a716-446655440114', 'PM-002', 'Plan de Ciberseguridad', 'Proteger las plataformas educativas de ciberataques', 'Auditorías de seguridad, capacitación, herramientas de protección', '550e8400-e29b-41d4-a716-446655440001', '2024-09-30', 'en_progreso', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 17. INDICADORES ADICIONALES
-- ==========================================
INSERT INTO indicadores (id, codigo, nombre, descripcion, proceso_id, tipo, formula_calculo, unidad_medida, meta, frecuencia_medicion, estado, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440121', 'IND-02', 'Tasa de satisfacción estudiantil', 'Nivel de satisfacción de los estudiantes', '550e8400-e29b-41d4-a716-446655440021', 'satisfaccion', '(Promedio de puntajes de encuestas)', '%', 80.00, 'semestral', 'activo', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440122', 'IND-03', 'Tasa de aprobación de cursos', 'Porcentaje de estudiantes que aprueban los cursos', '550e8400-e29b-41d4-a716-446655440020', 'eficacia', '(Aprobados / Matriculados) * 100', '%', 85.00, 'semestral', 'activo', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440123', 'IND-04', 'Tiempo de respuesta a no conformidades', 'Tiempo promedio para cerrar no conformidades', '550e8400-e29b-41d4-a716-446655440025', 'eficiencia', 'Suma de días de cierre / Número de no conformidades', 'Días', 30.00, 'trimestral', 'activo', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 18. MEDICIONES DE INDICADORES ADICIONALES
-- ==========================================
INSERT INTO mediciones_indicador (id, indicador_id, periodo, valor_real, valor_esperado, cumplimiento, analisis_tendencia, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440130', '550e8400-e29b-41d4-a716-446655440121', '2024-I', 82.50, 80.00, 103.13, 'La satisfacción supera la meta establecida', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440131', '550e8400-e29b-41d4-a716-446655440122', '2023-II', 83.00, 85.00, 97.65, 'Cerca de alcanzar la meta, se debe mejorar el desempeño académico', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440132', '550e8400-e29b-41d4-a716-446655440123', '2024-I', 25.00, 30.00, 120.00, 'Buen desempeño en el cierre de no conformidades', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 19. ENCUESTAS ADICIONALES
-- ==========================================
INSERT INTO encuestas (id, codigo, titulo, descripcion, dirigido_a, fecha_inicio, fecha_fin, anonima, estado, creado_por) VALUES
  ('550e8400-e29b-41d4-a716-446655440141', 'ENC-2026-II', 'Encuesta de Satisfacción Docente 2024-II', 'Encuesta para docentes sobre condiciones laborales', 'docentes', '2024-08-01', '2024-08-31', TRUE, 'publicada', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440142', 'ENC-2026-EGR', 'Encuesta a Egresados 2024', 'Evaluación de la formación recibida', 'egresados', '2024-06-01', '2024-07-31', TRUE, 'en_curso', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440143', 'ENC-2026-ADM', 'Encuesta de Clima Laboral', 'Medir el clima organizacional', 'administrativos', '2024-09-01', '2024-09-30', FALSE, 'borrador', '550e8400-e29b-41d4-a716-446655440000');

-- ==========================================
-- 20. PREGUNTAS DE ENCUESTAS ADICIONALES
-- ==========================================
INSERT INTO preguntas_encuesta (id, encuesta_id, texto, tipo, orden, obligatoria) VALUES
  -- Encuesta de docentes
  ('550e8400-e29b-41d4-a716-446655440152', '550e8400-e29b-41d4-a716-446655440141', '¿Cómo evalúa las condiciones de su labor docente?', 'likert_5', 1, TRUE),
  ('550e8400-e29b-41d4-a716-446655440153', '550e8400-e29b-41d4-a716-446655440141', '¿Recibe capacitación adecuada?', 'si_no', 2, TRUE),
  ('550e8400-e29b-41d4-a716-446655440154', '550e8400-e29b-41d4-a716-446655440141', 'Sugerencias para mejorar', 'abierta', 3, FALSE),
  
  -- Encuesta de egresados
  ('550e8400-e29b-41d4-a716-446655440155', '550e8400-e29b-41d4-a716-446655440142', '¿Recomendaría la UNT para estudiar?', 'likert_5', 1, TRUE),
  ('550e8400-e29b-41d4-a716-446655440156', '550e8400-e29b-41d4-a716-446655440142', '¿Los conocimientos adquiridos son útiles para su trabajo?', 'likert_5', 2, TRUE);

-- ==========================================
-- 21. RESPUESTAS DE ENCUESTAS ADICIONALES
-- ==========================================
INSERT INTO respuestas_encuesta (id, encuesta_id, pregunta_id, usuario_id, valor_numerico, valor_texto, enviado_en) VALUES
  -- Respuestas de estudiantes a encuesta 2024-I
  ('550e8400-e29b-41d4-a716-446655440162', '550e8400-e29b-41d4-a716-446655440140', '550e8400-e29b-41d4-a716-446655440150', '550e8400-e29b-41d4-a716-446655440007', 5, NULL, '2024-04-20 14:15:00'),
  ('550e8400-e29b-41d4-a716-446655440163', '550e8400-e29b-41d4-a716-446655440140', '550e8400-e29b-41d4-a716-446655440151', '550e8400-e29b-41d4-a716-446655440008', 3, NULL, '2024-04-21 09:45:00'),
  
  -- Respuestas de egresados
  ('550e8400-e29b-41d4-a716-446655440164', '550e8400-e29b-41d4-a716-446655440142', '550e8400-e29b-41d4-a716-446655440155', '550e8400-e29b-41d4-a716-446655440010', 4, NULL, '2024-06-10 11:20:00'),
  ('550e8400-e29b-41d4-a716-446655440165', '550e8400-e29b-41d4-a716-446655440142', '550e8400-e29b-41d4-a716-446655440156', '550e8400-e29b-41d4-a716-446655440011', 5, NULL, '2024-06-15 16:30:00');

-- ==========================================
-- FIN DEL SEEDER EXTRA
-- ==========================================