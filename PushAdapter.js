// Push Adapter
//
// Allows you to change which online service perform the push
//
// Adapter classes must implement the following functions:
// * publish(config, endpoint, payload)
//

var pushAdapter = null;

function setAdapter(adapter) {
  pushAdapter = adapter;
}

function getAdapter() {
  return pushAdapter;
}

module.exports = {
  getAdapter: getAdapter,
  setAdapter: setAdapter
};
