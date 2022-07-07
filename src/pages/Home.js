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
      lightRelayBaie: null,
      totalRelay: null,
      currentOutletRelay: null,
      currentOutletRelayBaie: null,
      selectedApartment: null,
      selectedRoom: null,
      apartments: null,
      rooms: null,
    };
  }
  // componentDidUpdate() {
  //   console.log('salutttt');
  //   this.initRelays(this.state.selectedRoom);
  // }

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
      let foundCurrent = false;
      let foundLight = false;
      let foundBaieCurrentRelay = false;
      let foundBaieLight = false;
      let foundTotal = false;

      const relayStatus = await getRelaysStatus(value);
      relayStatus.forEach((relay) => {
        switch (relay.usedFor) {
          case 'CURRENT_OUTLET':
            console.log(relay);
            this.setState({ currentOutletRelay: relay });
            foundCurrent = true;
            break;
          case 'LIGHT':
            console.log(relay);
            this.setState({ lightRelay: relay });
            foundLight = true;
            break;
          case 'TOTAL':
            console.log(relay);
            this.setState({ totalRelay: relay });
            foundTotal = true;
            break;
          case 'CURRENT_OUTLET_BAIE':
            console.log(relay);
            this.setState({ currentOutletRelayBaie: relay });
            foundBaieCurrentRelay = true;
            break;
          case 'LIGHT_BAIE':
            console.log(relay);
            this.setState({ lightRelayBaie: relay });
            foundBaieLight = true;
            break;
          default:
            break;
        }
      });

      if (!foundCurrent) this.setState({ currentOutletRelay: null });
      if (!foundLight) this.setState({ lightRelay: null });
      if (!foundBaieCurrentRelay)
        this.setState({ currentOutletRelayBaie: null });
      if (!foundBaieLight) this.setState({ lightRelayBaie: null });
      if (!foundTotal) this.setState({ totalRelay: null });
    }
  }

  handleOnChangeSelectedApartment(event) {
    this.setState({
      selectedApartment: event.target.value,
    });
    const apartment = this.state.apartments.filter((el) => {
      if (el.apartmentId === event.target.value) return el;
    });
    this.setState({
      rooms: apartment[0].rooms,
    });
    this.setState({
      selectedRoom: apartment[0].rooms[0].roomId,
    });
    this.initRelays(apartment[0].rooms[0].roomId);
  }

  async handleOnChangeSelectedRoom(event) {
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
            padding: '0%',
            margin: '1%',
          }}
        >
          <form className='formSelect'>
            <div className='selectDiv'>
              <h4 className='h4Select'>Apartment:</h4>
              <select
                className='select'
                onChange={this.handleOnChangeSelectedApartment.bind(this)}
              >
                {this.state.apartments
                  ? this.state.apartments.map((apartment) => (
                      <option value={apartment.apartmentId}>
                        {apartment.apartmentNumber}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className='selectDiv'>
              <h4 className='h4Select'>Room:</h4>
              <select
                className='select'
                onChange={this.handleOnChangeSelectedRoom.bind(this)}
              >
                {this.state.rooms
                  ? this.state.rooms.map((room) => (
                      <option value={room.roomId}>{room.roomType}</option>
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
              {this.state.lightRelayBaie ? (
                <div className='switch'>
                  <h3>Light Bathroom Relay</h3>
                  <Switch
                    isOn={!this.state.lightRelayBaie.isOn}
                    electricalRelayId={
                      this.state.lightRelayBaie.electricalRelayId
                    }
                  />
                </div>
              ) : null}
              {this.state.currentOutletRelayBaie ? (
                <div className='switch'>
                  <h3>Current Outlet Bathroom Relay</h3>
                  <Switch
                    isOn={!this.state.currentOutletRelayBaie.isOn}
                    electricalRelayId={
                      this.state.currentOutletRelayBaie.electricalRelayId
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
