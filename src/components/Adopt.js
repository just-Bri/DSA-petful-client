import React, { Component } from "react";
import "./Adopt.css";

export default class Adopt extends Component {
  constructor(props) {
    super(props);
    this.updateTheShit = this.updateTheShit.bind(this);
    this.handleAdopt = this.handleAdopt.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.state = {
      listOfCats: [],
      listOfDogs: [],
      listOfUsers: [],
      signupName: "",
      currCat: {},
      currDog: {},
      currUser: {}
    };
  }

  updateTheShit = () => {
    let urls = [
      "http://localhost:8000/api/pets/cats/",
      "http://localhost:8000/api/pets/dogs/",
      "http://localhost:8000/api/users/"
    ];
    Promise.all(
      urls.map(async url => {
        const res = await fetch(url);
        if (!res.ok) {
        } else {
          return res.json();
        }
        const data = undefined;
        return data;
      })
    ).then(data => {
      this.setState({
        listOfCats: data[0],
        currCat: data[0][0],
        listOfDogs: data[1],
        currDog: data[1][0],
        listOfUsers: data[2],
        currUser: data[2][0]
      });
    });
  };
  nameHandler = e => {
    this.setState({ signupName: e.target.value });
  };
  handleSignup = e => {
    e.preventDefault();
    fetch("http://localhost:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.signupName)
    }).then(() => this.updateTheShit());
  };
  handleAdopt = (e, type) => {
    e.preventDefault();
    if (type === "dogs" || type === "cats") {
      fetch(`http://localhost:8000/api/pets/${type}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(
        fetch("http://localhost:8000/api/users/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(() => this.updateTheShit())
      );
    }
  };

  componentDidMount() {
    this.updateTheShit();
  }

  render() {
    return (
      <section className="adopt-container">
        <section className="list-of-cats">
          <ul>
            {this.state.listOfCats.map(i => (
              <li key={i.id}>{i.name}</li>
            ))}
          </ul>
        </section>

        <section className="current-cat">
          <img src={this.state.currCat.image} alt="cat" />
          <p>Name: {this.state.currCat.name}</p>
          <p>Breed: {this.state.currCat.breed}</p>
          <p>Sex: {this.state.currCat.sex}</p>
          <p>Age: {this.state.currCat.age}</p>
          <button
            className="button-current-cat"
            onClick={e => this.handleAdopt(e, "cats")}
          >
            click me to adopt {this.state.currCat.name}
          </button>
        </section>
        <section className="both">
          <button
            className="button-current-cat"
            onClick={e => this.handleAdopt(e, "both")}
          >
            click me to adopt {this.state.currDog.name} and
            {this.state.currCat.name}
          </button>
        </section>
        <section className="current-dog">
          <img src={this.state.currDog.image} alt="dog" />
          <p>Name: {this.state.currDog.name}</p>
          <p>Breed: {this.state.currDog.breed}</p>
          <p>Sex: {this.state.currDog.sex}</p>
          <p>Age: {this.state.currDog.age}</p>
          <button
            className="button-current-dog"
            onClick={e => this.handleAdopt(e, "dogs")}
          >
            click me to adopt {this.state.currDog.name}
          </button>
        </section>
        <section className="list-of-dogs">
          <ul>
            {this.state.listOfDogs.map(i => (
              <li key={i.id}>{i.name}</li>
            ))}
          </ul>
        </section>
        <section className="signup-container">
          <form className="signup-form" onSubmit={e => this.handleSignup(e)}>
            <input
              type="text"
              placeholder="Your name here"
              onChange={e => this.nameHandler(e)}
              value={this.state.signupName}
            />
            <button className="signup-button">Get in line!</button>
            <p>Next up: {this.state.currUser.name}</p>
          </form>
        </section>
        <section className="users-container">
          <ul className="list-of-users">
            {this.state.listOfUsers.map(i => (
              <li key={i.id}>{i.name}</li>
            ))}
          </ul>
        </section>
      </section>
    );
  }
}
