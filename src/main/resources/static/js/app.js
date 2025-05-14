// Auto-focus the textarea on page load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('query').focus();
    
    // Initialize dropdowns
    initializeDropdowns();
    
    // Initialize past queries from localStorage
    loadPastQueries();
    
    // Setup navigation
    setupNavigation();
    
    // Set random greeting
    setRandomGreeting();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Initialize query type chips
    initializeQueryTypeChips();
    
    // Setup clear history button
    setupClearHistoryButton();
    
    // Generate QR code for Tide careers
    generateTideQrCode();
    
    // Configure marked.js options
    marked.setOptions({
        breaks: true,       // Add line breaks in source to breaks in output
        gfm: true,          // Enable GitHub Flavored Markdown
        headerIds: true,    // Enable header IDs
        mangle: false,      // Disable header ID mangling
        sanitize: false     // Allow HTML (required for advanced MD styling)
    });
});

// Generate QR code for Tide careers URL
function generateTideQrCode() {
    try {
        const qrCodeElement = document.getElementById('tideQrCode');
        if (qrCodeElement) {
            const url = 'http://tide.co/careers';
            const typeNumber = 4;
            const errorCorrectionLevel = 'L';
            const qr = qrcode(typeNumber, errorCorrectionLevel);
            qr.addData(url);
            qr.make();
            qrCodeElement.src = qr.createDataURL(4);
        }
    } catch (error) {
        console.error('QR code generation failed:', error);
    }
}

// Setup query type chips to prefill search box
function initializeQueryTypeChips() {
    const queryTypes = document.querySelectorAll('.query-type');
    queryTypes.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active class from all chips
            queryTypes.forEach(c => c.classList.remove('active'));
            
            // Add active class to the clicked chip
            this.classList.add('active');
            
            const queryInput = document.getElementById('query');
            const chipText = this.querySelector('span').textContent;
            const prefill = getQueryPrefillText(chipText);
            
            queryInput.value = prefill;
            queryInput.focus();
            
            // Place cursor at the end of the text
            const length = queryInput.value.length;
            queryInput.setSelectionRange(length, length);
        });
    });
}

// Get prefill text based on query type
function getQueryPrefillText(chipType) {
    switch(chipType) {
        case 'Research':
            return 'Research  ';
        case 'How to':
            return 'How to ';
        case 'Analyze':
            return 'Analyze : ';
        case 'Code':
            return 'Generate code for ';
        case 'Latest Updates':
            return 'What are the latest updates on ';
        case 'Give me advice':
            return 'Give me advice about ';
        default:
            return '';
    }
}

// Setup navigation between pages
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Clear active state from all nav items
    function clearActiveNavStates() {
        navItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Show Helpful Tips page
    const helpfulTipsLink = Array.from(navItems).find(el => 
        el.querySelector('span')?.textContent.includes('Show Helpful Tips')
    );
    helpfulTipsLink.addEventListener('click', function(e) {
        e.preventDefault();
        clearActiveNavStates();
        this.classList.add('active');
        showPage('helpfulTips');
    });
    
    // Settings page
    const settingsLink = Array.from(navItems).find(el => 
        el.querySelector('span')?.textContent.includes('Settings')
    );
    settingsLink.addEventListener('click', function(e) {
        e.preventDefault();
        clearActiveNavStates();
        this.classList.add('active');
        showPage('settingsPage');
    });
    
    // Home page - active by default
    const homeLink = Array.from(navItems).find(el => 
        el.querySelector('span')?.textContent.includes('Home')
    );
    homeLink.classList.add('active');
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        clearActiveNavStates();
        this.classList.add('active');
        showPage('home');
    });
    
    // Queries page (now within nav-item-with-action)
    const queriesLink = Array.from(navItems).find(el => 
        el.querySelector('span')?.textContent.includes('Queries')
    );
    if (queriesLink) {
        queriesLink.addEventListener('click', function(e) {
            e.preventDefault();
            // No specific page to show for Queries, but toggle active state
            clearActiveNavStates();
            this.classList.add('active');
            showPage('home');
        });
    }
}

// Function to show a specific page and hide others
function showPage(pageId) {
    // Hide all pages first
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Hide/show main content elements
    if (pageId === 'home') {
        document.querySelector('.greeting').classList.remove('hidden');
        document.querySelector('.input-area').classList.remove('hidden');
        document.querySelector('.query-types').classList.remove('hidden');
        document.getElementById('chatMessages').classList.remove('hidden');
    } else {
        document.querySelector('.greeting').classList.add('hidden');
        document.querySelector('.input-area').classList.add('hidden');
        document.querySelector('.query-types').classList.add('hidden');
        document.getElementById('chatMessages').classList.add('hidden');
        
        // Show the requested page
        document.getElementById(pageId).classList.remove('hidden');
    }
}

// Random funny greetings
const funnyGreetings = [
    "Hello, digital explorer!",
    "Welcome to Tide AI!",
    "How can we assist your business today?",
    "Ready to save you time!",
    "Tide AI, at your service!",
    "Let's get your tasks done faster!",
    "Good day, digital traveler!",
    "Welcome back to Tide AI!",
    "Looking for financial insights?",
    "Helping your business thrive!"
];

function setRandomGreeting() {
    const greeting = document.querySelector('.greeting h1');
    greeting.textContent = funnyGreetings[Math.floor(Math.random() * funnyGreetings.length)];
}

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    // Global shortcut for focusing the search input
    document.addEventListener('keydown', function(e) {
        // Check for Cmd+K (Mac) or Ctrl+K (Windows)
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            showPage('home');
            document.getElementById('query').focus();
        }
        
        // Clear input with Escape if focused
        if (e.key === 'Escape' && document.activeElement === document.getElementById('query')) {
            document.getElementById('query').value = '';
        }
    });
}

// Track current selection values
let selectedDataSource = 'ALL';
let selectedAutoDiscovery = true;

// Handle dropdown toggles
function initializeDropdowns() {
    const sourceDropdownElem = document.querySelector('.dropdown:has(#sourceButton)') || 
        document.getElementById('sourceButton').closest('.dropdown');
    const searchTypeDropdownElem = document.querySelector('.dropdown:has(#searchTypeButton)') || 
        document.getElementById('searchTypeButton').closest('.dropdown');
    
    // Source dropdown
    document.getElementById('sourceButton').addEventListener('click', function(event) {
        const dropdown = this.closest('.dropdown');
        const isActive = dropdown.classList.toggle('active');
        document.getElementById('sourceDropdown').classList.toggle('show', isActive);
        
        // Close the other dropdown if open
        searchTypeDropdownElem.classList.remove('active');
        document.getElementById('searchTypeDropdown').classList.remove('show');
        
        event.stopPropagation();
    });
    
    // Search type dropdown
    document.getElementById('searchTypeButton').addEventListener('click', function(event) {
        const dropdown = this.closest('.dropdown');
        const isActive = dropdown.classList.toggle('active');
        document.getElementById('searchTypeDropdown').classList.toggle('show', isActive);
        
        // Close the other dropdown if open
        sourceDropdownElem.classList.remove('active');
        document.getElementById('sourceDropdown').classList.remove('show');
        
        event.stopPropagation();
    });
    
    // Set initial selected items
    updateSelectedItems();
    
    // Source dropdown options
    document.querySelectorAll('#sourceDropdown a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            selectedDataSource = this.getAttribute('data-value');
            document.getElementById('selectedSource').textContent = this.textContent;
            document.getElementById('sourceDropdown').classList.remove('show');
            sourceDropdownElem.classList.remove('active');
            updateSelectedItems();
        });
    });
    
    // Search type dropdown options
    document.querySelectorAll('#searchTypeDropdown a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            selectedAutoDiscovery = this.getAttribute('data-value') === 'true';
            document.getElementById('selectedSearchType').textContent = this.textContent;
            document.getElementById('searchTypeDropdown').classList.remove('show');
            searchTypeDropdownElem.classList.remove('active');
            updateSelectedItems();
        });
    });
    
    // Close dropdowns when clicking outside
    window.addEventListener('click', function() {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('show')) {
                dropdowns[i].classList.remove('show');
                dropdowns[i].closest('.dropdown').classList.remove('active');
            }
        }
    });
}

// Update the selected item in dropdowns
function updateSelectedItems() {
    // Update source dropdown
    document.querySelectorAll('#sourceDropdown a').forEach(item => {
        if (item.getAttribute('data-value') === selectedDataSource) {
            item.classList.add('selected');
            document.getElementById('selectedSource').textContent = item.textContent;
        } else {
            item.classList.remove('selected');
        }
    });
    
    // Update search type dropdown
    document.querySelectorAll('#searchTypeDropdown a').forEach(item => {
        const isSelected = (item.getAttribute('data-value') === 'true') === selectedAutoDiscovery;
        if (isSelected) {
            item.classList.add('selected');
            document.getElementById('selectedSearchType').textContent = item.textContent;
        } else {
            item.classList.remove('selected');
        }
    });
}

document.getElementById('submitButton').addEventListener('click', submitQuery);
document.querySelector('textarea').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitQuery();
    }
});

// Global array to store past queries
const pastQueries = [];

function loadPastQueries() {
    const savedQueries = localStorage.getItem('pastQueries');
    if (savedQueries) {
        const queries = JSON.parse(savedQueries);
        queries.forEach(query => {
            pastQueries.push(query);
            addQueryToSidebar(query);
        });
    }
}

function savePastQueries() {
    localStorage.setItem('pastQueries', JSON.stringify(pastQueries));
}

function addQueryToSidebar(query) {
    // Find the Queries nav item container
    const queriesSection = document.querySelector('.nav-item-with-action');
    
    // Check if we already have past queries section
    let pastQueriesSection = document.getElementById('pastQueries');
    if (!pastQueriesSection) {
        // Create section for past queries
        pastQueriesSection = document.createElement('div');
        pastQueriesSection.id = 'pastQueries';
        pastQueriesSection.className = 'past-queries';
        queriesSection.after(pastQueriesSection);
    }
    
    // Create a new past query item
    const queryItem = document.createElement('a');
    queryItem.href = '#';
    queryItem.className = 'nav-item past-query';
    queryItem.innerHTML = `
        <i class="fas fa-history"></i>
        <span>${query.length > 25 ? query.substring(0, 25) + '...' : query}</span>
    `;
    
    // Add click event to load this query
    queryItem.addEventListener('click', function() {
        document.getElementById('query').value = query;
        document.getElementById('query').focus();
    });
    
    pastQueriesSection.appendChild(queryItem);
}

function submitQuery() {
    const queryText = document.getElementById('query').value.trim();
    if (!queryText) return;
    
    // Show loader
    document.getElementById('loader').classList.remove('hidden');
    
    // Add user message
    addMessage('user', queryText);
    
    // Save query to past queries
    if (!pastQueries.includes(queryText)) {
        pastQueries.unshift(queryText);
        if (pastQueries.length > 10) {
            pastQueries.pop();
        }
        savePastQueries();
        addQueryToSidebar(queryText);
    }
    
    // Clear input
    document.getElementById('query').value = '';
    
    // Reset active state of query type chips
    document.querySelectorAll('.query-type').forEach(chip => {
        chip.classList.remove('active');
    });
    
    // Call API with selected options
    fetch('/api/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: queryText,
            dataSource: selectedDataSource,
            autoDiscovery: selectedAutoDiscovery
        })
    })
    .then(response => response.json())
    .then(data => {
        // Hide loader
        document.getElementById('loader').classList.add('hidden');
        
        // Add AI message with the answer
        addMessage('ai', data.answer, data.references);
        
        // Scroll to bottom
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loader').classList.add('hidden');
        alert('An error occurred. Please try again.');
    });
}

function addMessage(type, content, references = []) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    let icon, title;
    if (type === 'user') {
        icon = 'fa-user';
        title = 'You';
        messageDiv.innerHTML = `
            <div class="message-user">
                <div class="message-header">
                    <i class="fas ${icon}"></i>
                    <span>${title}</span>
                </div>
                <pre>${content}</pre>
            </div>
        `;
    } else {
        icon = 'fa-robot';
        title = 'Tide AI';
        let referencesHtml = '';
        
        if (references && references.length > 0) {
            const refItems = references.map(ref => `<li>${ref}</li>`).join('');
            referencesHtml = `
                <div class="references">
                    <h3>References</h3>
                    <ul>${refItems}</ul>
                </div>
            `;
        }
        
        // Parse markdown for AI responses
        const formattedContent = marked.parse(content);
        
        messageDiv.innerHTML = `
            <div class="message-ai">
                <div class="message-header">
                    <i class="fas ${icon}"></i>
                    <span>${title}</span>
                </div>
                <div class="markdown-content">${formattedContent}</div>
                ${referencesHtml}
            </div>
        `;
        
        // Add syntax highlighting if prism.js is available
        if (typeof Prism !== 'undefined') {
            messageDiv.querySelectorAll('pre code').forEach((block) => {
                Prism.highlightElement(block);
            });
        }
        
        // Add copy button to code blocks
        addCopyButtonsToCodeBlocks(messageDiv);
    }
    
    chatMessages.appendChild(messageDiv);
}

// Add copy buttons to code blocks
function addCopyButtonsToCodeBlocks(container) {
    const codeBlocks = container.querySelectorAll('pre');
    
    codeBlocks.forEach((codeBlock, index) => {
        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        copyButton.setAttribute('data-index', index);
        
        copyButton.addEventListener('click', function() {
            const code = codeBlock.querySelector('code') 
                ? codeBlock.querySelector('code').innerText 
                : codeBlock.innerText;
            
            navigator.clipboard.writeText(code).then(() => {
                // Visual feedback
                copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyButton.classList.add('copied');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
                    copyButton.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
                copyButton.textContent = 'Error!';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            });
        });
        
        codeBlock.appendChild(copyButton);
    });
}

// Setup clear history button with confirmation
function setupClearHistoryButton() {
    const clearButton = document.getElementById('clearQueriesBtn');
    if (!clearButton) return;
    
    clearButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // First click: show confirmation state
        if (!this.classList.contains('confirming')) {
            this.classList.add('confirming');
            this.setAttribute('title', 'Click again to confirm');
            this.innerHTML = '<i class="fas fa-check"></i>';
            
            // Reset after 3 seconds if not clicked again
            this.confirmTimeout = setTimeout(() => {
                this.classList.remove('confirming');
                this.setAttribute('title', 'Clear query history');
                this.innerHTML = '<i class="fas fa-trash"></i>';
            }, 3000);
        } else {
            // Second click: actually clear history
            clearQueryHistory();
            
            // Reset button
            clearTimeout(this.confirmTimeout);
            this.classList.remove('confirming');
            this.setAttribute('title', 'Query history cleared');
            this.innerHTML = '<i class="fas fa-trash"></i>';
            
            // Show temporary notification
            showNotification('Query history cleared');
        }
    });
}

// Clear query history
function clearQueryHistory() {
    // Clear from localStorage
    localStorage.removeItem('pastQueries');
    
    // Clear global array
    pastQueries.length = 0;
    
    // Remove from sidebar
    const pastQueriesSection = document.getElementById('pastQueries');
    if (pastQueriesSection) {
        pastQueriesSection.innerHTML = '';
    }
}

// Show temporary notification
function showNotification(message) {
    // Check if notification element exists, create if not
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set message and show notification
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
} 