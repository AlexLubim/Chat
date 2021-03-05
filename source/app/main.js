'use strict';
const input = document.querySelector('.inputArea__input');
const btn = document.querySelector('.inputArea__btn');
const viewMessage = document.querySelector('.chat__viewport');
const templateMessage = document.querySelector('#template__message').content;

const theChannel = 'chat';

const pubnub = new PubNub({
  publishKey: 'pub-c-2b2c7e31-36c4-4c56-a055-29d9fa32726f',
  subscribeKey: 'sub-c-1d8bee3c-7d17-11eb-9123-deb22d7a9880',
});

function displayMessage(aMessage) {
  const newMessage = templateMessage.cloneNode(true);
  newMessage.querySelector('p').textContent = aMessage;
  viewMessage.append(newMessage);
  viewMessage.scrollTop = viewMessage.scrollHeight;
}

function submitUpdate (messageText) {
  pubnub.publish  ({
    channel : theChannel,
    message : messageText
  },
  function(status) {
    if (status.error) {
      console.log(status);
    }
  });
}

btn.addEventListener('click',(e)=>{
  e.preventDefault();
  submitUpdate(input.value);
  input.value = '';
});

pubnub.addListener({
  message: function(event) {
    displayMessage(event.message);
  }
});

pubnub.subscribe({
  channels: ['chat'],
  withPresence: true
});




