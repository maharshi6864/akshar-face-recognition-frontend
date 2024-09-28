const MapLocation = () => {
  const gotLocated = (position, elementId) => {
    console.log(position);
    document.getElementById(
      elementId
    ).innerHTML = `${position.coords.latitude} - ${position.coords.longitude}`;
  };

  const failedToGet = (error) => {
    console.log(`Error: ${error.message}`);
  };

  function getLocation(elementId) {
    navigator.geolocation.getCurrentPosition(
      (position) => gotLocated(position, elementId),
      failedToGet,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  return (
    <>
      <div>
        <div
          style={{
            width: "900px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "100px",
          }}
        >
          <div>
            <span>Top left longitude and latitude</span>{" "}
            <span id="topLeft">- -</span>{" "}
            <button
              id="topLeftBut"
              onClick={() => {
                getLocation("topLeft");
              }}
            >
              Map This Point
            </button>
          </div>
          <div>
            <span>Top right longitude and latitude</span>{" "}
            <span id="topRight">- -</span>
            <button
              id="topRightBut"
              onClick={() => {
                getLocation("topRight");
              }}
            >
              Map This Point
            </button>
          </div>
        </div>
        <div
          style={{
            width: "900px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span>Bottom left longitude and latitude</span>{" "}
            <span id="bottomLeft">- -</span>
            <button
              id="bottomLeftBut"
              onClick={() => {
                getLocation("bottomLeft");
              }}
            >
              Map This Point
            </button>
          </div>
          <div>
            <span>Bottom right longitude and latitude</span>{" "}
            <span id="bottomRight">- -</span>
            <button
              id="bottomRightBut"
              onClick={() => {
                getLocation("bottomRight");
              }}
            >
              Map This Point
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapLocation;
