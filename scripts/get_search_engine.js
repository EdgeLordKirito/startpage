let areSettingsVisible = false;
function hideSettings() {
	document.getElementById("settings-container").style.display = 'none';
	areSettingsVisible = false;
}


function showSettings() {
	document.getElementById("settings-container").style.display = 'flex';
	areSettingsVisible = true;
}


function changeSearchEngine() {
	var form = document.getElementById('search-form');
	var input = document.getElementById('search-input');
	var searchEngine = document.getElementById("search-engine-selector");

	form.action = searchEngine.value;
	input.placeholder = "Search with " + searchEngine.options[searchEngine.selectedIndex].text;

	localStorage.setItem('selectedSearchEngine', searchEngine.value);
}


function loadSavedSearchEngine() {
	var savedSearchEngine = localStorage.getItem('selectedSearchEngine');
	var searchEngine = document.getElementById('search-engine-selector');

	if (savedSearchEngine) {
		searchEngine.value = savedSearchEngine;
	} else {
		searchEngine.value = 'https://duckduckgo.com/';
	}
	changeSearchEngine();
}


function clearSearchInput() {
	document.getElementById('search-input').value = '';
	document.getElementById('search-input').focus();
	highlightMatchingLinks();
}


function highlightMatchingLinks() {
	const query = document.getElementById('search-input').value.toLowerCase();
	const links = document.querySelectorAll('ul li a');

	links.forEach(link => {
		const linkText = link.textContent.toLowerCase();
		if (!linkText.includes(query)) {
			link.style.color = 'var(--color-background-1)';
		} else {
			link.style.color = 'var(--color-foreground-1)';
		}
	});
}


document.addEventListener('keydown', function(event) {
	if (event.key === 'Escape' && areSettingsVisible) {
		hideSettings();
    } else if (event.key === ' ' && event.ctrlKey) {
        document.getElementById('search-input').focus();
	} else if (event.key === 'Escape') {
        document.getElementById('search-input').blur();
	}else if (event.key === 'Enter') {
		handleSearch(event);
	} else if (event.key === 'Backspace' && event.ctrlKey || event.key === 'Delete' && event.ctrlKey) {
		clearSearchInput();
	}
});


document.addEventListener('DOMContentLoaded', function() {
	function isValidURL(string) {
		try {
			new URL(string);
			return true;
		} catch (_) {
			return false;
		}
	}

	window.handleSearch = function(event) {
		event.preventDefault();
		const query = document.getElementById('search-input').value.toLowerCase();
		const searchEngine = document.getElementById('search-engine-selector').value;

		if (query.startsWith('s:')) {
			const searchQuery = query.substring(2).trim();
			window.location.href = `${searchEngine}?q=${encodeURIComponent(searchQuery)}`;

		} else if (query.startsWith('r:')) {
			const searchQuery = query.substring(2).trim();
			window.location.href = `https://www.reddit.com/search/?q=${encodeURIComponent(searchQuery)}`;

		} else if (query.startsWith('gh:')) {
			const searchQuery = query.substring(3).trim();
			window.location.href = `https://www.github.com/search/?q=${encodeURIComponent(searchQuery)}`;
			
		} else if (query.startsWith('g:')) {
			const searchQuery = query.substring(2).trim();
			window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
			
		} else if (query.startsWith('i:')) {
			const searchQuery = query.substring(2).trim();
			window.location.href = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchQuery)}`;
			
		} else if (query.startsWith('y:')) {
			const searchQuery = query.substring(2).trim();
			window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
			
		} else if (isValidURL(query)) {
			window.location.href = query;

		} else {
			window.location.href = `${searchEngine}?q=${encodeURIComponent(query)}`;
		}
	};

	document.getElementById('search-input').addEventListener('input', highlightMatchingLinks);
});


loadSavedSearchEngine();
