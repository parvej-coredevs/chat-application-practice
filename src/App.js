import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
// import Users from './Users';
import { io } from 'socket.io-client';
const socket = io('ws://localhost:4000');

export default function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const [roomlist, setRoomlist] = useState({});

  useEffect(() => {
    socket.emit('getRooms');

    socket.on('roomList', (room) => {
      setRoomlist(room);
    });
  }, []);

  function joinRoom() {
    socket.emit('joinRoom', { username, room });

    socket.emit('getRooms');
  }

  return (
    <main>
      <nav class='navbar navbar-expand-lg navbar-light bg-light'>
        <a class='navbar-brand' href='#'>
          Chatter App
        </a>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>
        <div class='collapse navbar-collapse' id='navbarNav'>
          <ul class='navbar-nav ml-auto'>
            <li class='nav-item active'>
              <a class='nav-link' href='#'>
                Home <span class='sr-only'>(current)</span>
              </a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' href='#'>
                Profile
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class='container mt-4'>
        <div class='row'>
          <div class='col-3'>
            <div class='card'>
              <div class='card-header'>
                <h4 class='text-center'>Chatter Join</h4>
              </div>
              <div class='card-body'>
                <form onSubmit={joinRoom}>
                  <div class='form-group'>
                    <label for='username'>Username</label>
                    <input
                      type='text'
                      class='form-control'
                      name='username'
                      placeholder='Enter username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div class='form-group'>
                    <label for='text'>Room Name</label>
                    <input
                      type='text'
                      class='form-control'
                      name='room'
                      placeholder='Enter Room Name'
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    />
                  </div>
                  <a onClick={joinRoom} class='btn btn-primary btn-block'>
                    Join
                  </a>
                </form>
              </div>
            </div>
          </div>
          <div class='col-6'>
            {/* <!-- Chat Area --> */}
            <div class='card'>
              <div class='card-header'>
                <h5>Chat with Friends</h5>
              </div>
              <div class='card-body'>
                <div class='message d-flex align-items-end'>
                  <div class='message-content bg-primary text-white p-2 rounded'>
                    <p>Hello there!</p>
                    <span class='message-time'>10:30 AM</span>
                  </div>
                  <img
                    src='https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png'
                    alt='User Profile'
                    class='ml-2'
                    style={{ width: '50px' }}
                  />
                </div>
                <div class='message d-flex align-items-end justify-content-end'>
                  <img
                    src='https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png'
                    alt='Friend Profile'
                    class='mr-2'
                    style={{ width: '50px' }}
                  />
                  <div class='message-content bg-light p-2 rounded'>
                    <p>Hey! How's it going?</p>
                    <span class='message-time'>10:35 AM</span>
                  </div>
                </div>
                {/* <!-- Add more messages here --> */}
                <div class='message d-flex align-items-end'>
                  <div class='message-content bg-primary text-white p-2 rounded'>
                    <p>Chat messages...</p>
                    <span class='message-time'>11:15 AM</span>
                  </div>
                  <img
                    src='https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png'
                    alt='User Profile'
                    class='ml-2'
                    style={{ width: '50px' }}
                  />
                </div>
              </div>

              <div class='card-footer'>
                <input
                  type='text'
                  class='form-control'
                  placeholder='Type your message...'
                />
                <button class='btn btn-primary mt-2'>Send</button>
              </div>
            </div>
          </div>
          <div class='col-3'>
            {/* <!-- Contacts Sidebar --> */}
            <div class='row'>
              <div class='col'>
                <div class='card'>
                  <div class='card-header'>
                    <h5>Active Users</h5>
                  </div>
                  <div class='card-body'>
                    <ul class='list-group'>
                      <li class='list-group-item d-flex justify-content-between align-items-center'>
                        Friend 1
                        <span class='badge badge-primary badge-pill'>
                          Online
                        </span>
                      </li>
                      <li class='list-group-item d-flex justify-content-between align-items-center'>
                        Friend 2
                        <span class='badge badge-success badge-pill'>
                          Online
                        </span>
                      </li>
                      <li class='list-group-item d-flex justify-content-between align-items-center'>
                        Friend 3
                        <span class='badge badge-danger badge-pill'>
                          Offline
                        </span>
                      </li>
                      {/* <!-- Add more contacts here --> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div class='col'>
                <div class='card mt-3'>
                  <div class='card-header'>
                    <h5>Popular Group</h5>
                  </div>
                  <div class='card-body'>
                    <ul class='list-group'>
                      {Object.keys(roomlist).map((key) => (
                        <li class='list-group-item d-flex justify-content-between align-items-center'>
                          {roomlist[key]}
                          <span class='badge badge-primary badge-pill'>
                            {roomlist}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
