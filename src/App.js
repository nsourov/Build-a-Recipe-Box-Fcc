import React, { Component } from "react";
import "./App.css";
import uuid from "uuid";
import autoBind from "react-autobind";

const recipe = [
  {
    id: uuid(),
    title: "Chicken Curry",
    ingredients: ["Chicken", "Salt", "Oil"]
  },
  {
    id: uuid(),
    title: "Fish Curry",
    ingredients: ["Fish", "Salt", "Oil"]
  },
  {
    id: uuid(),
    title: "Egg Curry",
    ingredients: ["Egg", "Salt", "Oil"]
  }
];
class App extends Component {
  constructor() {
    super();
    this.state = { 
      recipe: [],
      inputRecipe: '',
      inputIngedients: ''
     };
    autoBind(this);
  }
  addRecipe(){
    const recipeName = this.refs.recipeName.value;
    const ingredientsName = this.refs.ingredientsName.value.split(',');
    const {recipe} = this.state;
    recipe.push({
      id: uuid(),
      title: recipeName,
      ingredients: ingredientsName,
    })
    this.refs.recipeName.value = '';
    this.refs.ingredientsName.value = '';
    this.setState({recipe: this.state.recipe})
    localStorage.setItem('Recipe', JSON.stringify(this.state.recipe))
  }
  deletRecipe(id){
    const recipe = JSON.parse(localStorage.getItem('Recipe'))
    const deleted = recipe.filter(el => el.id !== id)
    localStorage.setItem('Recipe', JSON.stringify(deleted));
    this.setState({recipe: deleted})
  }
  updateRecipe(id){
    const recipe = this.state.recipe.find(el => el.id === id);
    const newRecipe = this.state.inputRecipe;
    const newIngredients  = this.state.inputIngedients.split(',')
    console.log(newRecipe, newIngredients)
    recipe.title = newRecipe;
    recipe.ingredients = newIngredients
    this.setState({recipe: this.state.recipe})
    localStorage.setItem('Recipe', JSON.stringify(this.state.recipe));
  }
  componentWillMount(){
    const recipe = JSON.parse(localStorage.getItem('Recipe')) || [];
    this.setState({recipe})
  }
  render() {
    const recipe = JSON.parse(localStorage.getItem('Recipe')) || [];
    return (
      <div className="container jumbotron">
        {recipe.map(recipes => (
          <div key={recipes.id}>
          <div className="panel panel-primary" key={recipes.id}>
            <div className="panel-heading">
              <h4 className="panel-title">
                <a
                  data-toggle="collapse"
                  data-parent="#accordion"
                  href={"#" + recipes.id}
                >
                  {recipes.title}
                </a>
              </h4>
            </div>
            <div id={recipes.id} className="panel-collapse collapse">
              <h3>Ingredients</h3>
              {recipes.ingredients.map((el, i) => (
                <div className="list-group" key={i}>
                  <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">{el}</h4>
                  </a>
                </div>
              ))}
              <br/>
            <button type="button" className="btn btn-danger" onClick={(id) => this.deletRecipe(recipes.id)}>Delete</button>
            <button type="button" className="btn btn-default" data-toggle="modal"
            data-target={'#'+recipes.title.split(' ')[0]}>Edit</button>
            <div
            className="modal fade"
            id={recipes.title.split(' ')[0]}
            role="dialog"
            aria-labelledby="myModalLabel"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <h4 className="modal-title" id="myModalLabel">
                    Edit Recipe
                  </h4>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                      <label>Recipe</label>
                      <input type="text" className="form-control" defaultValue={recipes.title} onChange={(e) => {this.setState({inputRecipe: e.target.value})}}/>
                    </div>
                    <div className="form-group">
                      <label>Ingredients</label>
                      <textarea className="form-control" defaultValue={recipes.ingredients} onChange={(e) => {this.setState({inputIngedients: e.target.value})}}/>
                    </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.updateRecipe(recipes.id)}>
                    Update recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
          </div>
        ))}

        <div>
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#myModal"
          >
            Add Recipe
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="myModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myModalLabel"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <h4 className="modal-title" id="myModalLabel">
                    Add Recipe
                  </h4>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                      <label>Recipe</label>
                      <input type="text" className="form-control" placeholder="Recipe Name" ref="recipeName"/>
                    </div>
                    <div className="form-group">
                      <label>Ingredients</label>
                      <textarea className="form-control" placeholder="Enter ingredients separated by commas" ref="ingredientsName"/>
                    </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addRecipe}>
                    Save recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
