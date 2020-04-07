import axios from 'axios';

const truck = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'CONTENT-TYPE': 'application/json;charset=UTF-8',
    AppVersion: '2.0.0',
    'Access-Control-Allow-Origin': '*'
  }
});

function getTravelReport() {
  return truck({
    method: 'GET',
    url: '/api/reports/travels'
  });
}

function getUsersBused() {
  return truck({
    method: 'GET',
    url: '/api/reports/bused-users'
  });
}

function getUsersHasVehicle() {
  return truck({
    method: 'GET',
    url: '/api/reports/users-has-vehicle'
  });
}

function getTerminalsReport() {
  return truck({
    method: 'GET',
    url: '/api/reports/terminals'
  });
}

function listTravels() {
  return truck({
    method: 'GET',
    url: '/api/travels'
  });
}

function showTravel(id) {
  return truck({
    method: 'GET',
    url: `/api/travels/${id}`
  });
}

function updateTravel(id, travel) {
  return truck({
    method: 'PUT',
    url: `/api/travels/${id}`,
    data: travel
  });
}

function createTravel(travel) {
  return truck({
    method: 'POST',
    url: '/api/travels',
    data: travel
  });
}

function deleteTravel(id) {
  return truck({
    method: 'DELETE',
    url: `/api/travels/${id}`
  });
}

function listUsers() {
  return truck({
    method: 'GET',
    url: '/api/users'
  });
}

function showUser(id) {
  return truck({
    method: 'GET',
    url: `/api/users/${id}`
  });
}

function updateUser(id, travel) {
  return truck({
    method: 'PUT',
    url: `/api/users/${id}`,
    data: travel
  });
}

function createUser(travel) {
  return truck({
    method: 'POST',
    url: '/api/users',
    data: travel
  });
}

function createTerminal(terminal) {
  return truck({
    method: 'POST',
    url: '/api/terminals',
    data: terminal
  });
}

function deleteUser(id) {
  return truck({
    method: 'DELETE',
    url: `/api/users/${id}`
  });
}

export default {
  ...truck,
  createTerminal,
  createTravel,
  updateTravel,
  showTravel,
  deleteTravel,
  getUsersBused,
  getTravelReport,
  getUsersHasVehicle,
  getTerminalsReport,
  listTravels,
  listUsers,
  showUser,
  updateUser,
  createUser,
  deleteUser,
};
