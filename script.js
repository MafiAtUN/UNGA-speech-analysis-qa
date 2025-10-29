// Storage key for localStorage
const STORAGE_KEY = 'unga_questions';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    renderQuestions();
    
    // Form submission
    document.getElementById('questionForm').addEventListener('submit', handleSubmit);
    
    // Add another question button
    document.getElementById('addAnotherBtn').addEventListener('click', handleAddAnother);
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tabName = btn.getAttribute('data-tab');
            if (tabName) {
                switchTab(tabName);
            }
        });
    });
});

// Handle tab switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const activeTab = document.getElementById(`${tabName}-tab`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // If switching to questions tab, ensure questions are rendered
    if (tabName === 'questions') {
        renderQuestions();
    }
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const question = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        name: formData.get('name').trim(),
        title: formData.get('title').trim(),
        organization: formData.get('organization').trim(),
        contacts: formData.get('contacts').trim(),
        category: formData.get('category'),
        question: formData.get('question').trim()
    };
    
    // Save to localStorage
    const questions = getQuestions();
    questions.push(question);
    saveQuestions(questions);
    
    // Render updated list
    renderQuestions();
    
    // Reset form
    e.target.reset();
    
    // Show success message
    showNotification('Question submitted successfully!');
    
    // Switch to questions tab to show the new question
    switchTab('questions');
}

// Handle "Add Another" button
function handleAddAnother() {
    const form = document.getElementById('questionForm');
    const name = document.getElementById('name').value.trim();
    const contacts = document.getElementById('contacts').value.trim();
    
    // If name and contacts are filled, submit and keep them
    if (name && contacts) {
        form.dispatchEvent(new Event('submit', { cancelable: true }));
        
        // Restore name and contacts after reset
        setTimeout(() => {
            document.getElementById('name').value = name;
            document.getElementById('contacts').value = contacts;
            document.getElementById('name').focus();
        }, 100);
    } else {
        // Just focus on name field
        document.getElementById('name').focus();
    }
}

// Get questions from localStorage
function getQuestions() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

// Save questions to localStorage
function saveQuestions(questions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
}

// Render questions list
function renderQuestions() {
    const questions = getQuestions();
    const questionsList = document.getElementById('questionsList');
    
    if (questions.length === 0) {
        questionsList.innerHTML = '<p class="empty-state">No questions submitted yet. Be the first to ask!</p>';
        return;
    }
    
    questionsList.innerHTML = questions.map(question => createQuestionCard(question)).join('');
}

// Create question card HTML
function createQuestionCard(question) {
    const date = new Date(question.timestamp).toLocaleString();
    const categoryClass = `category-${question.category}`;
    
    return `
        <div class="question-card" data-id="${question.id}">
            <div class="question-header">
                <div class="question-info">
                    <div class="question-name">${escapeHtml(question.name)}</div>
                    <div class="question-meta">
                        ${question.title ? `<span>${escapeHtml(question.title)}</span>` : ''}
                        ${question.organization ? `<span>${escapeHtml(question.organization)}</span>` : ''}
                        <span>${escapeHtml(question.contacts)}</span>
                        <span>${date}</span>
                    </div>
                    <span class="category-badge ${categoryClass}">${question.category}</span>
                </div>
            </div>
            <div class="question-text">${escapeHtml(question.question)}</div>
        </div>
    `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show notification
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #34a853;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS
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
`;
document.head.appendChild(style);

