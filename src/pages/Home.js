import './Home.css';

import React from 'react';

import DateAndTimeChart from '../components/DateTimePicker';
import Switch from '../components/Switch';
import { getRelaysStatus, getUser } from '../Utils/Common';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      lightRelay: null,
      totalRelay: null,
      currentOutletRelay: null,
      selectedApartment: null,
      selectedRoom: null,
      apartments: null,
      rooms: null,
    };
  }
  async componentDidMount() {
    try {
      const user = getUser();

      this.state.apartments = user?.apartments;

      this.state.selectedApartment = this.state.apartments[0];

      this.state.rooms = this.state.selectedApartment?.rooms;

      this.state.selectedRoom = this.state.rooms[0].roomId;

      this.initRelays(this.state.selectedRoom);
    } catch (error) {}
  }

  async initRelays(value) {
    if (value) {
      const relayStatus = await getRelaysStatus(value);
      relayStatus.forEach((relay) => {
        switch (relay.usedFor) {
          case 'CURRENT_OUTLET':
            this.setState({ currentOutletRelay: relay });
            break;
          case 'LIGHT':
            this.setState({ lightRelay: relay });

            break;
          case 'TOTAL':
            this.setState({ totalRelay: relay });

            break;

          default:
            break;
        }
      });
    }
  }
  handleOnChangeSelectedApartment(event) {
    this.setState({
      selectedApartment: event.target.value,
    });
    const apartment = this.state.apartments.filter((el) => {
      if (el.apartmentId == event.target.value) return el;
    });
    console.log(event.target.value);
    this.setState({
      rooms: apartment[0].rooms,
    });
    console.log();
    this.setState({
      selectedRoom: apartment[0].rooms[0].roomId,
    });
    this.initRelays(apartment[0].rooms[0].roomId);
  }

  async handleOnChangeSelectedRoom(event) {
    console.log('before');
    this.setState({
      selectedRoom: event.target.value,
    });
    this.initRelays(event.target.value);
  }
  render() {
    return (
      <div className='main_container'>
        <div
          style={{
            padding: '16px',
            margin: '16px',
          }}
        >
          <form>
            <div>
              <select
                onChange={this.handleOnChangeSelectedApartment.bind(this)}
              >
                {this.state.apartments
                  ? this.state.apartments.map((apartment) => (
                      <option value={apartment.apartmentId}>
                        Apartment {apartment.apartmentNumber}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div>
              <select onChange={this.handleOnChangeSelectedRoom.bind(this)}>
                {this.state.rooms
                  ? this.state.rooms.map((room) => (
                      <option value={room.roomId}>
                        Apartment {room.roomType}
                      </option>
                    ))
                  : null}
              </select>
            </div>
          </form>
        </div>
        <div className='home'>
          <DateAndTimeChart
            title={'Temperature'}
            roomId={this.state.selectedRoom}
          />
          <DateAndTimeChart
            title={'Humidity'}
            roomId={this.state.selectedRoom}
          />
        </div>
        <div className='home'>
          <DateAndTimeChart
            title={'Luminous Intensity'}
            roomId={this.state.selectedRoom}
          />
          <div className='relays-container'>
            <h1>Relays Status</h1>
            <div className='relays'>
              {this.state.lightRelay ? (
                <div className='switch'>
                  <h3>Light Relay</h3>
                  <Switch
                    isOn={!this.state.lightRelay.isOn}
                    electricalRelayId={this.state.lightRelay.electricalRelayId}
                  />
                </div>
              ) : null}
              {this.state.currentOutletRelay != null ? (
                <div className='switch'>
                  <h3>Current Outlet Relay</h3>
                  <Switch
                    isOn={!this.state.currentOutletRelay.isOn}
                    electricalRelayId={
                      this.state.currentOutletRelay.electricalRelayId
                    }
                  />
                </div>
              ) : null}
              {this.state.totalRelay ? (
                <div className='switch'>
                  <h3>Main Relay</h3>
                  <Switch
                    isOn={!this.state.totalRelay.isOn}
                    electricalRelayId={this.state.totalRelay.electricalRelayId}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
