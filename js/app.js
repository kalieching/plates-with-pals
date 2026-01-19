// Load and display blog posts
async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        const posts = await response.json();
        
        const container = document.getElementById('posts-container');
        
        if (!container) {
            console.error('Posts container not found');
            return;
        }
        
        posts.forEach(post => {
            const article = createPostElement(post);
            container.appendChild(article);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-post';
    
    // Create post meta (tags + attendees)
    const metaDiv = document.createElement('div');
    metaDiv.className = 'post-meta';
    
    // Cuisine tag
    const cuisineTag = document.createElement('div');
    cuisineTag.className = `tag cuisine-${post.cuisine}`;
    cuisineTag.innerHTML = `<span class="tag-label">${capitalizeFirst(post.cuisine)}</span>`;
    metaDiv.appendChild(cuisineTag);
    
    // Meal type tag
    const mealTag = document.createElement('div');
    mealTag.className = `tag meal-${post.mealType}`;
    mealTag.innerHTML = `<span class="tag-label">${capitalizeFirst(post.mealType)}</span>`;
    metaDiv.appendChild(mealTag);
    
    // Attendees
    post.attendees.forEach(attendee => {
        const attendeeDiv = document.createElement('div');
        attendeeDiv.className = 'attendee';
        
        const avatar = attendee.avatar 
            ? `<img src="${attendee.avatar}" alt="${attendee.name}">`
            : '🍽️';
        
        attendeeDiv.innerHTML = `
            <div class="attendee-avatar">${avatar}</div>
            <div class="attendee-info">
                <span class="attendee-name">${attendee.name}</span>
                <span class="attendee-rating">${attendee.rating}</span>
            </div>
        `;
        metaDiv.appendChild(attendeeDiv);
    });
    
    article.appendChild(metaDiv);
    
    // Title
    const title = document.createElement('h3');
    title.textContent = `${post.date} ⋆ ${post.title}`;
    article.appendChild(title);
    
    // Description
    if (post.description) {
        const description = document.createElement('p');
        description.textContent = post.description;
        article.appendChild(description);
    }
    
    return article;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Dark mode toggle functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    if (!darkModeToggle) {
        console.error('Dark mode toggle button not found');
        return;
    }

    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Set initial state
    if (isDarkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.textContent = '🌙';
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update button icon
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️';
            localStorage.setItem('darkMode', 'true');
        } else {
            darkModeToggle.textContent = '🌙';
            localStorage.setItem('darkMode', 'false');
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    loadPosts();
});