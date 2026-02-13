// inventory.js - Gestión de inventario y productos

// Cargar inventario
function loadInventory() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    displayInventory(products);
}

// Mostrar inventario
function displayInventory(products) {
    const table = document.getElementById('inventoryTable');
    if (!table) return;
    
    if (products.length === 0) {
        table.innerHTML = '<tr><td colspan="5" class="px-4 py-4 text-center text-gray-500">No hay productos en el inventario</td></tr>';
        return;
    }
    
    table.innerHTML = products.map(product => {
        const categories = JSON.parse(localStorage.getItem('categories') || '[]');
        const category = categories.find(c => c.id === product.categoryId)?.name || 'Sin categoría';
        
        let statusClass = 'bg-green-100 text-green-800';
        let statusText = '✓ En Stock';
        
        if (product.quantity === 0) {
            statusClass = 'bg-red-100 text-red-800';
            statusText = '✗ Agotado';
        } else if (product.quantity <= product.minStock) {
            statusClass = 'bg-yellow-100 text-yellow-800';
            statusText = '⚠ Bajo Stock';
        }
        
        return `
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 font-semibold text-gray-800">${product.name}</td>
                <td class="px-4 py-3 text-gray-600">${category}</td>
                <td class="px-4 py-3 text-center font-semibold">${product.quantity}</td>
                <td class="px-4 py-3 text-center text-gray-600">$${product.price.toFixed(2)}</td>
                <td class="px-4 py-3 text-center">
                    <span class="px-3 py-1 rounded-full text-sm font-semibold ${statusClass}">
                        ${statusText}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

// Cargar productos para gestión
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    displayProducts(products);
    loadCategoriesSelect();
}

// Mostrar productos
function displayProducts(products) {
    const table = document.getElementById('productsTable');
    if (!table) return;
    
    if (products.length === 0) {
        table.innerHTML = '<tr><td colspan="6" class="px-4 py-4 text-center text-gray-500">No hay productos registrados</td></tr>';
        return;
    }
    
    table.innerHTML = products.map(product => {
        const categories = JSON.parse(localStorage.getItem('categories') || '[]');
        const category = categories.find(c => c.id === product.categoryId)?.name || 'Sin categoría';
        
        return `
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 font-semibold text-gray-800">${product.name}</td>
                <td class="px-4 py-3 text-gray-600">${category}</td>
                <td class="px-4 py-3 text-center">${product.quantity}</td>
                <td class="px-4 py-3 text-center text-sm text-gray-600">${product.minStock}/${product.maxStock}</td>
                <td class="px-4 py-3 text-center text-gray-600">$${product.price.toFixed(2)}</td>
                <td class="px-4 py-3 text-center">
                    <button onclick="editProduct('${product.id}')" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
                        ✏️ Editar
                    </button>
                    <button onclick="deleteProduct('${product.id}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                        🗑️ Eliminar
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Abrir modal de producto
function openProductModal(productId = null) {
    if (!validateUserPermission('admin')) return;
    
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('productModalTitle');
    
    if (productId) {
        title.textContent = 'Editar Producto';
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const product = products.find(p => p.id === productId);
        
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.categoryId;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productQuantity').value = product.quantity;
            document.getElementById('productMinStock').value = product.minStock;
            document.getElementById('productMaxStock').value = product.maxStock;
        }
    } else {
        title.textContent = 'Nuevo Producto';
        form.reset();
        document.getElementById('productId').value = '';
    }
    
    loadCategoriesSelect();
    modal.classList.remove('hidden');
}

// Cerrar modal de producto
function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
}

// Guardar producto
function saveProduct(e) {
    e.preventDefault();
    
    if (!validateUserPermission('admin')) return;
    
    const productId = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const categoryId = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const minStock = parseInt(document.getElementById('productMinStock').value);
    const maxStock = parseInt(document.getElementById('productMaxStock').value);
    
    if (!name || !categoryId || price < 0 || quantity < 0 || minStock < 0 || maxStock < 0) {
        showAlert('Todos los campos son obligatorios y válidos', 'error');
        return;
    }
    
    if (minStock >= maxStock) {
        showAlert('El stock mínimo debe ser menor al máximo', 'error');
        return;
    }
    
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    
    if (productId) {
        // Editar
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            // Validar que no haya otro producto con el mismo nombre (excepto el actual)
            const duplicado = products.find(p => p.id !== productId && p.name.toLowerCase() === name.toLowerCase());
            if (duplicado) {
                if (confirm(`⚠️ Ya existe un producto llamado "${duplicado.name}". ¿Desea consolidar ambos productos en uno solo?`)) {
                    consolidateProducts(productId, duplicado.id, name, categoryId, price, minStock, maxStock);
                    return;
                } else {
                    showAlert('Por favor, use un nombre diferente', 'error');
                    return;
                }
            }
            
            products[productIndex] = {
                ...products[productIndex],
                name,
                categoryId,
                price,
                minStock,
                maxStock
            };
        }
    } else {
        // Crear - Validar duplicado
        const duplicado = products.find(p => p.name.toLowerCase() === name.toLowerCase());
        if (duplicado) {
            if (confirm(`⚠️ Ya existe un producto llamado "${duplicado.name}" con cantidad: ${duplicado.quantity}.\n\n¿Desea:\n- Aceptar: Agregar cantidad a ese producto\n- Cancelar: Crear uno diferente`)) {
                // Consolidar: agregar la cantidad al producto existente
                duplicado.quantity += quantity;
                localStorage.setItem('products', JSON.stringify(products));
                closeProductModal();
                loadProducts();
                showAlert(`✅ Cantidad agregada a "${duplicado.name}". Total ahora: ${duplicado.quantity}`);
                return;
            } else {
                showAlert('Use un nombre diferente para crear un nuevo producto', 'error');
                return;
            }
        }
        
        // Crear nuevo producto
        products.push({
            id: generateId(),
            name,
            categoryId,
            price,
            quantity,
            minStock,
            maxStock,
            createdAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem('products', JSON.stringify(products));
    closeProductModal();
    loadProducts();
    showAlert(productId ? 'Producto actualizado' : 'Producto creado correctamente');
}

// Consolidar productos duplicados
function consolidateProducts(productId1, productId2, newName, newCategory, newPrice, newMinStock, newMaxStock) {
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    
    const prod1 = products.find(p => p.id === productId1);
    const prod2 = products.find(p => p.id === productId2);
    
    if (prod1 && prod2) {
        // Combinar cantidades
        const totalQuantity = prod1.quantity + prod2.quantity;
        
        // Actualizar el producto principal
        prod1.name = newName;
        prod1.categoryId = newCategory;
        prod1.price = newPrice;
        prod1.minStock = newMinStock;
        prod1.maxStock = newMaxStock;
        prod1.quantity = totalQuantity;
        
        // Eliminar el producto duplicado
        products = products.filter(p => p.id !== productId2);
        
        localStorage.setItem('products', JSON.stringify(products));
        closeProductModal();
        loadProducts();
        showAlert(`✅ Productos consolidados. Cantidad total: ${totalQuantity}`);
    }
}

// Función para consolidar TODOS los productos duplicados existentes
function consolidateAllDuplicates() {
    if (!validateUserPermission('admin')) return;
    
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    const consolidated = [];
    const duplicates = [];
    const productsByName = {};
    
    // Agrupar productos por nombre
    products.forEach(product => {
        const normalizedName = product.name.toLowerCase().trim();
        if (!productsByName[normalizedName]) {
            productsByName[normalizedName] = [];
        }
        productsByName[normalizedName].push(product);
    });
    
    // Procesar grupos
    for (const [name, group] of Object.entries(productsByName)) {
        if (group.length > 1) {
            // Hay duplicados
            duplicates.push({ name, count: group.length });
            
            // Combinar todos en uno
            const firstProduct = group[0];
            const totalQuantity = group.reduce((sum, p) => sum + p.quantity, 0);
            const avgPrice = group.reduce((sum, p) => sum + p.price, 0) / group.length;
            const minMinStock = Math.min(...group.map(p => p.minStock));
            const maxMaxStock = Math.max(...group.map(p => p.maxStock));
            
            consolidated.push({
                ...firstProduct,
                quantity: totalQuantity,
                price: parseFloat(avgPrice.toFixed(2)),
                minStock: minMinStock,
                maxStock: maxMaxStock
            });
        } else {
            // No hay duplicados
            consolidated.push(group[0]);
        }
    }
    
    if (duplicates.length === 0) {
        showAlert('✅ No hay productos duplicados', 'success');
        return;
    }
    
    const message = `Se encontraron ${duplicates.length} producto(s) duplicado(s):\n\n${duplicates.map(d => `• "${d.name}" (${d.count} copias)`).join('\n')}\n\n¿Consolidarlos en uno solo?`;
    
    if (confirm(message)) {
        localStorage.setItem('products', JSON.stringify(consolidated));
        loadProducts();
        showAlert(`✅ Se consolidaron ${duplicates.length} producto(s) duplicado(s)`);
    }
}

// Editar producto
function editProduct(productId) {
    openProductModal(productId);
}

// Eliminar producto
function deleteProduct(productId) {
    if (!validateUserPermission('admin')) return;
    
    if (!confirm('¿Está seguro de que desea eliminar este producto?')) return;
    
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    products = products.filter(p => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    
    loadProducts();
    showAlert('Producto eliminado correctamente');
}

// Cargar categorías en select
function loadCategoriesSelect() {
    const selects = [
        document.getElementById('productCategory'),
        document.getElementById('entryProduct'),
        document.getElementById('exitProduct')
    ];
    
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    selects.forEach(select => {
        if (!select) return;
        const currentValue = select.value;
        select.innerHTML = '<option value="">Seleccionar...</option>' + 
            (select.id === 'productCategory' ? '' : 
            products.map(p => `<option value="${p.id}">${p.name}</option>`).join(''));
        select.value = currentValue;
    });
    
    if (document.getElementById('productCategory')) {
        document.getElementById('productCategory').innerHTML = '<option value="">Seleccionar...</option>' +
            categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
}

// Cargar productos para movimiento
function loadProductsForMovement() {
    loadCategoriesSelect();
}

// Registrar entrada
function registerEntry(e) {
    e.preventDefault();
    
    const productId = document.getElementById('entryProduct').value;
    const quantity = parseInt(document.getElementById('entryQuantity').value);
    const observations = document.getElementById('entryObservations').value;
    
    if (!productId || quantity <= 0) {
        showAlert('Seleccione un producto y cantidad válida', 'error');
        return;
    }
    
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showAlert('Producto no encontrado', 'error');
        return;
    }
    
    // Actualizar stock
    product.quantity += quantity;
    localStorage.setItem('products', JSON.stringify(products));
    
    // Registrar movimiento
    recordMovement({
        productId,
        productName: product.name,
        type: 'entrada',
        quantity,
        observations,
        userId: currentUser.id,
        userName: currentUser.username
    });
    
    document.getElementById('entryForm').reset();
    showAlert('Entrada registrada correctamente');
    loadInventory();
}

// Registrar salida
function registerExit(e) {
    e.preventDefault();
    
    const productId = document.getElementById('exitProduct').value;
    const quantity = parseInt(document.getElementById('exitQuantity').value);
    const exitType = document.getElementById('exitType').value;
    const observations = document.getElementById('exitObservations').value;
    
    if (!productId || quantity <= 0 || !exitType) {
        showAlert('Todos los campos son obligatorios', 'error');
        return;
    }
    
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showAlert('Producto no encontrado', 'error');
        return;
    }
    
    if (product.quantity < quantity) {
        showAlert(`Stock insuficiente. Disponible: ${product.quantity}`, 'error');
        return;
    }
    
    // Actualizar stock
    product.quantity -= quantity;
    localStorage.setItem('products', JSON.stringify(products));
    
    // Registrar movimiento
    recordMovement({
        productId,
        productName: product.name,
        type: 'salida',
        subtype: exitType,
        quantity,
        observations,
        userId: currentUser.id,
        userName: currentUser.username
    });
    
    document.getElementById('exitForm').reset();
    showAlert('Salida registrada correctamente');
    loadInventory();
}

// Cargar categorías
function loadCategories() {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    displayCategories(categories);
}

// Mostrar categorías
function displayCategories(categories) {
    const table = document.getElementById('categoriesTable');
    if (!table) return;
    
    if (categories.length === 0) {
        table.innerHTML = '<tr><td colspan="3" class="px-4 py-4 text-center text-gray-500">No hay categorías</td></tr>';
        return;
    }
    
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    table.innerHTML = categories.map(category => {
        const count = products.filter(p => p.categoryId === category.id).length;
        return `
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 font-semibold text-gray-800">${category.name}</td>
                <td class="px-4 py-3 text-center font-semibold">${count}</td>
                <td class="px-4 py-3 text-center">
                    <button onclick="deleteCategory('${category.id}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                        🗑️ Eliminar
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Agregar categoría
function addCategory(e) {
    e.preventDefault();
    
    if (!validateUserPermission('admin')) return;
    
    const categoryName = document.getElementById('categoryName').value.trim();
    
    if (!categoryName) {
        showAlert('Ingrese un nombre para la categoría', 'error');
        return;
    }
    
    let categories = JSON.parse(localStorage.getItem('categories') || '[]');
    
    if (categories.some(c => c.name.toLowerCase() === categoryName.toLowerCase())) {
        showAlert('La categoría ya existe', 'error');
        return;
    }
    
    categories.push({
        id: generateId(),
        name: categoryName
    });
    
    localStorage.setItem('categories', JSON.stringify(categories));
    document.getElementById('categoryForm').reset();
    loadCategories();
    loadCategoriesSelect();
    showAlert('Categoría agregada correctamente');
}

// Eliminar categoría
function deleteCategory(categoryId) {
    if (!validateUserPermission('admin')) return;
    
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    if (products.some(p => p.categoryId === categoryId)) {
        showAlert('No puede eliminar una categoría con productos', 'error');
        return;
    }
    
    if (!confirm('¿Está seguro de que desea eliminar esta categoría?')) return;
    
    const filtered = categories.filter(c => c.id !== categoryId);
    localStorage.setItem('categories', JSON.stringify(filtered));
    
    loadCategories();
    showAlert('Categoría eliminada correctamente');
}

// Registrar movimiento
function recordMovement(movement) {
    let movements = JSON.parse(localStorage.getItem('movements') || '[]');
    
    movements.push({
        id: generateId(),
        ...movement,
        date: new Date().toISOString()
    });
    
    localStorage.setItem('movements', JSON.stringify(movements));
}

// Cargar usuarios
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    displayUsers(users);
}

// Mostrar usuarios
function displayUsers(users) {
    const table = document.getElementById('usersTable');
    if (!table) return;
    
    table.innerHTML = users.map(user => `
        <tr class="hover:bg-gray-50">
            <td class="px-4 py-3 font-semibold text-gray-800">${user.username}</td>
            <td class="px-4 py-3 text-gray-600">${user.role === 'admin' ? 'Administrador' : 'Empleado'}</td>
            <td class="px-4 py-3 text-center">
                <span class="px-3 py-1 rounded-full text-sm font-semibold ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${user.active ? 'Activo' : 'Inactivo'}
                </span>
            </td>
            <td class="px-4 py-3 text-center">
                <button onclick="toggleUserStatus('${user.id}')" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2">
                    ${user.active ? '🔒 Desactivar' : '🔓 Activar'}
                </button>
                ${user.id !== currentUser.id ? `<button onclick="deleteUser('${user.id}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    🗑️ Eliminar
                </button>` : ''}
            </td>
        </tr>
    `).join('');
}

// Abrir modal de usuario
function openUserModal() {
    if (!validateUserPermission('admin')) return;
    document.getElementById('userForm').reset();
    document.getElementById('userModal').classList.remove('hidden');
}

// Cerrar modal de usuario
function closeUserModal() {
    document.getElementById('userModal').classList.add('hidden');
}

// Agregar usuario
function addUser(e) {
    e.preventDefault();
    
    if (!validateUserPermission('admin')) return;
    
    const username = document.getElementById('userName').value.trim();
    const password = document.getElementById('userPassword').value;
    const role = document.getElementById('userRole').value;
    
    if (!username || !password) {
        showAlert('Ingrese usuario y contraseña', 'error');
        return;
    }
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.username === username)) {
        showAlert('El usuario ya existe', 'error');
        return;
    }
    
    users.push({
        id: generateId(),
        username,
        password,
        role,
        active: true
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    closeUserModal();
    loadUsers();
    showAlert('Usuario agregado correctamente');
}

// Cambiar estado de usuario
function toggleUserStatus(userId) {
    if (!validateUserPermission('admin')) return;
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === userId);
    
    if (user) {
        user.active = !user.active;
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
        showAlert(user.active ? 'Usuario activado' : 'Usuario desactivado');
    }
}

// Eliminar usuario
function deleteUser(userId) {
    if (!validateUserPermission('admin')) return;
    
    if (!confirm('¿Está seguro de que desea eliminar este usuario?')) return;
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    
    loadUsers();
    showAlert('Usuario eliminado correctamente');
}
