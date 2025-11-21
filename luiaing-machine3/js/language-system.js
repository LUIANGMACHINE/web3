// 多语言支持系统
const translations = {
    'zh-CN': {
        // 导航
        'home': '首页',
        'about': '关于我们',
        'products': '产品中心',
        'blog': '博客',
        'contact': '联系我们',
        'fuel-dispenser': '加油机',
        'fuel-dispenser-parts': '加油机配件',
        'adblue-equipment': '尿素配件',
        'industrial-pump-flowmeter': '工业泵和流量计',
        'lpg-equipment': 'LPG 配件',
        'other-equipment': '其他',
        
        // 通用
        'search-placeholder': '搜索产品...',
        'add-to-cart': '加入购物车',
        'request-quotation': '请求报价',
        'view-details': '查看详情',
        'learn-more': '了解更多',
        'read-more': '阅读更多',
        'submit': '提交',
        'send': '发送',
        'name': '姓名',
        'email': '邮箱',
        'phone': '电话',
        'message': '留言',
        'subject': '主题',
        
        // 首页
        'featured-products': '热门产品',
        'delivery-notice': '交期延长',
        'delivery-details': '由于全球供应链问题，当前产品交付时间可能延长至30-45天',
        
        // 产品页面
        'product-categories': '产品分类',
        'sort-by': '排序方式',
        'default-sort': '默认排序',
        'price-low-to-high': '价格从低到高',
        'price-high-to-low': '价格从高到低',
        'sort-by-name': '按名称排序',
        'showing-products': '显示 {count} 个产品',
        
        // 购物车
        'cart': '购物车',
        'total': '总计',
        'remove': '删除',
        'empty-cart': '购物车为空',
        
        // 联系页面
        'contact-us': '联系我们',
        'company-info': '公司信息',
        'get-in-touch': '取得联系',
        'send-message': '发送消息',
        'our-location': '我们的位置',
        
        // 博客
        'recent-posts': '最新文章',
        'leave-comment': '留言',
        'comments': '评论',
        'post-comment': '发表评论',
        
        // 页脚
        'quick-links': '快速链接',
        'customer-service': '客户服务',
        'newsletter': '新闻通讯',
        'subscribe': '订阅',
        'subscribe-placeholder': '您的邮箱地址',
        'all-rights-reserved': '版权所有',
        
        // 管理员
        'admin-login': '管理员登录',
        'username': '用户名',
        'password': '密码',
        'login': '登录',
        'dashboard': '仪表板',
        'add-product': '添加产品',
        'edit-product': '编辑产品',
        'delete-product': '删除产品',
        'add-post': '添加文章',
        'edit-post': '编辑文章',
        'delete-post': '删除文章',
        'manage-comments': '管理评论',
        'website-settings': '网站设置'
    },
    'en': {
        // Navigation
        'home': 'Home',
        'about': 'About Us',
        'products': 'Products',
        'blog': 'Blog',
        'contact': 'Contact Us',
        'fuel-dispenser': 'Fuel Dispenser',
        'fuel-dispenser-parts': 'Fuel Dispenser Parts',
        'adblue-equipment': 'Adblue Equipment',
        'industrial-pump-flowmeter': 'Industrial Pump & Flowmeter',
        'lpg-equipment': 'LPG Equipment',
        'other-equipment': 'Other Equipment',
        
        // Common
        'search-placeholder': 'Search products...',
        'add-to-cart': 'Add to Cart',
        'request-quotation': 'Request Quotation',
        'view-details': 'View Details',
        'learn-more': 'Learn More',
        'read-more': 'Read More',
        'submit': 'Submit',
        'send': 'Send',
        'name': 'Name',
        'email': 'Email',
        'phone': 'Phone',
        'message': 'Message',
        'subject': 'Subject',
        
        // Homepage
        'featured-products': 'Featured Products',
        'delivery-notice': 'Delivery Extended',
        'delivery-details': 'Due to global supply chain issues, current product delivery times may be extended to 30-45 days',
        
        // Products Page
        'product-categories': 'Product Categories',
        'sort-by': 'Sort By',
        'default-sort': 'Default Sort',
        'price-low-to-high': 'Price: Low to High',
        'price-high-to-low': 'Price: High to Low',
        'sort-by-name': 'Sort by Name',
        'showing-products': 'Showing {count} products',
        
        // Cart
        'cart': 'Shopping Cart',
        'total': 'Total',
        'remove': 'Remove',
        'empty-cart': 'Your cart is empty',
        
        // Contact Page
        'contact-us': 'Contact Us',
        'company-info': 'Company Information',
        'get-in-touch': 'Get In Touch',
        'send-message': 'Send Message',
        'our-location': 'Our Location',
        
        // Blog
        'recent-posts': 'Recent Posts',
        'leave-comment': 'Leave a Comment',
        'comments': 'Comments',
        'post-comment': 'Post Comment',
        
        // Footer
        'quick-links': 'Quick Links',
        'customer-service': 'Customer Service',
        'newsletter': 'Newsletter',
        'subscribe': 'Subscribe',
        'subscribe-placeholder': 'Your email address',
        'all-rights-reserved': 'All Rights Reserved',
        
        // Admin
        'admin-login': 'Admin Login',
        'username': 'Username',
        'password': 'Password',
        'login': 'Login',
        'dashboard': 'Dashboard',
        'add-product': 'Add Product',
        'edit-product': 'Edit Product',
        'delete-product': 'Delete Product',
        'add-post': 'Add Post',
        'edit-post': 'Edit Post',
        'delete-post': 'Delete Post',
        'manage-comments': 'Manage Comments',
        'website-settings': 'Website Settings'
    },
    'ru': {
        // Навигация
        'home': 'Главная',
        'about': 'О нас',
        'products': 'Продукция',
        'blog': 'Блог',
        'contact': 'Контакты',
        'fuel-dispenser': 'Топливораздаточные колонки',
        'fuel-dispenser-parts': 'Запчасти для ТРК',
        'adblue-equipment': 'Оборудование для Adblue',
        'industrial-pump-flowmeter': 'Промышленные насосы и расходомеры',
        'lpg-equipment': 'Оборудование для СУГ',
        'other-equipment': 'Другое оборудование',
        
        // Общее
        'search-placeholder': 'Поиск продуктов...',
        'add-to-cart': 'В корзину',
        'request-quotation': 'Запрос цены',
        'view-details': 'Подробнее',
        'learn-more': 'Узнать больше',
        'read-more': 'Читать далее',
        'submit': 'Отправить',
        'send': 'Отправить',
        'name': 'Имя',
        'email': 'Эл. почта',
        'phone': 'Телефон',
        'message': 'Сообщение',
        'subject': 'Тема',
        
        // Главная страница
        'featured-products': 'Популярные товары',
        'delivery-notice': 'Срок доставки увеличен',
        'delivery-details': 'Из-за проблем в глобальной цепочке поставок сроки доставки текущих продуктов могут быть увеличены до 30-45 дней',
        
        // Страница продуктов
        'product-categories': 'Категории продуктов',
        'sort-by': 'Сортировать по',
        'default-sort': 'По умолчанию',
        'price-low-to-high': 'Цена: по возрастанию',
        'price-high-to-low': 'Цена: по убыванию',
        'sort-by-name': 'По названию',
        'showing-products': 'Показано {count} продуктов',
        
        // Корзина
        'cart': 'Корзина',
        'total': 'Итого',
        'remove': 'Удалить',
        'empty-cart': 'Ваша корзина пуста',
        
        // Страница контактов
        'contact-us': 'Свяжитесь с нами',
        'company-info': 'Информация о компании',
        'get-in-touch': 'Связаться',
        'send-message': 'Отправить сообщение',
        'our-location': 'Наше местоположение',
        
        // Блог
        'recent-posts': 'Недавние посты',
        'leave-comment': 'Оставить комментарий',
        'comments': 'Комментарии',
        'post-comment': 'Опубликовать комментарий',
        
        // Футер
        'quick-links': 'Быстрые ссылки',
        'customer-service': 'Обслуживание клиентов',
        'newsletter': 'Рассылка',
        'subscribe': 'Подписаться',
        'subscribe-placeholder': 'Ваш адрес электронной почты',
        'all-rights-reserved': 'Все права защищены',
        
        // Админка
        'admin-login': 'Вход для администратора',
        'username': 'Имя пользователя',
        'password': 'Пароль',
        'login': 'Войти',
        'dashboard': 'Панель управления',
        'add-product': 'Добавить продукт',
        'edit-product': 'Редактировать продукт',
        'delete-product': 'Удалить продукт',
        'add-post': 'Добавить статью',
        'edit-post': 'Редактировать статью',
        'delete-post': 'Удалить статью',
        'manage-comments': 'Управление комментариями',
        'website-settings': 'Настройки сайта'
    },
    'vi': {
        // Điều hướng
        'home': 'Trang chủ',
        'about': 'Về chúng tôi',
        'products': 'Sản phẩm',
        'blog': 'Blog',
        'contact': 'Liên hệ',
        'fuel-dispenser': 'Máy bơm xăng dầu',
        'fuel-dispenser-parts': 'Phụ tùng máy bơm xăng dầu',
        'adblue-equipment': 'Thiết bị Adblue',
        'industrial-pump-flowmeter': 'Máy bơm công nghiệp & Đồng hồ đo lưu lượng',
        'lpg-equipment': 'Thiết bị LPG',
        'other-equipment': 'Thiết bị khác',
        
        // Chung
        'search-placeholder': 'Tìm kiếm sản phẩm...',
        'add-to-cart': 'Thêm vào giỏ',
        'request-quotation': 'Yêu cầu báo giá',
        'view-details': 'Xem chi tiết',
        'learn-more': 'Tìm hiểu thêm',
        'read-more': 'Đọc thêm',
        'submit': 'Gửi',
        'send': 'Gửi',
        'name': 'Tên',
        'email': 'Email',
        'phone': 'Điện thoại',
        'message': 'Tin nhắn',
        'subject': 'Chủ đề',
        
        // Trang chủ
        'featured-products': 'Sản phẩm nổi bật',
        'delivery-notice': 'Thời gian giao hàng kéo dài',
        'delivery-details': 'Do vấn đề chuỗi cung ứng toàn cầu, thời gian giao hàng hiện tại có thể kéo dài đến 30-45 ngày',
        
        // Trang sản phẩm
        'product-categories': 'Danh mục sản phẩm',
        'sort-by': 'Sắp xếp theo',
        'default-sort': 'Mặc định',
        'price-low-to-high': 'Giá: Thấp đến cao',
        'price-high-to-low': 'Giá: Cao đến thấp',
        'sort-by-name': 'Sắp xếp theo tên',
        'showing-products': 'Hiển thị {count} sản phẩm',
        
        // Giỏ hàng
        'cart': 'Giỏ hàng',
        'total': 'Tổng cộng',
        'remove': 'Xóa',
        'empty-cart': 'Giỏ hàng của bạn trống',
        
        // Trang liên hệ
        'contact-us': 'Liên hệ với chúng tôi',
        'company-info': 'Thông tin công ty',
        'get-in-touch': 'Liên hệ',
        'send-message': 'Gửi tin nhắn',
        'our-location': 'Vị trí của chúng tôi',
        
        // Blog
        'recent-posts': 'Bài viết gần đây',
        'leave-comment': 'Để lại bình luận',
        'comments': 'Bình luận',
        'post-comment': 'Đăng bình luận',
        
        // Chân trang
        'quick-links': 'Liên kết nhanh',
        'customer-service': 'Dịch vụ khách hàng',
        'newsletter': 'Bản tin',
        'subscribe': 'Đăng ký',
        'subscribe-placeholder': 'Địa chỉ email của bạn',
        'all-rights-reserved': 'Đã đăng ký Bản quyền',
        
        // Quản trị
        'admin-login': 'Đăng nhập quản trị',
        'username': 'Tên đăng nhập',
        'password': 'Mật khẩu',
        'login': 'Đăng nhập',
        'dashboard': 'Bảng điều khiển',
        'add-product': 'Thêm sản phẩm',
        'edit-product': 'Sửa sản phẩm',
        'delete-product': 'Xóa sản phẩm',
        'add-post': 'Thêm bài viết',
        'edit-post': 'Sửa bài viết',
        'delete-post': 'Xóa bài viết',
        'manage-comments': 'Quản lý bình luận',
        'website-settings': 'Cài đặt website'
    }
};

// 当前语言
let currentLanguage = localStorage.getItem('language') || 'zh-CN';

// 初始化语言
function initLanguage() {
    setLanguage(currentLanguage);
    
    // 语言切换事件
    document.querySelectorAll('.language-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}

// 设置语言
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // 更新当前语言显示
    const currentLanguageElement = document.querySelector('.current-language');
    if (currentLanguageElement) {
        currentLanguageElement.textContent = getTranslation('current-language', lang);
    }
    
    // 更新所有可翻译元素
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getTranslation(key, lang);
    });
    
    // 更新占位符
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = getTranslation(key, lang);
    });
    
    // 更新属性
    document.querySelectorAll('[data-translate-attr]').forEach(element => {
        const parts = element.getAttribute('data-translate-attr').split(':');
        const key = parts[0];
        const attr = parts[1];
        element.setAttribute(attr, getTranslation(key, lang));
    });
}

// 获取翻译
function getTranslation(key, lang = currentLanguage) {
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            // 回退到英语
            let fallbackValue = translations['en'];
            for (const k of keys) {
                if (fallbackValue && fallbackValue[k]) {
                    fallbackValue = fallbackValue[k];
                } else {
                    return key; // 如果找不到翻译，返回键名
                }
            }
            return fallbackValue;
        }
    }
    
    return value || key;
}

// 初始化
document.addEventListener('DOMContentLoaded', initLanguage);