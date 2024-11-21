import { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import Card from './components/card';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableRooms, setAvailableRooms] = useState([]);

  // Hardcoded room availability based on selected time
  const roomAvailability = {
    morning: [
      {
        title: "ZACH 200A",
        description: "Large room for conferences.",
        imageUrl: "https://via.placeholder.com/300x150",
        buttonText: "Add",
        extraInfo: "Holds up to 100 people. Includes projector, air conditioning, and WiFi."
      },
      {
        title: "ZACH 200B",
        description: "Small private meeting room.",
        imageUrl: "https://via.placeholder.com/300x150",
        buttonText: "Add",
        extraInfo: "Holds up to 10 people. Includes a whiteboard and comfortable seating."
      }
    ],
    afternoon: [
      {
        title: "ZACH 300A",
        description: "Spacious room with great lighting.",
        imageUrl: "https://via.placeholder.com/300x150",
        buttonText: "Add",
        extraInfo: "Holds up to 50 people. Includes modern amenities and a sound system."
      },
      {
        title: "ZACH 300B",
        description: "Quiet room for focused work.",
        imageUrl: "https://via.placeholder.com/300x150",
        buttonText: "Add",
        extraInfo: "Holds up to 20 people. Includes high-speed WiFi and comfortable chairs."
      }
    ],
    evening: [
      {
        title: "ZACH 400A",
        description: "Large hall for evening events.",
        imageUrl: "https://via.placeholder.com/300x150",
        buttonText: "Add",
        extraInfo: "Holds up to 150 people. Includes stage, lighting, and sound equipment."
      },
      {
        title: "ZACH 400B",
        description: "Medium-sized room for classes.",
        imageUrl: "https://via.placeholder.com/300x150",
        buttonText: "Add",
        extraInfo: "Holds up to 30 people. Includes projector and whiteboard."
      }
    ]
  };

  // Function to update available rooms based on selected time
  const updateAvailableRooms = (date) => {
    setSelectedDate(date);

    const hours = date.getHours();
    if (hours >= 6 && hours < 12) {
      setAvailableRooms(roomAvailability.morning);
    } else if (hours >= 12 && hours < 18) {
      setAvailableRooms(roomAvailability.afternoon);
    } else {
      setAvailableRooms(roomAvailability.evening);
    }
  };

  // Helper function to format the time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <main>
      <div className={`phone-screen ${availableRooms.length === 0 ? 'no-rooms' : ''}`}>
        <div className="column">

          <div className="phone-tab">
            <h2>Zachry Reservation Room</h2>
            <button id="cart-icon">
              <FaShoppingCart style={{ color: 'white', fontSize: '1.5rem' }} />
            </button>
          </div>

          <div className="row time_row">
            <div className="picker-container">
              <h3>Select Date and Time</h3>
              <DatePicker
                selected={selectedDate}
                onChange={updateAvailableRooms}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="date-picker"
              />
            </div>
          </div>

          {/* Divider */}
          <hr className="divider" />

          {/* Scrollable Room List */}
          <div className="room-list">
            {availableRooms.length > 0 ? (
              availableRooms.map((room, index) => (
                <Card
                  key={index}
                  title={`${room.title} (${formatTime(selectedDate)})`}
                  description={room.description}
                  imageUrl={room.imageUrl}
                  buttonText={room.buttonText}
                  onButtonClick={() => alert(`${room.title} added to cart!`)}
                  extraInfo={room.extraInfo}
                />
              ))
            ) : (
              <p style={{ color: "#666", textAlign: "center" }}>
                No rooms available. Please select a time.
              </p>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}

export default App;
