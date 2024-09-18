// content.js

(function() {
    const sequences = {
      'st': 'startTicket',
      'mcr': 'moveToCodeReview',
      'mt': 'moveToTesting'
    };
  
    let inputBuffer = '';
    let lastKeyTime = Date.now();
  
    document.addEventListener('keydown', function(event) {
      const currentTime = Date.now();
  
      // Reset buffer if more than 1 second has passed between keys
      if (currentTime - lastKeyTime > 1000) {
        inputBuffer = '';
      }
  
      lastKeyTime = currentTime;
  
      // Only consider alphabetical keys
      if (/^[a-zA-Z]$/.test(event.key)) {
        inputBuffer += event.key.toLowerCase();
  
        // Check for matching sequences
        for (let seq in sequences) {
          if (inputBuffer.endsWith(seq)) {
            // Sequence detected
            handleSequence(sequences[seq]);
            inputBuffer = ''; // Reset buffer after detection
            break;
          }
        }
  
        // Limit buffer length to prevent it from growing indefinitely
        if (inputBuffer.length > 10) {
          inputBuffer = inputBuffer.slice(-10);
        }
      }
    });
  
    function handleSequence(action) {
      // Extract ticket information from the URL and page content
      const ticketInfo = getTicketInfo();
  
      if (ticketInfo) {
        // Send data to Zapier
        sendDataToZapier(action, ticketInfo);
      } else {
        console.error('Ticket information could not be extracted.');
      }
    }
  
    function getTicketInfo() {
      // Example URL: https://gitlab.com/username/project/-/issues/123
      const url = window.location.href;
      const ticketRegex = /\/issues\/(\d+)/;
      const match = url.match(ticketRegex);
  
      if (match) {
        const ticketId = match[1];
        const ticketTitle = document.querySelector('.issue-details .title').innerText.trim();
  
        return {
          id: ticketId,
          title: ticketTitle,
          url: url
        };
      } else {
        return null;
      }
    }
  
    function sendDataToZapier(action, ticketInfo) {
      const zapierWebhookURL = 'https://hooks.zapier.com/hooks/catch/your-webhook-id/'; // TODO: place into config in v2, and make configurable via chrome extension popup v3
  
      const payload = {
        action: action,
        ticketId: ticketInfo.id,
        title: ticketInfo.title,
        url: ticketInfo.url,
        timestamp: new Date().toISOString()
      };
  
      fetch(zapierWebhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (response.ok) {
            console.log('Data sent to Zapier successfully.');
          } else {
            console.error('Failed to send data to Zapier.');
          }
        })
        .catch(error => {
          console.error('Error sending data to Zapier:', error);
        });
    }
  })();