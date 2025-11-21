// 主JavaScript文件
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // 产品轮播
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (carouselTrack && carouselItems.length > 0) {
        let currentIndex = 0;
        const itemWidth = carouselItems[0].offsetWidth;
        const totalItems = carouselItems.length;
        
        function updateCarousel() {
            carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCarousel();
            });
        }
        
        // 自动轮播
        setInterval(function() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
    }
    
    // 横幅轮播
    const bannerSlides = document.querySelectorAll('.banner .slide');
    let currentSlide = 0;
    
    if (bannerSlides.length > 0) {
        function showSlide(index) {
            bannerSlides.forEach(slide => slide.classList.remove('active'));
            bannerSlides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % bannerSlides.length;
            showSlide(currentSlide);
        }
        
        // 自动切换横幅
        setInterval(nextSlide, 6000);
    }
    
    // 产品分类高亮
    const categoryLinks = document.querySelectorAll('.category-link');
    const urlParams = new URLSearchParams(window.location.search);
    const currentCategory = urlParams.get('category');
    
    categoryLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentCategory)) {
            link.classList.add('active');
        }
    });
    
    // 加载产品数据
    loadProducts();
    
    // 初始化购物车
    initCart();
});

// 加载产品数据
function loadProducts() {
    // 模拟产品数据
    const products = [
        {
            id: 1,
            name: 'LC流量计',
            category: 'industrial-pump-flowmeter',
            price: 1200,
            image: 'images/products/lc-flowmeter.jpg',
            description: '高精度LC系列流量计，适用于各种工业应用'
        },
        {
            id: 2,
            name: '加油机配件套装',
            category: 'fuel-dispenser-parts',
            price: 850,
            image: 'images/products/fuel-dispenser-parts.jpg',
            description: '高品质加油机配件，确保设备稳定运行'
        },
        // 更多产品数据...
    ];
    
    // 根据当前页面加载产品
    if (document.querySelector('.products-grid')) {
        displayProducts(products);
    }
    
    if (document.querySelector('.carousel-track')) {
        displayFeaturedProducts(products.slice(0, 4));
    }
}

// 显示产品列表
function displayProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <div class="product-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-item-info">
                <h3>${product.name}</h3>
                <div class="product-item-price">$${product.price}</div>
                <p>${product.description}</p>
                <button class="add-to-cart" data-id="${product.id}">加入购物车</button>
            </div>
        `;
        productsGrid.appendChild(productItem);
    });
    
    // 添加购物车事件
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// 显示特色产品
function displayFeaturedProducts(products) {
    const carouselTrack = document.querySelector('.carousel-track');
    if (!carouselTrack) return;
    
    carouselTrack.innerHTML = '';
    
    products.forEach(product => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.innerHTML = `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">$${product.price}</div>
                    <button class="add-to-cart" data-id="${product.id}">加入购物车</button>
                </div>
            </div>
        `;
        carouselTrack.appendChild(carouselItem);
    });
    
    // 添加购物车事件
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}