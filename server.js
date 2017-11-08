import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('client connected');

  ws.on('message', message => {
    console.log('received: %s', message);
    const action = JSON.parse(message);
    if (!action || !action.type) {
      console.error('malformed message received: ', message);
    }
    switch (action.type) {
      case 'PRESS_BUTTON':
        console.log(
          `Button ${action.payload.id} was pressed :O`,
          action.payload,
        );

        // Respond
        ws.send(
          JSON.stringify({
            type: 'BUTTON_PRESSED_SUCCESS',
          }),
        );
        break;
      case 'EDIT_BUTTON':
        console.log(
          `Button ${action.payload.id} was edited :O`,
          action.payload,
        );

        // Respond
        ws.send(
          JSON.stringify({
            type: 'BUTTON_EDIT_SUCCESS',
          }),
        );
        break;
    }
  });

  ws.send(
    JSON.stringify({
      type: 'GET_BUTTONS',
      payload: [
        { id: '0', title: 'Button 1', sound: 'url-to-button0' },
        { id: '1', title: 'Button 2', sound: 'url-to-button1' },
        { id: '2', title: 'Button 3', sound: 'url-to-button2' },
        { id: '3', title: 'Button 4', sound: 'url-to-button3' },
        { id: '4', title: 'Button 5', sound: 'url-to-button4' },
        { id: '5', title: 'Button 6', sound: 'url-to-button5' },
        { id: '6', title: 'Button 7', sound: 'url-to-button6' },
        { id: '7', title: 'Button 8', sound: 'url-to-button7' },
        { id: '8', title: 'Button 9', sound: 'url-to-button8' },
        { id: '9', title: 'Button 10', sound: 'url-to-button9' },
        { id: '10', title: 'Button 11', sound: 'url-to-button10' },
        { id: '11', title: 'Button 12', sound: 'url-to-button11' },
        { id: '12', title: 'Button 13', sound: 'url-to-button12' },
        { id: '13', title: 'Button 14', sound: 'url-to-button13' },
        { id: '14', title: 'Button 15', sound: 'url-to-button14' },
        { id: '15', title: 'Button 16', sound: 'url-to-button15' },
        { id: '16', title: 'Button 17', sound: 'url-to-button16' },
        { id: '17', title: 'Button 18', sound: 'url-to-button17' },
        { id: '18', title: 'Button 19', sound: 'url-to-button18' },
        { id: '19', title: 'Button 20', sound: 'url-to-button19' },
      ],
    }),
  );
});

//start our server
server.listen(8999, 'localhost', 0, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
