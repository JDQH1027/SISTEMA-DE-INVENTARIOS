# Sistema de Gestión de Inventario

Una aplicación web profesional para la gestión completa de inventario empresarial con roles de administrador y empleado.

## 🚀 Características Principales

### Funcionalidades Implementadas
- ✅ **CRUD Completo de Productos** - Crear, editar, ver y eliminar productos
- ✅ **Control de Stock Automático** - Seguimiento de cantidades en tiempo real
- ✅ **Historial de Movimientos** - Registro completo de entradas y salidas
- ✅ **Gestión de Categorías** - Organizar productos por categoría
- ✅ **Estadísticas Avanzadas** - Análisis de stock, alertas y rotación
- ✅ **Sistema de Roles** - Permisos diferenciados para administrador y empleado
- ✅ **Persistencia Total** - Todos los datos guardados en localStorage
- ✅ **Interfaz Responsiva** - Compatible con dispositivos móviles

### Roles del Sistema

#### 👨‍💼 Administrador
- Crear, editar y eliminar productos
- Definir y gestionar categorías
- Visualizar todo el inventario
- Ver historial completo de movimientos
- Panel de estadísticas (bajo stock, más movidos, etc.)
- Gestionar usuarios (crear, activar/desactivar)
- Acceso a todos los reportes

#### 👨‍💻 Empleado
- Registrar entradas de productos (compras)
- Registrar salidas (ventas, pérdidas, daños)
- Consultar inventario disponible
- Ver historial de movimientos propios
- **No puede**: Eliminar productos, crear categorías o gestionar otros usuarios

## 📋 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS Framework** - Tailwind CSS (responsive y moderno)
- **JavaScript Vanilla** - Sin dependencias externas
- **localStorage** - Persistencia de datos en cliente

## 🔐 Credenciales de Prueba

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `admin` | `admin123` | Administrador |
| `employee` | `emp123` | Empleado |

## 📂 Estructura del Proyecto

```
Sistema De Inventario Con IA/
├── index.html                 # Página de login
├── dashboard.html             # Panel principal
├── assets/
│   ├── css/
│   │   └── styles.css        # Estilos personalizados
│   └── js/
│       ├── app.js            # Lógica principal
│       ├── auth.js           # Autenticación
│       ├── inventory.js      # Gestión de inventario
│       ├── history.js        # Historial de movimientos
│       └── stats.js          # Estadísticas
└── README.md                  # Este archivo
```

## 🎯 Cómo Usar

### 1. Iniciar la Aplicación
- Abra `index.html` en su navegador web
- Ingrese las credenciales de prueba

### 2. Panel de Administrador

#### Gestión de Productos
1. Vaya a "Gestión de Productos"
2. Haga clic en "Agregar Producto"
3. Complete los campos:
   - Nombre
   - Categoría
   - Precio
   - Cantidad inicial
   - Stock mínimo y máximo

#### Gestión de Categorías
1. Vaya a "Categorías"
2. Agregue nuevas categorías
3. Visualice productos por categoría

#### Estadísticas
1. Vaya a "Estadísticas"
2. Visualice:
   - Valor total del inventario
   - Productos con bajo stock
   - Productos más movidos
   - Alertas del sistema

### 3. Panel de Empleado

#### Registrar Entrada
1. Vaya a "Registrar Entrada"
2. Seleccione producto y cantidad
3. Agregue observaciones si es necesario
4. Haga clic en "Registrar Entrada"

#### Registrar Salida
1. Vaya a "Registrar Salida"
2. Seleccione producto y cantidad
3. Indique el tipo de salida (venta, pérdida, daño, devolución)
4. Agregue observaciones
5. Haga clic en "Registrar Salida"

## 💾 Almacenamiento de Datos

La aplicación utiliza `localStorage` del navegador para persistencia:

- **products** - Catálogo de productos
- **categories** - Categorías disponibles
- **movements** - Historial de movimientos
- **users** - Usuarios del sistema
- **currentUser** - Sesión actual

### Estructura de Datos

```javascript
// Producto
{
  id: "identificador_único",
  name: "nombre",
  categoryId: "categoria",
  price: 99.99,
  quantity: 10,
  minStock: 5,
  maxStock: 50,
  createdAt: "2024-01-01T10:00:00Z"
}

// Movimiento
{
  id: "identificador_único",
  productId: "id_producto",
  productName: "nombre",
  type: "entrada|salida",
  quantity: 5,
  observations: "notas",
  userId: "id_usuario",
  userName: "nombre_usuario",
  date: "2024-01-01T10:00:00Z"
}
```

## 🔔 Alertas del Sistema

La aplicación muestra alertas automáticas para:
- ✗ **Productos Agotados** - Cantidad = 0
- ⚠️ **Bajo Stock** - Cantidad ≤ Stock Mínimo
- ⚡ **Sobre Stock** - Cantidad > Stock Máximo

## 📊 Reportes y Exportación

### Disponible para Administrador:
- Exportar historial de movimientos a CSV
- Exportar estadísticas a JSON
- Ver análisis de rotación de inventario

## 🛡️ Seguridad y Validación

- ✅ Validación de campos en tiempo real
- ✅ Control de permisos por rol
- ✅ Validación de stock disponible
- ✅ Prevención de acciones no autorizadas
- ✅ Confirmación de acciones destructivas

## 🎨 Interfaz Usuario

- **Responsive Design** - Se adapta a cualquier tamaño de pantalla
- **Tema Moderno** - Colores y diseño profesional con Tailwind CSS
- **Navegación Intuitiva** - Menú lateral fácil de usar
- **Notificaciones** - Retroalimentación inmediata de acciones
- **Tablas Interactivas** - Búsqueda, filtrado y ordenamiento

## 🔄 Flujo de Trabajo Típico

### Administrador
1. Login → Dashboard → Crear Productos → Asignar Categorías → Ver Estadísticas

### Empleado
1. Login → Dashboard → Registrar Entrada/Salida → Ver Historial → Consultar Inventario

## 📝 Notas Importantes

- Todos los datos se guardan localmente en el navegador
- Los datos no se pierden al cerrar el navegador
- Limpiar datos de navegador eliminará toda la información
- Se pueden agregar más usuarios desde el panel de administrador
- El historial de movimientos es permanente e inmutable

## 🚀 Mejoras Futuras

- Integración con base de datos remota
- Autenticación con servidor
- Exportación a Excel avanzada
- Gráficos de tendencias
- Notificaciones por email
- Sistema de múltiples almacenes
- API REST

## 📞 Soporte

Para problemas o sugerencias, verificar:
1. Que el navegador tenga habilitado localStorage
2. Que esté usando navegadores modernos (Chrome, Firefox, Edge, Safari)
3. Limpiar caché del navegador si hay problemas de visualización

## 📄 Licencia

© 2024 Sistema de Gestión de Inventario. Todos los derechos reservados.

---

**Versión:** 1.0.0  
**Última actualización:** Febrero 12, 2024  
**Estado:** Listo para producción ✅
