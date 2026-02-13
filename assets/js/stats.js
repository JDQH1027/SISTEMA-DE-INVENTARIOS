// stats.js - Gestión de estadísticas

// Cargar estadísticas
function loadStatistics() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const movements = JSON.parse(localStorage.getItem('movements') || '[]');
    
    // Calcular estadísticas
    const stats = {
        totalProducts: products.length,
        totalValue: products.reduce((sum, p) => sum + (p.quantity * p.price), 0),
        lowStock: products.filter(p => p.quantity > 0 && p.quantity <= p.minStock).length,
        outOfStock: products.filter(p => p.quantity === 0).length
    };
    
    // Mostrar tarjetas de estadísticas
    document.getElementById('statTotalProducts').textContent = stats.totalProducts;
    document.getElementById('statTotalValue').textContent = `$${stats.totalValue.toFixed(2)}`;
    document.getElementById('statLowStock').textContent = stats.lowStock;
    document.getElementById('statOutOfStock').textContent = stats.outOfStock;
    
    // Mostrar productos con bajo stock
    displayLowStockProducts(products);
    
    // Mostrar productos más movidos
    displayTopMovedProducts(products, movements);
}

// Mostrar productos con bajo stock
function displayLowStockProducts(products) {
    const container = document.getElementById('lowStockList');
    if (!container) return;
    
    const lowStockProducts = products.filter(p => p.quantity > 0 && p.quantity <= p.minStock)
        .sort((a, b) => a.quantity - b.quantity);
    
    if (lowStockProducts.length === 0) {
        container.innerHTML = '<p class="text-gray-500">No hay productos con bajo stock</p>';
        return;
    }
    
    container.innerHTML = lowStockProducts.map(product => `
        <div class="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
            <div class="flex justify-between items-start">
                <div>
                    <p class="font-semibold text-gray-800">${product.name}</p>
                    <p class="text-sm text-gray-600">Cantidad actual: ${product.quantity}</p>
                    <p class="text-sm text-gray-600">Mínimo recomendado: ${product.minStock}</p>
                </div>
                <span class="text-2xl font-bold text-yellow-600">${product.quantity}/${product.minStock}</span>
            </div>
        </div>
    `).join('');
}

// Mostrar productos más movidos
function displayTopMovedProducts(products, movements) {
    const container = document.getElementById('topMovements');
    if (!container) return;
    
    // Contar movimientos por producto
    const productMovements = {};
    movements.forEach(movement => {
        if (!productMovements[movement.productId]) {
            productMovements[movement.productId] = { count: 0, quantity: 0, name: movement.productName };
        }
        productMovements[movement.productId].count++;
        productMovements[movement.productId].quantity += movement.quantity;
    });
    
    const topMovements = Object.values(productMovements)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    
    if (topMovements.length === 0) {
        container.innerHTML = '<p class="text-gray-500">No hay movimientos registrados</p>';
        return;
    }
    
    container.innerHTML = topMovements.map((item, index) => `
        <div class="p-3 border-b border-gray-200">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <p class="font-semibold text-gray-800">${index + 1}. ${item.name}</p>
                    <p class="text-sm text-gray-600">Movimientos: ${item.count}</p>
                </div>
                <span class="text-lg font-bold text-indigo-600">${item.quantity} unidades</span>
            </div>
        </div>
    `).join('');
}

// Obtener resumen del inventario
function getInventorySummary() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    const summary = {
        totalProducts: products.length,
        totalQuantity: products.reduce((sum, p) => sum + p.quantity, 0),
        totalValue: products.reduce((sum, p) => sum + (p.quantity * p.price), 0),
        averagePrice: 0,
        categories: {},
        alerts: {
            outOfStock: 0,
            lowStock: 0,
            overStock: 0
        }
    };
    
    // Calcular promedio de precio
    if (products.length > 0) {
        summary.averagePrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
    }
    
    // Agrupar por categoría
    products.forEach(product => {
        if (!summary.categories[product.categoryId]) {
            summary.categories[product.categoryId] = 0;
        }
        summary.categories[product.categoryId]++;
        
        // Contar alertas
        if (product.quantity === 0) {
            summary.alerts.outOfStock++;
        } else if (product.quantity <= product.minStock) {
            summary.alerts.lowStock++;
        } else if (product.quantity > product.maxStock) {
            summary.alerts.overStock++;
        }
    });
    
    return summary;
}

// Generar reporte de desempeño
function generatePerformanceReport() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const movements = JSON.parse(localStorage.getItem('movements') || '[]');
    
    const report = {
        generatedAt: new Date().toISOString(),
        period: 'Total',
        inventory: {
            totalProducts: products.length,
            totalItems: products.reduce((sum, p) => sum + p.quantity, 0),
            totalValue: products.reduce((sum, p) => sum + (p.quantity * p.price), 0)
        },
        movements: {
            total: movements.length,
            entries: movements.filter(m => m.type === 'entrada').length,
            exits: movements.filter(m => m.type === 'salida').length,
            totalQuantityMoved: movements.reduce((sum, m) => sum + m.quantity, 0)
        },
        alerts: getInventorySummary().alerts
    };
    
    return report;
}

// Calcular valor de rotación de inventario
function calculateInventoryTurnover() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const movements = JSON.parse(localStorage.getItem('movements') || '[]');
    
    const turnover = {};
    
    products.forEach(product => {
        const productMovements = movements.filter(m => m.productId === product.id);
        const totalMoved = productMovements.reduce((sum, m) => sum + m.quantity, 0);
        
        turnover[product.name] = {
            totalMoved,
            currentStock: product.quantity,
            value: product.quantity * product.price,
            movementCount: productMovements.length
        };
    });
    
    return turnover;
}

// Obtener alertas del sistema
function getSystemAlerts() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const alerts = [];
    
    products.forEach(product => {
        if (product.quantity === 0) {
            alerts.push({
                severity: 'critical',
                type: 'out_of_stock',
                message: `${product.name} está agotado`,
                product: product.name
            });
        } else if (product.quantity <= product.minStock) {
            alerts.push({
                severity: 'warning',
                type: 'low_stock',
                message: `${product.name} tiene bajo stock (${product.quantity}/${product.minStock})`,
                product: product.name
            });
        } else if (product.quantity > product.maxStock) {
            alerts.push({
                severity: 'info',
                type: 'over_stock',
                message: `${product.name} excede el stock máximo (${product.quantity}/${product.maxStock})`,
                product: product.name
            });
        }
    });
    
    return alerts;
}

// Exportar estadísticas a JSON
function exportStatisticsToJSON() {
    const summary = getInventorySummary();
    const report = generatePerformanceReport();
    const alerts = getSystemAlerts();
    
    const data = {
        summary,
        report,
        alerts,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `estadisticas_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showAlert('Estadísticas exportadas correctamente');
}
