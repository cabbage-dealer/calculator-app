import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class InputField extends React.Component {
	constructor(props) {
		super(props);
		this.state = { text: '' };
		this.state = {histEnt: '', histSol: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.handleBack = this.handleBack.bind(this);
		this.handleForward = this.handleForward.bind(this);
	}

	handleChange(e) {
		this.setState({text: e.target.value})
		//console.log(this.state.text)
	}

	handleClick(e) {
		var entry = this.state.text;

		if (/[a-zA-Z]/.test(this.state.text)) {
			return (
				this.setState({ solu: "No Letters Please!"})
			)
		}

		var soln = eval(entry);
		//an array with the history of calcs

		this.setState({
			histEnt: [...this.state.histEnt, entry],
			histSol: [...this.state.histSol, soln]
		})
		this.setState({ nums: this.state.histEnt.length })
		this.setState({max: this.state.histEnt.length})
		console.log("max:" + this.state.max)

		this.setState({solu: soln}); 
		console.log("array:" + this.state.histEnt)
	} 

	handleBack(e) {
		let length = this.state.nums
		console.log("length:" + length)

		if(length > 0 ) {
			length = length - 1
			this.setState({ text: this.state.histEnt[length] })
			this.setState({ solu: this.state.histSol[length] })
			this.setState({nums: length})
		}
	}

	handleForward(e) {
		let length = this.state.nums
		console.log("length:" + length)
		console.log("max forward:" + this.state.max)

		if(length < this.state.max ) {
			length = length + 1
			this.setState({ text: this.state.histEnt[length] })
			this.setState({ solu: this.state.histSol[length] })
			this.setState({nums: length})
		}
	}

	render() {
		return (
			<div className="everything">
				<div> 
					<form action="#" className="items">
						<input className="input" type="text" value={this.state.text}
						 onChange={this.handleChange} placeholder="Gimme a problem!"/>
						<button type="submit" onClick={this.handleClick} className="solve">
							=
						</button>
					</form>
						<Recall 
							back={this.handleBack} 
							forward={this.handleForward}
						/>
				</div>
					<Answer solut={this.state.solu} />	
			</div>
		)
	}
}

class Answer extends React.Component {
	render() {
		return (
			<div>
				<p className="solution" >{this.props.solut}</p>
			</div>
		)
	}
}

class Recall extends React.Component {
	render() {
		return (
			<span className="bfbuttons">
				<button type="submit" onClick={this.props.back} value="back" className="back">
					<img className="backImg" src="https://image.flaticon.com/icons/png/512/13/13964.png" alt="back"/>
				</button>
				<button type="submit" onClick={this.props.forward} value="forward" className="forward">
					<img className="fwdImg" src="https://image.flaticon.com/icons/png/512/13/13964.png" alt="back"/>
				</button>
			</span>
		)
	}
}

