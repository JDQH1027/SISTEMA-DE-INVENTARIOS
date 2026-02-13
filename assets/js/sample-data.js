// sample-data.js - Datos de ejemplo para pruebas

const SAMPLE_DATA = {
    categories: [
        { id: '1', name: 'Electrónica' },
        { id: '2', name: 'Ropa' },
        { id: '3', name: 'Alimentos' },
        { id: '4', name: 'Libros' },
        { id: '5', name: 'Muebles' },
        { id: '6', name: 'Deportes' }
    ],
    
    products: [
        {
            id: 'prod_001',
            name: 'Laptop Dell XPS 13',
            categoryId: '1',
            price: 1299.99,
            quantity: 5,
            minStock: 2,
            maxStock: 10,
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'prod_002',
            name: 'Mouse Logitech MX Master',
            categoryId: '1',
            price: 99.99,
            quantity: 15,
            minStock: 5,
            maxStock: 30,
            createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'prod_003',
            name: 'Teclado Mecánico Corsair',
            categoryId: '1',
            price: 149.99,
            quantity: 3,
            minStock: 3,
            maxStock: 15,
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'prod_004',
            name: 'Monitor 4K LG 27"',
            categoryId: '1',
            price: 399.99,
            quantity: 0,
            minStock: 1,
            maxStock: 5,
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'prod_005',
            name: 'Camiseta Básica Azul',
            categoryId: '2',
            price: 19.99,
            quantity: 50,
            minStock: 10,
            maxStock: 100,
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'prod_006',
            name: 'Pantalón Vaquero',
            categoryId: '2',
            price: 49.99,
            quantity: 25,
            minStock: 5,
            maxStock: 50,
            createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'prod_007',
            name: 'Café Premium 500g',
            categoryId: '3',
            price: 12.99,
            quantity: 100,
            minStock: 20,
            maxStock: 200,
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'prod_008',
            name: 'Chocolate Oscuro 70%',
            categoryId: '3',
            price: 4.99,
            quantity: 2,
            minStock: 10,
            maxStock: 50,
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'prod_009',
            name: 'El Quijote - Cervantes',
            categoryId: '4',
            price: 24.99,
            quantity: 8,
            minStock: 3,
            maxStock: 20,
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'prod_010',
            name: 'Mesa de Escritorio',
            categoryId: '5',
            price: 299.99,
            quantity: 2,
            minStock: 1,
            maxStock: 5,
            createdAt: new Date().toISOString()
        },
        {
            id: 'prod_011',
            name: 'Bicicleta de Montaña',
            categoryId: '6',
            price: 599.99,
            quantity: 1,
            minStock: 1,
            maxStock: 5,
            createdAt: new Date().toISOString()
        },
        {
            id: 'prod_012',
            name: 'Pelota de Fútbol',
            categoryId: '6',
            price: 29.99,
            quantity: 30,
            minStock: 10,
            maxStock: 50,
            createdAt: new Date().toISOString()
        }
    ],
    
    movements: [
        {
            id: 'mov_001',
            productId: 'prod_001',
            productName: 'Laptop Dell XPS 13',
            type: 'entrada',
            quantity: 5,
            observations: 'Compra a proveedor TechCorp',
            userId: '1',
            userName: 'admin',
            date: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'mov_002',
            productId: 'prod_002',
            productName: 'Mouse Logitech MX Master',
            type: 'entrada',
            quantity: 15,
            observations: 'Stock reabastecido',
            userId: '1',
            userName: 'admin',
            date: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'mov_003',
            productId: 'prod_001',
            productName: 'Laptop Dell XPS 13',
            type: 'salida',
            subtype: 'venta',
            quantity: 2,
            observations: 'Venta a cliente Juan Pérez',
            userId: '2',
            userName: 'employee',
            date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'mov_004',
            productId: 'prod_005',
            productName: 'Camiseta Básica Azul',
            type: 'entrada',
            quantity: 50,
            observations: 'Nuevo stock de fábrica',
            userId: '1',
            userName: 'admin',
            date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'mov_005',
            productId: 'prod_007',
            productName: 'Café Premium 500g',
            type: 'entrada',
            quantity: 100,
            observations: 'Importación directa de Colombia',
            userId: '1',
            userName: 'admin',
            date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'mov_006',
            productId: 'prod_005',
            productName: 'Camiseta Básica Azul',
            type: 'salida',
            subtype: 'venta',
            quantity: 10,
            observations: 'Venta mayorista',
            userId: '2',
            userName: 'employee',
            date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'mov_007',
            productId: 'prod_003',
            productName: 'Teclado Mecánico Corsair',
            type: 'salida',
            subtype: 'daño',
            quantity: 1,
            observations: 'Unidad defectuosa descartada',
            userId: '2',
            userName: 'employee',
            date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'mov_008',
            productId: 'prod_004',
            productName: 'Monitor 4K LG 27"',
            type: 'entrada',
            quantity: 3,
            observations: 'Reabastecimiento de especificación',
            userId: '1',
            userName: 'admin',
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'mov_009',
            productId: 'prod_004',
            productName: 'Monitor 4K LG 27"',
            type: 'salida',
            subtype: 'venta',
            quantity: 3,
            observations: 'Venta a oficina corporativa',
            userId: '2',
            userName: 'employee',
            date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'mov_010',
            productId: 'prod_008',
            productName: 'Chocolate Oscuro 70%',
            type: 'salida',
            subtype: 'venta',
            quantity: 8,
            observations: 'Ventas varias durante la semana',
            userId: '2',
            userName: 'employee',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'mov_011',
            productId: 'prod_009',
            productName: 'El Quijote - Cervantes',
            type: 'entrada',
            quantity: 8,
            observations: 'Nuevo lote de editorial',
            userId: '1',
            userName: 'admin',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'mov_012',
            productId: 'prod_012',
            productName: 'Pelota de Fútbol',
            type: 'entrada',
            quantity: 30,
            observations: 'Stock para temporada',
            userId: '1',
            userName: 'admin',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
    ]
};

// Cargar datos de ejemplo
function loadSampleData() {
    if (confirm('¿Desea cargar datos de ejemplo? Esto sobrescribirá los datos existentes.')) {
        localStorage.setItem('categories', JSON.stringify(SAMPLE_DATA.categories));
        localStorage.setItem('products', JSON.stringify(SAMPLE_DATA.products));
        localStorage.setItem('movements', JSON.stringify(SAMPLE_DATA.movements));
        
        alert('Datos de ejemplo cargados correctamente. Por favor, recargue la página.');
        location.reload();
    }
}

// Limpiar todos los datos
function clearAllData() {
    if (confirm('¿Está seguro de que desea eliminar todos los datos? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('categories');
        localStorage.removeItem('products');
        localStorage.removeItem('movements');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('users');
        
        alert('Todos los datos han sido eliminados. Por favor, recargue la página.');
        location.reload();
    }
}

// Exportar todos los datos
function exportAllData() {
    const data = {
        categories: JSON.parse(localStorage.getItem('categories') || '[]'),
        products: JSON.parse(localStorage.getItem('products') || '[]'),
        movements: JSON.parse(localStorage.getItem('movements') || '[]'),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `backup_inventario_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Importar datos desde archivo JSON
function importDataFromFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.categories) localStorage.setItem('categories', JSON.stringify(data.categories));
            if (data.products) localStorage.setItem('products', JSON.stringify(data.products));
            if (data.movements) localStorage.setItem('movements', JSON.stringify(data.movements));
            
            alert('Datos importados correctamente. Por favor, recargue la página.');
            location.reload();
        } catch (error) {
            alert('Error al importar datos: ' + error.message);
        }
    };
    reader.readAsText(file);
}
