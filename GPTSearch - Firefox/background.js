browser.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === "fetchData") {
        return new Promise((resolve, reject) => {
            browser.storage.local.get(['apiKey']).then(result => {
                if (result.apiKey) {
                    const apiKey = result.apiKey;
                    const limit = 100;
                    const maxOffset = 1000;
                    let offset = 0;
                    let allData = [];

                    function fetchDataWithOffset() {
                        if (offset <= maxOffset) {
                            const url = `https://chatgpt.com/backend-api/conversations?offset=${offset}&limit=${limit}&order=updated`;

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
                                    resolve({ data: allData });
                                }
                            })
                            .catch(error => {
                                resolve({ data: error });
                            });
                        }
                    }

                    fetchDataWithOffset();
                } else {
                    resolve({ data: "API key not found in local storage" });
                }
            }, error => {
                reject(error);
            });
        });
    }
});
