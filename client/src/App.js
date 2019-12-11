import React, { Fragment } from 'react';
import axios from 'axios';

import Loader from './Components/Loader';
import Header from './Components/Header';
import CharacterCard from './Components/CharacterCard';
import Footer from './Components/Footer';

import './App.css';
import debounce from './Common/debounce';

class App extends React.Component {

  state = {
    characters: [],
    next: null,
    searchedName: null,
    sort: 1,
    loading: true,
    species: [],
    gender: []
  }


  searchByName = e => {
    this.search('searchedName', e.target.value);
  }

  sortRequested = () => {
    this.setState(prevState => {
      if (prevState.sort === -1) {
        return { sort: 1, characters: prevState.characters.sort((a, b) => a.id - b.id) }
      }

      return { sort: -1, characters: prevState.characters.sort((a, b) => b.id - a.id) }

    })
  }

  search = debounce((by, name) => {
    this.setState({
      [by] : name
    })
  }, 1000)

  filterValues = (type, data) => {
    this.setState({ [type]: data }, () => {

      let toShowGender = this.state.gender.filter(option => option.checked).map(option => option.value)
      let toShowSpecies = this.state.species.filter(option => option.checked).map(option => option.value)
      // console.log(toShowGender, toShowSpecies);
      this.setState(prevState => { 
        let characters = prevState.characters.map(character => {
          if (toShowGender.indexOf(character.gender) > -1 && toShowSpecies.indexOf(character.species) > -1)
            character.filteredOut = false;
          else
            character.filteredOut = true;
  
          return character;
        })
        return {
          characters
        }
      });

    })

  }

  loadPageData = async api => {
    if (api) {
      this.lastScrolled = api;
        const { data } = await axios.get(api);
        const { info, results } = data;
        this.setState(prevState => { 

          let characters = [...prevState.characters, ...results];

          return ({
            next: info.next,
            characters,
          })
        }, () => {
          this.loadPageData(this.state.next)
        })
    } else {
      let species = this.state.characters.map(character => {
        return character.species;
      })
      species = species.filter((s, i) => species.indexOf(s) === i).map(option => ({ value: option, checked: true }));
      
      let gender = this.state.characters.map(character => {
        return character.gender;
      })
      gender = gender.filter((g, i) => gender.indexOf(g) === i).map(option => ({ value: option, checked: true }));

      this.setState({loading: false, species, gender })
    }
  }

  async componentDidMount() {
    const { data } = await axios.get('https://rickandmortyapi.com/api/character');
    // let data = { results: [] };
    const { info, results } = data;
    this.setState(prevState => { 
      return ({
        next: info.next,
        characters: [...results]
      })
    }, () => {
      this.loadPageData(this.state.next)
    })
  }

  render() {
    const { characters, searchedName, sort, species, gender } = this.state;

    return (
      <div className="App">
        {!this.state.loading ? <Fragment>
          <Header nameEntered={this.searchByName} />
          <div style={{ marginTop: '70px' }} />
          {characters.map((charData, i) => <CharacterCard 
            key={i} 
            character={charData} 
            searchedName={searchedName && searchedName.toUpperCase()} />)}
          <div style={{ marginBottom: '70px' }} />
          <Footer 
            sort={sort}
            sortClicked={this.sortRequested}
            species={species}
            gender={gender}
            filterValues={this.filterValues}
          />
        </Fragment> : <Loader />}
      </div>
    );
  }
}

export default App;
