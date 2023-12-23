# GPTSearch - A ChatGPT Conversation History Search - Chrome Extension

This Chrome extension, named "GPTSearch", revolutionizes the way users interact with their ChatGPT conversation history. Designed for simplicity and efficiency, it enables users to seamlessly search through their last 1000 conversation titles on ChatGPT. This tool is perfect for those who frequently use ChatGPT and need to reference past interactions quickly.

## Features

- **Search Through 1000 Titles**: Easily navigate through the most recent 1000 conversation titles.
- **Direct Conversation Access**: Click on a title to open the specific ChatGPT conversation.
- **Automated Key Retrieval**: Use the "Get Key From Chat.OpenAI" button for automatic key retrieval and local storage.
- **Data Fetching**: The "Fetch Data" button allows users to retrieve their last 1000 conversations.
- **Convenient Search Bar**: Find specific conversations by typing their titles in the search bar.

## Installation

1. Clone the repository: `git clone https://github.com/Bentlybro/GPTSearch.git`
2. Unzip the downloaded file.
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable 'Developer mode', click on "Load Unpacked", and select the unzipped "GPTSearch" folder.

## Usage

- Open the Chrome extension.
- Navigate to `https://chat.openai.com`.
- Press the "Get Key From Chat.OpenAI" button to start using.

## Security and Privacy

- When you press the "Get Key From Chat.OpenAI" button, it refreshes the Chat.OpenAI page and scans the network traffic to retrieve your user's "Authorization" key. 
- This key is then stored locally in your browser.
- **Warning**: The "Authorization" key is used exclusively to access your conversation history. It is ONLY sent to OpenAI's API and is stored only locally.
- We prioritize your privacy and security. Your key is never shared with any third parties.

## Note

Currently, the extension is not available on the Chrome Store. It can be installed manually following the above steps.

---

This tool is ideal for enhancing your ChatGPT experience, making it easier to revisit past conversations and manage your interaction history.

---
