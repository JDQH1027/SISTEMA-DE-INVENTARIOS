# 🎯 Sistema de Gestión de Inventario - Guía Completa

## 📋 Índice Rápido

| Página | Acceso | Propósito |
|--------|--------|-----------|
| **index.html** | `Inicio` | 🔐 Login del sistema |
| **dashboard.html** | Después de login | 📊 Panel principal (Admin) |
| **dashboard.html?role=employee** | Después de login | 👤 Panel empleado (acceso limitado) |
| **LEEME.html** | Información | 📖 Instrucciones de uso |
| **DIAGNOSTICO-LOCALSTORAGE.html** | Herramientas | 🔍 Ver datos almacenados |
| **RESET.html** | Herramientas | 🔧 Limpiar y reiniciar sistema |

---

## 🚀 Primeros Pasos

### 1️⃣ **Acceder al Sistema**
```
Abre: index.html
```

### 2️⃣ **Credenciales de Prueba**
```
Administrador:
  Usuario: admin
  Contraseña: admin123

Empleado:
  Usuario: employee
  Contraseña: emp123
```

### 3️⃣ **Funcionalidades Disponibles**

#### Como **Administrador** 👨‍💼:
- ✅ Crear, editar y eliminar productos
- ✅ Crear, editar y eliminar categorías
- ✅ Gestionar usuarios (crear empleados)
- ✅ Registrar movimientos de inventario
- ✅ Ver historial completo de transacciones
- ✅ Ver estadísticas y análisis
- ✅ Consolidar productos duplicados
- ✅ Exportar datos

#### Como **Empleado** 👥:
- ✅ Ver productos disponibles
- ✅ Registrar movimientos (entrada/salida)
- ✅ Ver historial de movimientos propios
- ❌ No puede crear/editar productos
- ❌ No puede crear categorías
- ❌ No puede ver todos los usuarios

---

## 🔍 Características Principales

### 📦 Gestión de Productos
- Crear productos con nombre, categoría, precio, cantidad
- Editar información de productos existentes
- Eliminar productos del sistema
- Consolidar automáticamente productos duplicados

### 📁 Gestión de Categorías
- Crear nuevas categorías
- Editar categorías existentes
- Eliminar categorías (solo si no tienen productos)

### 👥 Gestión de Usuarios
- Crear nuevos usuarios (Administrador/Empleado)
- Ver lista de usuarios activos
- Cambiar contraseñas (seguridad)

### 📜 Movimientos de Inventario
- **Entrada**: Recepción de productos
- **Salida**: Despacho de productos
- **Ajuste**: Correcciones de inventario
- Historial completo con fecha/hora y usuario

### 📊 Estadísticas y Reportes
- Valor total del inventario
- Productos más vendidos
- Movimientos por período
- Análisis de categorías

---

## 🛠️ Herramientas de Diagnóstico

### 🔍 **DIAGNOSTICO-LOCALSTORAGE.html**
**Propósito**: Verificar qué datos están almacenados en el navegador

**Características**:
- ✅ Monitoreo en tiempo real (se actualiza cada 5 segundos)
- ✅ Muestra todos los datos almacenados con formato JSON
- ✅ Calcula tamaño total de datos
- ✅ Permite exportar a archivo JSON
- ✅ Expande/contrae secciones de datos

**Cuándo usar**:
- Quieres verificar que los datos se guardaron correctamente
- Sospechas que falta información
- Necesitas ver exactamente qué está almacenado

### 🔧 **RESET.html**
**Propósito**: Limpiar y reiniciar el sistema

**Características**:
- ✅ Elimina todos los datos del localStorage
- ✅ Reinicializa usuarios por defecto (admin/employee)
- ✅ Recrea datos de prueba
- ✅ Log de acciones realizadas

**Cuándo usar**:
- El login no funciona correctamente
- Los datos se vieron corruptos
- Quieres empezar con un estado limpio
- Apareció algún bug en el almacenamiento

**⚠️ ADVERTENCIA**: Esta acción **elimina TODOS los datos**. Haz una copia si es necesario.

---

## 💾 Almacenamiento de Datos

### Qué se guarda en localStorage:
```
✓ Usuarios y credenciales
✓ Productos y categorías
✓ Movimientos de inventario
✓ Historial de transacciones
✓ Sesión de usuario actual
✓ Preferencias
```

### Cómo se organiza:
```
products         → Lista de todos los productos
categories       → Lista de categorías
users            → Usuarios del sistema
movements        → Movimientos de inventario
history          → Historial de transacciones
currentUser      → Usuario en sesión actual
sessionActive    → Estado de sesión
```

---

## 🎮 Flujo de Uso Típico

### Escenario 1: Primer Uso
```
1. Abre index.html
2. Login con admin/admin123
3. Se abre dashboard.html
4. Crea 2-3 productos desde la pestaña "Productos"
5. Crea categorías si es necesario
6. Registra movimientos desde "Movimientos"
7. Ve estadísticas en la pestaña "Estadísticas"
8. Abre DIAGNOSTICO-LOCALSTORAGE.html para verificar datos
```

### Escenario 2: Problema con Datos
```
1. Nota que falta información
2. Abre DIAGNOSTICO-LOCALSTORAGE.html
3. Verifica qué datos están guardados
4. Si están todos cortados: usa RESET.html
5. Si faltan algunos: la app tiene un bug (reporta)
6. Vuelve a index.html y reinicia
```

### Escenario 3: Datos Duplicados
```
1. En Products ve dos productos con mismo nombre
2. Verá un botón "Consolidar Duplicados"
3. Haz clic para fusionar los productos
4. Selecciona cuál mantener
5. Se combinan las cantidades
6. Verifica en DIAGNOSTICO-LOCALSTORAGE.html
```

---

## 📱 Estructura de Archivos

```
Sistema De Inventario Con IA/
├── index.html                          # 🔐 Página de login
├── dashboard.html                      # 📊 Panel principal
├── LEEME.html                          # 📖 Instrucciones
├── DIAGNOSTICO-LOCALSTORAGE.html       # 🔍 Ver datos
├── RESET.html                          # 🔧 Limpiar sistema
├── GUIA.md                             # 📄 Esta guía
│
├── assets/
│   ├── js/
│   │   ├── auth.js                     # Autenticación
│   │   ├── app.js                      # Controles principales
│   │   ├── inventory.js                # CRUD de productos
│   │   ├── history.js                  # Historial
│   │   └── stats.js                    # Estadísticas
│   │
│   └── css/
│       └── styles.css                  # Estilos personalizados
```

---

## ⌨️ Atajos y Tips

### En login (index.html):
- Presiona `Enter` para iniciar sesión rápidamente
- Los datos se guardan automáticamente

### En dashboard.html:
- Usa las pestañas para navegar entre secciones
- Los modales se cierran con `ESC` o haciendo clic en X
- Todos los cambios se guardan al instante

### Datos locales:
- Se guardan **automáticamente** en cada acción
- Se mantienen incluso si cierras el navegador
- Son específicos de este navegador/dispositivo

---

## 🐛 Solución de Problemas

### ❌ "Usuario o contraseña incorrectos"
```
Solución:
1. Verifica que escribiste correctamente (mira MAYÚS)
2. Si es la primera vez, usa: admin / admin123
3. Si los datos se corrompieron:
   - Abre RESET.html
   - Haz clic en "Limpiar e Ir a Login"
   - Intenta nuevamente
```

### ❌ "No veo los datos que creé"
```
Solución:
1. Abre DIAGNOSTICO-LOCALSTORAGE.html
2. Verifica cuáles datos están guardados
3. Si ves datos pero no aparecen:
   - Recarga la página (F5)
   - Limpia el caché del navegador
4. Si no hay datos:
   - Usa RESET.html para reiniciar
   - Crea los datos de nuevo
```

### ❌ "El navegador dice que no hay espacio"
```
Solución:
1. Abre RESET.html y limpia datos antiguos
2. Usa DIAGNOSTICO-LOCALSTORAGE.html para ver qué ocupa espacio
3. Considera limpiar el caché del navegador
```

### ❌ "Mensaje de error en consola"
```
Solución:
1. Abre DevTools (F12)
2. Ve a la pestaña "Console"
3. Si ves un error específico:
   - Toma nota del mensaje
   - El error te dirá qué línea tiene el problema
   - Reporta esto para debug
```

---

## 📞 Información de Contacto y Soporte

Si encuentras problemas:
1. 🔍 Consulta esta GUIA.md
2. 🔧 Usa DIAGNOSTICO-LOCALSTORAGE.html para verificar datos
3. 🔗 Abre DevTools (F12) para ver errores en consola
4. 💾 Prueba RESET.html si nada funciona
5. 📧 Si el problema persiste, reporta con:
   - Navegador y versión
   - Pasos para reproducir el problema
   - Screenshot del error (si tiene uno)
   - Contenido de la consola (F12 → Console)

---

## 📈 Próximas Mejoras Posibles

- 📱 Versión móvil mejorada
- 📥 Importar datos desde CSV/Excel
- 📊 Más opciones de reportes
- 🔔 Sistema de notificaciones
- 🔐 Contraseñas más seguras
- ☁️ Sincronización en la nube
- 📲 Aplicación de escritorio

---

**Última actualización**: $(date)
**Versión**: 1.0
**Estado**: ✅ Completamente funcional

¡Gracias por usar nuestro Sistema de Gestión de Inventario! 🎉
