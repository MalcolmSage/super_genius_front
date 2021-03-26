import React, { Component } from "react"

class Artists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            currentSelected:{},
            newArtist: {},
            artistToEdit:{}
        };
    }
    //GET ALL OBJECTS
    getAllArtists = () => {

        const requestOptions = {
            method: "GET"
        }
        fetch("https://super-genius-back.herokuapp.com/artist", requestOptions)
            .then(res => res.json())
            .then(artists => {
                this.setState({ artists })
            })
    }
    //CREATE NEW OBJECT
    createNewArtist = (e) => {
        e.preventDefault()
        const newArtist = this.state.newArtist
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newArtist)
        }
        fetch("https://super-genius-back.herokuapp.com/artist", requestOptions)
            .then(res => res.json())
            .then(returnedArtist => {
                this.setState({ artists: [...this.state.artists, returnedArtist] })
            })
    }

    //PROMPT FETCH
    componentDidMount() {
        this.getAllArtists()
    }

    //SELECT OBJECT
    getCurrentSelected = (selectedArtistData) => {
        this.setState({ currentSelected: selectedArtistData })
    }
    handleFormChange = (e) => {
        this.setState({ newArtist: { ...this.state.newArtist, [e.target.name]: e.target.value } })
    }
    //DELETE OBJECT
    deleteArtist = (id) => {
        console.log("deleted me:", id)
        fetch('https://super-genius-back.herokuapp.com/artist/' + id, { method: "DELETE" })
            .then(resp => resp.json())
            .then(deleteResp => {
                const updatedArtists = this.state.artists.filter(artist => artist._id != id)
                this.setState({ currentSelected: {}, artists: updatedArtists })
            })
    }

    //OPEN EDIT FORM
    getEditArtist = (artistToEdit) => {
        this.setState({ artistToEdit })
    }
    handleEditChange = (e) => {
        this.setState({ artistToEdit: { ...this.state.artistToEdit, [e.target.name]: e.target.value } })

    }

    //UPDATE OBJECT
    updateArtist = (e) => {
        e.preventDefault()
        const { name, playcount, url, _id } = this.state.artistToEdit
        const updatedArtist = { name, playcount, url }
        console.log(updatedArtist, _id)
        const requestOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedArtist)
        }
        fetch('https://super-genius-back.herokuapp.com/artist/' + _id, requestOptions)
            .then(resp => resp.json())
            .then(returnedUpdatedArtist => {
                console.log(returnedUpdatedArtist)
                const allUpdatedArtists = this.state.artists.map(artist => artist._id === _id ? returnedUpdatedArtist : artist)
                this.setState({ artists: allUpdatedArtists })
            })
    }
    render() {
        const { name, playcount, url, _id } = this.state.currentSelected
        return (
            <div className="App">
                <div>Artists</div>
                <div>
                    <h1>CREATE NEW ARTIST</h1>
                    <form onSubmit={this.createNewArtist}>
                        <input type="text" name="name" placeholder="enter name" value={this.state.newArtist.name} onChange={this.handleFormChange} />
                        <input type="text" name="url" placeholder="enter url" value={this.state.newArtist.url} onChange={this.handleFormChange} />
                        <input type="text" name="playcount" placeholder="enter playcount" value={this.state.newArtist.playcount} onChange={this.handleFormChange} />
                        <button type="submit">Create Artist</button>
                    </form>
                </div>
                <div>
                    <h1>DETAIL</h1>
                    {this.state.currentSelected._id && <div>
                        <h2>Name: {name}</h2>
                        <h2>PLAYCOUNT: {playcount}</h2>
                        <h2>URL: {url}</h2>
                        <button onClick={() => this.deleteArtist(_id)}>DELETE</button>
                        <button onClick={() => this.getEditArtist(this.state.currentSelected)}>EDIT</button>
                    </div>}
                </div>
                <div>
                    <h1>UPDATE</h1>
                    {this.state.artistToEdit._id &&
                        <form onSubmit={this.updateArtist}>
                            <input type="text" name="name" placeholder="enter name" value={this.state.artistToEdit.name} onChange={this.handleEditChange} />
                            <input type="text" name="url" placeholder="enter url" value={this.state.artistToEdit.url} onChange={this.handleEditChange} />
                            <input type="text" name="playcount" placeholder="enter playcount" value={this.state.artistToEdit.playcount} onChange={this.handleEditChange} />
                            <button type="submit">EDIT Artist</button>
                        </form>}
                </div>
                <div>
                    <h1>INDEX</h1>
                    {this.state.artists.map(artist => <div onClick={() => this.getCurrentSelected(artist)} key={artist._id}>{artist.name}</div>)}
                </div>
            </div>
        );
    }
}

export default Artists;