// 购物车功能
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 初始化购物车
function initCart() {
    updateCartCount();
    
    // 购物车图标点击事件
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    
    if (cartIcon && cartSidebar) {
        cartIcon.addEventListener('click', function() {
            cartSidebar.classList.add('open');
            renderCartItems();
        });
    }
    
    if (closeCart && cartSidebar) {
        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('open');
        });
    }
    
    // 请求报价按钮
    const requestQuotationBtn = document.querySelector('.request-quotation-btn');
    if (requestQuotationBtn) {
        requestQuotationBtn.addEventListener('click', function() {
            requestQuotation();
        });
    }
}

// 添加到购物车
function addToCart(productId) {
    // 获取产品信息
    const product = getProductById(productId);
    
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    // 检查是否已在购物车中
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // 保存到本地存储
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 更新购物车计数
    updateCartCount();
    
    // 如果购物车侧边栏打开，更新显示
    if (document.querySelector('.cart-sidebar.open')) {
        renderCartItems();
    }
    
    // 显示添加成功消息
    showMessage('产品已添加到购物车', 'success');
}

// 从购物车移除
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// 更新购物车数量
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    }
}

// 更新购物车计数
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// 渲染购物车项目
function renderCartItems() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">' + getTranslation('empty-cart') + '</p>';
        if (cartTotal) cartTotal.textContent = '$0.00';
        return;
    }
    
    let itemsHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHTML;
    if (cartTotal) cartTotal.textContent = '$' + total.toFixed(2);
    
    // 添加事件监听器
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateCartQuantity(productId, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateCartQuantity(productId, item.quantity + 1);
            }
        });
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.getAttribute('data-id');
            const quantity = parseInt(this.value) || 1;
            updateCartQuantity(productId, quantity);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
}

// 请求报价
function requestQuotation() {
    if (cart.length === 0) {
        showMessage('购物车为空，请先添加产品', 'error');
        return;
    }
    
    // 构建邮件内容
    let emailBody = '产品报价请求:\n\n';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        emailBody += `产品: ${item.name}\n`;
        emailBody += `数量: ${item.quantity}\n`;
        emailBody += `单价: $${item.price.toFixed(2)}\n`;
        emailBody += `小计: $${itemTotal.toFixed(2)}\n\n`;
    });
    
    emailBody += `总计: $${total.toFixed(2)}\n\n`;
    emailBody += `请尽快提供报价，谢谢！`;
    
    // 在实际应用中，这里应该发送到服务器处理
    // 这里使用mailto链接作为临时解决方案
    const mailtoLink = `mailto:luiangparts@luiangparts.com?subject=产品报价请求&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    // 显示成功消息
    showMessage('报价请求已发送，我们将尽快回复您', 'success');
    
    // 清空购物车
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// 获取产品信息
function getProductById(productId) {
    // 在实际应用中，这里应该从API或数据库获取
    // 这里使用模拟数据
    const products = [
        {
            id: '1',
            name: 'LC流量计',
            price: 1200,
            image: 'images/products/lc-flowmeter.jpg'
        },
        {
            id: '2',
            name: '加油机配件套装',
            price: 850,
            image: 'images/products/fuel-dispenser-parts.jpg'
        }
        // 更多产品...
    ];
    
    return products.find(product => product.id === productId);
}

// 显示消息
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// 初始化
document.addEventListener('DOMContentLoaded', initCart);