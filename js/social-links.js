// 社交链接功能
document.addEventListener('DOMContentLoaded', function() {
    // 社交链接数据
    const socialLinks = [
        {
            platform: 'facebook',
            url: 'https://facebook.com/luiangparts',
            icon: 'fab fa-facebook-f'
        },
        {
            platform: 'instagram',
            url: 'https://instagram.com/luiangparts',
            icon: 'fab fa-instagram'
        },
        {
            platform: 'linkedin',
            url: 'https://linkedin.com/company/luiangparts',
            icon: 'fab fa-linkedin-in'
        },
        {
            platform: 'twitter',
            url: 'https://twitter.com/luiangparts',
            icon: 'fab fa-twitter'
        }
    ];
    
    // 渲染社交链接
    function renderSocialLinks() {
        const socialLinksContainer = document.querySelector('.social-links');
        if (!socialLinksContainer) return;
        
        socialLinksContainer.innerHTML = '';
        
        socialLinks.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.innerHTML = `<i class="${link.icon}"></i>`;
            socialLinksContainer.appendChild(linkElement);
        });
    }
    
    renderSocialLinks();
});