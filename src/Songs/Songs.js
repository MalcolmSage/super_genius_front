import React, { Component } from "react"

class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            currentSelected:{},
            newSong: {},
            songToEdit:{}
        };
    }

    getAllSongs = () => {

        const requestOptions = {
            method: "GET"
        }
        fetch("https://super-genius-back.herokuapp.com/songs", requestOptions)
            .then(res => res.json())
            .then(songs => {
                this.setState({ songs })
            })
    }
    createNewSong = (e) => {
        e.preventDefault()
        const newSong = this.state.newSong
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSong)
        }
        fetch("https://super-genius-back.herokuapp.com/songs", requestOptions)
            .then(res => res.json())
            .then(returnedSong => {
                this.setState({ songs: [...this.state.songs, returnedSong] })
            })
    }
    componentDidMount() {
        this.getAllSongs()
    }
    getCurrentSelected = (selectedSongData) => {
        this.setState({ currentSelected: selectedSongData })
    }
    handleFormChange = (e) => {
        this.setState({ newSong: { ...this.state.newSong, [e.target.name]: e.target.value } })
    }
    deleteSong = (id) => {
        console.log("deleted me:", id)
        fetch('https://super-genius-back.herokuapp.com/songs/' + id, { method: "DELETE" })
            .then(resp => resp.json())
            .then(deleteResp => {
                const updatedSongs = this.state.songs.filter(song => song._id != id)
                this.setState({ currentSelected: {}, songs: updatedSongs })
            })
    }
    getEditSong = (songToEdit) => {
        this.setState({ songToEdit })
    }
    handleEditChange = (e) => {
        this.setState({ songToEdit: { ...this.state.songToEdit, [e.target.name]: e.target.value } })

    }
    updateSong = (e) => {
        e.preventDefault()
        const { name, playcount, _id } = this.state.songToEdit
        const updatedSong = { name, playcount }
        console.log(updatedSong, _id)
        const requestOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedSong)
        }
        fetch('https://super-genius-back.herokuapp.com/songs/' + _id, requestOptions)
            .then(resp => resp.json())
            .then(returnedUpdatedSong => {
                console.log(returnedUpdatedSong)
                const allUpdatedSongs = this.state.songs.map(song => song._id === _id ? returnedUpdatedSong : song)
                this.setState({ songs: allUpdatedSongs })
            })
    }
    render() {
        const { name, playcount, _id } = this.state.currentSelected
        return (
            <div className="App">
                <div>SONGS</div>
                <div>
                    <h1>CREATE NEW SONG</h1>
                    <form onSubmit={this.createNewSong}>
                        <input type="text" name="name" placeholder="enter name" value={this.state.newSong.name} onChange={this.handleFormChange} />
                        <input type="text" name="playcount" placeholder="enter playcount" value={this.state.newSong.playcount} onChange={this.handleFormChange} />
                        <button type="submit">Create Song</button>
                    </form>
                </div>
                <div>
                    <h1>DETAIL</h1>
                    {this.state.currentSelected._id && <div>
                        <h2>Name: {name}</h2>
                        <h2>PLAYCOUNT: {playcount}</h2>
                        <button onClick={() => this.deleteSong(_id)}>DELETE</button>
                        <button onClick={() => this.getEditSong(this.state.currentSelected)}>EDIT</button>
                    </div>}
                </div>
                <div>
                    <h1>UPDATE</h1>
                    {this.state.songToEdit._id &&
                        <form onSubmit={this.updateSong}>
                            <input type="text" name="name" placeholder="enter name" value={this.state.songToEdit.name} onChange={this.handleEditChange} />
                            <input type="text" name="playcount" placeholder="enter playcount" value={this.state.songToEdit.playcount} onChange={this.handleEditChange} />
                            <button type="submit">EDIT Song</button>
                        </form>}
                </div>
                <div>
                    <h1>INDEX</h1>
                    {this.state.songs.map(song => <div onClick={() => this.getCurrentSelected(song)} key={song._id}>{song.name}</div>)}
                </div>
            </div>
        );
    }
}

export default Songs;