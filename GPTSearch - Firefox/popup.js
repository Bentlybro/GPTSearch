document.addEventListener('DOMContentLoaded', function() {
    browser.storage.local.get(['apiData']).then(result => {
        if (result.apiData) {
            document.getElementById('searchInput').style.display = 'block';
            document.getElementById('clearDataButton').style.display = 'block';
            displayData(result.apiData);
        }
    });

    document.getElementById('getKeyButton').addEventListener('click', function() {
        getApiKey();
    });

    document.getElementById('searchInput').addEventListener('input', function() {
        browser.storage.local.get(['apiData']).then(result => {
            if (result.apiData) {
                displayData(result.apiData, document.getElementById('searchInput').value);
            }
        });
    });
});

document.getElementById('fetchButton').addEventListener('click', function() {
    document.getElementById('loading').style.display = 'block';
    browser.runtime.sendMessage({action: "fetchData"}).then(response => {
        document.getElementById('loading').style.display = 'none';

        if (response.data) {
            document.getElementById('searchInput').style.display = 'block';
            document.getElementById('clearDataButton').style.display = 'block';
            browser.storage.local.set({apiData: response.data});
            displayData(response.data);
        } else {
            document.getElementById('result').innerText = "Error fetching data.";
        }
    });
});

function displayData(data, filter = '') {
    if (data && Array.isArray(data)) {
        var items = data;
        var filteredItems = filter ? items.filter(function(item) {
            return item.title.toLowerCase().includes(filter.toLowerCase());
        }) : items;

        if (filteredItems.length > 0) {
            var output = filteredItems.map(function(item) {
                return `<a href="https://chat.openai.com/c/${item.id}" class="result-link" target="_blank">${item.title}</a>`;
            }).join('');
            document.getElementById('result').innerHTML = output;
        } else {
            document.getElementById('result').innerHTML = "No matching data found.";
        }
    } else {
        document.getElementById('result').innerHTML = "No data to display.";
    }
}

let apiKeySaved = false;

function getApiKey() {
    if (apiKeySaved) {
        alert('API key has already been saved.');
        return;
    }

    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        const currentTab = tabs[0];
        const currentUrl = new URL(currentTab.url);
        
        if (currentUrl.hostname !== 'chat.openai.com') {
            alert('Please use this on the "https://chat.openai.com" website');
            return;
        }

        const onBeforeSendHeadersListener = function(details) {
            for (var i = 0; i < details.requestHeaders.length; ++i) {
                if (details.requestHeaders[i].name === 'Authorization') {
                    var apiKey = details.requestHeaders[i].value;
                    browser.storage.local.set({ apiKey: apiKey }).then(() => {
                        alert('API key saved, You may now use Fetch Data!');
                    });
                    apiKeySaved = true;

                    browser.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeadersListener);
                }
            }
        };

        browser.webRequest.onBeforeSendHeaders.addListener(
            onBeforeSendHeadersListener,
            { urls: ["https://chat.openai.com/*"] },
            ["requestHeaders"]
        );

        browser.tabs.reload(currentTab.id);
    });
}

document.getElementById('clearDataButton').addEventListener('click', function() {
    browser.storage.local.remove(['apiData']).then(() => {
        document.getElementById('result').innerHTML = '';
        
        document.getElementById('searchInput').style.display = 'none';
        document.getElementById('clearDataButton').style.display = 'none';
    }).catch(error => {
        console.error(error);
    });
});
