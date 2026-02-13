// history.js - Gestión del historial de movimientos

// Cargar movimientos
function loadMovements() {
    const movements = JSON.parse(localStorage.getItem('movements') || '[]');
    const sortedMovements = movements.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    displayMovements(sortedMovements);
}

// Mostrar movimientos
function displayMovements(movements) {
    const table = document.getElementById('movementsTable');
    if (!table) return;
    
    if (movements.length === 0) {
        table.innerHTML = '<tr><td colspan="6" class="px-4 py-4 text-center text-gray-500">No hay movimientos registrados</td></tr>';
        return;
    }
    
    table.innerHTML = movements.map(movement => {
        const date = new Date(movement.date);
        const formattedDate = date.toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const typeClass = movement.type === 'entrada' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800';
        
        const typeLabel = movement.type === 'entrada' 
            ? '📥 Entrada' 
            : `📤 Salida (${movement.subtype || 'venta'})`;
        
        return `
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 text-gray-600">${formattedDate}</td>
                <td class="px-4 py-3 font-semibold text-gray-800">${movement.productName}</td>
                <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 rounded text-sm font-semibold ${typeClass}">
                        ${typeLabel}
                    </span>
                </td>
                <td class="px-4 py-3 text-center font-semibold">${movement.quantity}</td>
                <td class="px-4 py-3 text-gray-600">${movement.userName}</td>
                <td class="px-4 py-3 text-gray-600">${movement.observations || '-'}</td>
            </tr>
        `;
    }).join('');
}

// Exportar historial a CSV
function exportMovementsToCSV() {
    const movements = JSON.parse(localStorage.getItem('movements') || '[]');
    
    if (movements.length === 0) {
        showAlert('No hay movimientos para exportar', 'error');
        return;
    }
    
    let csv = 'Fecha,Producto,Tipo,Cantidad,Usuario,Observaciones\n';
    
    movements.forEach(movement => {
        const date = new Date(movement.date).toLocaleString('es-ES');
        const type = movement.type === 'entrada' ? 'Entrada' : `Salida (${movement.subtype})`;
        csv += `"${date}","${movement.productName}","${type}",${movement.quantity},"${movement.userName}","${movement.observations || ''}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `movimientos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    showAlert('Historial exportado correctamente');
}

// Obtener estadísticas de movimientos
function getMovementStats() {
    const movements = JSON.parse(localStorage.getItem('movements') || '[]');
    
    const stats = {
        totalMovements: movements.length,
        totalEntries: movements.filter(m => m.type === 'entrada').length,
        totalExits: movements.filter(m => m.type === 'salida').length,
        totalQuantity: movements.reduce((sum, m) => sum + m.quantity, 0),
        byProduct: {},
        byDate: {}
    };
    
    // Agrupar por producto
    movements.forEach(movement => {
        if (!stats.byProduct[movement.productName]) {
            stats.byProduct[movement.productName] = 0;
        }
        stats.byProduct[movement.productName] += movement.quantity;
    });
    
    // Agrupar por fecha
    movements.forEach(movement => {
        const date = movement.date.split('T')[0];
        if (!stats.byDate[date]) {
            stats.byDate[date] = 0;
        }
        stats.byDate[date] += 1;
    });
    
    return stats;
}

// Obtener movimientos de un producto
function getProductMovements(productId) {
    const movements = JSON.parse(localStorage.getItem('movements') || '[]');
    return movements.filter(m => m.productId === productId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Obtener últimos movimientos
function getRecentMovements(limit = 10) {
    const movements = JSON.parse(localStorage.getItem('movements') || '[]');
    return movements
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}
