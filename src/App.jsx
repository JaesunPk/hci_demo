import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Card from "./components/card";
import Cart from "./components/cart";
import ZachChevronRooms from "./assets/ZachChevronRooms.jpg";
import HuddleRoom from "./assets/huddle_room.jpg";
import ZachrySeminar from "./assets/zachry-seminar.jpg";
import GroupStudyRoom from "./assets/group-study-room.jpg";
import TamuLarge2 from "./assets/tamu-large2.jpg";
import StudyRoom from "./assets/studyroom.jpg";
import MediumRoom from "./assets/medium-room.jpg";
import Images from "./assets/images.jpg";
import HonorsLounge from "./assets/honors-lounge.jpg";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableRooms, setAvailableRooms] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);

  //cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (room) => {
    const reservation = {
      ...room,
      date: selectedDate.toLocaleDateString(),
      time: formatTime(room.time),
    };

    //prevent duplication only if both title, date, and time match
    if (
      !cart.some(
        (item) =>
          item.title === room.title &&
          item.date === reservation.date &&
          item.time === reservation.time
      )
    ) {
      setCart((prevCart) => [...prevCart, reservation]);
      alert(
        `${room.title} for ${reservation.date} at ${reservation.time} added to cart!`
      );
    } else {
      alert(
        `${room.title} for ${reservation.date} at ${reservation.time} is already in the cart.`
      );
    }
  };

  const clearCart = () => setCart([]);

  const removeFromCart = (roomToRemove) => {
    setCart(
      cart.filter(
        (room) =>
          !(
            room.title === roomToRemove.title &&
            room.date === roomToRemove.date &&
            room.time === roomToRemove.time
          )
      )
    );
  };

  const submitCart = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before submitting.");
      return;
    }

    const reservationSummary = cart
      .map((item) => `${item.title} on ${item.date} at ${item.time}`)
      .join("\n");

    alert(`Reservations submitted:\n${reservationSummary}`);
    setCart([]); //clear cart after submission
    setIsCartOpen(false); //close card modal
  };
  //end of cart state

  // Hardcoded room availability based on selected time
  const roomAvailability = {
    morning: [
      {
        title: "ZACH 200A",
        description: "Large room for conferences.",
        imageUrl: ZachChevronRooms,
        buttonText: "Add",
        extraInfo:
          "Holds up to 100 people. Includes projector, air conditioning, and WiFi.",
      },
      {
        title: "ZACH 200B",
        description: "Small private meeting room.",
        imageUrl: HuddleRoom,
        buttonText: "Add",
        extraInfo:
          "Holds up to 10 people. Includes a whiteboard and comfortable seating.",
      },
      {
        title: "ZACH 201A",
        description: "Medium-sized seminar room.",
        imageUrl: ZachrySeminar,
        buttonText: "Add",
        extraInfo:
          "Holds up to 50 people. Includes audio system and modern seating.",
      },
      {
        title: "ZACH 332",
        description: "Cozy meeting space.",
        imageUrl: GroupStudyRoom,
        buttonText: "Add",
        extraInfo: "Holds up to 8 people. Includes a smart TV and free coffee.",
      },
    ],
    afternoon: [
      {
        title: "ZACH 300A",
        description: "Spacious room with great lighting.",
        imageUrl: TamuLarge2,
        buttonText: "Add",
        extraInfo:
          "Holds up to 100 people. Includes modern amenities and a sound system.",
      },
      {
        title: "ZACH 300B",
        description: "Quiet room for focused work.",
        imageUrl: StudyRoom,
        buttonText: "Add",
        extraInfo:
          "Holds up to 20 people. Includes high-speed WiFi and comfortable chairs.",
      },
      {
        title: "ZACH 301",
        description: "Classroom-style space.",
        imageUrl: MediumRoom,
        buttonText: "Add",
        extraInfo:
          "Holds up to 30 people. Includes desks and a large projector.",
      },
      {
        title: "ZACH 302",
        description: "Executive meeting room.",
        imageUrl: Images,
        buttonText: "Add",
        extraInfo:
          "Holds up to 15 people. Includes video conferencing equipment.",
      },
      {
        title: "ZACH 303",
        description: "Open collaborative space.",
        imageUrl: HonorsLounge,
        buttonText: "Add",
        extraInfo:
          "Holds up to 25 people. Includes flexible seating and writable walls.",
      },
    ],
    evening: [
      {
        title: "ZACH 400A",
        description: "Large hall for evening events.",
        imageUrl: TamuLarge2,
        buttonText: "Add",
        extraInfo:
          "Holds up to 150 people. Includes stage, lighting, and sound equipment.",
      },
      {
        title: "ZACH 400B",
        description: "Medium-sized room for classes.",
        imageUrl: ZachrySeminar,
        buttonText: "Add",
        extraInfo: "Holds up to 30 people. Includes projector and whiteboard.",
      },
      {
        title: "ZACH 401",
        description: "Cozy reading space.",
        imageUrl: GroupStudyRoom,
        buttonText: "Add",
        extraInfo: "Holds up to 5 people. Includes bean bags and a bookshelf.",
      },
    ],
  };

  // Function to round to the nearest 30-minute interval
  const roundToNearest30Minutes = (date) => {
    const minutes = date.getMinutes();
    const roundedMinutes = minutes < 15 ? 0 : minutes < 45 ? 30 : 60;
    const roundedDate = new Date(date);
    roundedDate.setMinutes(roundedMinutes);
    roundedDate.setSeconds(0);
    return roundedDate;
  };

  // Function to generate relative times for rooms
  const generateRoomTimes = (baseTime, roomCount) => {
    const times = [];
    for (let i = 0; i < roomCount; i++) {
      const offset = i * 15; // 15-minute intervals between rooms
      const roomTime = new Date(baseTime);
      roomTime.setMinutes(baseTime.getMinutes() + offset);
      times.push(roomTime);
    }
    return times;
  };

  // Function to update available rooms based on selected time
  const updateAvailableRooms = (date) => {
    setSelectedDate(date);

    const hours = date.getHours();
    const baseTime = roundToNearest30Minutes(date);

    let rooms = [];
    if (hours >= 6 && hours < 12) {
      rooms = roomAvailability.morning;
    } else if (hours >= 12 && hours < 18) {
      rooms = roomAvailability.afternoon;
    } else {
      rooms = roomAvailability.evening;
    }

    const roomTimes = generateRoomTimes(baseTime, rooms.length);

    // Assign times to rooms
    const updatedRooms = rooms.map((room, index) => ({
      ...room,
      time: roomTimes[index] || null, // Ensure time is assigned or fallback to null
    }));

    setAvailableRooms(updatedRooms);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  // Helper function to format the time for display
  // Helper function to format the time range for display
  const formatTime = (date) => {
    if (!date) return "Unknown Time"; // Fallback for undefined date

    const start = new Date(date);
    const end = new Date(date);
    end.setMinutes(end.getMinutes() + 30); // Add 30 minutes to get the end time

    const startTime = start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const endTime = end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${startTime} - ${endTime}`;
  };

  return (
    <main>
      <div
        className={`phone-screen ${
          availableRooms.length === 0 ? "no-rooms" : ""
        }`}
      >
        <div className="column">
          <div className="phone-tab">
            <h2>Zachry Reservation Room</h2>
            {/* cart icon button */}
            <button id="cart-icon" onClick={toggleCart}>
              <FaShoppingCart style={{ color: "white", fontSize: "1.5rem" }} />
              {cart.length > 0 && (
                <span
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "0.2rem 0.4rem",
                    marginLeft: "0.5rem",
                    fontSize: "0.8rem",
                  }}
                >
                  {cart.length}
                </span>
              )}
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
                customInput={
                  <button type="button" className="custom-datepicker-btn">
                    {selectedDate.toLocaleString()}
                  </button>
                }
                withPortal
                popperPlacement="bottom"
              />
            </div>
          </div>

          {/* Divider */}
          <hr className="divider" />

          {/* Scrollable Room List */}
          <div className="room-list">
            {availableRooms.length > 0 ? (
              availableRooms.map((room, index) => (
                <div
                  key={`${animationKey}-${index}`} // Force re-render with animationKey
                  className="card-container card-animation"
                >
                  <Card
                    title={`${room.title} (${formatTime(room.time)})`} // Display relative time
                    description={room.description}
                    imageUrl={room.imageUrl}
                    buttonText={room.buttonText}
                    onButtonClick={() => addToCart(room)}
                    //onButtonClick={() => alert(`${room.title} added to cart!`)}
                    extraInfo={room.extraInfo}
                  />
                </div>
              ))
            ) : (
              <p style={{ color: "#666", textAlign: "center" }}>
                No rooms available. Please select a time.
              </p>
            )}
          </div>

          {/* Cart */}
          {isCartOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <Cart
                  cart={cart}
                  clearCart={clearCart}
                  removeFromCart={removeFromCart}
                  toggleCart={toggleCart}
                  submitCart={submitCart}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
