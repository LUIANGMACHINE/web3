// 后台管理系统JavaScript
class AdminSystem {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'dashboard';
        this.currentModal = null;
        this.confirmCallback = null;
        this.products = JSON.parse(localStorage.getItem('admin_products')) || [];
        this.posts = JSON.parse(localStorage.getItem('admin_posts')) || [];
        this.comments = JSON.parse(localStorage.getItem('admin_comments')) || [];
        this.messages = JSON.parse(localStorage.getItem('admin_messages')) || [];
        this.settings = JSON.parse(localStorage.getItem('admin_settings')) || this.getDefaultSettings();
        
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.setupEventListeners();
        this.loadDashboardData();
        this.initTinyMCE();
    }

    // 检查登录状态
    checkLoginStatus() {
        const loggedIn = localStorage.getItem('admin_logged_in');
        if (loggedIn === 'true') {
            this.showAdminPanel();
        } else {
            this.showLoginPage();
        }
    }

    // 显示登录页面
    showLoginPage() {
        document.getElementById('login-page').style.display = 'flex';
        document.getElementById('admin-panel').style.display = 'none';
    }

    // 显示管理面板
    showAdminPanel() {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'flex';
        this.loadSection(this.currentSection);
    }

    // 设置事件监听器
    setupEventListeners() {
        // 登录表单
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // 导航链接
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.loadSection(section);
            });
        });

        // 侧边栏切换
        document.querySelector('.sidebar-toggle').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // 退出登录
        document.querySelector('.logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogout();
        });

        // 模态框关闭
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // 模态框外部点击关闭
        document.getElementById('modal-overlay').addEventListener('click', () => {
            this.closeModal();
        });

        // 产品管理
        document.getElementById('add-product-btn').addEventListener('click', () => {
            this.openProductModal();
        });

        // 博客管理
        document.getElementById('add-post-btn').addEventListener('click', () => {
            this.openPostModal();
        });

        // 设置保存
        document.getElementById('save-settings').addEventListener('click', () => {
            this.saveSettings();
        });

        // 确认模态框
        document.getElementById('confirm-cancel').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('confirm-action').addEventListener('click', () => {
            if (this.confirmCallback) {
                this.confirmCallback();
            }
            this.closeModal();
        });

        // 图片上传
        this.setupImageUpload('product-upload-area', 'product-image', 'product-image-preview');
        this.setupImageUpload('post-upload-area', 'post-featured-image', 'post-image-preview');

        // 表单提交
        document.getElementById('product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        document.getElementById('post-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePost();
        });
    }

    // 初始化TinyMCE编辑器
    initTinyMCE() {
        if (typeof tinymce !== 'undefined') {
            tinymce.init({
                selector: '#post-editor',
                height: 400,
                menubar: 'file edit view insert format tools table',
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code',
                content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }'
            });
        }
    }

    // 处理登录
    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const messageEl = document.getElementById('login-message');

        // 简单的验证（在实际应用中应该与后端API交互）
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('admin_logged_in', 'true');
            this.currentUser = { username: 'admin' };
            this.showAdminPanel();
            this.showMessage('登录成功！', 'success');
        } else {
            messageEl.textContent = '用户名或密码错误！';
            messageEl.className = 'message error';
        }
    }

    // 处理退出登录
    handleLogout() {
        localStorage.removeItem('admin_logged_in');
        this.currentUser = null;
        this.showLoginPage();
        this.showMessage('已退出登录', 'success');
    }

    // 切换侧边栏
    toggleSidebar() {
        const sidebar = document.querySelector('.admin-sidebar');
        sidebar.classList.toggle('collapsed');
    }

    // 加载部分内容
    loadSection(section) {
        // 更新导航激活状态
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // 更新页面标题
        document.getElementById('page-title').textContent = this.getSectionTitle(section);

        // 隐藏所有部分
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // 显示当前部分
        document.getElementById(section).classList.add('active');

        // 加载部分特定数据
        switch (section) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'products':
                this.loadProducts();
                break;
            case 'blog':
                this.loadPosts();
                break;
            case 'comments':
                this.loadComments();
                break;
            case 'messages':
                this.loadMessages();
                break;
            case 'settings':
                this.loadSettings();
                break;
            case 'banners':
                this.loadBanners();
                break;
        }

        this.currentSection = section;
    }

    // 获取部分标题
    getSectionTitle(section) {
        const titles = {
            'dashboard': '仪表板',
            'products': '产品管理',
            'blog': '博客管理',
            'comments': '评论管理',
            'messages': '消息管理',
            'settings': '网站设置',
            'banners': '横幅管理'
        };
        return titles[section] || '管理面板';
    }

    // 加载仪表板数据
    loadDashboardData() {
        // 更新统计数字
        document.getElementById('total-products').textContent = this.products.length;
        document.getElementById('total-posts').textContent = this.posts.length;
        document.getElementById('pending-comments').textContent = this.comments.filter(c => c.status === 'pending').length;
        document.getElementById('unread-messages').textContent = this.messages.filter(m => m.status === 'unread').length;

        // 加载最近产品
        this.loadRecentProducts();
        
        // 加载最近博客
        this.loadRecentPosts();
    }

    // 加载最近产品
    loadRecentProducts() {
        const container = document.getElementById('recent-products');
        const recentProducts = this.products.slice(-5).reverse();
        
        container.innerHTML = recentProducts.map(product => `
            <div class="recent-item">
                <div class="recent-item-image">
                    <img src="${product.image || 'images/placeholder.jpg'}" alt="${product.name}">
                </div>
                <div class="recent-item-info">
                    <div class="recent-item-title">${product.name}</div>
                    <div class="recent-item-meta">$${product.price} • ${this.formatDate(product.createdAt)}</div>
                </div>
            </div>
        `).join('');
    }

    // 加载最近博客
    loadRecentPosts() {
        const container = document.getElementById('recent-posts');
        const recentPosts = this.posts.slice(-5).reverse();
        
        container.innerHTML = recentPosts.map(post => `
            <div class="recent-item">
                <div class="recent-item-info">
                    <div class="recent-item-title">${post.title}</div>
                    <div class="recent-item-meta">${post.category} • ${this.formatDate(post.createdAt)}</div>
                </div>
            </div>
        `).join('');
    }

    // 加载产品
    loadProducts() {
        const tbody = document.getElementById('products-table-body');
        tbody.innerHTML = this.products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>
                    <img src="${product.image || 'images/placeholder.jpg'}" alt="${product.name}">
                </td>
                <td>${product.name}</td>
                <td>${this.getCategoryName(product.category)}</td>
                <td>$${product.price}</td>
                <td>
                    <span class="status-badge ${product.status === 'active' ? 'status-active' : 'status-inactive'}">
                        ${product.status === 'active' ? '上架' : '下架'}
                    </span>
                </td>
                <td>${this.formatDate(product.createdAt)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" onclick="adminSystem.editProduct(${product.id})">
                            <i class="fas fa-edit"></i> 编辑
                        </button>
                        <button class="action-btn delete" onclick="adminSystem.confirmDelete('product', ${product.id})">
                            <i class="fas fa-trash"></i> 删除
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // 加载博客文章
    loadPosts() {
        const tbody = document.getElementById('posts-table-body');
        tbody.innerHTML = this.posts.map(post => `
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${this.getPostCategoryName(post.category)}</td>
                <td>${post.author || '管理员'}</td>
                <td>
                    <span class="status-badge ${post.status === 'published' ? 'status-active' : 'status-pending'}">
                        ${post.status === 'published' ? '已发布' : '草稿'}
                    </span>
                </td>
                <td>${this.formatDate(post.createdAt)}</td>
                <td>${post.commentCount || 0}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" onclick="adminSystem.editPost(${post.id})">
                            <i class="fas fa-edit"></i> 编辑
                        </button>
                        <button class="action-btn delete" onclick="adminSystem.confirmDelete('post', ${post.id})">
                            <i class="fas fa-trash"></i> 删除
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // 加载评论
    loadComments() {
        const tbody = document.getElementById('comments-table-body');
        tbody.innerHTML = this.comments.map(comment => `
            <tr>
                <td>
                    <input type="checkbox" value="${comment.id}">
                </td>
                <td>${comment.id}</td>
                <td>${comment.content}</td>
                <td>${comment.postTitle || '产品评论'}</td>
                <td>${comment.author}</td>
                <td>
                    <span class="status-badge ${comment.status === 'approved' ? 'status-active' : comment.status === 'rejected' ? 'status-inactive' : 'status-pending'}">
                        ${comment.status === 'approved' ? '已通过' : comment.status === 'rejected' ? '已拒绝' : '待审核'}
                    </span>
                </td>
                <td>${this.formatDate(comment.createdAt)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn success" onclick="adminSystem.approveComment(${comment.id})">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="action-btn delete" onclick="adminSystem.rejectComment(${comment.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // 加载消息
    loadMessages() {
        const tbody = document.getElementById('messages-table-body');
        tbody.innerHTML = this.messages.map(message => `
            <tr>
                <td>${message.id}</td>
                <td>${message.name}</td>
                <td>${message.email}</td>
                <td>${message.subject}</td>
                <td>${this.formatDate(message.createdAt)}</td>
                <td>
                    <span class="status-badge ${message.status === 'read' ? 'status-active' : 'status-pending'}">
                        ${message.status === 'read' ? '已读' : '未读'}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view" onclick="adminSystem.viewMessage(${message.id})">
                            <i class="fas fa-eye"></i> 查看
                        </button>
                        <button class="action-btn delete" onclick="adminSystem.confirmDelete('message', ${message.id})">
                            <i class="fas fa-trash"></i> 删除
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // 加载设置
    loadSettings() {
        // 加载基本设置
        document.getElementById('site-title').value = this.settings.site_title || '';
        document.getElementById('site-description').value = this.settings.site_description || '';
        document.getElementById('admin-email').value = this.settings.admin_email || '';
        document.getElementById('contact-email').value = this.settings.contact_email || '';
        document.getElementById('contact-phone').value = this.settings.contact_phone || '';

        // 加载SEO设置
        document.getElementById('meta-title').value = this.settings.meta_title || '';
        document.getElementById('meta-description').value = this.settings.meta_description || '';
        document.getElementById('meta-keywords').value = this.settings.meta_keywords || '';
        document.getElementById('google-analytics').value = this.settings.google_analytics || '';

        // 加载邮件设置
        document.getElementById('smtp-host').value = this.settings.smtp_host || '';
        document.getElementById('smtp-port').value = this.settings.smtp_port || '';
        document.getElementById('smtp-username').value = this.settings.smtp_username || '';
        document.getElementById('smtp-password').value = this.settings.smtp_password || '';
        document.getElementById('smtp-encryption').value = this.settings.smtp_encryption || 'tls';
    }

    // 打开产品模态框
    openProductModal(productId = null) {
        const modal = document.getElementById('product-modal');
        const title = document.getElementById('product-modal-title');
        const form = document.getElementById('product-form');

        if (productId) {
            // 编辑模式
            title.textContent = '编辑产品';
            const product = this.products.find(p => p.id === productId);
            if (product) {
                document.getElementById('product-name').value = product.name;
                document.getElementById('product-category').value = product.category;
                document.getElementById('product-price').value = product.price;
                document.getElementById('product-stock').value = product.stock || 0;
                document.getElementById('product-description').value = product.description || '';
                document.getElementById('product-specifications').value = product.specifications ? product.specifications.join('\n') : '';
                document.getElementById('product-status').checked = product.status === 'active';
                
                // 显示图片预览
                if (product.image) {
                    const preview = document.getElementById('product-image-preview');
                    preview.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
                    preview.style.display = 'block';
                }
            }
            form.dataset.editId = productId;
        } else {
            // 添加模式
            title.textContent = '添加产品';
            form.reset();
            form.dataset.editId = '';
            document.getElementById('product-image-preview').style.display = 'none';
        }

        this.openModal('product-modal');
    }

    // 打开博客模态框
    openPostModal(postId = null) {
        const modal = document.getElementById('post-modal');
        const title = document.getElementById('post-modal-title');
        const form = document.getElementById('post-form');

        if (postId) {
            // 编辑模式
            title.textContent = '编辑文章';
            const post = this.posts.find(p => p.id === postId);
            if (post) {
                document.getElementById('post-title').value = post.title;
                document.getElementById('post-category').value = post.category;
                document.getElementById('post-tags').value = post.tags ? post.tags.join(', ') : '';
                document.getElementById('post-excerpt').value = post.excerpt || '';
                
                if (typeof tinymce !== 'undefined') {
                    tinymce.get('post-editor').setContent(post.content || '');
                }
                
                document.getElementById('post-featured').checked = post.featured || false;
                document.getElementById('post-comments').checked = post.allow_comments !== false;
                
                // 显示图片预览
                if (post.featured_image) {
                    const preview = document.getElementById('post-image-preview');
                    preview.innerHTML = `<img src="${post.featured_image}" alt="${post.title}">`;
                    preview.style.display = 'block';
                }
            }
            form.dataset.editId = postId;
        } else {
            // 添加模式
            title.textContent = '添加文章';
            form.reset();
            form.dataset.editId = '';
            document.getElementById('post-image-preview').style.display = 'none';
            
            if (typeof tinymce !== 'undefined') {
                tinymce.get('post-editor').setContent('');
            }
        }

        this.openModal('post-modal');
    }

    // 保存产品
    saveProduct() {
        const form = document.getElementById('product-form');
        const formData = new FormData(form);
        const editId = form.dataset.editId;

        const product = {
            id: editId ? parseInt(editId) : this.generateId(),
            name: formData.get('name'),
            category: formData.get('category'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock')) || 0,
            description: formData.get('description'),
            specifications: formData.get('specifications') ? formData.get('specifications').split('\n').filter(s => s.trim()) : [],
            status: formData.get('status') ? 'active' : 'inactive',
            image: document.getElementById('product-image-preview').querySelector('img')?.src || '',
            createdAt: editId ? this.products.find(p => p.id === parseInt(editId))?.createdAt || new Date() : new Date(),
            updatedAt: new Date()
        };

        if (editId) {
            // 更新现有产品
            const index = this.products.findIndex(p => p.id === parseInt(editId));
            if (index !== -1) {
                this.products[index] = product;
            }
        } else {
            // 添加新产品
            this.products.push(product);
        }

        this.saveData('admin_products', this.products);
        this.closeModal();
        this.loadProducts();
        this.loadDashboardData();
        this.showMessage('产品保存成功！', 'success');
    }

    // 保存博客文章
    savePost() {
        const form = document.getElementById('post-form');
        const formData = new FormData(form);
        const editId = form.dataset.editId;

        const post = {
            id: editId ? parseInt(editId) : this.generateId(),
            title: formData.get('title'),
            category: formData.get('category'),
            tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag) : [],
            excerpt: formData.get('excerpt'),
            content: typeof tinymce !== 'undefined' ? tinymce.get('post-editor').getContent() : formData.get('content'),
            featured_image: document.getElementById('post-image-preview').querySelector('img')?.src || '',
            featured: formData.get('featured') || false,
            allow_comments: formData.get('allow_comments') || false,
            status: 'published',
            author: '管理员',
            commentCount: 0,
            createdAt: editId ? this.posts.find(p => p.id === parseInt(editId))?.createdAt || new Date() : new Date(),
            updatedAt: new Date()
        };

        if (editId) {
            // 更新现有文章
            const index = this.posts.findIndex(p => p.id === parseInt(editId));
            if (index !== -1) {
                this.posts[index] = post;
            }
        } else {
            // 添加新文章
            this.posts.push(post);
        }

        this.saveData('admin_posts', this.posts);
        this.closeModal();
        this.loadPosts();
        this.loadDashboardData();
        this.showMessage('文章保存成功！', 'success');
    }

    // 编辑产品
    editProduct(productId) {
        this.openProductModal(productId);
    }

    // 编辑博客文章
    editPost(postId) {
        this.openPostModal(postId);
    }

    // 确认删除
    confirmDelete(type, id) {
        const messages = {
            'product': '您确定要删除这个产品吗？',
            'post': '您确定要删除这篇文章吗？',
            'message': '您确定要删除这条消息吗？'
        };

        document.getElementById('confirm-message').textContent = messages[type] || '您确定要执行此操作吗？';
        this.confirmCallback = () => this.deleteItem(type, id);
        this.openModal('confirm-modal');
    }

    // 删除项目
    deleteItem(type, id) {
        switch (type) {
            case 'product':
                this.products = this.products.filter(p => p.id !== id);
                this.saveData('admin_products', this.products);
                this.loadProducts();
                break;
            case 'post':
                this.posts = this.posts.filter(p => p.id !== id);
                this.saveData('admin_posts', this.posts);
                this.loadPosts();
                break;
            case 'message':
                this.messages = this.messages.filter(m => m.id !== id);
                this.saveData('admin_messages', this.messages);
                this.loadMessages();
                break;
        }
        
        this.loadDashboardData();
        this.showMessage('删除成功！', 'success');
    }

    // 批准评论
    approveComment(commentId) {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
            comment.status = 'approved';
            this.saveData('admin_comments', this.comments);
            this.loadComments();
            this.showMessage('评论已批准！', 'success');
        }
    }

    // 拒绝评论
    rejectComment(commentId) {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
            comment.status = 'rejected';
            this.saveData('admin_comments', this.comments);
            this.loadComments();
            this.showMessage('评论已拒绝！', 'success');
        }
    }

    // 查看消息
    viewMessage(messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (message) {
            document.getElementById('message-name').textContent = message.name;
            document.getElementById('message-email').textContent = message.email;
            document.getElementById('message-phone').textContent = message.phone || '未提供';
            document.getElementById('message-subject').textContent = message.subject;
            document.getElementById('message-content').textContent = message.content;
            document.getElementById('message-time').textContent = this.formatDate(message.createdAt);

            // 标记为已读
            message.status = 'read';
            this.saveData('admin_messages', this.messages);
            this.loadMessages();
            this.loadDashboardData();

            this.openModal('message-modal');
        }
    }

    // 保存设置
    saveSettings() {
        // 基本设置
        this.settings.site_title = document.getElementById('site-title').value;
        this.settings.site_description = document.getElementById('site-description').value;
        this.settings.admin_email = document.getElementById('admin-email').value;
        this.settings.contact_email = document.getElementById('contact-email').value;
        this.settings.contact_phone = document.getElementById('contact-phone').value;

        // SEO设置
        this.settings.meta_title = document.getElementById('meta-title').value;
        this.settings.meta_description = document.getElementById('meta-description').value;
        this.settings.meta_keywords = document.getElementById('meta-keywords').value;
        this.settings.google_analytics = document.getElementById('google-analytics').value;

        // 邮件设置
        this.settings.smtp_host = document.getElementById('smtp-host').value;
        this.settings.smtp_port = document.getElementById('smtp-port').value;
        this.settings.smtp_username = document.getElementById('smtp-username').value;
        this.settings.smtp_password = document.getElementById('smtp-password').value;
        this.settings.smtp_encryption = document.getElementById('smtp-encryption').value;

        this.saveData('admin_settings', this.settings);
        this.showMessage('设置保存成功！', 'success');
    }

    // 设置图片上传
    setupImageUpload(uploadAreaId, fileInputId, previewId) {
        const uploadArea = document.getElementById(uploadAreaId);
        const fileInput = document.getElementById(fileInputId);
        const preview = document.getElementById(previewId);

        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleImageUpload(files[0], preview);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleImageUpload(e.target.files[0], preview);
            }
        });
    }

    // 处理图片上传
    handleImageUpload(file, preview) {
        if (!file.type.match('image.*')) {
            this.showMessage('请选择图片文件！', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            this.showMessage('图片大小不能超过5MB！', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}" alt="预览">`;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // 打开模态框
    openModal(modalId) {
        document.getElementById('modal-overlay').style.display = 'block';
        document.getElementById(modalId).style.display = 'block';
        this.currentModal = modalId;
    }

    // 关闭模态框
    closeModal() {
        document.getElementById('modal-overlay').style.display = 'none';
        if (this.currentModal) {
            document.getElementById(this.currentModal).style.display = 'none';
            this.currentModal = null;
        }
        this.confirmCallback = null;
    }

    // 显示消息
    showMessage(message, type = 'success') {
        // 创建消息元素
        const messageEl = document.createElement('div');
        messageEl.className = `global-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        if (type === 'success') {
            messageEl.style.backgroundColor = '#28a745';
        } else if (type === 'error') {
            messageEl.style.backgroundColor = '#dc3545';
        } else {
            messageEl.style.backgroundColor = '#17a2b8';
        }

        document.body.appendChild(messageEl);

        // 3秒后自动移除
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }

    // 工具方法
    generateId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    }

    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    }

    getCategoryName(category) {
        const categories = {
            'fuel-dispenser': '加油机',
            'fuel-dispenser-parts': '加油机配件',
            'adblue-equipment': '尿素配件',
            'industrial-pump-flowmeter': '工业泵和流量计',
            'lpg-equipment': 'LPG 配件',
            'other-equipment': '其他'
        };
        return categories[category] || category;
    }

    getPostCategoryName(category) {
        const categories = {
            'news': '公司新闻',
            'industry': '行业动态',
            'technology': '技术文章',
            'products': '产品知识'
        };
        return categories[category] || category;
    }

    getDefaultSettings() {
        return {
            site_title: 'LUIANG MACHINE',
            site_description: '专业工业设备供应商',
            admin_email: 'admin@luiangparts.com',
            contact_email: 'luiangparts@luiangparts.com',
            contact_phone: '+86-177 1287 5791',
            meta_title: 'LUIANG MACHINE - 专业工业设备供应商',
            meta_description: '提供高质量的工业泵、流量计、加油机等工业设备',
            meta_keywords: '工业泵,流量计,加油机,工业设备',
            smtp_host: 'smtp.gmail.com',
            smtp_port: '587',
            smtp_encryption: 'tls'
        };
    }

    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .admin-sidebar.collapsed {
        width: 70px;
    }
    
    .admin-sidebar.collapsed .sidebar-header h2,
    .admin-sidebar.collapsed .sidebar-header p,
    .admin-sidebar.collapsed .nav-link span {
        display: none;
    }
    
    .admin-sidebar.collapsed .nav-link {
        justify-content: center;
        padding: 15px;
    }
    
    .admin-sidebar.collapsed .nav-link i {
        margin-right: 0;
        font-size: 18px;
    }
`;
document.head.appendChild(style);

// 初始化后台系统
const adminSystem = new AdminSystem();