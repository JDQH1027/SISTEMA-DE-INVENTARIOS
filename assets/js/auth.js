// auth.js - Gestión de autenticación y sesiones

const DEFAULT_USERS = [
    { id: '1', username: 'admin', password: 'admin123', role: 'admin', active: true },
    { id: '2', username: 'employee', password: 'emp123', role: 'employee', active: true }
];

// Inicializar datos por defecto si no existen
function initializeAuth() {
    if (!localStorage.getItem('users')) {
        console.log('Inicializando usuarios por defecto...');
        localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
        console.log('Usuarios inicializados:', DEFAULT_USERS);
    } else {
        console.log('Usuarios ya existen en localStorage');
    }
}

// Mostrar alerta en login
function showLoginAlert(message) {
    const alertDiv = document.getElementById('alertError');
    if (alertDiv) {
        alertDiv.textContent = message;
        alertDiv.classList.remove('hidden');
        console.log('Alerta mostrada:', message);
        setTimeout(() => {
            alertDiv.classList.add('hidden');
        }, 5000);
    }
}

// Mostrar alerta en dashboard
function showAlert(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    const className = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    notification.innerHTML = `
        <div class="${className} text-white p-4 rounded-lg shadow-lg">
            ${message}
        </div>
    `;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Cargado - inicializando...');
    initializeAuth();
    
    // Procesar login si estamos en la página de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        console.log('Formulario de login encontrado');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            console.log('Intento de login - Usuario:', username);
            
            // Obtener usuarios de localStorage
            const usersJSON = localStorage.getItem('users');
            console.log('Usuarios en localStorage:', usersJSON);
            
            const users = JSON.parse(usersJSON || '[]');
            console.log('Usuarios parseados:', users);
            
            // Buscar usuario
            const user = users.find(u => {
                console.log(`Comparando: ${u.username} === ${username} && ${u.password} === ${password} && activo: ${u.active}`);
                return u.username === username && u.password === password && u.active;
            });
            
            if (user) {
                console.log('Login exitoso para usuario:', user.username);
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    loginTime: new Date().toISOString()
                }));
                // Redirigir después de un pequeño retraso
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            } else {
                console.log('Login fallido - credenciales inválidas');
                showLoginAlert('❌ Usuario o contraseña incorrectos');
            }
        });
    }
});

// Logout
function logout() {
    if (confirm('¿Está seguro de que desea cerrar sesión?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Verificar sesión
function checkSession() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) {
        window.location.href = 'index.html';
        return null;
    }
    return currentUser;
}
