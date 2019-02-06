import React, { Component } from 'react'
import { fetchBelgradeEvents, fetchNoviSadEvents } from '../services/fetchCityEvents'
import Header from './partials/Header'
import Footer from './partials/Footer'
import { Link } from 'react-router-dom'

class MeetUpCities extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrOfEventsBelgrade: [],
            arrOfEventsNoviSad: [],
            inputValue: '',
            searchEvents: this.searchEvents.bind(this)
        }
    }

    componentDidMount() {
        if (this.props.match.params.meetupCity === 'belgrade' && this.state.arrOfEventsBelgrade.length === 0) {
            fetchBelgradeEvents().then((data) => {
                console.log(data)
                this.setState({
                    arrOfEventsBelgrade: data
                })
            })
        } else if (this.state.arrOfEventsNoviSad.length === 0) {
            fetchNoviSadEvents().then((data) => {
                this.setState({
                    arrOfEventsNoviSad: data
                })
                console.log(data)
            })
        }
    }

    searchEvents = (e) => {

        const filteredArrOfEvents = this.props.match.params.meetupCity === 'belgrade' ? this.state.arrOfEventsBelgrade.filter((el) => {
            return el.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
        }) : this.state.arrOfEventsNoviSad.filter((el) => {
            return el.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
        })

        console.log(filteredArrOfEvents)
        this.setState({
            inputValue: e.target.value,
            filteredArrOfEvents: filteredArrOfEvents
        })
    }

    setLocalStorageOnClick = (i) => {
        if (this.state.inputValue !== '') {
            localStorage.setItem('name', this.state.filteredArrOfEvents[i].name)
            localStorage.setItem('photo', this.state.filteredArrOfEvents[i].photo)
            localStorage.setItem('description', this.state.filteredArrOfEvents[i].description)
        } else {
            localStorage.setItem('name', this.state.arrOfEvents[i].name)
            localStorage.setItem('photo', this.state.arrOfEvents[i].photo)
            localStorage.setItem('description', this.state.arrOfEvents[i].description)
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header searchEvents={this.state.searchEvents} inputValue={this.state.inputValue} />

                {this.state.inputValue !== '' ? this.state.filteredArrOfEvents.map((el, i) => {
                    return (<Link to={`/:${this.props.match.params.meetupCity}/:${i}`} onClick={this.setLocalStorageOnClick.bind(this, i)} key={i} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='events'  >
                            <img src={el.photo} alt="EventImage" />
                            <p>{el.name}</p>
                        </div>
                    </Link>)
                }) : this.props.match.params.meetupCity === 'belgrade' ? this.state.arrOfEventsBelgrade.map((el, i) => {
                    return (<Link to={`/${this.props.match.params.meetupCity}/${i}`} onClick={this.setLocalStorageOnClick.bind(this, i)} key={i} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='events' >
                            <img src={el.photo} alt="EventImage" />
                            <p>{el.name}</p>
                        </div></Link>)
                }) : this.state.arrOfEventsNoviSad.map((el, i) => {
                    return (<Link to={`/${this.props.match.params.meetupCity}/${i}`} onClick={this.setLocalStorageOnClick.bind(this, i)} key={i} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='events' >
                            <img src={el.photo} alt="EventImage" />
                            <p>{el.name}</p>
                        </div></Link>)
                })}

                <Footer />
            </React.Fragment>
        )
    }
}

export default MeetUpCities