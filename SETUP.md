# GUÍA DE INSTALACIÓN Y USO

## 🚀 Inicio Rápido

### Paso 1: Abrir la Aplicación
1. Abra el archivo `INICIO.html` en su navegador web favorito
2. Verá instrucciones completas y un enlace a la aplicación

### Paso 2: Opciones de Inicio

#### Opción A: Sin Datos (Recomendado para comenzar desde cero)
1. Vaya a `index.html`
2. Ingrese credenciales: **admin / admin123**
3. Comience a crear sus propios productos y categorías

#### Opción B: Con Datos de Ejemplo (Para pruebas rápidas)
1. Vaya a `index.html` e ingrese: **admin / admin123**
2. Luego vaya a `admin-tools.html`
3. Haga clic en "Cargar Datos de Ejemplo"
4. Actualice el dashboard

## 📁 Estructura de Archivos

```
Sistema De Inventario Con IA/
├── index.html                    # Página de login
├── dashboard.html                # Panel principal
├── INICIO.html                   # Página de instrucciones
├── admin-tools.html              # Herramientas administrativas
├── README.md                     # Documentación completa
├── SETUP.md                      # Este archivo
└── assets/
    ├── css/
    │   └── styles.css           # Estilos CSS personalizados
    └── js/
        ├── app.js               # Lógica principal
        ├── auth.js              # Autenticación y sesiones
        ├── inventory.js         # Gestión de inventario
        ├── history.js           # Historial de movimientos
        ├── stats.js             # Estadísticas
        └── sample-data.js       # Datos de ejemplo
```

## 🔐 Credenciales Predefinidas

### Administrador
- **Usuario:** admin
- **Contraseña:** admin123
- **Rol:** Acceso completo

### Empleado
- **Usuario:** employee
- **Contraseña:** emp123
- **Rol:** Acceso limitado (entradas/salidas)

## 💻 Requisitos del Sistema

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- JavaScript habilitado
- localStorage habilitado
- Conexión a internet (solo para Tailwind CSS CDN)

## ⚙️ Configuración Inicial

### 1. Primera Categoría (Administrador)
```
1. Login con admin/admin123
2. Vaya a "Categorías"
3. Agregue categorías como: Electrónica, Ropa, Alimentos, etc.
4. Haga clic en "Agregar Categoría"
```

### 2. Primer Producto (Administrador)
```
1. Vaya a "Gestión de Productos"
2. Haga clic en "Agregar Producto"
3. Complete:
   - Nombre: Laptop
   - Categoría: Electrónica
   - Precio: 999.99
   - Cantidad: 5
   - Stock Mínimo: 2
   - Stock Máximo: 10
4. Haga clic en "Guardar"
```

### 3. Registrar Entrada (Empleado)
```
1. Login con employee/emp123
2. Vaya a "Registrar Entrada"
3. Seleccione producto
4. Ingrese cantidad
5. Agregue observaciones (opcional)
6. Haga clic en "Registrar Entrada"
```

### 4. Registrar Salida (Empleado)
```
1. Vaya a "Registrar Salida"
2. Seleccione producto
3. Ingrese cantidad
4. Seleccione tipo: Venta, Pérdida, Daño o Devolución
5. Agregue observaciones (opcional)
6. Haga clic en "Registrar Salida"
```

## 🛠️ Herramientas Administrativas

### Acceder a Admin Tools
1. Vaya a `admin-tools.html`
2. Tendrá opciones para:
   - Cargar datos de ejemplo
   - Exportar datos como JSON
   - Importar datos desde JSON
   - Limpiar todos los datos
   - Ver información del sistema

### Cargar Datos de Ejemplo
```
1. Vaya a admin-tools.html
2. Haga clic en "Cargar Datos de Ejemplo"
3. Confirme la acción
4. Se cargarán 12 productos de prueba con movimientos
5. Actualice el dashboard
```

### Hacer Backup
```
1. Vaya a admin-tools.html
2. Haga clic en "Descargar Backup"
3. Se descargará un archivo JSON con todos los datos
4. Guarde en un lugar seguro
```

### Restaurar desde Backup
```
1. Vaya a admin-tools.html
2. En "Importar Datos", seleccione el archivo JSON
3. Los datos se restaurarán automáticamente
4. Actualice la página
```

## 📊 Flujos de Trabajo

### Flujo Administrador
```
0. Login (admin/admin123)
   ↓
1. Crear Categorías
   ↓
2. Crear Productos
   ↓
3. Asignar Stock Inicial
   ↓
4. Monitorear Estadísticas
   ↓
5. Gestionar Usuarios
   ↓
6. Ver Reportes
```

### Flujo Empleado
```
0. Login (employee/emp123)
   ↓
1. Ver Inventario Disponible
   ↓
2. Registrar Entradas
   ↓
3. Registrar Salidas
   ↓
4. Ver Historial de Movimientos
   ↓
5. Consultar Productos Específicos
```

## 🔍 Búsqueda y Filtrado

### Búsqueda en Inventario
1. Vaya a "Inventario"
2. Ingrese producto en el campo de búsqueda
3. Resultados se filtran en tiempo real

### Filtrar Movimientos
1. Vaya a "Movimientos"
2. Seleccione tipo (Entrada/Salida)
3. Seleccione fecha
4. Haga clic en "Limpiar" para reset

## 💾 Persistencia de Datos

### Almacenamiento
- Todos los datos se guardan en `localStorage` del navegador
- Se persisten al cerrar el navegador
- Están disponibles mientras no limpie los datos del navegador

### Respaldo
```
1. Vaya a admin-tools.html
2. Haga clic en "Descargar Backup"
3. Guarde el archivo JSON
4. Para restaurar, use "Importar Datos" en admin-tools.html
```

### Limpiar Datos
```
ADVERTENCIA: Esto elimina TODO permanentemente

1. admin-tools.html
2. Haga clic en "Eliminar Todo"
3. Confirme la acción
4. Se limpiarán todos los datos
```

## ⚠️ Alertas y Notificaciones

### Estado de Productos
- 🟢 **En Stock:** Cantidad > Stock Mínimo
- 🟡 **Bajo Stock:** 0 < Cantidad ≤ Stock Mínimo
- 🔴 **Agotado:** Cantidad = 0

### En Estadísticas
- Ver lista de productos con bajo stock
- Ver productos más movidos
- Ver valor total del inventario
- Visualizar alertas del sistema

## 🎓 Ejemplos de Uso

### Ejemplo 1: Venta de Producto
```
1. Admin crea el producto "Laptop" (100 unidades, precio $999)
2. Empleado va a "Registrar Salida"
3. Selecciona "Laptop"
4. Ingresa cantidad: 2
5. Selecciona tipo: "Venta"
6. Agrega observación: "Venta a cliente ABC"
7. Hace clic en guardar
8. Stock de Laptop baja a 98
9. Se registra en el historial
```

### Ejemplo 2: Compra a Proveedor
```
1. Empleado va a "Registrar Entrada"
2. Selecciona "Mouse" 
3. Ingresa cantidad: 50
4. Agrega observación: "Compra a proveedor TechCorp"
5. Hace clic en guardar
6. Stock aumenta en 50
7. Se registra en movimientos
```

### Ejemplo 3: Generación de Reportes
```
1. Admin va a "Estadísticas"
2. Visualiza valor total del inventario
3. Ve productos con bajo stock
4. Identifica productos más movidos
5. Toma decisiones de reabastecimiento
```

## 🚨 Solución de Problemas

### Problema: La aplicación no carga
- Verificar que JavaScript esté habilitado
- Limpiar caché del navegador
- Intentar en otro navegador

### Problema: Los datos no se guardan
- Verificar que localStorage esté habilitado
- Verificar que no esté en modo privado/incógnito
- Limpiar espacio de almacenamiento del navegador

### Problema: Olvidé la contraseña
- No hay recuperación porque es localStorage
- Use admin-tools.html para limpiar todo
- Vuelva a limpiar y usar credenciales por defecto

### Problema: Navegador no carga Tailwind CSS
- La aplicación requiere conexión a internet para Tailwind
- Si no tienen internet, descarguen Tailwind CSS localmente
- O modifiquen el CDN en los HTML

## 📞 Características Avanzadas

### Tipos de Salida
- **Venta:** Venta a cliente
- **Pérdida:** Producto perdido
- **Daño:** Producto dañado/inservible
- **Devolución:** Devolución de cliente

### Alertas Automáticas
- Sistema alerta cuando el stock baja de mínimo
- Sistema alerta cuando el stock llega a 0
- Sistema alerta cuando el stock supera el máximo

### Historial Completo
- Cada movimiento se registra con:
  - Fecha y hora exacta
  - Producto y cantidad
  - Tipo de operación
  - Usuario que realizó
  - Observaciones

## 🎯 Mejores Prácticas

1. **Establezca límites razonables:**
   - Stock Mín: 10% del stock máximo
   - Stock Max: Cantidad que cabe en bodega

2. **Registre observaciones:**
   - Facilita auditorías
   - Identifica problemas

3. **Haga backups regularmente:**
   - Una vez por semana mínimo
   - Guarde en lugar seguro

4. **Revise estadísticas:**
   - Semanalmente
   - Identifique tendencias

5. **Gestione usuarios:**
   - Desactive usuarios inactivos
   - Actualice permisos según sea necesario

## 📚 Más Información

- Ver `README.md` para documentación técnica completa
- Ver `INICIO.html` para guía de usuario
- Ir a `admin-tools.html` para herramientas de administración

---

**Versión:** 1.0.0  
**Última actualización:** Febrero 12, 2024  
**Estado:** ✅ Listo para usar
