// app.js - Lógica principal de la aplicación

let currentUser = null;
let currentSection = 'inventory';

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    currentUser = checkSession();
    if (!currentUser) return;
    
    initializeApp();
});

function initializeApp() {
    updateUserInfo();
    setupMenuVisibility();
    setupEventListeners();
    showSection('inventory');
    loadInventory();
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// Actualizar información de usuario
function updateUserInfo() {
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = `Rol: ${currentUser.role === 'admin' ? 'Administrador' : 'Empleado'} • Usuario: ${currentUser.username}`;
    }
}

// Configurar visibilidad del menú según rol
function setupMenuVisibility() {
    const adminMenu = document.getElementById('adminMenu');
    const employeeMenu = document.getElementById('employeeMenu');
    
    if (currentUser.role === 'admin') {
        adminMenu.classList.remove('hidden');
        employeeMenu.classList.add('hidden');
    } else {
        adminMenu.classList.add('hidden');
        employeeMenu.classList.remove('hidden');
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Productos
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', saveProduct);
    }
    
    // Categorías
    const categoryForm = document.getElementById('categoryForm');
    if (categoryForm) {
        categoryForm.addEventListener('submit', addCategory);
    }
    
    // Entrada
    const entryForm = document.getElementById('entryForm');
    if (entryForm) {
        entryForm.addEventListener('submit', registerEntry);
    }
    
    // Salida
    const exitForm = document.getElementById('exitForm');
    if (exitForm) {
        exitForm.addEventListener('submit', registerExit);
    }
    
    // Usuarios
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', addUser);
    }
    
    // Búsqueda de inventario
    const searchInventory = document.getElementById('searchInventory');
    if (searchInventory) {
        searchInventory.addEventListener('input', filterInventory);
    }
    
    // Filtros de movimientos
    const filterType = document.getElementById('filterType');
    const filterDate = document.getElementById('filterDate');
    if (filterType) filterType.addEventListener('change', filterMovements);
    if (filterDate) filterDate.addEventListener('change', filterMovements);
}

// Mostrar sección
function showSection(sectionName) {
    currentSection = sectionName;
    
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Mostrar sección seleccionada
    const section = document.getElementById(sectionName);
    if (section) {
        section.classList.remove('hidden');
    }
    
    // Actualizar título
    const titles = {
        inventory: '📦 Inventario',
        movements: '📊 Movimientos',
        products: '➕ Gestión de Productos',
        categories: '🏷️ Categorías',
        statistics: '📈 Estadísticas',
        entry: '⬆️ Registrar Entrada',
        exit: '⬇️ Registrar Salida',
        users: '👥 Usuarios'
    };
    
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = titles[sectionName] || 'Bienvenido';
    }
    
    // Cargar datos específicos de la sección
    if (sectionName === 'inventory') {
        loadInventory();
    } else if (sectionName === 'movements') {
        loadMovements();
    } else if (sectionName === 'products') {
        loadProducts();
    } else if (sectionName === 'categories') {
        loadCategories();
    } else if (sectionName === 'statistics') {
        loadStatistics();
    } else if (sectionName === 'entry' || sectionName === 'exit') {
        loadProductsForMovement();
    } else if (sectionName === 'users') {
        loadUsers();
    }
}

// Actualizar fecha y hora
function updateDateTime() {
    const dateElement = document.getElementById('currentDateTime');
    if (dateElement) {
        const now = new Date();
        dateElement.textContent = now.toLocaleString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Inicializar datos base
function initializeBaseData() {
    if (!localStorage.getItem('categories')) {
        const defaultCategories = [
            { id: '1', name: 'Electrónica' },
            { id: '2', name: 'Ropa' },
            { id: '3', name: 'Alimentos' },
            { id: '4', name: 'Libros' },
            { id: '5', name: 'Otros' }
        ];
        localStorage.setItem('categories', JSON.stringify(defaultCategories));
    }
    
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('movements')) {
        localStorage.setItem('movements', JSON.stringify([]));
    }
}

// Generar ID único
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Filtrar inventario
function filterInventory() {
    const searchTerm = document.getElementById('searchInventory').value.toLowerCase();
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm)
    );
    
    displayInventory(filtered);
}

// Limpiar filtros
function clearFilters() {
    document.getElementById('filterType').value = '';
    document.getElementById('filterDate').value = '';
    loadMovements();
}

// Filtrar movimientos
function filterMovements() {
    const type = document.getElementById('filterType').value;
    const date = document.getElementById('filterDate').value;
    const movements = JSON.parse(localStorage.getItem('movements') || '[]');
    
    let filtered = movements;
    
    if (type) {
        filtered = filtered.filter(m => m.type === type);
    }
    
    if (date) {
        filtered = filtered.filter(m => m.date.startsWith(date));
    }
    
    displayMovements(filtered);
}

// Validar sesión antes de guardar
function validateUserPermission(requiredRole) {
    if (requiredRole === 'admin' && currentUser.role !== 'admin') {
        showAlert('No tiene permisos para realizar esta acción', 'error');
        return false;
    }
    return true;
}

// Inicializar datos al cargar
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        // Estamos en dashboard
        initializeBaseData();
    }
});
