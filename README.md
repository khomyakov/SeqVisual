# SeqVisual

SeqVisual is a Chrome extension that streamlines web data collection with customizable keyboard shortcuts. It listens for user-defined key sequences, triggering automated data extraction from web pages and seamlessly integrating with Zapier workflows for enhanced productivity.

## Features

- Custom keyboard shortcuts for data collection
- Automated data extraction from GitLab issue pages
- Integration with Zapier for workflow automation

## Installation

1. Clone this repository or download the source code.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

The extension is currently configured to work on GitLab issue pages. It listens for the following key sequences:

- `st`: Start ticket
- `mcr`: Move to code review
- `mt`: Move to testing

When a sequence is detected, the extension extracts ticket information and sends it to a Zapier webhook.

## Configuration

The extension uses a Zapier webhook URL for data transmission. To configure this:

1. Create a Zapier webhook.
2. Replace the placeholder URL in the `sendDataToZapier` function with your actual webhook URL.

## Permissions

The extension requires the following permissions:

- `tabs`: To access tab information
- `scripting`: To inject and execute scripts
- `https://hooks.zapier.com/`: To send data to Zapier
- `https://gitlab.com/*`: To operate on GitLab pages

## Development

The main logic of the extension is contained in `content.js`. To modify or extend the functionality:

- Update the `sequences` object to add or modify key sequences.
- Modify the `getTicketInfo` function to extract different or additional information from the page.
- Adjust the `sendDataToZapier` function to change the payload structure or add error handling.

## Future Improvements

- Make the Zapier webhook URL configurable via the extension popup
- Add support for more websites beyond GitLab
- Implement user-configurable key sequences

## Author

Oleksandr Khomyakov