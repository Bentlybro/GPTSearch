chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "fetchData") {
        chrome.storage.local.get(['apiKey'], function(result) {
            if (result.apiKey) {
                const apiKey = result.apiKey;
                const limit = 100;
                const maxOffset = 1000;
                let offset = 0;
                let allData = [];

                function fetchDataWithOffset() {
                    if (offset <= maxOffset) {
                        const url = `https://chat.openai.com/backend-api/conversations?offset=${offset}&limit=${limit}&order=updated`;

                        fetch(url, {
                            method: 'GET',
                            headers: new Headers({
                                'Authorization': apiKey,
                                'Content-Type': 'application/json'
                            }),
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data && data.items) {
                                allData = allData.concat(data.items);
                            }
                            offset += limit;

                            if (offset <= maxOffset) {
                                fetchDataWithOffset();
                            } else {
                                sendResponse({ data: allData }); 
                            }
                        })
                        .catch(error => {
                            sendResponse({ data: error });
                        });
                    }
                }

                fetchDataWithOffset();
            } else {
                sendResponse({ data: "API key not found in local storage" });
            }
        });

        return true;
    }
});
